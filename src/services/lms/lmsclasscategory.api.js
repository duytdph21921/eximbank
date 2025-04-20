import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

/**
 * Api lấy danh sách lớp học của tôi màn home.
 * @param {*} param
 * @returns
 */
export async function getClassCategoryInHome() {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassCategory/GetClassCategoryInHome`;
  const response = await client.get(urlApi);
  return response;
}

export async function getClassCategoryOnSearchScreen(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassCategory/GetClassCategoryOnSearchScreen`;
  const response = await client.post(urlApi, model);
  return response;
}

export async function getClassCategoryById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassCategory/GetClassCategoryById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
