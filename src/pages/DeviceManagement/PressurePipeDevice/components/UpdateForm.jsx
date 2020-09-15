import React, { useState } from 'react';
import { Form, DatePicker, Input, Select, Drawer, Button, Row, Col, Tabs, InputNumber } from 'antd';
import moment from 'moment';
import {
    branchDic, areaDic, locationDic, deviceTypeDic, materialDic, pipeLevelDic, diameterDic,
    supplierDic, installByCompanyDic, documentStateDic, procedureStatusDic, installTypeDic, safetyStatusDic,
    licenseCompanyDic, isKeyPartStrDic, isExprireStrDic, isVentStrDic, isGoodStrDic, stateDic, resonsibleStaffDic
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
        name: props.values.name,
        material: props.values.material,
        pipeLevel: props.values.pipeLevel,
        diameter: props.values.diameter,
        thickness: props.values.thickness,
        installType: props.values.installType,
        pipeStart: props.values.pipeStart,
        pipeStartX: props.values.pipeStartX,
        pipeStartY: props.values.pipeStartY,
        pipeStartElevation: props.values.pipeStartElevation,
        pipeEnd: props.values.pipeEnd,
        pipeEndX: props.values.pipeEndX,
        pipeEndY: props.values.pipeEndY,
        pipeEndElevation: props.values.pipeEndElevation,
        length: props.values.length,
        safetyStatus: props.values.safetyStatus,
        useRegistNo: props.values.useRegistNo,
        licenseCompany: props.values.licenseCompany,
        installInformDate: props.values.installInformDate,
        supervisionInspectionDate: props.values.supervisionInspectionDate,
        resgisterDate: props.values.resgisterDate,
        lastInspectionDate: props.values.lastInspectionDate,
        nextInspectionDate: props.values.nextInspectionDate,
        localGovReportCompleteDate:props.values.localGovReportCompleteDate,
        proviceGovAcceptenceDate:props.values.proviceGovAcceptenceDate,
        cancellatinoResgisterDate: props.values.cancellatinoResgisterDate,
        isKeyPart: props.values.isKeyPart,
        isKeyDevice: props.values.isKeyDevice,
        isExprire: props.values.isExprire,
        procedureStatus: props.values.procedureStatus,
        isGood: props.values.isGood,
        areaType: props.values.areaType,
        area: props.values.area,
        location: props.values.location,
        designPressure: props.values.designPressure,
        actualPressureStr: props.values.actualPressureStr,
        arrivalDate: props.values.arrivalDate,
        interAcceptenceDate: props.values.interAcceptenceDate,
        testRunDate: props.values.testRunDate,
        offLineDate: props.values.offLineDate,
        reOnLineDate: props.values.reOnLineDate,
        retireDate: props.values.retireDate,
        isVent: props.values.isVent,
        ventDate: props.values.ventDate,
        documentState: props.values.documentState,
        otherInfo: props.values.otherInfo,
        fixedAssetNumber: props.values.fixedAssetNumber,
        fixedAssetType: props.values.fixedAssetType,
        standardSerialNumber: props.values.standardSerialNumber,
        internalSerialNumber: props.values.internalSerialNumber,
        resonsibleStaff: props.values.resonsibleStaff,
        source: props.values.source,
        originalValue: props.values.originalValue,
        commissionDate: props.values.commissionDate,
        completedDate: props.values.completedDate,
        onlineDate: props.values.onlineDate,
        installByCompany: props.values.installByCompany,
        branch: props.values.branch,
        model: props.values.model,
        productionSerialNumber: props.values.productionSerialNumber,
        productionDate: props.values.productionDate,
        isPressureVessel: props.values.isPressureVessel,
        isPressurePipe: props.values.isPressurePipe,
        supplier: props.values.supplier,
        deviceType: props.values.deviceType,
        issuingDate: props.values.issuingDate,
        state: props.values.state,
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
                                    name="name"
                                    label="管道名称"
                                    rules={[{ required: true, message: '请输入管道名称！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="model"
                                    label="管道规格"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="deviceType"
                                    label="管道类型"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
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
                                    name="material"
                                    label="管道材质"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {materialDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeLevel"
                                    label="管道级别"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {pipeLevelDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="diameter"
                                    label="公称直径"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {diameterDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="thickness"
                                    label="公称壁厚"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
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
                                    name="supplier"
                                    label="制造单位"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
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
                                    name="installType"
                                    label="敷设方式"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {installTypeDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeStart"
                                    label="管道起点"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeStartX"
                                    label="起点坐标X值"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeStartY"
                                    label="起点坐标Y值"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeStartElevation"
                                    label="起点高程"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeEnd"
                                    label="管道止点"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeEndX"
                                    label="止点坐标X值"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeEndY"
                                    label="止点坐标Y值"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="pipeEndElevation"
                                    label="止点高程"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="length"
                                    label="累计长度（米）"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="safetyStatus"
                                    label="安全状况"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {safetyStatusDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="useRegistNo"
                                    label="使用证编号"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="licenseCompany"
                                    label="发证单位"
                                //rules={[{ required: true, message: '请选择所属分公司！' }]}
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
                                    label="安装结束时间"
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
                                    name="issuingDate"
                                    label="发证时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择发证时间" />
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
                                    name="localGovReportCompleteDate"
                                    label="当地市场监管局报备完成时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择当地市场监管局报备完成时间" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="proviceGovAcceptenceDate"
                                    label="省燃气中心验收时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择省燃气中心验收时间" />
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
                                    label="再次启用时间"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <DatePicker style={{ width: '100%', }} format="YYYY年MM月DD日" placeholder="选择再次启用时间" />
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
                                    name="isVent"
                                    label="是否通气"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
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
                                    name="isGoodStr"
                                    label="是否完好"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isGoodStrDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                <FormItem
                                    name="state"
                                    label="管道状态"
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
                    name: formVals.name,
                    material: formVals.material,
                    pipeLevel: formVals.pipeLevel,
                    diameter: formVals.diameter,
                    thickness: formVals.thickness,
                    installType: formVals.installType,
                    pipeStart: formVals.pipeStart,
                    pipeStartX: formVals.pipeStartX,
                    pipeStartY: formVals.pipeStartY,
                    pipeStartElevation: formVals.pipeStartElevation,
                    pipeEnd: formVals.pipeEnd,
                    pipeEndX: formVals.pipeEndX,
                    pipeEndY: formVals.pipeEndY,
                    pipeEndElevation: formVals.pipeEndElevation,
                    length: formVals.length,
                    safetyStatus: formVals.safetyStatus,
                    useRegistNo: formVals.useRegistNo,
                    licenseCompany: formVals.licenseCompany,
                    installInformDate: setTime(formVals.installInformDate),
                    supervisionInspectionDate: setTime(formVals.supervisionInspectionDate),
                    resgisterDate: setTime(formVals.resgisterDate),
                    lastInspectionDate: setTime(formVals.lastInspectionDate),
                    nextInspectionDate: setTime(formVals.nextInspectionDate),
                    localGovReportCompleteDate:setTime(formVals.localGovReportCompleteDate),
                    proviceGovAcceptenceDate:setTime(formVals.proviceGovAcceptenceDate),
                    cancellatinoResgisterDate: setTime(formVals.cancellatinoResgisterDate),
                    isKeyPart: formVals.isKeyPart,
                    isKeyDevice: formVals.isKeyDevice,
                    isExprire: formVals.isExprire,
                    procedureStatus: formVals.procedureStatus,
                    isGood: formVals.isGood,
                    areaType: formVals.areaType,
                    area: formVals.area,
                    location: formVals.location,
                    designPressure: formVals.designPressure,
                    actualPressureStr: formVals.actualPressureStr,
                    arrivalDate: setTime(formVals.arrivalDate),
                    interAcceptenceDate: setTime(formVals.interAcceptenceDate),
                    testRunDate: setTime(formVals.testRunDate),
                    offLineDate: setTime(formVals.offLineDate),
                    reOnLineDate: setTime(formVals.reOnLineDate),
                    retireDate: setTime(formVals.retireDate),
                    isVent: formVals.isVent,
                    ventDate: setTime(formVals.ventDate),
                    documentState: formVals.documentState,
                    otherInfo: formVals.otherInfo,
                    fixedAssetNumber: formVals.fixedAssetNumber,
                    fixedAssetType: formVals.fixedAssetType,
                    standardSerialNumber: formVals.standardSerialNumber,
                    internalSerialNumber: formVals.internalSerialNumber,
                    resonsibleStaff: formVals.resonsibleStaff,
                    source: formVals.source,
                    originalValue: formVals.originalValue,
                    commissionDate: setTime(formVals.commissionDate),
                    completedDate: setTime(formVals.completedDate),
                    onlineDate: setTime(formVals.onlineDate),
                    installByCompany: formVals.installByCompany,
                    branch: formVals.branch,
                    model: formVals.model,
                    productionSerialNumber: formVals.productionSerialNumber,
                    productionDate: setTime(formVals.productionDate),
                    isPressureVessel: formVals.isPressureVessel,
                    isPressurePipe: formVals.isPressurePipe,
                    supplier: formVals.supplier,
                    deviceType: formVals.deviceType,
                    id: formVals.id,
                    key: formVals.key,
                    issuingDate: setTime(formVals.issuingDate),
                    state: formVals.state,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
