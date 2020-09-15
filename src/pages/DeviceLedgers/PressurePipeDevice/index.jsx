import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { query } from '../../OperRecord/CompressorJerryRecordHeader/service';
import '../../Common.less'

export default () => {

  // 列表的列属性
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
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
      title: "管道名称",
      dataIndex: "name",
      // 点击名称：打开详情页面
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
      ellipsis: true,
    },
    {
      title: "管道规格",
      dataIndex: "model",
    },
    {
      title: "管道类型",
      dataIndex: "deviceType",
    },
    {
      title: "管道材质",
      dataIndex: "material",
    },
    {
      title: "管道级别",
      dataIndex: "pipeLevel",
    },
    {
      title: "公称直径",
      dataIndex: "diameter",
    },
    {
      title: "公称壁厚",
      dataIndex: "thickness",
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
      title: "制造单位",
      dataIndex: "supplier",
    },
    {
      title: "安装单位",
      dataIndex: "installByCompany",
      ellipsis: true,
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
      title: "敷设方式",
      dataIndex: "installType",
    },
    {
      title: "管道起点",
      dataIndex: "pipeStart",
      ellipsis: true,
    },
    {
      title: "起点坐标X值",
      dataIndex: "pipeStartX",
    },
    {
      title: "起点坐标Y值",
      dataIndex: "pipeStartY",
    },
    {
      title: "起点高程",
      dataIndex: "pipeStartElevation",
    },
    {
      title: "管道止点",
      dataIndex: "pipeEnd",
      ellipsis: true,
    },
    {
      title: "止点坐标X值",
      dataIndex: "pipeEndX",
    },
    {
      title: "止点坐标Y值",
      dataIndex: "pipeEndY",
    },
    {
      title: "止点高程",
      dataIndex: "pipeEndElevation",
    },
    {
      title: "累计长度（米）",
      dataIndex: "length",
    },
    {
      title: "安全状况",
      dataIndex: "safetyStatus",
    },
    {
      title: "使用证编号",
      dataIndex: "useRegistNo",
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
      title: "安装结束时间",
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
      title: "发证时间",
      dataIndex: "issuingDate",
      valueType: "date",
    },
    {
      title: "下次检验日期",
      dataIndex: "nextInspectionDate",
      valueType: "date",
    },
    {
      title: "当地市场监管局报备完成时间",
      dataIndex: "localGovReportCompleteDate",
      valueType: "date",
    },
    {
      title: "省燃气中心验收时间",
      dataIndex: "proviceGovAcceptenceDate",
      valueType: "date",
    },
    {
      title: "停用时间",
      dataIndex: "offLineDate",
      valueType: "date",
    },
    {
      title: "再次启用时间",
      dataIndex: "reOnLineDate",
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
      title: "是否属于关键装置、重点部位",
      dataIndex: "isKeyPart",
    },
    {
      title: "是否超期",
      dataIndex: "isExprire",
    },
    {
      title: "是否通气",
      dataIndex: "isVent",
    },
    {
      title: "是否完好",
      dataIndex: "isGood",
    },
    {
      title: "管道状态",
      dataIndex: "state",
    },
    {
      title: "责任人",
      dataIndex: "resonsibleStaff",
    },
    {
      title: "备注",
      dataIndex: "remark",
      hideInSearch: true,
      hideInTable: true,
    },
  ];

  // 详情页面传入的参数（选择的行数据）
  const [row, setRow] = useState();

  const actionRef = useRef();

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
          <Button key="3" type="primary" onClick={() => { window.location.href = "/text.xlsx" }}>
            <PlusOutlined />
            导出
          </Button>,
        ]}
        scroll={{ x: 7500 }}
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

