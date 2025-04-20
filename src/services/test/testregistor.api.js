import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

/**
 * API tìm kiếm đợt thi
 * @param {*} model
 * @returns
 */
export async function searchRegistor(model) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistor/SearchRegistor`;
  const response = await client.post(urlApi, model);
  return response;
}

/**
 * API lấy thông tin đợt thi
 * @param {*} id
 * @returns
 */
export async function getDetailById(id) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistor/GetDetailById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
