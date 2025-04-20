import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

export async function searchRegistorCategory(model) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorCategory/SearchRegistorCategory`;
  const response = await client.post(urlApi, model);
  return response;
}

export async function getRegistorCategoryById(id) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorCategory/GetRegistorCategoryById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
