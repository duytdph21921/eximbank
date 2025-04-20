import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

export async function getContentCategoryOnSearchScreen(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContentCategory/GetContentCategoryOnSearchScreen`;
  const response = await client.post(urlApi, model);
  return response;
}

export async function getContentCategoryById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsContentCategory/GetContentCategoryById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
