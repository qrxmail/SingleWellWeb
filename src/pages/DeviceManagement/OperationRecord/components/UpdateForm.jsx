import React, { useState } from 'react';
import { Form, Input, Select, Drawer, Button, Row, Col, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import { areaDic, sourceDic, isOriginalStrDic, docTypeDic } from '../../../dic.config';

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
        key: props.values.key,
        date: props.values.date,
        workDays: props.values.workDays,
        maintanceDays: props.values.maintanceDays,
        waitingRepairDays: props.values.waitingRepairDays,
        otherReasonDays: props.values.otherReasonDays,
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
        return (timeStr == '0001-01-01T00:00:00' || timeStr == undefined || timeStr == null) ? null : moment(timeStr, 'YYYY年MM月DD日')
    }

    // 表单内容
    const renderContent = () => {
        return (
            <>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="date"
                            label="时间"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择时间" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="workDays"
                            label="工作天数"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="maintanceDays"
                            label="维修天数"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="waitingRepairDays"
                            label="待修天数"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="otherReasonDays"
                            label="其他原因天数"
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
                    key: formVals.key,
                    date: setTime(formVals.date),
                    workDays: formVals.workDays,
                    maintanceDays: formVals.maintanceDays,
                    waitingRepairDays: formVals.waitingRepairDays,
                    otherReasonDays: formVals.otherReasonDays,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
