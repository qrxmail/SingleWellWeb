import { connect } from 'umi';
import React, { useState, useRef } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Divider, Modal, message } from "antd";
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { routerRedux } from 'dva';

import UpdateForm from './components/UpdateForm';
import { query, update, add, remove } from './service';

import '../Common.less';

// 确认对话框
const { confirm } = Modal;

// 新增/修改
const handleUpdate = async (fields) => {
  const hide = message.loading('正在保存');

  // 将null和空字符串的属性去掉
  Object.keys(fields).forEach((key) => {
    //let tkey = key as keyof typeof fields;
    if (fields[key] == null || fields[key] == '') {
      delete fields[key];
    }
  });

  try {
    let result = {};
    if (fields.isAdd) {
      result = await add(fields);
    } else {
      result = await update(fields);
    }

    hide();
    if (result.isSuccess) {
      message.success('保存成功');
    } else {
      message.error(result.errMsg);
    }
    return result.isSuccess;
  } catch (error) {
    hide();
    message.error('保存失败请重试！');
    return false;
  }
};

// 删除节点
const handleRemove = async (selectedRows) => {

  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await remove({
      id: selectedRows.map(row => row.pk),
    });

    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }

};

const TableList = (props) => {
  // 将当前用户加入到props中
  const {
    currentUser,
    dispatch
  } = props;

  // 列表的列属性
  const columns = [
    {
      title: "序号",
      valueType: "index",
    },
    {
      title: "所属单位",
      dataIndex: "branch",
      hideInSearch: true,
    },
    {
      title: "管理区",
      dataIndex: "district",
      sorter: true,
    },
    {
      title: "站名",
      dataIndex: "name",
      sorter: true,
      // 打开详情页面
      render: (dom, entity) => {
        return <a onClick={() => {
          dispatch(routerRedux.push({
            pathname: '/OilStationView',
            query: { pk: entity.pk, branch: entity.branch, district: entity.district, name: entity.name }
          }));
        }}>{dom}</a>;
      }
    },
    {
      title: "PLC IP",
      dataIndex: "plcip",
      hideInSearch: true,
    },
    {
      title: "HMI IP",
      dataIndex: "hmiip",
      hideInSearch: true,
    },
    {
      title: '单位体积(1cm)',
      children: [
        {
          title: "单位体积",
          dataIndex: "volumnPer1cm",
          hideInSearch: true,
        },
        {
          title: "校正系数",
          dataIndex: "levelCalcFactor",
          hideInSearch: true,
        },
        {
          title: "偏差",
          dataIndex: "levelCalcOffset",
          hideInSearch: true,
        },
      ],
    },
    {
      title: '装油泵额定流量(m3/h)',
      children: [
        {
          title: "装油泵额定流量",
          dataIndex: "pumpRatedFlow",
          hideInSearch: true,
        },
        {
          title: "校正系数",
          dataIndex: "pumpCalcFactor",
          hideInSearch: true,
        },
        {
          title: "偏差",
          dataIndex: "pumpCalcOffset",
          hideInSearch: true,
        },
      ],
    },
    {
      title: "经度",
      dataIndex: "longitude",
      hideInSearch: true,
    },
    {
      title: "纬度",
      dataIndex: "latitude",
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, entity) => {
        return (
          <>
            <a onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(entity);
              setModelTitle("修改");
            }}>
              修改
            </a>

            <Divider type="vertical" />

            <a onClick={() => {
              // 删除确认
              confirm({
                title: '您确定要删除这条记录吗?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                onOk() {
                  var delRows = [];
                  delRows.push(entity);
                  handleRemove(delRows);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
                onCancel() {
                },
              });
            }}
            >
              删除
            </a>

          </>

        )
      }
    },
  ];

  // 详情页面传入的参数（选择的行数据）
  const [row, setRow] = useState();

  // 多选按钮选中的行数据
  const [selectedRowsState, setSelectedRows] = useState([]);

  // 新增、修改页面是否可见
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  // 新增、修改表单初始值
  const [formValues, setFormValues] = useState({});
  // 新增、修改页面的标题
  const [modelTitle, setModelTitle] = useState("");

  const actionRef = useRef();

  // 绘制列表页面
  return (
    <PageContainer>

      {/* 列表 */}
      <ProTable
        actionRef={actionRef}
        size="small"
        rowKey="pk"
        dateFormatter="string"
        headerTitle="查询结果"
        // 设置查询表单的size
        form={{
          size: 'small',
        }}
        columns={columns}
        bordered
        // 查询，列表数据请求
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        toolBarRender={() => [
          <Button key="export" type="primary" size='small'
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues({ isAdd: true });
              console.log("formValues:" + JSON.stringify(formValues));
              setModelTitle("新增");
            }}>
            <PlusOutlined />
            新增
          </Button>
        ]}
        scroll={{ x: 'max-content' }}
      />

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button key="batchdel" type="primary" size='small'
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
         </Button>
        </FooterToolbar>
      )}

      {/* 详情 */}
      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.pk && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>

      {/* 新增/修改:需要先设置初始值，再展示页面，否则初始值设置不生效 */}
      {formValues && Object.keys(formValues).length && updateModalVisible ? (
        <UpdateForm
          title={modelTitle}
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={formValues}
        />
      ) : null}

    </PageContainer>
  );
};
// 利用connect拿到当前用户
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(TableList);

