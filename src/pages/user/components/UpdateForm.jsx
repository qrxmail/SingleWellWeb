import React, { useState } from 'react';
import { Form, Input, Select, Drawer, Button, Row, Col } from 'antd';
import { roleDic, factoryDic } from '../../dic.config';
import { drawWidth } from '../../common';

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

// 组件定义
const UpdateForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.userId == undefined ? true : false,
        userId: props.values.userId == undefined ? '' : props.values.userId,
        branch: props.values.branch,
        // 新增时，密码默认设置为1
        password: props.values.userId == undefined ? '1' : props.values.password,
        userName: props.values.userName,
        name: props.values.name,
        type: props.values.type,
        avatar: props.values.avatar,
        email: props.values.email,
        mobile: props.values.mobile,
        status: props.values.status,
        currentAuthority: props.values.currentAuthority,
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
                            name="userName"
                            label="账户"
                            rules={[{ required: true, message: '请输入账户！' }]}
                        >
                            <Input placeholder="请输入" disabled={!formVals.isAdd} />
                        </FormItem>
                    </Col>

                    {/* {
                        // 如果是新增，密码和确认密码需要输入
                        formVals.isAdd ?
                            [ */}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                        <FormItem
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: '请输入密码！' }]}
                        >
                            <Input placeholder="请输入" type="password" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                        <FormItem
                            name="confirmPwd"
                            label="确认密码"
                            rules={[{ required: true, message: '请输入确认密码！' }]}
                        >
                            <Input placeholder="请输入" type="password" />
                        </FormItem>
                    </Col>
                    {/* ]
                            : null
                    } */}

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="currentAuthority"
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
                            name="name"
                            label="用户名"
                            rules={[{ required: true, message: '请输入用户名！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="mobile"
                            label="联系电话"
                        // rules={[{ required: true, message: '请输入联系电话！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="email"
                            label="邮件地址"
                        // rules={[{ required: true, message: '请输入邮件地址！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
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
            width={drawWidth(600)}
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
                    userId: formVals.userId,
                    branch: formVals.branch,
                    password: formVals.password,
                    userName: formVals.userName,
                    name: formVals.name,
                    type: formVals.type,
                    avatar: formVals.avatar,
                    email: formVals.email,
                    mobile: formVals.mobile,
                    status: formVals.status,
                    currentAuthority: formVals.currentAuthority,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
