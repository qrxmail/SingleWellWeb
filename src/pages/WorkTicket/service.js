import request from '@/utils/request';

// 后台api接口
export async function query(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/workticket/query?queryStr='+queryStr);
}
export async function remove(params) {
  return request('/api/workticket/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function add(params) {
  return request('/api/workticket/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function update(params) {
  return request('/api/workticket/update', {
    method: 'POST',
    data: { ...params},
  });
}

// 查询一个
export async function queryObj(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/workticket/query?queryStr='+queryStr);
}

// 获取工单二维码
export async function getQRCode(pk) {
  return request('/api/workticket/getqrcode?gid='+pk);
}

// 导出报表
export async function exportReport(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/workticket/exportReport?queryStr='+queryStr);
}

// 接单
export async function receive(params) {
  return request('/api/workticket/receive', {
    method: 'POST',
    data: { ...params},
  });
}
// 授权
export async function grant(params) {
  return request('/api/workticket/grant', {
    method: 'POST',
    data: { ...params},
  });
}
// 拉油
export async function load(params) {
  return request('/api/workticket/load', {
    method: 'POST',
    data: { ...params},
  });
}
// 卸油
export async function unload(params) {
  return request('/api/workticket/unload', {
    method: 'POST',
    data: { ...params},
  });
}
// 审批
export async function review(params) {
  return request('/api/workticket/review', {
    method: 'POST',
    data: { ...params},
  });
}
// 作废
export async function tovoid(params) {
  return request('/api/workticket/tovoid', {
    method: 'POST',
    data: { ...params},
  });
}