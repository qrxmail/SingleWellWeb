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
        upTime: props.values.upTime,
        heatingTime: props.values.heatingTime,
        adsorbent: props.values.adsorbent,
        regenerate: props.values.regenerate,
        heaterOutlet: props.values.heaterOutlet,
        coolerOutlet: props.values.coolerOutlet,
        regeneratorOutlet: props.values.regeneratorOutlet,
        auxiliaryHeaterSurface: props.values.auxiliaryHeaterSurface,
        mainHeaterSurface: props.values.mainHeaterSurface,
        current: props.values.current,
        dewPoint: props.values.dewPoint,
        pressureOfDewPointBufferTank: props.values.pressureOfDewPointBufferTank,
        bufferTankTemperature: props.values.bufferTankTemperature,
        blowdown: props.values.blowdown,
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
                            name="upTime"
                            label="运行时间"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="heatingTime"
                            label="加热时间"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                    A塔／B塔
                    </Divider>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="adsorbent"
                            label="吸附"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="regenerate"
                            label="再生"
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
                            name="heaterOutlet"
                            label="加热器出口"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="coolerOutlet"
                            label="冷却器出口"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="regeneratorOutlet"
                            label="再生器出口"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="auxiliaryHeaterSurface"
                            label="辅加热器表面"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="mainHeaterSurface"
                            label="主加热器表面"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="current"
                            label="电流(A)"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="dewPoint"
                            label="露点（℃）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="pressureOfDewPointBufferTank"
                            label="缓冲罐压力（MPa）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="bufferTankTemperature"
                            label="缓冲罐温度（℃）"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="blowdown"
                            label="排污"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
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
                    upTime: formVals.upTime,
                    heatingTime: formVals.heatingTime,
                    adsorbent: formVals.adsorbent,
                    regenerate: formVals.regenerate,
                    heaterOutlet: formVals.heaterOutlet,
                    coolerOutlet: formVals.coolerOutlet,
                    regeneratorOutlet: formVals.regeneratorOutlet,
                    auxiliaryHeaterSurface: formVals.auxiliaryHeaterSurface,
                    mainHeaterSurface: formVals.mainHeaterSurface,
                    current: formVals.current,
                    dewPoint: formVals.dewPoint,
                    pressureOfDewPointBufferTank: formVals.pressureOfDewPointBufferTank,
                    bufferTankTemperature: formVals.bufferTankTemperature,
                    blowdown: formVals.blowdown,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
