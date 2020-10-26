import request from '@/utils/request';

// 后台api接口
export async function query(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/oilStation/query?queryStr='+queryStr);
}
export async function remove(params) {
  return request('/api/oilStation/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function add(params) {
  return request('/api/oilStation/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function update(params) {
  return request('/api/oilStation/update', {
    method: 'POST',
    data: { ...params},
  });
}
