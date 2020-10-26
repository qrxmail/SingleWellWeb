import request from '@/utils/request';
export async function getOilStation() {
  return request('/api/common/getOilStation');
}
export async function getDriver() {
  return request('/api/common/getDriver');
}
export async function getTruck() {
  return request('/api/common/getTruck');
}

