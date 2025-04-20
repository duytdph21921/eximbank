"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

/**
 * Api lấy thông tin người dùng
 * @param {*} param
 * @returns
 */
export async function postLogin(params) {
  const body = new FormData();
  body.append('grant_type', 'password');
  body.append('client_id', 'web');
  body.append('id_token', params?.id_token ?? '');
  body.append('deviceId', params?.deviceId ?? '');
  body.append('username', params?.usename);
  body.append('password', params?.password);
  const response = await client.post(enviroment.apiDomain.loginEndpoint, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
}
//# sourceMappingURL=login.api.js.map