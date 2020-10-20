import React, { useState } from 'react';
import { Form, Input, Select, Drawer, Button, Row, Col } from 'antd';
import { roleDic, branchDic } from '../../dic.config';

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
        name: props.values.name,
        pwd: props.values.pwd,
        role: props.values.role,
        branch: props.values.branch,
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
                            name="name"
                            label="用户名"
                            rules={[{ required: true, message: '请输入用户名！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="pwd"
                            label="密码"
                            rules={[{ required: true, message: '请输入密码！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="confirmPwd"
                            label="确认密码"
                            rules={[{ required: true, message: '请输入确认密码！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="role"
                            label="角色"
                            rules={[{ required: true, message: '请选择角色！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {roleDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="branch"
                            label="所属分公司"
                        //rules={[{ required: true, message: '请选择！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {branchDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="remark"
                            label="备注"
                        //rules={[{ required: true, message: '请输入！' }]}
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
                    id: formVals.id,
                    name: formVals.name,
                    pwd: formVals.pwd,
                    role: formVals.role,
                    branch: formVals.branch,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
        // <Modal
        //     width={600}
        //     bodyStyle={{padding: '32px 40px 48px'}}
        //     destroyOnClose
        //     title={title}
        //     visible={updateModalVisible}
        //     onCancel={() => handleUpdateModalVisible()}
        //     onOk={() => handleSubmit()}
        // >
        //     <Form
        //         labelCol={{ span: 7 }}
        //         wrapperCol={{ span: 14 }}
        //         form={form}
        //         size='small'
        //         initialValues={{
        //             id: formVals.id,
        //             key: formVals.key,
        //             happenTime: setTime(formVals.happenTime),
        //             loss: formVals.loss,
        //             reason: formVals.reason,
        //             type: formVals.type,
        //             analysis: formVals.analysis,
        //             responsibleStaff: formVals.responsibleStaff,
        //             remark: formVals.remark,
        //         }}
        //     >
        //         {renderContent()}
        //     </Form>
        // </Modal>
    );
};

export default UpdateForm;
