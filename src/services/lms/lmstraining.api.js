import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

/**
 * Api lấy thông tin CTĐT theo id
 * @param {*} id
 * @returns
 */
export async function getById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsTraining/GetById/${id}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api tìm kiếm chương trình đào tạo.
 * @param {*} param
 * @returns
 */
export async function searchTraining(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsTraining/SearchTraining`;
  const response = await client.post(urlApi, model);
  return response;
}
