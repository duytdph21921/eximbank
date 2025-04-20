"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

// Api lấy thông tin người dùng màn hình tài khoản
export async function getMyInfo() {
  const urlApi = `${enviroment.apiDomain.hrEndpoint}/HrProfile/GetMyInfo`;
  const response = await client.get(urlApi);
  return response;
}
// Api thông tin chi tiết thông tin tài khoản
export async function getUserInfoDetail() {
  const urlApi = `${enviroment.apiDomain.hrEndpoint}/HrProfile/GetUserInfoDetail`;
  const response = await client.get(urlApi);
  return response;
}
// Api cập nhật thông tin tài khoản
export async function updateUserInfoDetail(model) {
  const urlApi = `${enviroment.apiDomain.hrEndpoint}/HrProfile/UpdateUserInfoDetail`;
  const response = await client.post(urlApi, model);
  return response;
}
// Api thêm mới tài khoản
export async function register(model) {
  const urlApi = `${enviroment.apiDomain.hrEndpoint}/HrProfile/Register`;
  const response = await client.post(urlApi, model);
  return response;
}
//# sourceMappingURL=hrprofile.api.js.map