import request from '@/utils/request';

// 后台api接口
export async function getStationData(params) {
  let queryStr = JSON.stringify(params);
  //return request('/api/getStationData?queryStr='+queryStr);
  return request('/api/getStationData');
}

export async function deviceControl(params) {
  return request('/api/deviceControl', {
    method: 'POST',
    data: { ...params},
  });
}

export async function setSystemSettingPara(params) {
  return request('/api/setSystemSettingPara', {
    method: 'POST',
    data: { ...params},
  });
}

export async function getStationConfigData(params) {
  let queryStr = JSON.stringify(params);
  //return request('/api/getStationConfigData?queryStr='+queryStr);
  return request('/api/getStationConfigData');
}

// 定时任务管理
export async function quartzTask(type) {
  return request('/api/QuartzTask?type='+type);
}
