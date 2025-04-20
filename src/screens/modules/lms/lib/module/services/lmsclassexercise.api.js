"use strict";

import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';
/**
 * Api bài tập học.
 * @param {*} param
 * @returns
 */
export async function frGetByClassId(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExercise/FrGetByClassId`;
  const response = await client.post(urlApi, model);
  return response;
}
export async function viewDetailExercise(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExercise/ViewDetailExercise/${id}`;
  const response = await client.get(urlApi);
  return response;
}
export async function viewComment(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExercise/ViewComment/${id}`;
  const response = await client.get(urlApi);
  return response;
}
//# sourceMappingURL=lmsclassexercise.api.js.map