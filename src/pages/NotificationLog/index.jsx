import React, { useEffect } from "react";
import { Input, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import * as signalR from '@microsoft/signalr';
import { quartzTask } from '../OilStationView/service';
import '../Common.less';

const TaskManager = async (type) => {
    await quartzTask(type)
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
    connection.on('ReceiveLog', function (message, description) {
        var inputLog = document.getElementById("inputLog");
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
            <Button key="start" size='small' type="primary" onClick={() => TaskManager(1)}>
                启动任务
            </Button>
            <Button key="close" style={{marginLeft:5}} size='small' type="primary" onClick={() => TaskManager(4)}>
                关闭任务
            </Button>
            <Button key="clean" style={{marginLeft:5}} size='small' type="primary" onClick={() => {document.getElementById("inputLog").value="";}}>
                清除日志
            </Button>
            <Input.TextArea rows={25} id="inputLog" />
        </PageContainer>
    );
}

export default NotificationLog;