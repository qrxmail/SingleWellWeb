import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Drawer, Button, Row, Col, InputNumber, DatePicker, Cascader } from 'antd';
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
        date: props.values.date,
        line: props.values.line,
        keyPart: props.values.keyPart,
        inspectSituation: props.values.inspectSituation,
        problemHandling: props.values.problemHandling,
        inspectStaff: props.values.inspectStaff,
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

    // 获取设备数据
    let initDeviceList = [];
    const [device, SetDevice] = useState(initDeviceList);
    // useEffect(() => {
    //     MainDeviceService.deviceGroupByBrank('锅炉','白水').then((result) => {
    //         SetDevice(result);
    //     });
    // }, [1]);

    // 设备下拉选项改变事件
    const onChange = (value) => {
        console.log(value);
    }

    // 只显示最后一层
    const displayRender = (label) => {
        return label[label.length - 1];
    }

    // 表单内容
    const renderContent = () => {

        // 设备选择项属性（数据不符合规范，需要二次处理）
        // const options: any = [];
        // for (var i: number = 0; i < device.length; i++) {
        //     const optionsItem: any = {};
        //     optionsItem.value = device[i].id;
        //     optionsItem.label = device[i].name;
        //     options.push(optionsItem);
        // }

        const options = [
            {
                value: '白水',
                label: '白水',
                children: [
                    {
                        value: '设备1',
                        label: '设备1',
                    },
                    {
                        value: '设备2',
                        label: '设备2',
                    },
                ],
            },   
        ];

        return (
            <>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="date"
                            label="日期"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择日期" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="line"
                            label="线路"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="keyPart"
                            label="重点部位"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="inspectSituation"
                            label="巡检情况"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="problemHandling"
                            label="问题处理情况"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="inspectStaff"
                            label="巡检人"
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
                    date: setTime(formVals.date),
                    line: formVals.line,
                    keyPart: formVals.keyPart,
                    inspectSituation: formVals.inspectSituation,
                    problemHandling: formVals.problemHandling,
                    inspectStaff: formVals.inspectStaff,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
