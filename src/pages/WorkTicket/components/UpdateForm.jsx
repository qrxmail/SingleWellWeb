import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Drawer, Button, Cascader, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

// 表单项
const FormItem = Form.Item;
const { TextArea } = Input;

// 组件定义
const UpdateForm = (props) => {
    // 用useState将列表页面的值赋给表单属性
    const [formVals, setFormVals] = useState({
        isAdd: props.values.pk == undefined ? true : false,
        pk: props.values.pk == undefined ? '' : props.values.pk,
        serialNumber: props.values.serialNumber,
        loadStationBranch: props.values.loadStationBranch,
        loadStationName: props.values.loadStationName,
        loadStation: props.values.loadStation,
        loadingBeginTime: props.values.loadingBeginTime,
        loadingEndTime: props.values.loadingEndTime,
        unloadStationBranch: props.values.unloadStationBranch,
        unloadStationName: props.values.unloadStationName,
        unloadStation: props.values.unloadStation,
        status: props.values.status,
        remark: props.values.remark,
    });

    // 设置按钮加载状态（提交未执行完时，不能点击）
    const [loading, setLoading] = useState(false);

    // 获取表单
    const [form] = Form.useForm();

    // 组件属性定义：要想使用组件，就要为组件属性传值，实现值和方法的传递
    const {
        onSubmit: handleUpdate,
        onCancel: handleModalVisible,
        modalVisible,
        title,
        dispatch,
        oilStationData,
    } = props;

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'common/fetchOilStationData',
            });
        }
    }, []);

    // 将时间格式化为moment或者null
    const setTime = (timeStr) => {
        return (timeStr === '0001-01-01T00:00:00' || timeStr === undefined || timeStr === null) ? null : moment(timeStr, 'YYYY年MM月DD日 HH:mm:ss')
    }

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
                            name="serialNumber"
                            label="工单编号"
                            rules={[{ required: true, message: '请输入工单编号！' }]}
                        >
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="loadStationName"
                            label="装油站"
                            rules={[{ required: true, message: '请选择装油站！' }]}
                        >
                            <Cascader
                                options={oilStationData}
                                expandTrigger="hover"
                                placeholder="请选择"
                            />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="loadtimeRange"
                            label="装油时间"
                            rules={[{ required: true, message: '请选择装油时间！' }]}
                        >
                            <DatePicker.RangePicker
                                showTime={{
                                    defaultValue: [
                                        moment("09:00:00", "HH:mm:ss"),
                                        moment("10:00:00", "HH:mm:ss")
                                    ]
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="unloadStationName"
                            label="卸油站"
                            rules={[{ required: true, message: '请选择卸油站！' }]}
                        >
                            <Cascader
                                options={oilStationData}
                                expandTrigger="hover"
                                placeholder="请选择"
                            />
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormItem
                            name="remark"
                            label="备注"
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
            visible={modalVisible}
            onClose={() => handleModalVisible()}
            footer={
                <div style={{ textAlign: 'right', }}>
                    <Button key="submit" size='small' type="primary" loading={loading} style={{ marginRight: 8 }} onClick={() => handleSubmit()}>
                        提交
                    </Button>
                    <Button key="cancel" size='small' type="default" onClick={() => handleModalVisible()}>
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
                    pk: formVals.pk,
                    serialNumber: formVals.serialNumber !== undefined ?  formVals.serialNumber: moment().format('YYYYMMDDHHmmss'),
                    loadStationName: formVals.loadStation !== undefined ? [formVals.loadStationBranch, formVals.loadStationName, formVals.loadStation] : null,
                    loadtimeRange: (setTime(formVals.loadingBeginTime) !== null && setTime(formVals.loadingEndTime) !== null) ?
                        [setTime(formVals.loadingBeginTime), setTime(formVals.loadingEndTime)] : null,
                    unloadStationName: formVals.unloadStation !== undefined ? [formVals.unloadStationBranch, formVals.unloadStationName, formVals.unloadStation] : null,
                    remark: formVals.remark,
                }}
            >
                {renderContent()}
            </Form>
        </Drawer>
    );
};

export default connect(({ common }) => ({
    oilStationData: common.oilStationData,
}))(UpdateForm);
