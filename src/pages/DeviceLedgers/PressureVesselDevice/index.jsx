import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { query } from '../../OperRecord/CompressorJerryRecordHeader/service';
import '../../Common.less'

// 列表的列属性
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    hideInForm: true,
    hideInSearch: true,
    hideInTable: true,
    hideInDescriptions:true,
    fixed: "left",
    width: 80,
  },
  {
    title: "管理编号",
    dataIndex: "internalSerialNumber",
    fixed: "left",
    width: 150,
  },
  {
    title: "所属分公司",
    dataIndex: "branch",
  },
  {
    title: "所在区域",
    dataIndex: "area",
  },
  {
    title: "使用地点",
    dataIndex: "location",
  },
  {
    title: "所属设备",
    dataIndex: "mainDeviceId",
  },
  {
    title: "压力容器名称",
    dataIndex: "name",
  },
  {
    title: "安装部位",
    dataIndex: "installPosotion",
  },
  {
    title: "规格型号",
    dataIndex: "model",
  },
  {
    title: "容积",
    dataIndex: "volume",
  },
  {
    title: "设计压力",
    dataIndex: "designPressure",
  },
  {
    title: "实际工作压力",
    dataIndex: "actualPressure",
  },
  {
    title: "压力容器类别",
    dataIndex: "deviceType",
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
    title: "数量",
    dataIndex: "",
  },
  {
    title: "单位",
    dataIndex: "",
  },
  {
    title: "使用登记证编号",
    dataIndex: "useRegistNo",
  },
  {
    title: "安全等级",
    dataIndex: "safetyLevel",
  },
  {
    title: "发证单位",
    dataIndex: "licenseCompany",
  },
  {
    title: "出厂时间",
    dataIndex: "productionDate",
    valueType: "date",
  },
  {
    title: "进场时间",
    dataIndex: "arrivalDate",
    valueType: "date",
  },
  {
    title: "安装告知时间",
    dataIndex: "installInformDate",
    valueType: "date",
  },
  {
    title: "安装调试结束时间",
    dataIndex: "commissionDate",
    valueType: "date",
  },
  {
    title: "中间验交时间",
    dataIndex: "interAcceptenceDate",
    valueType: "date",
  },
  {
    title: "监督检验时间",
    dataIndex: "supervisionInspectionDate",
    valueType: "date",
  },
  {
    title: "试运行时间",
    dataIndex: "testRunDate",
    valueType: "date",
  },
  {
    title: "竣工验收",
    dataIndex: "completedDate",
    valueType: "date",
  },
  {
    title: "投用时间",
    dataIndex: "onlineDate",
    valueType: "date",
  },
  {
    title: "注册登记时间",
    dataIndex: "resgisterDate",
    valueType: "date",
  },
  {
    title: "最近一次全面检验时间",
    dataIndex: "lastInspectionDate",
    valueType: "date",
  },
  {
    title: "下次检验时间",
    dataIndex: "nextInspectionDate",
    valueType: "date",
  },
  {
    title: "停用时间",
    dataIndex: "offLineDate",
    valueType: "date",
  },
  {
    title: "注销时间",
    dataIndex: "cancellatinoResgisterDate",
    valueType: "date",
  },
  {
    title: "报废时间",
    dataIndex: "retireDate",
    valueType: "date",
  },
  {
    title: "中间验交时间",
    dataIndex: "interAcceptenceDate",
    valueType: "date",
  },
  {
    title: "监督检验时间",
    dataIndex: "supervisionInspectionDate",
    valueType: "date",
  },
  {
    title: "试运行时间",
    dataIndex: "testRunDate",
    valueType: "date",
  },
  {
    title: "竣工验收",
    dataIndex: "completedDate",
    valueType: "date",
  },
  {
    title: "投用时间",
    dataIndex: "onlineDate",
    valueType: "date",
  },
  {
    title: "注册登记时间",
    dataIndex: "resgisterDate",
    valueType: "date",
  },
  {
    title: "下次检验日期",
    dataIndex: "nextInspectionDate",
    valueType: "date",
  },
  {
    title: "停用时间",
    dataIndex: "offLineDate",
    valueType: "date",
  },
  {
    title: "注销时间",
    dataIndex: "cancellatinoResgisterDate",
    valueType: "date",
  },
  {
    title: "报废时间",
    dataIndex: "retireDate",
    valueType: "date",
  },
  {
    title: "是否超期",
    dataIndex: "isExprire",
  },
  {
    title: "设备状态",
    dataIndex: "",
  },
  {
    title: "资料情况",
    dataIndex: "documentState",
  },
  {
    title: "手续办理情况",
    dataIndex: "procedureStatus",
  },
  {
    title: "是否属于关键装置、重点部位",
    dataIndex: "isKeyPart",
  },
  {
    title: "责任人",
    dataIndex: "resonsibleStaff",
  },
  {
    title: "其他情况",
    dataIndex: "",
  },
  {
    title: "备注",
    dataIndex: "remark",
  },
];

export default () => {

  // 详情页面传入的参数（选择的行数据）
  const [row, setRow] = useState();

  const actionRef = useRef();

  // 点击设备名称：打开详情页面
  columns[5].render = (dom, entity) => {
    return <a onClick={() => setRow(entity)}>{dom}</a>;
  };

  // 绘制列表页面
  return (
    <PageContainer>

      {/* 列表 */}
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        rowKey="id"
        dateFormatter="string"
        headerTitle="查询结果"
        size="small"
        // 设置查询表单的size
        form={{
          size: 'small',
        }}
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => {window.location.href="/text.xlsx"}}>
            <PlusOutlined />
            导出
          </Button>,
        ]}
        scroll={{ x: 6000 }}
      />

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

    </PageContainer>
  );
};

