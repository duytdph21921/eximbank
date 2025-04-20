import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function searchTrainingByUser(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsTraining/SearchTrainingByUser`;
  const response = await client.post(urlApi, model);
  return response;
}

export async function getById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsTraining/GetById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
