import React, { useState } from "react";
import { Modal, Button } from "antd";

// 组件定义
const DeviceControl = (props) => {
    const {
        handleDeviceControl: handleSetParams,
        onCancel: handleModalVisible,
        visible,
        option,
    } = props;

    // 设置按钮加载状态（提交未执行完时，不能点击）
    const [loading, setLoading] = useState(false);

    // 提交事件
    const handleSubmit = async (params) => {
        setLoading(true);
        await handleSetParams({ ...option, ...params });
        setLoading(false);
    };

    const footer = <Button onClick={props.onCancel}>取消</Button>;
    return (
        <Modal
            title={option.title}
            visible={visible}
            onCancel={handleModalVisible}
            footer={footer}
            destroyOnClose
        >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Button type="primary" key="turnon" size="large" loading={loading} onClick={() => handleSubmit({ "cmd": "TurnOn" })}>
                    {props.option.turnOnText}
                </Button>
                <Button type="primary" key="turnoff" size="large" loading={loading} onClick={() => handleSubmit({ "cmd": "TurnOff" })}>
                    {props.option.turnOffText}
                </Button>
            </div>
        </Modal>
    );
};

export default DeviceControl;
