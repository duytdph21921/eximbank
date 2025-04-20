import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function frGetByClassId(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/FrGetByClassId`;
  const response = await client.post(urlApi, model);
  return response;
}
// Api hoc vien xem chi tiet hoc phan
export async function frUserCanViewNew(classUserId, classContentId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/FrUserCanViewNew/${classUserId}/${classContentId}`;
  const response = await client.get(urlApi);
  return response;
}
// Api xem chi tiet thong tin noi dung
export async function frGetById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/FrGetById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function checkPassWordTest(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/CheckPassWordTest`;
  const response = await client.post(urlApi, model);
  return response;
}
