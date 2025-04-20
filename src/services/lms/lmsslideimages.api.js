import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

export const getSlideHome = async () => {
  const urlApi = `${enviroment.apiDomain.slideEndpoint}/LmsSlideImages/getSlideHome`;
  const response = await client.get(urlApi);
  return response;
};

export async function getOnBoard() {
  const urlApi = `${enviroment.apiDomain.slideEndpoint}/LmsOnBoarding/GetOnBoard`;
  const response = await client.get(urlApi);
  return response;
}
