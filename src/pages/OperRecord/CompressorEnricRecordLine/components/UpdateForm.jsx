import React, { useState } from 'react';
import { Form, Input, Select, Drawer, Button, Row, Col, InputNumber, DatePicker, Divider } from 'antd';
import moment from 'moment';

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

// 组件定义
const UpdateForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.id == undefined ? true : false,
        id: props.values.id == undefined ? '' : props.values.id,
        index: props.values.index,
        time: props.values.time,
        intakePressure: props.values.intakePressure,
        exhaustPressureOne: props.values.exhaustPressureOne,
        exhaustPressureTwo: props.values.exhaustPressureTwo,
        exhaustPressureThree: props.values.exhaustPressureThree,
        oilPressure: props.values.oilPressure,
        waterPressure: props.values.waterPressure,
        instrumentAirPressure: props.values.instrumentAirPressure,
        recoveryTankPressure: props.values.recoveryTankPressure,
        exhaustTemperatureOne: props.values.exhaustTemperatureOne,
        exhaustTemperatureTwo: props.values.exhaustTemperatureTwo,
        exhaustTemperatureThreeOne: props.values.exhaustTemperatureThreeOne,
        exhaustTemperatureThreeTwo: props.values.exhaustTemperatureThreeTwo,
        oilTemperature: props.values.oilTemperature,
        runState: props.values.runState,
        mainMotorVoltage: props.values.mainMotorVoltage,
        mainMotorElectricCurrent: props.values.mainMotorElectricCurrent,
        highPressureWell: props.values.highPressureWell,
        middlePressureWellOne: props.values.middlePressureWellOne,
        middlePressureWellTwo: props.values.middlePressureWellTwo,
        lowPressureWell: props.values.lowPressureWell,
        upTime: props.values.upTime,
        remark: props.values.remark,
    });

    // 设置按钮加载状态（提交未执行完时，不能点击）
    const [loading, setLoading] = useState(false);

    // 获取表单
    const [form] = Form.useForm();

    // 组件属性定义：要想使用组件，就要为组件属性传值，实现值和方法的传递
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
        title,
    } = props;

    // 提交事件
    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();

        setLoading(true);

        setFormVals({ ...formVals, ...fieldsValue });
        await handleUpdate({ ...formVals, ...fieldsValue });

        setLoading(false);
    };

    // 将时间格式化为moment或者null
    const setTime = (timeStr) => {
        return (timeStr == '0001-01-01T00:00:00' || timeStr == undefined || timeStr == null) ? null : moment(timeStr, 'YYYY年MM月DD日 HH:mm:ss')
    }

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row>
                    {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="index"
                            label="序号"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col> */}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="time"
                            label="时间"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日 HH:mm:ss" placeholder="选择时间" showTime />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                    压力（MPa）
                    </Divider>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="intakePressure"
                            label="进气压力"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustPressureOne"
                            label="一级排气"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustPressureOne"
                            label="一级排气"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustPressureTwo"
                            label="二级排气"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustPressureThree"
                            label="三级排气"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="oilPressure"
                            label="油压"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                    温度（℃）
                    </Divider>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustTemperatureOne"
                            label="一级排气"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustTemperatureTwo"
                            label="二级排气"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustTemperatureThreeOne"
                            label="三级排气（一级）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="exhaustTemperatureThreeTwo"
                            label="三级排气（二级）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="oilTemperature"
                            label="油温"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="runState"
                            label="运行情况"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="mainMotorVoltage"
                            label="主电机电压（V）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="mainMotorElectricCurrent"
                            label="主电机电流（A）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                    储气井（MPa）
                    </Divider>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="highPressureWell"
                            label="高压井"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="middlePressureWell"
                            label="中压井"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="lowPressureWellOne"
                            label="低压井1"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="lowPressureWellTwo"
                            label="低压井2"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="upTime"
                            label="运行时间"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="combustibleGasConcentration"
                            label="可燃气体浓度（%LEL）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="remark"
                            label="备注"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <Drawer
            width={600}
            bodyStyle={{ padding: 0 }}
            destroyOnClose
            title={title}
            visible={updateModalVisible}
            onClose={() => handleUpdateModalVisible()}
            footer={
                <div style={{ textAlign: 'right', }}>
                    <Button key="submit" size='small' type="primary" loading={loading} style={{ marginRight: 8 }} onClick={() => handleSubmit()}>
                        提交
                    </Button>
                    <Button key="cancel" size='small' type="default" onClick={() => handleUpdateModalVisible()}>
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
                    id: formVals.id,
                    index: formVals.index,
                    time: setTime(formVals.time),
                    intakePressure: formVals.intakePressure,
                    exhaustPressureOne: formVals.exhaustPressureOne,
                    exhaustPressureTwo: formVals.exhaustPressureTwo,
                    exhaustPressureThree: formVals.exhaustPressureThree,
                    oilPressure: formVals.oilPressure,
                    waterPressure: formVals.waterPressure,
                    instrumentAirPressure: formVals.instrumentAirPressure,
                    recoveryTankPressure: formVals.recoveryTankPressure,
                    exhaustTemperatureOne: formVals.exhaustTemperatureOne,
                    exhaustTemperatureTwo: formVals.exhaustTemperatureTwo,
                    exhaustTemperatureThreeOne: formVals.exhaustTemperatureThreeOne,
                    exhaustTemperatureThreeTwo: formVals.exhaustTemperatureThreeTwo,
                    oilTemperature: formVals.oilTemperature,
                    runState: formVals.runState,
                    mainMotorVoltage: formVals.mainMotorVoltage,
                    mainMotorElectricCurrent: formVals.mainMotorElectricCurrent,
                    highPressureWell: formVals.highPressureWell,
                    middlePressureWellOne: formVals.middlePressureWellOne,
                    middlePressureWellTwo: formVals.middlePressureWellTwo,
                    lowPressureWell: formVals.lowPressureWell,
                    upTime: formVals.upTime,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
