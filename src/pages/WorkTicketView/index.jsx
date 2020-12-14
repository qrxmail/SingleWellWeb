import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Steps, Card, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import QRCode from "qrcode.react";
import PrintJS from "print-js";
import { setTime } from '../common';

import { queryObj, getQRCode } from "../WorkTicket/service";

import '../Common.less';

// 表单项
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;

const handlePrint = () => {
    PrintJS({
        printable: "ticketDetail",
        type: "html",
        targetStyles: "[*]",
        documentTitle: "workticket"
    });
}

// 组件定义
const ViewForm = (props) => {

    const {
        // 从路由中获取参数query
        location: { query }
    } = props;

    const [formValues, setFormValues] = useState({});
    // 根据主键pk查询数据
    useEffect(() => {
        let params = { "pk": query.pk };
        let sorter = {};
        let filter = {};
        queryObj({ ...params, sorter, filter }).then((result) => {
            setFormValues(result.data[0]);
        });
    }, [query.pk]);

    const [qrcode, setQRCode] = useState("");
    // 根据主键pk获取工单二维码
    useEffect(() => {
        getQRCode(query.pk).then((result) => {
            setQRCode(result);
        });
    }, [query.pk]);

    // 工单流程步骤
    const WorkFlowSteps = [
        { title: "创建工单", description: "创建工单：选择装油站、卸油站、设定拉油时间、可发油量。" },
        // { title: "接单", description: "分派车辆和司机。" },
        // { title: "授权", description: "核对拉油车辆和司机，授权拉油。" },
        { title: "拉油", description: "给拉油车辆发油，填写发油时间、发油量。" },
        { title: "卸油", description: "收油站收油，填写卸油时间、收油量、核对铅封号。" },
        { title: "审批", description: "管理区审批。" },
        { title: "已完成", description: "拉油完成，流程结束。" }];

    // 获取当前步骤索引
    const GetCurrentIndex = () => {
        let num = 0;
        WorkFlowSteps.forEach((item, index) => {
            if (formValues.status !== undefined && formValues.status.indexOf(item.title) >= 0) {
                num = index;
            }
        });
        return num;
    }

    // 表单内容
    const renderContent = () => {

        console.log("formValues" + JSON.stringify(formValues));
        console.log("qrcode" + qrcode);

        // 拉油时间
        let loadtimeRange = (setTime(formValues.loadingBeginTime) !== null && setTime(formValues.loadingEndTime) !== null) ?
            formValues.loadingBeginTime + "~" + formValues.loadingEndTime : "";
        // 实际拉油时间，即装油时间
        let unLoadtimeRange = (setTime(formValues.unloadingBeginTime) !== null && setTime(formValues.unloadingEndTime) !== null) ?
            formValues.unloadingBeginTime + "~" + formValues.unloadingEndTime : "";
        // 卸油时间
        let loadActualTimeRange = (setTime(formValues.loadingActualBeginTime) !== null && setTime(formValues.loadingActualEndTime) !== null) ?
            formValues.loadingActualBeginTime + "~" + formValues.loadingActualEndTime : "";

        // 生成步骤元素
        let element = [];
        WorkFlowSteps.forEach((step, index) => {
            element.push(<Step key={index} title={step.title} description={step.description} />)
        })

        return (
            <>
                <Card title="当前进度" bordered >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Steps direction="horizontal" size="small" current={GetCurrentIndex()} status="process" >
                                {element}
                            </Steps>
                        </Col>
                    </Row>
                </Card>
                <Card title="处理步骤" bordered >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <TextArea rows={6} placeholder={formValues.description} disabled bordered={false} />
                        </Col>
                    </Row>
                </Card>
                <Card title="工单详情" bordered >
                    <div style={{ textAlign: "right" }}>
                        <Button key="print" size='small' type="primary" style={{ marginRight: 8 }} onClick={() => handlePrint()}>
                            打印
                        </Button>
                    </div>
                    <Row id="ticketDetail" >
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="工单编号"
                            >
                                {formValues.serialNumber}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="装油站"
                            >
                                {formValues.loadStationName}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="油罐"
                            >
                                {formValues.oilPot}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="拉油时间"
                            >
                                {loadtimeRange}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="卸油站"
                            >
                                {formValues.unloadStationName}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="车牌号"
                            >
                                {formValues.carNumber}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="司机"
                            >
                                {formValues.driver}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="司机联系电话"
                            >
                                {formValues.driverPhone}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="发油时间"
                            >
                                {loadActualTimeRange}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="发油量"
                            >
                                {formValues.oilLoaded}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="发油人"
                            >
                                {formValues.oilLoader}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="卸油时间"
                            >
                                {unLoadtimeRange}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="卸油量"
                            >
                                {formValues.oilUnloaded}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="铅封号"
                            >
                                {formValues.subSerialNumber}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="卸油人"
                            >
                                {formValues.oilUnloader}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="备注"
                            >
                                {formValues.remark}
                            </FormItem>
                        </Col>

                        <div style={{ padding: 20, textAlign: "center", width: "100%" }}>
                            <QRCode value={qrcode} style={{ display: "inline-block" }} />
                        </div>
                    </Row>

                </Card>

            </>
        );
    };

    return (
        <PageContainer>
            <Form
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                size='small'
            >
                {renderContent()}
            </Form>
        </PageContainer>
    );
};

export default ViewForm;
