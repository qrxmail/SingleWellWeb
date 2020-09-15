import React, { useState } from 'react';
import { Form, DatePicker, Input, Select, Drawer, Button, Row, Col, Tabs, InputNumber } from 'antd';
import moment from 'moment';
import {
    branchDic, areaDic, locationDic, deviceTypeDic, materialDic, pipeLevelDic, diameterDic,
    supplierDic, installByCompanyDic, documentStateDic, procedureStatusDic, installTypeDic, safetyStatusDic,
    licenseCompanyDic, isKeyPartStrDic, isExprireStrDic, isVentStrDic, isGoodStrDic, stateDic, resonsibleStaffDic, installPosotionDic, safetyLevelDic
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
        area: props.values.area,
        location: props.values.location,
        mainDeviceId: props.values.mainDeviceId,
        name: props.values.name,
        installPosotion: props.values.installPosotion,
        model: props.values.model,
        volume: props.values.volume,
        designPressure: props.values.designPressure,
        actualPressureStr: props.values.actualPressureStr,
        deviceType: props.values.deviceType,
        supplier: props.values.supplier,
        productionSerialNumber:props.values.productionSerialNumber,
        installByCompany:props.values.installByCompany,
        useRegistNo: props.values.useRegistNo,
        safetyLevel: props.values.safetyLevel,
        licenseCompany: props.values.licenseCompany,
        productionDate: props.values.productionDate,
        arrivalDate: props.values.arrivalDate,
        installInformDate: props.values.installInformDate,
        commissionDate: props.values.commissionDate, 
        interAcceptenceDate: props.values.interAcceptenceDate,
        supervisionInspectionDate: props.values.supervisionInspectionDate,
        testRunDate: props.values.testRunDate,
        completedDate: props.values.completedDate,
        onlineDate: props.values.onlineDate,
        resgisterDate: props.values.resgisterDate,
        lastInspectionDate: props.values.lastInspectionDate,
        nextInspectionDate: props.values.nextInspectionDate,
        offLineDate: props.values.offLineDate,
        cancellatinoResgisterDate: props.values.cancellatinoResgisterDate,
        retireDate: props.values.retireDate,
        isExprire: props.values.isExprire,
        state: props.values.state,
        documentState: props.values.documentState,
        procedureStatus: props.values.procedureStatus,
        isKeyPart: props.values.isKeyPart,
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
                                    name="location"
                                    label="使用地点"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {locationDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="mainDeviceId"
                                    label="所属设备"
                                //rules={[{ required: true, message: '请选择所属设备！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {locationDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="name"
                                    label="压力容器名称"
                                    rules={[{ required: true, message: '请输入压力容器名称！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="installPosotion"
                                    label="安装部位"
                                //rules={[{ required: true, message: '请选择安装部位！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {installPosotionDic.map(name => (
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
                                    name="volume"
                                    label="容积"
                                //rules={[{ required: true, message: '请输入容积！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="designPressure"
                                    label="设计压力"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="actualPressureStr"
                                    label="实际工作压力"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="deviceType"
                                    label="压力容器类别"
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
                                    name="productionSerialNumber"
                                    label="出厂编号"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                   <Input placeholder="请输入" />
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
                                    name="useRegistNo"
                                    label="使用登记证编号"
                                //rules={[{ required: true, message: '请输入使用登记证编号！' }]}
                                >
                                   <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="installByCompany"
                                    label="安全等级"
                                //rules={[{ required: true, message: '请选择安全等级！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {safetyLevelDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="licenseCompany"
                                    label="发证单位"
                                //rules={[{ required: true, message: '请选择安全等级！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {licenseCompanyDic.map(name => (
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
                                    name="arrivalDate"
                                    label="进场时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择进场时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="installInformDate"
                                    label="安装告知时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择安装告知时间" />
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
                                    name="supervisionInspectionDate"
                                    label="监督检验时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择监督检验时间" />
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
                                    name="onlineDate"
                                    label="投用时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择投用时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="resgisterDate"
                                    label="注册登记时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择注册登记时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="lastInspectionDate"
                                    label="最近一次全面检验时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择注册登记时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="nextInspectionDate"
                                    label="下次检验日期"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择下次检验日期" />
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
                                    name="cancellatinoResgisterDate"
                                    label="注销时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择注销时间" />
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
                                    name="isExprire"
                                    label="是否超期"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isExprireStrDic.map(name => (
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
                                    name="procedureStatus"
                                    label="手续办理情况"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {procedureStatusDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="isKeyPart"
                                    label="是否属于关键装置、重点部位"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isKeyPartStrDic.map(name => (
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
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                size='small'
                initialValues={{
                    id: formVals.id,
                    key: formVals.key,
                    internalSerialNumber: formVals.internalSerialNumber,
                    branch: formVals.branch,
                    area: formVals.area,
                    location: formVals.location,
                    mainDeviceId: formVals.mainDeviceId,
                    name: formVals.name,
                    installPosotion: formVals.installPosotion,
                    model: formVals.model,
                    volume: formVals.volume,
                    designPressure: formVals.designPressure,
                    actualPressureStr: formVals.actualPressureStr,
                    deviceType: formVals.deviceType,
                    supplier: formVals.supplier,
                    productionSerialNumber:formVals.productionSerialNumber,
                    installByCompany:formVals.installByCompany,
                    useRegistNo: formVals.useRegistNo,
                    safetyLevel: formVals.safetyLevel,
                    licenseCompany: formVals.licenseCompany,
                    productionDate: setTime(formVals.productionDate),
                    arrivalDate: setTime(formVals.arrivalDate),
                    installInformDate: setTime(formVals.installInformDate),
                    commissionDate: setTime(formVals.commissionDate), 
                    interAcceptenceDate: setTime(formVals.interAcceptenceDate),
                    supervisionInspectionDate: setTime(formVals.supervisionInspectionDate),
                    testRunDate: setTime(formVals.testRunDate),
                    completedDate: setTime(formVals.completedDate),
                    onlineDate: setTime(formVals.onlineDate),
                    resgisterDate: setTime(formVals.resgisterDate),
                    lastInspectionDate: setTime(formVals.lastInspectionDate),
                    nextInspectionDate: setTime(formVals.nextInspectionDate),
                    offLineDate: setTime(formVals.offLineDate),
                    cancellatinoResgisterDate: setTime(formVals.cancellatinoResgisterDate),
                    retireDate: setTime(formVals.retireDate),
                    isExprire: formVals.isExprire,
                    state: formVals.state,
                    documentState: formVals.documentState,
                    procedureStatus: formVals.procedureStatus,
                    isKeyPart: formVals.isKeyPart,
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
