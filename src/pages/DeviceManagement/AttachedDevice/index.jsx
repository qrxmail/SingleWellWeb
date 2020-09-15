import React, { useState, useRef } from "react";
import { PlusOutlined, ExclamationCircleOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Drawer, Divider, Modal, message, Upload } from "antd";
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

import UpdateForm from './components/UpdateForm';
import { query, update, add, remove } from './service';
import '../../Common.less';

// 确认对话框
const { confirm } = Modal;

// 新增/修改：返回新的保存后的对象
const handleUpdate = async (fields) => {
  const hide = message.loading('正在保存');

  // 将null和空字符串的属性去掉
  Object.keys(fields).forEach((key) => {
    //let tkey = key as keyof typeof fields;
    if (fields[key] == null || fields[key] == '') {
      delete fields[key];
    }
  });

  // 新增/修改后返回的新的对象
  let newObj = {};
  try {
    if (fields.isAdd) {
      newObj = await add(fields);
    } else {
      newObj = await update(fields);
    }

    hide();

    message.success('保存成功');
    newObj.success = true;
    return newObj;

  } catch (error) {
    hide();
    message.error('保存失败请重试！');
    newObj.success = false;
    return newObj;
  }
};

// 删除节点
const handleRemove = async (selectedRows) => {

  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {

    selectedRows.forEach(async (dto) => {
      await AttachedDeviceService.delete(dto);
    })

    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }

};

export default (props) => {

  // 列表的列属性
  const columns = [
    {
      title: "设备编号",
      dataIndex: "onSiteSerialNumber",
      // 打开详情页面
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      }
    },
    {
      title: "设备名称",
      dataIndex: "name",
      // 打开详情页面
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      }
    },
    {
      title: "规格型号",
      dataIndex: "model",
    },
    {
      title: "生产厂家",
      dataIndex: "supplier",
    },
    {
      title: "出厂编号",
      dataIndex: "productionSerialNumber",
    },
    {
      title: "出厂日期",
      dataIndex: "productionDate",
      valueType: "date",
    },
    {
      title: "是否压力容器",
      dataIndex: "isPressureVessel",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否压力管道",
      dataIndex: "isPressurePipe",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "设备类型",
      dataIndex: "deviceType",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "设备状态",
      dataIndex: "state",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "备注",
      dataIndex: "remark",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "安装位置",
      dataIndex: "installationLocation",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "库存等级",
      dataIndex: "stockLevel",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "目前库存数量",
      dataIndex: "stockHoldAmount",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否安全阀",
      dataIndex: "isSafetyValve",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "动密封点数量",
      dataIndex: "dynamicSealPointCount",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "静密封点数量",
      dataIndex: "staticSealPointCount",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "动密封点泄漏点数量",
      dataIndex: "dynamicSealLeakingPointCount",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "静密封点泄漏点数量",
      dataIndex: "staticSealLeakingPointCount",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否显示在主设备下方",
      dataIndex: "showInMainCard",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否显示在主要仪表、设施档案栏目",
      dataIndex: "hasDetailCard",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否显示在附属设备清单",
      dataIndex: "showInList",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "附属设备清单序号",
      dataIndex: "tableSortId",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "主要仪表、设施档案栏目序号",
      dataIndex: "detailCardSortId",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "是否需要定期维护",
      dataIndex: "needCheckPeriodly",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "定期维护间隔(小时)",
      dataIndex: "checkIntervalHours",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "主要参数（用于主要附属设备表)",
      dataIndex: "mainParameters",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(entity);
              setModelTitle("修改");
            }}>
            修改
          </a>

          <Divider type="vertical" />

          <a
            onClick={() => {
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
      ),
    },
  ];

  // 将页面属性放入到state中
  const [deviceId, setDeviceId] = useState(props.deviceId);
  // 定义页面属性
  // const {
  //   deviceId
  // } = props;

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

  // 文件上传组件属性
  const uploadProps = {
    name: 'file',
    action: 'https://localhost:44332/api/app/AttachedDeviceDto/uploadFiles',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 导入成功`);
        // 刷新列表
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 导入失败.`);
      }
    },
  };

  // 绘制列表页面
  return (
    <PageContainer>

      {/* 列表 */}
      <ProTable
        actionRef={actionRef}
        size="small"
        rowKey="id"
        dateFormatter="string"
        headerTitle="查询结果"
        // 设置查询表单的size
        form={{
          size: 'small',
        }}
        columns={columns}
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
              setModelTitle("新增");
            }}>
            <PlusOutlined />
            新增
          </Button>,

          <Upload {...uploadProps}>
            <Button key="import" type="primary" size='small'>
              <DownloadOutlined /> 导入
            </Button>
          </Upload>,
          <Button key="export" type="primary" size='small' onClick={() => { window.location.href = "/text.xlsx" }}>
            <UploadOutlined />导出
          </Button>,

          // 选中的行大于0，显示批量删除按钮
          //   selectedRowsState?.length > 0 ?
          //     <Button key="batchdel" type="primary" size='small'
          //       onClick={async () => {
          //         await handleRemove(selectedRowsState);
          //         setSelectedRows([]);
          //         actionRef.current?.reloadAndRest?.();
          //       }}
          //     >
          //       批量删除
          //  </Button> : null
        ]}
      //scroll={{ x: 4000 }}
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
        {row?.name && (
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
            const returnObj = await handleUpdate(value);
            if (returnObj.success) {
              // 这里赋值似乎没什么作用
              //setFormValues({});
              // 设备新增/修改页面不关闭(本来就设置为true了，不用再设置为ture了)
              //handleUpdateModalVisible(true);
              // 刷新列表
              if (actionRef.current) {
                actionRef.current.reload();
              }
              return returnObj.id;
            }
            return "";
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

