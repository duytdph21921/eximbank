import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

export async function uploadFile(model, contentType = 'exercise', objectName = 'lms') {
  const urlApi = `${enviroment.apiDomain.uploadFile}/Upload?contentType=${contentType}&objectName=${objectName}`;
  const response = await client.post(urlApi, model, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
}
