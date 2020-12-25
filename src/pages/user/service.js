import request from '@/utils/request';

// 后台api接口
export async function query(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/user/query?queryStr=' + queryStr);
}
export async function remove(params) {
  return request('/api/user/delete', {
    method: 'POST',
    data: { ...params },
  });
}
export async function add(params) {
  return request('/api/user/add', {
    method: 'POST',
    data: { ...params },
  });
}
export async function update(params) {
  return request('/api/user/update', {
    method: 'POST',
    data: { ...params },
  });
}

// 查询一个
export async function queryObj(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/user/query?queryStr=' + queryStr);
}

// 获取工单二维码
export async function getQRCode(userId) {
  return request('/api/user/getqrcode?userId=' + userId);
}
