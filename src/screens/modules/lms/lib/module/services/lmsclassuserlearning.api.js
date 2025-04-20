"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';
export async function getClassResultDashboard(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetClassResultDashboard/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function getClassUserInfo(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetClassUserInfo/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function getMarkInfomation(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetMarkInfomation/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function getMarkDetail(id, classContentId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetMarkDetail/${id}/${classContentId}`;
  const response = await client.get(urlApi);
  return response;
}
export async function getMarkExerciseDetail(id, classExerciseId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetMarkExerciseDetail/${id}/${classExerciseId}`;
  const response = await client.get(urlApi);
  return response;
}
export async function updateLastState(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/UpdateLastState`;
  const response = await client.post(urlApi, model);
  return response;
}
//# sourceMappingURL=lmsclassuserlearning.api.js.map