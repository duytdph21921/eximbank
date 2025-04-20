"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';
export async function getMyTest(model) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm/GetMyTest`;
  const response = await client.post(urlApi, model);
  return response;
}

/**
 * Api thông tin bài thi bên ngoài lớp học.
 * @param {*} param
 * @returns
 */
export async function getByIdAndUserId(id) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm/GetByIdAndUserId?id=${id}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api làm bài thi bên ngoài lớp học của tôi.
 * @param {*} param
 * @returns
 */
export async function testRegistorUserTest() {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api lấy danh sách lớp học của tôi màn home.
 * @param {*} param
 * @returns
 */
export async function myTestInHome() {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm/MyTestInHome`;
  const response = await client.get(urlApi);
  return response;
}
//# sourceMappingURL=testregistortestform.api.js.map