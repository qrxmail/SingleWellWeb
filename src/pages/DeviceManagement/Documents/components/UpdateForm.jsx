import React, { useState } from 'react';
import { Form, Input, Select, Drawer, Button, Row, Col, InputNumber } from 'antd';
import moment from 'moment';
import { areaDic, sourceDic, isOriginalStrDic, docTypeDic} from '../../../dic.config';

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
        name: props.values.name,
        count: props.values.count,
        unit: props.values.unit,
        isOriginal: props.values.isOriginal,
        type: props.values.type,
        source: props.values.source,
        custodian: props.values.custodian,
        remark: props.values.remark,
        docType: props.values.docType,
        storagePath: props.values.storagePath,
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
                            name="internalSerialNumber"
                            label="资料名称"
                            rules={[{ required: true, message: '请输入资料名称！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="count"
                            label="数量"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="unit"
                            label="单位"
                            rules={[{ required: true, message: '请输入单位！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="isOriginalStr"
                            label="是否原件"
                        //rules={[{ required: true, message: '请选择所属分公司！' }]}
                        >
                            <Select style={{ width: '100%' }} showSearch >
                                {isOriginalStrDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="type"
                            label="类别"
                        //rules={[{ required: true, message: '请选择所属分公司！' }]}
                        >
                            <Select style={{ width: '100%' }}>
                                {areaDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="source"
                            label="来源"
                        //rules={[{ required: true, message: '请选择生成厂家！' }]}
                        >
                            <Select style={{ width: '100%' }}>
                                {sourceDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="custodian"
                            label="保管人"
                        //rules={[{ required: true, message: '请选择生成厂家！' }]}
                        >
                            <Select style={{ width: '100%' }}>
                                {sourceDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="docType"
                            label="文件类别"
                        //rules={[{ required: true, message: '请输入管道规格！' }]}
                        >
                            <Select style={{ width: '100%' }}>
                                {docTypeDic.map(name => (
                                    <Option key={name} value={name}>{name}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="storagePath"
                            label="存储路径"
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
                    name: formVals.name,
                    count: formVals.count,
                    unit: formVals.unit,
                    isOriginal: formVals.isOriginal,
                    type: formVals.type,
                    source: formVals.source,
                    custodian: formVals.custodian,
                    remark: formVals.remark,
                    docType: formVals.docType,
                    storagePath: formVals.storagePath,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
