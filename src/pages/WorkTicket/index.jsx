import { connect } from 'umi';
import React, { useState, useRef } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, message } from "antd";
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { routerRedux } from 'dva';

import UpdateForm from './components/UpdateForm';
import ReceiveForm from './components/ReceiveForm';
import LoadForm from './components/LoadForm';
import UnLoadForm from './components/UnLoadForm';
import { query, update, add, remove, tovoid, receive, grant, load, unload, review } from './service';

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
    fields.loadStation = fields.loadStationName[2];
    fields.unloadStation = fields.unloadStationName[2];
    fields.loadingBeginTime = fields.loadtimeRange[0];
    fields.loadingEndTime = fields.loadtimeRange[1];
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

// 办理
const handleOper = async (fields) => {
  const hide = message.loading('正在提交');

  // 将null和空字符串的属性去掉
  Object.keys(fields).forEach((key) => {
    //let tkey = key as keyof typeof fields;
    if (fields[key] == null || fields[key] == '') {
      delete fields[key];
    }
  });

  try {
    let result = {};
    switch (fields.status) {
      case "待接单":
        result = await receive(fields);
        break;
      case "待授权":
        result = await grant(fields);
        break;
      case "待拉油":
        fields.loadingActualBeginTime = fields.loadActualTimeRange[0];
        fields.loadingActualEndTime = fields.loadActualTimeRange[1];
        result = await load(fields);
        break;
      case "待卸油":
        fields.unloadingBeginTime = fields.unLoadtimeRange[0];
        fields.unloadingEndTime = fields.unLoadtimeRange[1];
        result = await unload(fields);
        break;
      case "待审批":
        result = await review(fields);
        break;
      default:
        break;
    }

    hide();
    if (result.isSuccess) {
      message.success('办理成功');
    } else {
      message.error(result.errMsg);
    }
    return result.isSuccess;
  } catch (error) {
    hide();
    message.error('提交失败请重试！');
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

// 作废
const handleToVoid = async (selectedRows) => {

  const hide = message.loading('正在作废');
  if (!selectedRows) return true;

  try {
    selectedRows.map(async (row) => {
      await tovoid(row);
    });

    hide();
    message.success('作废成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('作废失败，请重试');
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
      title: "工单编号",
      dataIndex: "serialNumber",
      sorter: true,
      // 打开详情页面
      render: (dom, entity) => {
        return <a onClick={() => {
          dispatch(routerRedux.push({
            pathname: '/WorkTicketView',
            query: { pk: entity.pk }
          }));
        }}>{dom}</a>;
      }
    },
    {
      title: "铅封号",
      dataIndex: "subSerialNumber",
      sorter: true,
    },
    {
      title: "创建人",
      dataIndex: "createUser",
      sorter: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      sorter: true,
    },
    {
      title: "装油站",
      dataIndex: "loadStationName",
    },
    {
      title: "卸油站",
      dataIndex: "unloadStationName",
    },
    {
      title: "车牌号",
      dataIndex: "truckNo",
    },
    {
      title: "司机",
      dataIndex: "drvierName",
    },
    {
      title: "装油液量",
      dataIndex: "oilLoaded",
      hideInSearch: true,
      valueType: "digit",
    },
    {
      title: "收油液量",
      dataIndex: "oilUnloaded",
      hideInSearch: true,
      valueType: "digit",
    },
    {
      title: "误差率",
      dataIndex: "error",
      hideInSearch: true,
      valueType: "percent",
      render: (_, entity) => {
        if (entity.oilLoaded !== 0 && entity.oilUnloaded !== 0) {
          return (((entity.oilLoaded - entity.oilUnloaded) / entity.oilLoaded) * 100).toFixed(2);
        } else {
          return 0;
        }
      }
    },
    {
      title: "工单状态",
      dataIndex: "status",
      valueEnum: {
        '待接单': {
          text: '待接单',
          status: 'Processing',
        },
        '待授权': {
          text: '待授权',
          status: 'Processing',
        },
        '待拉油': {
          text: '待拉油',
          status: 'Processing',
        },
        '待卸油': {
          text: '待卸油',
          status: 'Processing',
        },
        '待审批': {
          text: '待审批',
          status: 'Processing',
        },
        '已完成': {
          text: '已完成',
          status: 'Success',
        },
        '已作废': {
          text: '已作废',
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => {
        let btnIsDisabledEdit = (entity.status !== '待接单' && entity.status !== '待授权');
        let btnIsDisabledDel = (entity.status !== '待接单' && entity.status !== '待授权' && entity.status !== "已作废");
        let btnIsDisabledVoid = (entity.status === "已作废" || entity.status === "已完成");
        let btnIsDisabledOper = (entity.status === "已作废" || entity.status === "已完成");
        return (
          <>
            <Button type="link" size="small" disabled={btnIsDisabledEdit}
              onClick={() => {
                handleUpdateModalVisible(true);
                setFormValues(entity);
                setModelTitle("修改");
              }}>
              修改
            </Button>

            <Divider type="vertical" />

            <Button type="link" size="small" disabled={btnIsDisabledDel}
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
            </Button>

            <Divider type="vertical" />

            <Button type="link" size="small" disabled={btnIsDisabledVoid}
              onClick={() => {
                // 作废
                confirm({
                  title: '确认作废?',
                  icon: <ExclamationCircleOutlined />,
                  content: '',
                  onOk() {
                    var delRows = [];
                    delRows.push(entity);
                    handleToVoid(delRows);
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  },
                  onCancel() {
                  },
                });
              }}
            >
              作废
            </Button>

            <Divider type="vertical" />

            <Button type="link" size="small" disabled={btnIsDisabledOper}
              onClick={() => {
                let success = false;
                switch (entity.status) {
                  case "待接单":
                    handleReceiveModalVisible(true);
                    setFormValues(entity);
                    setModelTitle("接单");
                    break;
                  case "待授权":
                    confirm({
                      title: '确认授权?',
                      icon: <ExclamationCircleOutlined />,
                      content: '',
                      onOk() {
                        success = handleOper(entity);
                        if (success) {
                          if (actionRef.current) {
                            actionRef.current.reload();
                          }
                        }
                      },
                      onCancel() {
                      },
                    });
                    break;
                  case "待拉油":
                    handleLoadModalVisible(true);
                    setFormValues(entity);
                    setModelTitle("拉油");
                    break;
                  case "待卸油":
                    handleUnLoadModalVisible(true);
                    setFormValues(entity);
                    setModelTitle("卸油");
                    break;
                  case "待审批":
                    confirm({
                      title: '确认审批通过?',
                      icon: <ExclamationCircleOutlined />,
                      content: '',
                      onOk() {
                        success = handleOper(entity);
                        if (success) {
                          if (actionRef.current) {
                            actionRef.current.reload();
                          }
                        }
                      },
                      onCancel() {
                      },
                    });
                    break;
                  default:
                    break;
                }
              }}>
              办理
            </Button>

          </>
        )
      }
    },
  ];

  // 多选按钮选中的行数据
  const [selectedRowsState, setSelectedRows] = useState([]);

  // 新增、修改页面是否可见
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  // 新增、修改表单初始值
  const [formValues, setFormValues] = useState({});
  // 新增、修改页面的标题
  const [modelTitle, setModelTitle] = useState("");

  // 接单页面是否可见
  const [receiveModalVisible, handleReceiveModalVisible] = useState(false);
  // 拉油页面是否可见
  const [loadModalVisible, handleLoadModalVisible] = useState(false);
  // 卸油页面是否可见
  const [unloadModalVisible, handleUnLoadModalVisible] = useState(false);

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
        // 查询，列表数据请求
        request={(params, sorter, filter) => {
          let status = props.route.name !== "全部工单" ? props.route.name : '';
          return query({ ...params, status, sorter, filter })
        }}
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
          modalVisible={updateModalVisible}
          values={formValues}
        />
      ) : null}

      {/* 接单:需要先设置初始值，再展示页面，否则初始值设置不生效 */}
      {formValues && Object.keys(formValues).length && receiveModalVisible ? (
        <ReceiveForm
          title={modelTitle}
          onSubmit={async (value) => {
            const success = await handleOper(value);

            if (success) {
              handleReceiveModalVisible(false);
              setFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleReceiveModalVisible(false);
            setFormValues({});
          }}
          modalVisible={receiveModalVisible}
          values={formValues}
        />
      ) : null}

      {/* 拉油:需要先设置初始值，再展示页面，否则初始值设置不生效 */}
      {formValues && Object.keys(formValues).length && loadModalVisible ? (
        <LoadForm
          title={modelTitle}
          onSubmit={async (value) => {
            const success = await handleOper(value);

            if (success) {
              handleLoadModalVisible(false);
              setFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleLoadModalVisible(false);
            setFormValues({});
          }}
          modalVisible={loadModalVisible}
          values={formValues}
        />
      ) : null}

      {/* 卸油:需要先设置初始值，再展示页面，否则初始值设置不生效 */}
      {formValues && Object.keys(formValues).length && unloadModalVisible ? (
        <UnLoadForm
          title={modelTitle}
          onSubmit={async (value) => {
            const success = await handleOper(value);

            if (success) {
              handleUnLoadModalVisible(false);
              setFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUnLoadModalVisible(false);
            setFormValues({});
          }}
          modalVisible={unloadModalVisible}
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

