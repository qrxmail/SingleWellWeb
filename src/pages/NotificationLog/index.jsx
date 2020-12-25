import React, { useEffect } from "react";
import { Input, Button, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import * as signalR from '@microsoft/signalr';
import { quartzTask } from '../OilStationView/service';
import '../Common.less';

const TaskManager = async (type, jobName, jobGroup) => {
    await quartzTask(type, jobName, jobGroup)
}

const NotificationLog = () => {
    const protocol = new signalR.JsonHubProtocol();
    const transport = signalR.HttpTransportType.WebSockets;
    const options = {
        transport
    }
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:44396/chatHub`, options)
        .withHubProtocol(protocol)
        .withAutomaticReconnect()
        .build();
    connection.on('ReceiveLogOperWorkTicket', function (message, description) {
        var inputLog = document.getElementById("inputLogOperWorkTicket");
        inputLog.value = inputLog.value + description;
    });
    connection.on('ReceiveLogOperQrCode', function (message, description) {
        var inputLog = document.getElementById("inputLogOperQrCode");
        inputLog.value = inputLog.value + description;
    });
    connection.on('ReceiveLogRemindToWork', function (message, description) {
        var inputLog = document.getElementById("inputLogRemindToWork");
        inputLog.value = inputLog.value + description;
    });
    connection.start()
        .then(() => console.info('SignalR Connected'))
        .catch(err => console.error('SignalR Connection Error: ', err));

    useEffect(() => {
        return () => {
            // 相当于 componentWillUnmount
            connection.stop();
        }
    }, [0]);

    return (
        <PageContainer>
            <Row gutter={10}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <h3>自动处理工单定时任务</h3>
                    <Button key="start" size='small' type="primary" onClick={() => TaskManager("add", "AutoOperWorkTicket", "group")}>
                        启动任务
                    </Button>
                    <Button key="close" style={{ marginLeft: 5 }} size='small' type="primary" onClick={() => TaskManager("delete", "AutoOperWorkTicket", "group")}>
                        关闭任务
                    </Button>
                    <Button key="clean" style={{ marginLeft: 5 }} size='small' type="primary" onClick={() => { document.getElementById("inputLogOperWorkTicket").value = ""; }}>
                        清除日志
                    </Button>
                    <Input.TextArea rows={25} id="inputLogOperWorkTicket" />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <h3>二维码信息处理定时任务</h3>
                    <Button key="start1" size='small' type="primary" onClick={() => TaskManager("add", "AutoOperQrCode", "group")}>
                        启动任务
                    </Button>
                    <Button key="close1" style={{ marginLeft: 5 }} size='small' type="primary" onClick={() => TaskManager("delete", "AutoOperQrCode", "group")}>
                        关闭任务
                    </Button>
                    <Button key="clean1" style={{ marginLeft: 5 }} size='small' type="primary" onClick={() => { document.getElementById("inputLogOperQrCode").value = ""; }}>
                        清除日志
                    </Button>
                    <Input.TextArea rows={25} id="inputLogOperQrCode" />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <h3>开单提醒定时任务</h3>
                    <Button key="start2" size='small' type="primary" onClick={() => TaskManager("add", "AutoRemindToWork", "group")}>
                        启动任务
                    </Button>
                    <Button key="close2" style={{ marginLeft: 5 }} size='small' type="primary" onClick={() => TaskManager("delete", "AutoRemindToWork", "group")}>
                        关闭任务
                    </Button>
                    <Button key="clean2" style={{ marginLeft: 5 }} size='small' type="primary" onClick={() => { document.getElementById("inputLogRemindToWork").value = ""; }}>
                        清除日志
                    </Button>
                    <Input.TextArea rows={25} id="inputLogRemindToWork" />
                </Col>
            </Row>

        </PageContainer>
    );
}

export default NotificationLog;