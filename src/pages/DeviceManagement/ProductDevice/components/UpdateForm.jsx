import React, { useState } from 'react';
import { Form, DatePicker, Input, Select, Drawer, Button, Row, Col, Tabs, InputNumber } from 'antd';
import moment from 'moment';
import {
    branchDic, areaDic, supplierDic, stateDic, resonsibleStaffDic, sourceDic, isSpecialStrDic
} from '../../../dic.config';
import Documents from '../../Documents/index';
import DeviceSparePart from '../../DeviceSparePart/index';
import DeviceTool from '../../DeviceTool/index';
import OperationRecord from '../../OperationRecord/index'
import Accident from '../../Accident/index'
import DeviceMaintance from '../../DeviceMaintance/index'
import DeviceTransfer from '../../DeviceTransfer/index'
import AttachedDevice from '../../AttachedDevice/index'

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// 组件定义
const UpdateForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.id == undefined ? true : false,
        id: props.values.id == undefined ? '' : props.values.id,
        key: props.values.key,
        internalSerialNumber: props.values.internalSerialNumber,
        branch: props.values.branch,
        area: props.values.area,
        location: props.values.location,
        name: props.values.name,
        model: props.values.model,
        supplier: props.values.supplier,
        productionDate: props.values.productionDate,
        productionSerialNumber: props.values.productionSerialNumber,
        weight: props.values.weight,
        originalValue: props.values.originalValue,
        state: props.values.state,
        onlineDate: props.values.onlineDate,
        source: props.values.source,
        resonsibleStaff: props.values.resonsibleStaff,
        isSpecialStr: props.values.isSpecialStr,
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

    // 提交事件（这个页面的提交事件，会调用父页面定义的onSubmit方法）
    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();

        setLoading(true);

        setFormVals({ ...formVals, ...fieldsValue });
        // 拿到父页面的onSubmit返回的id
        let id = await handleUpdate({ ...formVals, ...fieldsValue });
        // 将id赋值给formVals,使其他标签页可用
        setFormVals({ id: id });

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
                <Tabs defaultActiveKey="1" tabPosition="top">
                    <TabPane tab={<span>基础信息</span>} key="1">
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="internalSerialNumber"
                                    label="管理编号"
                                    rules={[{ required: true, message: '请输入管理编号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="branch"
                                    label="所属分公司"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }} showSearch >
                                        {branchDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="area"
                                    label="所在区域"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {areaDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="location"
                                    label="使用地点"
                                //rules={[{ required: true, message: '请输入使用地点！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="name"
                                    label="设备名称"
                                    rules={[{ required: true, message: '请输入设备名称！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="model"
                                    label="规格型号"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="supplier"
                                    label="生成厂家"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {supplierDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="productionDate"
                                    label="出厂日期"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择出厂时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="productionSerialNumber"
                                    label="出厂编号"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="weight"
                                    label="重量"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="originalValue"
                                    label="原值（万元）"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="source"
                                    label="设备来源"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {sourceDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="state"
                                    label="设备状态"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {stateDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="onlineDate"
                                    label="投用时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择投用时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="source"
                                    label="设备来源"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {sourceDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="resonsibleStaff"
                                    label="责任人"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {resonsibleStaffDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="isSpecialStr"
                                    label="是否特种设备"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isSpecialStrDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="remark"
                                    label="备注"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span>设备资料登记表</span>} key="2" disabled={formVals.id == ''}>
                        {/* 设备id不为空时，显示以下组件 */}
                        {formVals.id != '' ? (
                            <Documents deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                    <TabPane tab={<span>备品备件登记表</span>} key="3" disabled={formVals.id == ''}>
                        {formVals.id != '' ? (
                            <DeviceSparePart deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                    <TabPane tab={<span>工具登记表</span>} key="4" disabled={formVals.id == ''}>
                        {formVals.id != '' ? (
                            <DeviceTool deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                    <TabPane tab={<span>设备运转记录表</span>} key="5" disabled={formVals.id == ''}>
                        {formVals.id != '' ? (
                            <OperationRecord deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                    <TabPane tab={<span>设备运行参数表</span>} key="6" disabled={formVals.id == ''}>
                        待完成
                    </TabPane>
                    <TabPane tab={<span>主要附属设备</span>} key="7" disabled={formVals.id == ''}>
                        {formVals.id != '' ? (
                            <AttachedDevice deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                    <TabPane tab={<span>设备调动(内部)租赁登记表</span>} key="8" disabled={formVals.id == ''}>
                        {formVals.id != '' ? (
                            <DeviceTransfer deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                    <TabPane tab={<span>维修保养记录表</span>} key="9" disabled={formVals.id == ''}>
                        {formVals.id != '' ? (
                            <DeviceMaintance deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                    <TabPane tab={<span>主要仪表、设施档案</span>} key="10" disabled={formVals.id == ''}>
                        待完成
                    </TabPane>
                    <TabPane tab={<span>事故登记表</span>} key="11" disabled={formVals.id == ''}>
                        {formVals.id != '' ? (
                            <Accident deviceId={formVals.id} />
                        ) : null}
                    </TabPane>
                </Tabs>
            </>
        );
    };

    return (
        <Drawer
            width={'80%'}
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

                    internalSerialNumber: formVals.internalSerialNumber,
                    branch: formVals.branch,
                    area: formVals.area,
                    location: formVals.location,
                    name: formVals.name,
                    model: formVals.model,
                    supplier: formVals.supplier,
                    productionDate: setTime(formVals.productionDate),
                    productionSerialNumber: formVals.productionSerialNumber,
                    weight: formVals.weight,
                    originalValue: formVals.originalValue,
                    state: formVals.state,
                    onlineDate: setTime(formVals.onlineDate),
                    source: formVals.source,
                    resonsibleStaff: formVals.resonsibleStaff,
                    isSpecialStr: formVals.isSpecialStr,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
