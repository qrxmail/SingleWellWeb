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
    title: "区域类型",
    dataIndex: "areaType",
  },
  {
    title: "所在地区",
    dataIndex: "area",
  },
  {
    title: "设备名称",
    dataIndex: "name",
  },
  {
    title: "设备类别",
    dataIndex: "deviceType",
  },
  {
    title: "安装地点",
    dataIndex: "",
  },
  {
    title: "规格型号",
    dataIndex: "model",
  },
  {
    title: "设备能力",
    dataIndex: "capality",
  },
  {
    title: "进口球阀接口尺寸",
    dataIndex: "entranceValveSize",
  },
  {
    title: "出口球阀接口尺寸",
    dataIndex: "exitValveSize",
  },
  {
    title: "生产厂家",
    dataIndex: "supplier",
  },
  {
    title: "出厂时间",
    dataIndex: "productionDate",
    valueType: "date",
  },
  {
    title: "出厂编号",
    dataIndex: "productionSerialNumber",
  },
  {
    title: "重量",
    dataIndex: "weight",
  },
  {
    title: "外形尺寸",
    dataIndex: "diemension",
  },
  {
    title: "原值（万元）",
    dataIndex: "originalValue",
    valueType: "money",
  },
  {
    title: "进场时间",
    dataIndex: "arrivalDate",
    valueType: "date",
  },
  {
    title: "安装单位",
    dataIndex: "installByCompany",
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
    title: "通气时间",
    dataIndex: "ventDate",
    valueType: "date",
  },
  {
    title: "投用时间",
    dataIndex: "onlineDate",
    valueType: "date",
  },
  {
    title: "停用时间",
    dataIndex: "offLineDate",
    valueType: "date",
  },
  {
    title: "重新启用时间",
    dataIndex: "reOnLineDate",
    valueType: "date",
  },
  {
    title: "报废时间",
    dataIndex: "retireDate",
    valueType: "date",
  },
  {
    title: "设备来源",
    dataIndex: "source",
  },
  {
    title: "是否转入生产",
    dataIndex: "isProducingStr",
  },
  {
    title: "资料情况",
    dataIndex: "documentState",
  },
  {
    title: "是否通气",
    dataIndex: "isVentStr",
  },
  {
    title: "设备状态",
    dataIndex: "state",
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
        scroll={{ x: 4000 }}
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

