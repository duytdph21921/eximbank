"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';
export async function updateDevices(model) {
  const urlApi = `${enviroment.apiDomain.hrEndpoint}/HrProfileDevices/UpdateDevices`;
  const response = await client.post(urlApi, model);
  return response;
}
//# sourceMappingURL=hrprofiledevices.api.js.map