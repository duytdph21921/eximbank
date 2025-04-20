import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function searchFr(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassTopic/SearchFr`;
  const response = await client.post(urlApi, model);
  return response;
}
/**
 * Api post du lieu thao luan
 * @param {*} param
 * @returns
 */
export async function postClassTopic(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassTopic`;
  const response = await client.post(urlApi, model);
  return response;
}
/**
 * Api post du lieu thao luan
 * @param {*} param
 * @returns
 */
export async function getTopicInfo(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassTopic/GetTopicInfo/${id}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api cạp nhat like topic
 * @param {*} param
 * @returns
 */
export async function updateLike(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassTopic/UpdateLike/${id}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api lấy danh sách nội dung kèm thông tin thảo luận mới nhất
 * @param {*} param
 * @returns
 */
export async function getClassContentTopic(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassTopic/GetClassContentTopic/${id}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api post du lieu thao luan chinh sua thao luan
 * @param {*} param
 * @returns
 */
export async function updateClassTopic(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassTopic/Update`;
  const response = await client.post(urlApi, model);
  return response;
}
/**
 * Api post du lieu thao luan chinh sua thao luan
 * @param {*} param
 * @returns
 */
export async function deleteClassTopic(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassTopic/DeleteById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
