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

export async function setSystemPara(params) {
  return request('/api/setSystemPara', {
    method: 'POST',
    data: { ...params},
  });
}


