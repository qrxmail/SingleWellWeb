import React, { useState, useRef } from "react";
import { PlusOutlined, ExclamationCircleOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Drawer, Divider, Modal, message, Upload } from "antd";
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

import UpdateForm from './components/UpdateForm';
import { query, update, add, remove } from './service';
import '../../Common.less'

// 确认对话框
const { confirm } = Modal;

// 新增/修改
const handleUpdate = async (compressorEnricRecordId, fields) => {
  const hide = message.loading('正在保存');

  // 将null和空字符串的属性去掉
  Object.keys(fields).forEach((key) => {
    //let tkey = key as keyof typeof fields;
    if (fields[key] == null || fields[key] == '') {
      delete fields[key];
    }
  });

  try {

    fields.compressorEnricRecordId = compressorEnricRecordId;
    if (fields.isAdd) {
      delete fields.isAdd;
      await add(compressorEnricRecordId, fields);
    } else {
      delete fields.isAdd;
      await update(fields);
    }

    hide();

    message.success('保存成功');
    return true;
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

    selectedRows.forEach(async (dto) => {
      await remove(dto);
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
      title: "序号",
      valueType: "index",
      fixed: "left",
      width: 50,
    },
    {
      title: "时间",
      dataIndex: "date",
      valueType: "dateTime",
      fixed: "left",
      width: 150,
    },
    {
      title: "压力（MPa）",
      children: [
        {
          title: "进气压力",
          dataIndex: "intakePressure",
        },
        {
          title: "一级排气",
          dataIndex: "exhaustPressureOne",
        },
        {
          title: "二级排气",
          dataIndex: "exhaustPressureTwo",
        },
        {
          title: "三级排气",
          dataIndex: "exhaustPressureThree",
        },
        {
          title: "油压",
          dataIndex: "oilPressure",
        },
        {
          title: "水压",
          dataIndex: "waterPressure",
        },
        {
          title: "仪表风压力",
          dataIndex: "instrumentAirPressure",
        },
        {
          title: "回收罐压力",
          dataIndex: "recoveryTankPressure",
        },
      ],
    },
    {
      title: '温度（℃）',
      children: [
        {
          title: "一级排气",
          dataIndex: "exhaustTemperatureOne",
          children: [
          ]
        },
        {
          title: "二级排气",
          dataIndex: "exhaustTemperatureTwo",
        },
        {
          title: '三级排气',
          children: [
            {
              title: "一级",
              dataIndex: "exhaustTemperatureThreeOne",
            },
            {
              title: "二级",
              dataIndex: "exhaustTemperatureThreeTwo",
            },
          ]
        },

        {
          title: "油温",
          dataIndex: "oilTemperature",
        },
      ]
    },
    {
      title: "运行情况",
      dataIndex: "runState",
    },
    {
      title: "主电机电压",
      dataIndex: "mainMotorVoltage",
    },
    {
      title: "主电机电流",
      dataIndex: "mainMotorCurrent",
    },
    {
      title: '储气井（MPa）',
      children: [
        {
          title: "高压井（MPa）",
          dataIndex: "highPressureWell",
        },
        {
          title: "中压井1（MPa）",
          dataIndex: "middlePressureWellOne",
        },
        {
          title: "中压井2（MPa）",
          dataIndex: "middlePressureWellTwo",
        },
        {
          title: "低压井（MPa）",
          dataIndex: "lowPressureWell",
        },
      ]
    },
    {
      title: "运行时间",
      dataIndex: "upTime",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: "right",
      width: 100,
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
  const [headerId, setHeaderId] = useState(props.headerId);
  // 定义页面属性
  // const {
  //   boilerRecordHeaderId:string
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
    action: 'https://localhost:44332/api/app/basicDeviceDto/uploadFiles',
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
        bordered

        // 查询，列表数据请求
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        // request={async (params, sort, filter) => {
        //   console.log("headerId:" + headerId);
        //   let result = await DeviceOperationRecordService.getAll({ ...params, sort, filter });
        //   return result;
        // }}
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
          </Button>,

          // <Upload {...uploadProps}>
          //   <Button key="import" type="primary" size='small'>
          //     <DownloadOutlined /> 导入
          //   </Button>
          // </Upload>,
          // <Button key="export" type="primary" size='small' onClick={() => { window.location.href = "/text.xlsx" }}>
          //   <UploadOutlined />导出
          // </Button>,

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
        scroll={{ x: 2000 }}
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
        {row?.mainDeviceId && (
          <ProDescriptions
            column={2}
            title={row?.mainDeviceId}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.mainDeviceId,
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
            const success = await handleUpdate(headerId, value);

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

