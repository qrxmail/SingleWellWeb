import React, { useState } from 'react';
import { Form, DatePicker, Input, Select, Drawer, Button, Row, Col, Tabs, InputNumber } from 'antd';
import moment from 'moment';
import {
    branchDic, areaDic, locationDic, deviceTypeDic, materialDic, pipeLevelDic, diameterDic,
    supplierDic, installByCompanyDic, documentStateDic, procedureStatusDic, installTypeDic, safetyStatusDic,
    licenseCompanyDic, isKeyPartStrDic, isExprireStrDic, isVentStrDic, isGoodStrDic, stateDic, resonsibleStaffDic, installPosotionDic, safetyLevelDic, areaTypeDic, installAddressDic, sourceDic, isProducingStrDic
} from '../../../dic.config';

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
        areaType: props.values.areaType,
        area: props.values.area,
        name: props.values.name,
        deviceType: props.values.deviceType,
        installAddress: props.values.installAddress,
        model: props.values.model,
        capality: props.values.capality,
        entranceValveSize: props.values.entranceValveSize,
        exitValveSize: props.values.exitValveSize,
        supplier: props.values.supplier,
        productionDate: props.values.productionDate,
        productionSerialNumber: props.values.productionSerialNumber,
        weight: props.values.weight,
        diemension: props.values.diemension,
        originalValue: props.values.originalValue,
        arrivalDate: props.values.arrivalDate,
        installByCompany: props.values.installByCompany,
        commissionDate: props.values.commissionDate,
        interAcceptenceDate: props.values.interAcceptenceDate,
        testRunDate: props.values.testRunDate,
        completedDate: props.values.completedDate,
        ventDate: props.values.ventDate,
        onlineDate: props.values.onlineDate,
        offLineDate: props.values.offLineDate,
        reOnLineDate: props.values.reOnLineDate,
        retireDate: props.values.retireDate,
        source: props.values.source,
        isProducingStr: props.values.isProducingStr,
        documentState: props.values.documentState,
        isVentStr: props.values.isVentStr,
        state: props.values.state,
        resonsibleStaff: props.values.resonsibleStaff,
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
                <Tabs defaultActiveKey="1" tabPosition='left'>
                    <TabPane tab={<span>基础信息</span>} key="1">
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="internalSerialNumber"
                                    label="管理编号"
                                    rules={[{ required: true, message: '请输入管理编号！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="areaType"
                                    label="区域类型"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {areaTypeDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="name"
                                    label="设备名称"
                                    rules={[{ required: true, message: '请输入压力容器名称！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="deviceType"
                                    label="设备类别"
                                //rules={[{ required: true, message: '请选择安装部位！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {deviceTypeDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="installAddress"
                                    label="安装地点"
                                //rules={[{ required: true, message: '请选择安装部位！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {installAddressDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="model"
                                    label="规格型号"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="capality"
                                    label="设备能力"
                                //rules={[{ required: true, message: '请输入设备能力！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="entranceValveSize"
                                    label="进口球阀接口尺寸"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="exitValveSize"
                                    label="出口球阀接口尺寸"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="productionDate"
                                    label="出厂时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择出厂时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="productionSerialNumber"
                                    label="出厂编号"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="weight"
                                    label="重量"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="diemension"
                                    label="外形尺寸"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="originalValue"
                                    label="原值（万元）"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="arrivalDate"
                                    label="进场时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择进场时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="installByCompany"
                                    label="安装单位"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {installByCompanyDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="commissionDate"
                                    label="安装调试结束时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择安装结束时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="interAcceptenceDate"
                                    label="中间验交时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择中间验交时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="testRunDate"
                                    label="试运行时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择试运行时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="completedDate"
                                    label="竣工验收"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择竣工验收" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="ventDate"
                                    label="通气时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择竣工验收" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="onlineDate"
                                    label="投用时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择投用时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="offLineDate"
                                    label="停用时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择停用时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="reOnLineDate"
                                    label="重新启用时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择停用时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="retireDate"
                                    label="报废时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择报废时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="isProducingStr"
                                    label="是否转入生产"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isProducingStrDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="documentState"
                                    label="资料情况"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {documentStateDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="isVentStr"
                                    label="是否通气"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isVentStrDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
                    <TabPane tab={<span>其他信息</span>} key="2">
                    </TabPane>
                </Tabs>
            </>
        );
    };

    return (
        <Drawer
            width={'80%'}
            bodyStyle={{ padding: '32px 40px 48px' }}
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
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                size='small'
                initialValues={{
                    id: formVals.id,
                    key: formVals.key,
                    internalSerialNumber: formVals.internalSerialNumber,
                    branch: formVals.branch,
                    areaType: formVals.areaType,
                    area: formVals.area,
                    name: formVals.name,
                    deviceType: formVals.deviceType,
                    installAddress: formVals.installAddress,
                    model: formVals.model,
                    capality: formVals.capality,
                    entranceValveSize: formVals.entranceValveSize,
                    exitValveSize: formVals.exitValveSize,
                    supplier: formVals.supplier,
                    productionDate: setTime(formVals.productionDate),
                    productionSerialNumber: formVals.productionSerialNumber,
                    weight: formVals.weight,
                    diemension: formVals.diemension,
                    originalValue: formVals.originalValue,
                    arrivalDate: setTime(formVals.arrivalDate),
                    installByCompany: formVals.installByCompany,
                    commissionDate: setTime(formVals.commissionDate),
                    interAcceptenceDate: setTime(formVals.interAcceptenceDate),
                    testRunDate: setTime(formVals.testRunDate),
                    completedDate: setTime(formVals.completedDate),
                    ventDate: setTime(formVals.ventDate),
                    onlineDate: setTime(formVals.onlineDate),
                    offLineDate: setTime(formVals.offLineDate),
                    reOnLineDate: setTime(formVals.reOnLineDate),
                    retireDate: setTime(formVals.retireDate),
                    source: formVals.source,
                    isProducingStr: formVals.isProducingStr,
                    documentState: formVals.documentState,
                    isVentStr: formVals.isVentStr,
                    state: formVals.state,
                    resonsibleStaff: formVals.resonsibleStaff,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
