import React from 'react';
import { notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import * as signalR from '@microsoft/signalr';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const protocol = new signalR.JsonHubProtocol();
        const transport = signalR.HttpTransportType.WebSockets;
        const options = {
            transport
        }
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:44396/chatHub`, options)
            .withHubProtocol(protocol)
            .withAutomaticReconnect()
            .build();
        this.connection.on('ReceiveMessage', this.onNotifReceived);
        this.connection.start()
            .then(() => console.info('SignalR Connected'))
            .catch(err => console.error('SignalR Connection Error: ', err));
    }
    componentWillUnmount() {
        this.connection.stop();
    }
    onNotifReceived(message, description) {
        notification.info({
            message: message,
            description: <a href="/WorkTicket/WorkTicketList">{description}</a>,
            placement: 'bottomRight',
            duration: null,
            icon: <ExclamationCircleFilled style={{ color: '#1890ff' }} />
        })
    }

    render() {
        return null;
    }
};
export default Notification;