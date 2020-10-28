import request from '@/utils/request';

// 后台api接口
export async function queryStationData(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/oilStation/query?queryStr='+queryStr);
}

export async function turnOn(params) {
  return request('/api/oilStation/add', {
    method: 'POST',
    data: { ...params},
  });
}

export async function turnOff(params) {
  return request('/api/oilStation/add', {
    method: 'POST',
    data: { ...params},
  });
}


