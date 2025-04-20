import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

export async function getTrainingCategoryOnSearchScreen(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsTrainingCategoryTree/GetTrainingCategoryOnSearchScreen`;
  const response = await client.post(urlApi, model);
  return response;
}

export async function getTrainingCategoryById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsTrainingCategoryTree/GetTrainingCategoryById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
