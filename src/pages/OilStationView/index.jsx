import { connect } from 'umi';
import React, { useState, useEffect } from "react";
import { Button, Cascader, Divider, message, Row, Col } from "antd";
import { PageContainer } from '@ant-design/pro-layout';
import { ReactSVG } from "react-svg";
import SVG from "svg.js";
import stationImage from "../../assets/station-1.svg";
import moment from "moment";
import Reflv from "./reflv.js";

import { getStationData, deviceControl, getStationConfigData, setSystemSettingPara } from './service';
import DeviceControll from './components/DeviceControll';
import SetParamsForm from './components/SetParamsForm'

import '../Common.less';

// 视频监控地址
const cameraUrl = "http://localhost:8000/live/demo.flv";

// 定义设备配置信息（id,名称,操作按钮名称，操作按钮名称）
const deviceConfig = [
  // 打开、关闭指令的设备
  { targetId: "LoopValve01", title: "1#循环阀", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "LoopValve02", title: "2#循环阀", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "OutValve01", title: "1#出油阀", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "OutValve02", title: "2#出油阀", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "Pump01", title: "1#装车泵", turnOnText: "打开", turnOffText: "关闭" },
  { targetId: "Pump02", title: "2#装车泵", turnOnText: "打开", turnOffText: "关闭" },
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
    // 从路由中获取参数query
    location: { query },
  } = props;

  useEffect(() => {

    if (dispatch) {
      dispatch({
        type: 'common/fetchOilStationData',
      });
    }

    let timeId = setInterval(updateHMI, 5000);

    return () => {
      // 相当于 componentWillUnmount
      clearInterval(timeId);
    }
  }, []);

  // 设备控制页面参数
  const [controlOption, setControlOption] = useState({});
  // 设备控制页面是否可见
  const [deviceControlVisible, setDeviceControlVisible] = useState(false);

  // 监控视频是否可见
  const [cameraVisible, setCameraVisible] = useState(false);

  // 设置参数页面是否可见
  const [setParamsModalVisible, handleSetParamsModalVisible] = useState(false);
  // 参数初始值
  const [formValues, setFormValues] = useState({});

  let LoopValve01 = null;  // 1#循环阀
  let LoopValve02 = null;  // 2#循环阀
  let OutValve01 = null;   // 1#出油阀
  let OutValve02 = null;   // 2#出油阀
  let Pump01 = null;  // 1#装车泵
  let Pump02 = null;  // 2#装车泵
  let Gauge01 = null; // 1#罐
  let Gauge02 = null; // 1#罐

  let LoopValve01Value = null;  // 1#循环阀显示值
  let LoopValve02Value = null;  // 2#循环阀显示值
  let OutValve01Value = null;  // 1#出油阀显示值
  let OutValve02Value = null;  // 2#出油阀显示值
  let Pump01Value = null;  // 1#装车泵显示值
  let Pump02Value = null;  // 2#装车泵显示值
  let Gauge01Level = null;  // 1#罐液位显示值
  let Gauge02Level = null;  // 2#罐液位显示值

  // 站点svg图点击事件
  const onClickSVG = (e) => {

    // 从配置文件中找是否有可控制的设备
    let option = deviceConfig.filter((config) => {
      return (config.targetId === e.target.id) || (config.targetId === e.target.parentNode.id);
    });
    if (option.length > 0) {
      setControlOption(option[0]);
      setDeviceControlVisible(true);
    }
  };

  // 设备控制
  const handleDeviceControl = async (fields) => {
    const hide = message.loading('正在操作');
    try {
      let params = {};
      params.name = fields.cmd + fields.targetId;
      params.writeCommand = { stationName: "1", deviceName: "2", newValue: "3" };
      let result = await deviceControl(params);
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

  // 设置参数保存方法
  const handleSetParmas = async (fields) => {
    const hide = message.loading('正在保存');

    // 将null和空字符串的属性去掉
    Object.keys(fields).forEach((key) => {
      //let tkey = key as keyof typeof fields;
      if (fields[key] == null || fields[key] == '') {
        delete fields[key];
      }
    });

    try {
      let result = await setSystemSettingPara(fields);
      hide();
      if (result.isSuccess) {
        message.success('保存成功');
      } else {
        message.error(result.errMsg);
      }
      return result.isSuccess;
    } catch (error) {
      hide();
      message.error('保存失败请重试！');
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
    valveChildren.forEach(function (i) {
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
    if (svgLabel.node !== undefined) {
      svgLabel.node.innerHTML = value;
    }
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

    LoopValve01 = SVG.get("LoopValve01");
    LoopValve02 = SVG.get("LoopValve02");
    OutValve01 = SVG.get("OutValve01");
    OutValve02 = SVG.get("OutValve02");
    Pump01 = SVG.get("Pump01");
    Pump02 = SVG.get("Pump02");
    Gauge01 = SVG.get("Gauge01");
    Gauge02 = SVG.get("Gauge02");

    LoopValve01Value = SVG.get("LoopValve01Value");
    LoopValve02Value = SVG.get("LoopValve02Value");
    OutValve01Value = SVG.get("OutValve01Value");
    OutValve02Value = SVG.get("OutValve02Value");
    Pump01Value = SVG.get("Pump01Value");
    Pump02Value = SVG.get("Pump02Value");
    Gauge01Level = SVG.get("Gauge01Level");
    Gauge02Level = SVG.get("Gauge02Level");

    updateHMI();
  };

  // 获取设备状态名称
  const GetStateName = (obj) => {
    let name = "";
    if (obj.Opened === true && obj.Closed === true) {
      name = "异常";
    } else if (obj.Opened === false && obj.Closed === false) {
      name = "进行中";
    } else if (obj.Opened === true && obj.Closed === false) {
      name = "开到位";
    } else if (obj.Opened === true && obj.Closed === false) {
      name = "关到位";
    } else {
      name = "异常";
    }
    return name;
  }

  const GetModeName = (value) => {
    let name = "";
    switch (value) {
      case 0:
        name = "空闲";
        break;
      case 1:
        name = "待拉油";
        break;
      case 2:
        name = "拉油中";
        break;
      default:
        break;
    }

    return name;
  }

  const updateHMI = async () => {

    // 设置更新时间
    document.getElementById("timeLabel").innerText = moment().format("YYYY年MM月DD日 HH:mm:ss");

    // 获取站点数据
    let stationData = await getStationData();

    // 设置站点设备数据
    // setValveStatus(LoopValve01, stationData.loopValve01Status);
    // setValveStatus(LoopValve02, stationData.loopValve02Status);
    // setValveStatus(OutValve01, stationData.outValve01Status);
    // setValveStatus(OutValve02, stationData.outValve02Status);
    // setDeviceStatus(Pump01, stationData.pump01Status);
    // setDeviceStatus(Pump02, stationData.pump02Status);
    // setHeight(Gauge01, stationData.gauge01level);
    // setHeight(Gauge02, stationData.gauge02level);

    //setSwitch(loadPumpLocalRemote, stationData.loadPumpLocalRemote);

    setText(LoopValve01Value, GetStateName(stationData.LoopValve01));
    setText(LoopValve02Value, GetStateName(stationData.LoopValve02));
    setText(OutValve01Value, GetStateName(stationData.OutValve01));
    setText(OutValve02Value, GetStateName(stationData.OutValve02));
    setText(Pump01Value, GetStateName(stationData.Pump101));
    setText(Pump02Value, GetStateName(stationData.Pump102));
    setText(Gauge01Level, stationData.LT101.EngValue.toFixed(2));
    setText(Gauge02Level, stationData.LT102.EngValue.toFixed(2));

    document.getElementById("modeLabel").innerText = GetModeName(stationData.System.Mode);
  };

  // 绘制页面
  return (
    <PageContainer>
      <Row style={{ backgroundColor: "white", paddingBottom: 40 }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 10 }}>
          <Cascader style={{ width: 300 }}
            options={oilStationData}
            expandTrigger="hover"
            placeholder="请选择"
            defaultValue={[query.branch, query.district, query.pk]}
          />
          {/* <Button key="show" type="primary" style={{ marginLeft: 10 }} onClick={() => { setCameraVisible(!cameraVisible) }} >
            监控画面
          </Button> */}
          <Button key="setParams" type="primary" style={{ marginLeft: 10 }}
            onClick={async () => {
              handleSetParamsModalVisible(true);
              let params = await getStationConfigData({});
              setFormValues(params);
            }} >
            设置参数
          </Button>
          <label id="timeLabel" style={{ display: "inline-block", marginRight: 10, lineHeight: "30px", float: "right", fontWeight: "bolder" }}></label>
          <Button id="modeLabel" style={{ float: "right", marginRight: 10, }} danger ></Button>
        </Col>
        <Divider style={{ margin: 0 }} />
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: "center" }} >
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
          onCancel={() => {
            setDeviceControlVisible(false);
            setControlOption({});
          }}
          handleDeviceControl={async (value) => {
            const success = await handleDeviceControl(value);
            if (success) {
              setDeviceControlVisible(false);
              setControlOption({});
            }
          }}
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

      {/* 参数设置 */}
      { formValues && Object.keys(formValues).length && setParamsModalVisible ? (
        <SetParamsForm
          title="参数设置"
          onSubmit={async (value) => {
            const success = await handleSetParmas(value);
            if (success) {
              handleSetParamsModalVisible(false);
              setFormValues({});
            }
          }}
          onCancel={() => {
            handleSetParamsModalVisible(false);
            setFormValues({});
          }}
          setParamsModalVisible={setParamsModalVisible}
          values={formValues}
        />
      ) : null}

    </PageContainer>
  );
};

// 利用connect拿到当前用户
export default connect(({ user, common }) => ({
  currentUser: user.currentUser,
  oilStationData: common.oilStationData,
}))(ViewPage);

