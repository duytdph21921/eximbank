import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

/**
 * API lấy danh sách thông báo
 * @param {*} params
 * @returns
 */
export async function feGetNotification(params) {
  const urlApi = `${enviroment.apiDomain.notificationEndpoint}/Notifications/FeGetNotification`;
  const response = await client.post(urlApi, params);
  return response;
}
/**
 * Api update notification readed.
 * @param {*} param
 * @returns
 */
export async function updateNotificationIsRead(id) {
  const urlApi = `${enviroment.apiDomain.notificationEndpoint}/Notifications/Read/${id}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * API lấy danh sách thông báo chưa đọc
 * @returns
 */
export async function getNotificationUnRead() {
  const urlApi = `${enviroment.apiDomain.notificationEndpoint}/Notifications/UnRead`;
  const response = await client.get(urlApi);
  return response;
}
