import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

export async function searchContent(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContent/SearchContent`;
  const response = await client.post(urlApi, model);
  return response;
}
export async function getById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContent/GetById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function updateHistory(contentId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContent/UpdateHistory/${contentId}`;
  const response = await client.get(urlApi);
  return response;
}

export async function updateLike(contentId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContent/UpdateLike/${contentId}`;
  const response = await client.get(urlApi);
  return response;
}

export async function getUserShareContent(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContent/GetUserShareContent`;
  const response = await client.post(urlApi, model);
  return response;
}

export async function updateShare(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContent/UpdateShare`;
  const response = await client.post(urlApi, model);
  return response;
}
export async function updateDownload(contentId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContent/UpdateDownload/${contentId}`;
  const response = await client.get(urlApi);
  return response;
}
