import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function getByTrainingIdAndUser(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSubject/GetByTrainingIdAndUser`;
  const response = await client.post(urlApi, model);
  return response;
}

export async function getById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSubject/GetById/${id}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api lấy danh sách môn học trong 1 chương trình học.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
export async function getByTrainingId(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSubject/GetByTrainingId`;
  const response = await client.post(urlApi, model);
  return response;
}
