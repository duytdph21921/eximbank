"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';
export async function getLearningHistory(model) {
  const urlApi = `${enviroment.apiDomain.logEndpoint}/Logs/GetLearningHistory`;
  const response = await client.post(urlApi, model);
  return response;
}
//# sourceMappingURL=logs.api.js.map