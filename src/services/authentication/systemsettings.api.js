import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

/**
 * Api lấy danh sách lớp học của tôi màn home.
 * @param {*} param
 * @returns
 */
export async function getConfigApp(urlApi, domain) {
  const url = `https://${urlApi.trim()}/settings.api/api/v1/SystemSettings`;
  try {
    const urlApi = `${url}/GetConfigApp?domain=${domain}`;
    const data = await fetch(urlApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    return error;
  }
}

export async function getListModule() {
  const urlApi = `${enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetListModule`;
  const response = await client.get(urlApi);
  return response;
}
export async function getConfigImageLogin() {
  const urlApi = `${enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetConfigImageLogin`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api lấy mã màu
 * @param {*} param
 * @returns
 */
export async function getConfigColor() {
  const urlApi = `${enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetConfigColor`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api lấy cau hinh theo key dau vao
 * @param {*} param
 * @returns
 */
export async function getByKey(key) {
  const urlApi = `${enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetByKey?key=${key}`;
  const response = await client.get(urlApi);
  return response;
}
