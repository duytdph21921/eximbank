import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

/**
 * Api check version app
 * @param {*} param
 * @returns
 */
export async function getCurrentVersion(type) {
  const urlApi = `${enviroment.apiDomain.settingsEndpoint}/SystemVersion/CurrentVersion?type=${type}`;
  const response = await client.get(urlApi);
  return response;
}
