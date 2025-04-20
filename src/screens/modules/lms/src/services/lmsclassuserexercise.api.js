import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function submitContent(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExerciseUser/SubmitContent`;
  const response = await client.post(urlApi, model);
  return response;
}
