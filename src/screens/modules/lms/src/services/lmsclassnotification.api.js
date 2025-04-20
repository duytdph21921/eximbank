import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function getNotification(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassNotification/Search`;
  const response = await client.post(urlApi, model);
  return response;
}
