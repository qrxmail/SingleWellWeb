import { connect } from 'umi';
import React, { useState, useEffect } from "react";
import { Button, Cascader, Divider, message, Row, Col } from "antd";
import { PageContainer } from '@ant-design/pro-layout';
import { ReactSVG } from "react-svg";
import SVG from "svg.js";
import stationImage from "../../assets/station.svg";
import moment from "moment";
import Reflv from "./reflv.js";

import { turnOn, turnOff, queryStationData } from './service';
import DeviceControll from './components/DeviceControll';

import '../Common.less';

// 视频监控地址
const cameraUrl ="http://localhost:8000/live/demo.flv";
 
// 定义设备配置信息（id,名称,操作按钮名称，操作按钮名称）
const deviceConfig = [
  // 打开、关闭指令的设备
  { targetId: "loadPump", title: "装车泵", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "heater01", title: "电加热1", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "heater02", title: "电加热2", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "loopValve", title: "回流阀", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "outValve", title: "出油阀", turnOnText: "打开", turnOffText: "关闭" },

  // 远程、就地指令的设备
  { targetId: "loadPumpLocalRemote", title: "装车泵", turnOnText: "远程", turnOffText: "就地" },
  { targetId: "heater01LocalRemote", title: "电加热1", turnOnText: "远程", turnOffText: "就地" },
  { targetId: "heater02LocalRemote", title: "电加热2", turnOnText: "远程", turnOffText: "就地" },

  // 自动、手动指令的设备
  { targetId: "heater01ManualAuto", title: "电加热1", turnOnText: "自动", turnOffText: "手动" },
  { targetId: "heater02ManualAuto", title: "电加热2", turnOnText: "自动", turnOffText: "手动" },
];

const DEVICE_ON_COLOR = "yellowGreen";
const DEVICE_OFF_COLOR = "WhiteSmoke";
const DEVICE_UNKNOW_COLOR = "yellow";

const ViewPage = (props) => {
  // 将当前用户加入到props中
  const {
    currentUser,
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

  // 设备控制页面参数
  const [controlOption, setControlOption] = useState({});
  // 设备控制页面是否可见
  const [deviceControlVisible, setDeviceControlVisible] = useState(false);
  // 更新时间
  const [updateTime, setUpdateTime] = useState(moment().format("LTS"));

  // 监控视频是否可见
  const [cameraVisible, setCameraVisible] = useState(false);

  let outValve = null;
  let loopValve = null;
  let heater01 = null;
  let heater02 = null;
  let loadPump = null;
  let loadPumpLocalRemote = null;
  let heater01LocalRemote = null;
  let heater02LocalRemote = null;
  let heater01ManualAuto = null;
  let heater02ManualAuto = null;
  let levelLabel = null;
  let levelGauge = null;
  let pvOilLabel = null;
  let spOilLabel = null;
  let pvHeater01Label = null;
  let pvHeater02Label = null;
  let spHeater01Label = null;
  let spHeater02Label = null;

  // 站点svg图点击事件
  const onClickSVG = (e) => {

    // 从配置文件中找是否有可控制的设备
    let option = deviceConfig.filter((config) => {
      return config.targetId === e.target.id;
    });
    if (option.length > 0) {
      setControlOption(option[0]);
      setDeviceControlVisible(true);
    }
  };

  // 打开指令
  const handleTurnOn = async (fields) => {
    const hide = message.loading('正在操作');
    try {
      let result = await turnOn(fields);
      hide();
      if (result.isSuccess) {
        setDeviceControlVisible(false);
        message.success('操作成功');
      } else {
        message.error(result.errMsg);
      }
      return result.isSuccess;
    } catch (error) {
      hide();
      message.error('操作失败请重试！');
      return false;
    }
  };

  // 关闭指令
  const handleTurnOff = async (fields) => {
    const hide = message.loading('正在操作');
    try {
      let result = await turnOff(fields);
      hide();
      if (result.isSuccess) {
        setDeviceControlVisible(false);
        message.success('操作成功');
      } else {
        message.error(result.errMsg);
      }
      return result.isSuccess;
    } catch (error) {
      hide();
      message.error('操作失败请重试！');
      return false;
    }
  };

  function setValveStatus(valve, status) {
    let deviceColor = "gray";
    if (status === "opened") {
      deviceColor = DEVICE_ON_COLOR;
    } else if (status === "closed") {
      deviceColor = DEVICE_OFF_COLOR;
    } else {
      deviceColor = DEVICE_UNKNOW_COLOR;
    }
    valve.style({ fill: `${deviceColor}` });
    var valveChildren = valve.children();
    valveChildren.forEach(function (i, children) {
      i.style({ fill: `${deviceColor}` });
    });
  }

  function setDeviceStatus(device, status) {
    let deviceColor = "gray";
    if (status === "opened") {
      deviceColor = DEVICE_ON_COLOR;
    } else if (status === "closed") {
      deviceColor = DEVICE_OFF_COLOR;
    }
    device.style({ fill: `${deviceColor}` });
  }

  function setText(svgLabel, value) {
    svgLabel.node.textContent = value;
  }

  function setHeight(svgRect, value) {
    svgRect.height(value);
  }

  function setSwitch(svgSwitch, value) {
    let rotateValue = 0;
    if (value === true) {
      rotateValue = 90;
    }
    svgSwitch.rotate(rotateValue);
  }

  // 初始化SVG,给控件变量赋值
  const initialSVG = () => {

    outValve = SVG.get("outValve");
    loopValve = SVG.get("loopValve");
    heater01 = SVG.get("heater01");
    heater02 = SVG.get("heater02");
    loadPump = SVG.get("loadPump");
    loadPumpLocalRemote = SVG.get("loadPumpLocalRemote");
    heater01LocalRemote = SVG.get("heater01LocalRemote");
    heater02LocalRemote = SVG.get("heater02LocalRemote");
    heater01ManualAuto = SVG.get("heater01ManualAuto");
    heater02ManualAuto = SVG.get("heater02ManualAuto");

    levelLabel = SVG.get("levelLabel");
    levelGauge = SVG.get("levelGauge");
    pvOilLabel = SVG.get("pvOilLabel");
    spOilLabel = SVG.get("spOilLabel");
    pvHeater01Label = SVG.get("pvHeater01Label");
    spHeater01Label = SVG.get("spHeater01Label");
    pvHeater02Label = SVG.get("pvHeater02Label");
    spHeater02Label = SVG.get("spHeater02Label");

    //setInterval(updateHMI, 5000);
    //updateHMI();
  };

  const updateHMI = async () => {

    // 设置更新时间
    setUpdateTime(moment().format("LTS"));

    // 获取站点数据
    let stationData = await queryStationData();

    // 设置站点设备数据
    setDeviceStatus(loadPump, stationData.loadPumpStatus);
    setDeviceStatus(heater01, stationData.heater01Status);
    setDeviceStatus(heater02, stationData.heater02Status);
    setValveStatus(loopValve, stationData.loopValveStatus);
    setValveStatus(outValve, stationData.outValveStatus);
    setSwitch(loadPumpLocalRemote, stationData.loadPumpLocalRemote);
    setSwitch(heater01LocalRemote, stationData.heater01LocalRemote);
    setSwitch(heater02LocalRemote, stationData.heater02LocalRemote);
    setSwitch(heater01ManualAuto, stationData.heater01ManualAuto);
    setSwitch(heater02ManualAuto, stationData.heater02ManualAuto);

    setText(levelLabel, stationData.levelPV);
    setText(pvOilLabel, stationData.oilTempPV);
    setText(spOilLabel, stationData.oilTempSP);
    setText(pvHeater01Label, stationData.heater01TempPV);
    setText(spHeater01Label, stationData.heater01TempSP);
    setText(pvHeater02Label, stationData.heater02TempPV);
    setText(spHeater02Label, stationData.heater02TempSP);
    setHeight(levelGauge, stationData.levelPV / 10);
  };


  // 绘制页面
  return (
    <PageContainer>
      <Row style={{ backgroundColor: "white" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 10 }}>
          <Cascader style={{ width: 300 }}
            options={oilStationData}
            expandTrigger="hover"
            placeholder="请选择"
          />
          <Button key="show" type="primary" style={{ marginLeft: 10 }} onClick={() => { setCameraVisible(!cameraVisible) }} >
            监控画面
          </Button>
          <label style={{ display: "inline-block", marginRight: 10, lineHeight: "30px", float: "right", fontWeight: "bolder" }}>{updateTime}</label>
        </Col>
        <Divider style={{ margin: 0 }} />
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: "center" }}>
          <div style={{ width: "65%", display: "inline-block" }}>
            <ReactSVG id="svgHMI"
              onClick={(e) => onClickSVG(e)}
              afterInjection={initialSVG}
              src={stationImage}
            />
          </div>
        </Col>
      </Row>

      {controlOption && Object.keys(controlOption).length && deviceControlVisible ? (
        <DeviceControll
          visible={deviceControlVisible}
          option={controlOption}
          onCancel={() => { setDeviceControlVisible(false) }}
          handleTurnOn={handleTurnOn}
          handleTurnOff={handleTurnOff}
        />
      ) : null}

      {cameraVisible ? (

        <div style={{ width: "30%", position: "fixed", left: "10%", top: "20%" }}>
          <Reflv
            url={cameraUrl}
            type="flv"
            isLive
            cors
            config={{
              enableWorker: true,
              enableStashBuffer: false,
              stashInitialSize: 0
            }}
          />
        </div>
      ) : null}

    </PageContainer>
  );
};

// 利用connect拿到当前用户
export default connect(({ user, common }) => ({
  currentUser: user.currentUser,
  oilStationData: common.oilStationData,
}))(ViewPage);

