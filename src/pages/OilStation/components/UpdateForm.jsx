import React, { useState } from 'react';
import { Form, Input, InputNumber, Drawer, Button, Select, Divider, Row, Col } from 'antd';

import { factoryDic } from '../../dic.config';

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;

// 组件定义
const UpdateForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.pk == undefined ? true : false,
        pk: props.values.pk == undefined ? '' : props.values.pk,
        branch: props.values.branch,
        name: props.values.name,
        district: props.values.district,
        plcip: props.values.plcip,
        hmiip: props.values.hmiip,
        volumnPer1cm: props.values.volumnPer1cm,
        levelCalcFactor: props.values.levelCalcFactor,
        levelCalcOffset: props.values.levelCalcOffset,
        pumpRatedFlow: props.values.pumpRatedFlow,
        pumpCalcFactor: props.values.pumpCalcFactor,
        pumpCalcOffset: props.values.pumpCalcOffset,
        longitude: props.values.longitude,
        latitude: props.values.latitude,
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

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="branch"
                            label="所属单位"
                        //rules={[{ required: true, message: '请选择！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {factoryDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="district"
                            label="管理区"
                            rules={[{ required: true, message: '请输入管理区！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="name"
                            label="站名"
                            rules={[{ required: true, message: '请输入站名！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="plcip"
                            label="PLC IP"
                            rules={[{ required: true, message: '请输入PLC IP！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="hmiip"
                            label="HMI IP"
                            rules={[{ required: true, message: '请输入HMI IP！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                        单位体积(1cm)
                    </Divider>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="volumnPer1cm"
                            label="单位体积"
                            rules={[{ required: true, message: '请输入单位体积！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="levelCalcFactor"
                            label="校正系数"
                            rules={[{ required: true, message: '请输入校正系数！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="levelCalcOffset"
                            label="偏差"
                            rules={[{ required: true, message: '请输入偏差！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                        装油泵额定流量(m3/h)
                    </Divider>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="pumpRatedFlow"
                            label="装油泵额定流量"
                            rules={[{ required: true, message: '请输入装油泵额定流量！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="pumpCalcFactor"
                            label="校正系数"
                            rules={[{ required: true, message: '请输入校正系数！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="pumpCalcOffset"
                            label="偏差"
                            rules={[{ required: true, message: '请输入偏差！' }]}
                        >
                            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Divider orientation="left" plain>
                        经纬度
                    </Divider>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="longitude"
                            label="经度"
                            rules={[{ required: true, message: '请输入经度！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="latitude"
                            label="纬度"
                            rules={[{ required: true, message: '请输入纬度！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="remark"
                            label="备注"
                        >
                            <TextArea rows={4} placeholder="请输入备注" />
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
                    pk: formVals.pk,
                    branch: formVals.branch,
                    name: formVals.name,
                    district: formVals.district,
                    plcip: formVals.plcip,
                    hmiip: formVals.hmiip,
                    volumnPer1cm: formVals.volumnPer1cm,
                    levelCalcFactor: formVals.levelCalcFactor,
                    levelCalcOffset: formVals.levelCalcOffset,
                    pumpRatedFlow: formVals.pumpRatedFlow,
                    pumpCalcFactor: formVals.pumpCalcFactor,
                    pumpCalcOffset: formVals.pumpCalcOffset,
                    longitude: formVals.longitude,
                    latitude: formVals.latitude,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
