import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Drawer, Button, Row, Col } from 'antd';
import { drawWidth } from '../../common';
import { isOrNotDic } from '../../dic.config';

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;

// 组件定义
const SetParamsForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        delayToTurnOffPump: props.values.delayToTurnOffPump,
        levelStopPumpEnable: props.values.levelStopPumpEnable,
        maxDurationPerTask: props.values.maxDurationPerTask,
        levelReadyForWork: props.values.levelReadyForWork,
        levelStopPump: props.values.levelStopPump,
        pumpFloatRate: props.values.pumpFloatRate,
        areaPerMM: props.values.areaPerMM,
        valveOpTimeOut: props.values.valveOpTimeOut,
    });

    // 设置按钮加载状态（提交未执行完时，不能点击）
    const [loading, setLoading] = useState(false);

    // 获取表单
    const [form] = Form.useForm();

    // 组件属性定义：要想使用组件，就要为组件属性传值，实现值和方法的传递
    const {
        onSubmit: handleSetParams,
        onCancel: handleSetParamsModalVisible,
        setParamsModalVisible,
        title,
    } = props;

    // 提交事件
    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();

        setLoading(true);

        setFormVals({ ...formVals, ...fieldsValue });
        await handleSetParams({ ...formVals, ...fieldsValue });

        setLoading(false);
    };

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="delayToTurnOffPump"
                            label="延时关装车泵时间（秒）"
                        //rules={[{ required: true, message: '请输入延时关装车泵时间！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="levelStopPumpEnable"
                            label="是否启用自动停泵"
                        //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {isOrNotDic.map(name => (
                                    <Select.Option key={name} value={name}>{name}</Select.Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="maxDurationPerTask"
                            label="单次拉油最大时长（分钟）"
                        //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="levelReadyForWork"
                            label="开工单提醒值"
                        //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="levelStopPump"
                            label="停泵液位"
                        //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="pumpFloatRate"
                            label="泵流速"
                        //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="areaPerMM"
                            label="罐单位面积（平方米）"
                        //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="valveOpTimeOut"
                            label="阀动作超时时间（秒）"
                        //rules={[{ required: true, message: '请输入司机！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <Drawer
            width={drawWidth(600)}
            bodyStyle={{ padding: 0 }}
            destroyOnClose
            title={title}
            visible={setParamsModalVisible}
            onClose={() => handleSetParamsModalVisible()}
            footer={
                <div style={{ textAlign: 'right', }}>
                    <Button key="submit" size='small' type="primary" loading={loading} style={{ marginRight: 8 }} onClick={() => handleSubmit()}>
                        提交
                    </Button>
                    <Button key="cancel" size='small' type="default" onClick={() => handleSetParamsModalVisible()}>
                        取消
                    </Button>
                </div>
            }
        >
            <Form
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                form={form}
                size='small'
                initialValues={{
                    delayToTurnOffPump: formVals.delayToTurnOffPump,
                    levelStopPumpEnable: formVals.levelStopPumpEnable,
                    maxDurationPerTask: formVals.maxDurationPerTask,
                    levelReadyForWork: formVals.levelReadyForWork,
                    levelStopPump: formVals.levelStopPump,
                    pumpFloatRate: formVals.pumpFloatRate,
                    areaPerMM: formVals.areaPerMM,
                    valveOpTimeOut: formVals.valveOpTimeOut,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default SetParamsForm;
