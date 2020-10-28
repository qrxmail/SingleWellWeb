import React from "react";
import { Modal, Button } from "antd";

// 组件定义
const DeviceControl = (props) => {
    const footer = <Button onClick={props.onCancel}>取消</Button>;
    return (
        <Modal
            title={props.option.title}
            visible={props.visible}
            onCancel={props.onCancel}
            footer={footer}
        >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Button type="primary" size="large" onClick={props.handleTurnOn}>
                    {props.option.turnOnText}
                </Button>
                <Button type="primary" size="large" onClick={props.handleTurnOff}>
                    {props.option.turnOffText}
                </Button>
            </div>
        </Modal>
    );
};

export default DeviceControl;
