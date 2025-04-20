"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';
export async function getClassJoined(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetClassJoined`;
  const response = await client.post(urlApi, model);
  return response;
}
export async function getById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function frUserJoinClassNew(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserJoinClassNew/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function getBySubjectIdAndUser(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetBySubjectIdAndUser`;
  const response = await client.post(urlApi, model);
  return response;
}
/**
 * Api học viên đăng ký lớp
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
export async function frUserRegisterClass(classId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserRegisterClass/${classId}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api học viên huỷ đăng ký lớp
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
export async function frUserUnRegisterClass(classId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserUnRegisterClass/${classId}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api học viên đã thi xong
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
export async function frUserFinishTestNew(classId, classUserId, classContentId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserFinishTestNew/${classId}/${classUserId}/${classContentId}`;
  const response = await client.get(urlApi);
  return response;
}
//# sourceMappingURL=lmsclass.api.js.map