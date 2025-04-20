import { enviroment } from '../../assets/enviroment/enviroment.default';
import client from '../instance';

export async function frGetByClassId(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/FrGetByClassId`;
  const response = await client.post(urlApi, model);
  return response;
}
