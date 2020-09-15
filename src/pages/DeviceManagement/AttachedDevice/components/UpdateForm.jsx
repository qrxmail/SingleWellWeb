import React, { useState } from 'react';
import { Form, DatePicker, Input, Select, Drawer, Button, Row, Col, Tabs, InputNumber } from 'antd';
import moment from 'moment';
import {
    branchDic, areaDic, supplierDic, stateDic, resonsibleStaffDic, sourceDic, isSpecialStrDic, isOrNotDic, deviceTypeDic, stockLevelDic
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
        mainDeviceId:props.values.mainDeviceId,
        onSiteSerialNumber: props.values.onSiteSerialNumber,
        name: props.values.name,
        model: props.values.model,
        supplier: props.values.supplier,
        productionSerialNumber: props.values.productionSerialNumber,
        productionDate: props.values.productionDate,
        isPressureVessel: props.values.isPressureVessel,
        isPressurePipe: props.values.isPressurePipe,
        deviceType: props.values.deviceType,
        state: props.values.state,
        remark: props.values.remark,
        installationLocation: props.values.installationLocation,
        stockLevel: props.values.stockLevel,
        stockHoldAmount: props.values.stockHoldAmount,
        isSafetyValve: props.values.isSafetyValve,
        dynamicSealPointCount: props.values.dynamicSealPointCount,
        staticSealPointCount: props.values.staticSealPointCount,
        dynamicSealLeakingPointCount: props.values.dynamicSealLeakingPointCount,
        staticSealLeakingPointCount: props.values.staticSealLeakingPointCount,
        showInMainCard: props.values.showInMainCard,
        hasDetailCard: props.values.hasDetailCard,
        showInList: props.values.showInList,
        tableSortId: props.values.tableSortId,
        detailCardSortId: props.values.detailCardSortId,
        needCheckPeriodly: props.values.needCheckPeriodly,
        checkIntervalHours: props.values.checkIntervalHours,
        mainParameters: props.values.mainParameters,
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
                <Tabs defaultActiveKey="1" tabPosition='left'>
                    <TabPane tab={<span>基础信息</span>} key="1">
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="onSiteSerialNumber"
                                    label="设备编号"
                                    rules={[{ required: true, message: '请输入设备编号！' }]}
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
                                    name="productionSerialNumber"
                                    label="出厂编号"
                                //rules={[{ required: true, message: '请选择生成厂家！' }]}
                                >
                                    <Input placeholder="请输入" />
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
                                    name="isPressureVesselStr"
                                    label="是否压力容器"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isOrNotDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="isPressurePipeStr"
                                    label="是否压力管道"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isOrNotDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="deviceType"
                                    label="设备类型"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {deviceTypeDic.map(name => (
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
                                    name="installationLocation"
                                    label="安装位置"
                                //rules={[{ required: true, message: '请选择安装位置！' }]}
                                >
                                    <Input placeholder="请输入" />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="stockLevel"
                                    label="库存等级"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {stockLevelDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="stockHoldAmount"
                                    label="目前库存数量"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="isSafetyValve"
                                    label="是否安全阀"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isOrNotDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="dynamicSealPointCount"
                                    label="动密封点数量"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="staticSealPointCount"
                                    label="静密封点数量"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="dynamicSealLeakingPointCount"
                                    label="动密封点泄漏点数量"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="staticSealLeakingPointCount"
                                    label="静密封点泄漏点数量"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="showInMainCard"
                                    label="是否显示在主设备下方"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isOrNotDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="hasDetailCard"
                                    label="是否显示在主要仪表、设施档案栏目"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isOrNotDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="showInList"
                                    label="是否显示在附属设备清单"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isOrNotDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="tableSortId"
                                    label="附属设备清单序号"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="detailCardSortId"
                                    label="主要仪表、设施档案栏目序号"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="needCheckPeriodly"
                                    label="是否需要定期维护"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Select style={{ width: '100%' }}>
                                        {isOrNotDic.map(name => (
                                            <Option key={name} value={name}>{name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="checkIntervalHours"
                                    label="定期维护间隔(小时)"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="mainParameters"
                                    label="主要参数（用于主要附属设备表）"
                                //rules={[{ required: true, message: '请输入管道规格！' }]}
                                >
                                    <Input placeholder="请输入" />
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
                    <TabPane tab={<span>其他资料</span>} key="2" >
                       
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
                    mainDeviceId:formVals.mainDeviceId,
                    onSiteSerialNumber: formVals.onSiteSerialNumber,
                    name: formVals.name,
                    model: formVals.model,
                    supplier: formVals.supplier,
                    productionSerialNumber: formVals.productionSerialNumber,
                    productionDate: setTime(formVals.productionDate),
                    isPressureVessel: formVals.isPressureVessel,
                    isPressurePipe: formVals.isPressurePipe,
                    deviceType: formVals.deviceType,
                    state: formVals.state,
                    remark: formVals.remark,
                    installationLocation: formVals.installationLocation,
                    stockLevel: formVals.stockLevel,
                    stockHoldAmount: formVals.stockHoldAmount,
                    isSafetyValve: formVals.isSafetyValve,
                    dynamicSealPointCount: formVals.dynamicSealPointCount,
                    staticSealPointCount: formVals.staticSealPointCount,
                    dynamicSealLeakingPointCount: formVals.dynamicSealLeakingPointCount,
                    staticSealLeakingPointCount: formVals.staticSealLeakingPointCount,
                    showInMainCard: formVals.showInMainCard,
                    hasDetailCard: formVals.hasDetailCard,
                    showInList: formVals.showInList,
                    tableSortId: formVals.tableSortId,
                    detailCardSortId: formVals.detailCardSortId,
                    needCheckPeriodly: formVals.needCheckPeriodly,
                    checkIntervalHours: formVals.checkIntervalHours,
                    mainParameters: formVals.mainParameters,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default UpdateForm;
