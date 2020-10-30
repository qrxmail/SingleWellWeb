import React, { useState, useEffect } from 'react';
import { Divider, Card, Tooltip, Progress, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Column, Pie } from '@ant-design/charts';

import { queryObj, getQRCode } from "../WorkTicket/service";

import '../Common.less';

// 组件定义
const ChartsForm = (props) => {

    // 柱状图数据
    const columnData = [
        {
            type: '星期一',
            sales: 38,
        },
        {
            type: '星期二',
            sales: 52,
        },
        {
            type: '星期三',
            sales: 61,
        },
        {
            type: '星期四',
            sales: 145,
        },
        {
            type: '星期五',
            sales: 48,
        },
        {
            type: '星期六',
            sales: 38,
        },
        {
            type: '星期日',
            sales: 38,
        }
    ];
    // 柱状图配置
    const columnConfig = {
        data: columnData,
        xField: 'type',
        yField: 'sales',
        meta: {
            type: {
                alias: '日期',
            },
            sales: {
                alias: '产量',
            },
        },
        annotations: [
            {
                type: 'region',
                start: xScale => {
                    const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
                    const x = xScale.scale('星期四') - ratio / 2;
                    return [`${x * 100}%`, '0%'];
                },
                end: xScale => {
                    const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
                    const x = xScale.scale('星期四') + ratio / 2;
                    return [`${x * 100}%`, '100%'];
                },
                style: {
                    fill: 'rgb(255,0,0)',
                },
            },
            {
                type: 'text',
                position: ['星期四', 'max'],
                content: '最大产量',
                style: {
                    textAlign: 'center',
                    textBaseline: 'top',
                },
            },
        ],
    }

    
    // 饼图数据
    const pieData = [ 
        {
            type: '天93',
            value: 27,
        },
        {
            type: '天94',
            value: 25,
        },
        {
            type: '天95',
            value: 18,
        },
        {
            type: '天96',
            value: 15,
        },
        {
            type: '天97',
            value: 10,
        },
        {
            type: '天98',
            value: 5,
        },
    ];
    // 饼图配置
    const pieConfig = {
        appendPadding: 10,
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
        ],
    };

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row gutter={8} >
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginBottom: 8 }}>
                        <Card title="总产量m³" bordered >
                            <Row>
                                <Col span={24}>
                                    <p style={{ display: "inline-block", fontWeight: "bolder", fontSize: 30 }}>1200</p>
                                </Col>
                                <Col span={12}>周同比：+10%</Col>
                                <Col span={12}>日同比：+10%</Col>
                            </Row>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                            <Row>
                                <Col span={24}>日产量：10</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginBottom: 8 }}>
                        <Card title="总工单" bordered >
                            <Row>
                                <Col span={24}>
                                    <p style={{ display: "inline-block", fontWeight: "bolder", fontSize: 30 }}>1200</p>
                                </Col>
                                <Col span={12}>周同比：+10%</Col>
                                <Col span={12}>日同比：+10%</Col>
                            </Row>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                            <Row>
                                <Col span={24}>日工单：10</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginBottom: 8 }}>
                        <Card title="目标完成" bordered >
                            <Row>
                                <Col span={24}>
                                    <p style={{ display: "inline-block", fontWeight: "bolder", fontSize: 30 }}>1200</p>
                                </Col>
                                <Col span={24}>
                                    <Tooltip title="3 done / 3 in progress / 4 to do">
                                        <Progress percent={60} successPercent={30} />
                                    </Tooltip>
                                </Col>
                            </Row>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                            <Row>
                                <Col span={12}>周同比：+10%</Col>
                                <Col span={12}>日同比：+10%</Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 8 }}>
                        <Card title="一周产量趋势" bordered>
                            <div style={{ padding: 20 }}>
                                <Column {...columnConfig} height={300} />
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 8 }}>
                        <Card title="油井产量排行" bordered >
                            <div style={{ padding: 20 }}>
                                <Pie {...pieConfig} height={300} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <PageContainer>
            {renderContent()}
        </PageContainer>
    );
};

export default ChartsForm;
