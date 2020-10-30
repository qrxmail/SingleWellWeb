import { connect } from 'umi';
import React, { useRef } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { routerRedux } from 'dva';
import Axios from "axios";
import { saveAs } from "file-saver";

import { query } from '../WorkTicket/service';

import '../Common.less';

const TableList = (props) => {

  const {
    currentUser,
    dispatch
  } = props;

  // 定义导出报表的查询参数
  let exportParams = {};

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
      title: "装油站",
      dataIndex: "loadStationName",
    },
    {
      title: "卸油站",
      dataIndex: "unloadStationName",
    },
    {
      title: "运输公司",
      dataIndex: "truckCompany",
      hideInSearch: true,
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
      title: "装油前空高",
      dataIndex: "levelBeginLoad",
      valueType: "digit",
      hideInSearch: true,
    },
    {
      title: "装油后空高",
      dataIndex: "levelAfterLoad",
      valueType: "digit",
      hideInSearch: true,
    },
    {
      title: "折算液量",
      dataIndex: "oilLoaded",
      valueType: "digit",
      hideInSearch: true,
    },
    {
      title: "放油时间",
      children: [
        {
          title: "开始时间",
          dataIndex: "loadingActualBeginTime",
          valueType: "dateTime",
          hideInSearch: true,
        },
        {
          title: "结束时间",
          dataIndex: "loadingActualEndTime",
          valueType: "dateTime",
          hideInSearch: true,
        },
      ],
    },
    {
      title: "放油液量",
      dataIndex: "oilLoaded",
      hideInSearch: true,
      valueType: "digit",
    },
    {
      title: "收油时间",
      children: [
        {
          title: "开始时间",
          dataIndex: "unloadingBeginTime",
          valueType: "dateTime",
          hideInSearch: true,
        },
        {
          title: "结束时间",
          dataIndex: "unloadingEndTime",
          valueType: "dateTime",
          hideInSearch: true,
        },
      ],
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
      title: "放油人",
      dataIndex: "oilLoader",
      hideInSearch: true,
    },
    {
      title: "收油人",
      dataIndex: "oilUnloader",
      hideInSearch: true,
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

  ];

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
        request={(params, sorter, filter) => {
          let oilUnloaded = 0;
          // 导出报表的查询参数赋值
          exportParams = { ...params, oilUnloaded, sorter, filter };
          return query({ ...params, oilUnloaded, sorter, filter })
        }}

        toolBarRender={() => [
          <Button key="export" type="primary" size='small'
            onClick={() => {
              exportParams.current = 1;
              exportParams.pageSize = 10000;
              console.log("ep:" + JSON.stringify(exportParams));
              let queryStr = JSON.stringify(exportParams);
              Axios.get('/api/workticket/exportReport?queryStr=' + queryStr, {
                headers: {
                  "content-type": "application/json"
                },
                responseType: "blob"
              }).then(res => {
                let blob = new Blob([res.data], {
                  type: "application/vnd.ms-excel"
                });
                saveAs(blob, "报表.xlsx");
              });

            }}>
            <UploadOutlined />
            导出
          </Button>
        ]}
      //scroll={{ x: 4000 }}
      />

    </PageContainer>
  );
};
// 利用connect拿到当前用户
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(TableList);

