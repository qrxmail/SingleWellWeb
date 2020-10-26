import request from '@/utils/request';

// 后台api接口
export async function query(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/truck/query?queryStr='+queryStr);
}
export async function remove(params) {
  return request('/api/truck/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function add(params) {
  return request('/api/truck/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function update(params) {
  return request('/api/truck/update', {
    method: 'POST',
    data: { ...params},
  });
}
