import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

export async function registorTestForm(id) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUser/RegistorTestForm/${id}`;
  const response = await client.get(urlApi);
  return response;
}
