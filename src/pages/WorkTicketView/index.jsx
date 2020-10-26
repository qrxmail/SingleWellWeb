import React from 'react';
import { Form, Input, Steps, Card, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';

import '../Common.less';

// 表单项
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;

// 组件定义
const UpdateForm = (props) => {

    const {
        location: { query }
    } = props;

    // 将时间格式化为moment或者null
    const setTime = (timeStr) => {
        return (timeStr === '0001-01-01T00:00:00' || timeStr === undefined || timeStr === null) ? null : moment(timeStr, 'YYYY年MM月DD日 HH:mm:ss')
    }

    // 获取流程步骤索引
    const GetStepIndex = (status) => {
        let index = 0;
        switch (status) {
            case "待接单":
                index = 1;
                break;
            case "待授权":
                index = 2;
                break;
            case "待拉油":
                index = 3;
                break;
            case "待卸油":
                index = 4;
                break;
            case "待审批":
                index = 5;
                break;
            case "已完成":
                index = 6;
                break;
            default:
                break;
        }
        return index;
    }

    // 表单内容
    const renderContent = () => {
        let currentStepIndex = GetStepIndex(query.status);
        let loadtimeRange = (setTime(query.loadingBeginTime) !== null && setTime(query.loadingEndTime) !== null) ?
            query.loadingBeginTime + "~" + query.loadingEndTime : "";
        let unLoadtimeRange = (setTime(query.unloadingBeginTime) !== null && setTime(query.unloadingEndTime) !== null) ?
            query.unloadingBeginTime + "~" + query.unloadingEndTime : "";
        let loadActualTimeRange = (setTime(query.loadingActualBeginTime) !== null && setTime(query.loadingActualEndTime) !== null) ?
            query.loadingActualBeginTime + "~" + query.loadingActualEndTime : "";

        return (
            <>
                <Card title="当前进度" bordered >

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Steps direction="horizontal" size="small" current={currentStepIndex} status="process" >
                                <Step title='创建工单' subTitle={moment(query.createTime).format('YYYY-MM-DD hh:mm:ss')} description={query.createUser + '：创建工单。'} />
                                <Step title='接单' description='分派车辆和司机。' />
                                <Step title='授权' description='授权工单。' />
                                <Step title='拉油' description='装油站，给车辆装油。' />
                                <Step title='卸油' description='收油站收油，车辆卸油。' />
                                <Step title='审批' description='管理区审批。' />
                                <Step title='已完成' description='拉油完成，流程结束。' />
                            </Steps>
                        </Col>

                    </Row>
                </Card>
                <Card title="处理步骤" bordered >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <TextArea rows={8} placeholder={query.description} disabled bordered={false} />
                        </Col>
                    </Row>
                </Card>
                <Card title="工单详情" bordered >
                    <Row>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="工单编号"
                            >
                                {query.serialNumber}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="装油站"
                            >
                                {query.loadStationName}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="装油时间"
                            >
                                {loadtimeRange}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="卸油站"
                            >
                                {query.unloadStationName}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="车牌号"
                            >
                                {query.truckNo}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="司机"
                            >
                                {query.drvierName}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="发油时间"
                            >
                                {loadActualTimeRange}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="发油量"
                            >
                                {query.oilLoaded}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="发油人"
                            >
                                {query.oilLoader}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="卸油时间"
                            >
                                {unLoadtimeRange}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="卸油量"
                            >
                                {query.oilUnloaded}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="铅封号"
                            >
                                {query.subSerialNumber}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="卸油人"
                            >
                                {query.oilUnloader}
                            </FormItem>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormItem
                                label="备注"
                            >
                                {query.remark}
                            </FormItem>
                        </Col>
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

export default UpdateForm;
