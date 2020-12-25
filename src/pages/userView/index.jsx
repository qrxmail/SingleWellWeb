import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import QRCode from "qrcode.react";
import PrintJS from "print-js";

import { queryObj, getQRCode } from "../user/service";

import '../Common.less';

// 表单项
const FormItem = Form.Item;

const handlePrint = () => {
    PrintJS({
        printable: "userDetail",
        type: "html",
        targetStyles: "[*]",
        documentTitle: "user"
    });
}

// 组件定义
const ViewForm = (props) => {

    const {
        // 从路由中获取参数query
        location: { query }
    } = props;

    const [formValues, setFormValues] = useState({});
    // 根据主键userId查询数据
    useEffect(() => {
        let params = { "userId": query.userId };
        let sorter = {};
        let filter = {};
        queryObj({ ...params, sorter, filter }).then((result) => {
            setFormValues(result.data[0]);
        });
    }, [query.userId]);

    const [qrcode, setQRCode] = useState("");
    // 根据主键userId获取用户二维码
    useEffect(() => {
        getQRCode(query.userId).then((result) => {
            setQRCode(result);
        });
    }, [query.userId]);

    // 表单内容
    const renderContent = () => {

        return (
            <>
                <Card title="用户详情" bordered >
                    <div style={{ textAlign: "right" }}>
                        <Button key="print" size='small' type="primary" style={{ marginRight: 8 }} onClick={() => handlePrint()}>
                            打印
                        </Button>
                    </div>
                    <Row id="userDetail" >
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="账户"
                            >
                                {formValues.userName}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="角色"
                            >
                                {formValues.currentAuthority}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="用户名"
                            >
                                {formValues.name}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="联系电话"
                            >
                                {formValues.mobile}
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <FormItem
                                label="所属单位"
                            >
                                {formValues.branch}
                            </FormItem>
                        </Col>

                        <div style={{ padding: 20, textAlign: "center", width: "100%" }}>
                            <QRCode value={qrcode} style={{ display: "inline-block" }} />
                        </div>
                    </Row>

                </Card>

            </>
        );
    };

    return (
        <PageContainer>
            <Form
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                size='small'
            >
                {renderContent()}
            </Form>
        </PageContainer>
    );
};

export default ViewForm;
