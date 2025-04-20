import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function getTestFormInfo(params) {
  const urlApi = `${enviroment.apiDomain.testClassfrontend}/TestClassUserTest/GetTestFormInfo?testFormId=${params?.testFormId}&classUserId=${params?.classUserId}&classContentId=${params?.classContentId}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api bài thi bên trong lớp học.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
export async function startTestMobile(model) {
  const urlApi = `${enviroment.apiDomain.testClassfrontend}/TestClassUserTest/StartTestMobile`;
  const response = await client.post(urlApi, model);
  return response;
}

/**
 * Api update câu trả lời bài thi bên trong lớp học.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
export async function updateAnswerNew(params, model) {
  const urlApi = `${enviroment.apiDomain.testClassfrontend}/TestClassUserTest/UpdateAnswerNew/${params?.idClassUserTest}/${params?.id}`;
  const response = await client.post(urlApi, model);
  return response;
}

/**
 * Api nộp bài thi bên trong lớp học.
 * @param {*} param
 * @returns
 */
export async function endTestNew(id) {
  const urlApi = `${enviroment.apiDomain.testClassfrontend}/TestClassUserTest/EndTestNew?id=${id}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api xem kết quả bài thi bên trong lớp học.
 * @param {*} param
 * @returns
 */
export async function getResultClassTestMobile(params) {
  const urlApi = `${enviroment.apiDomain.testClassfrontend}/TestClassUserTest/GetResultMobile/${params?.id}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api update bookmark bài thi bên trong lớp học.
 * @param {*} param
 * @returns
 */
export async function updateBookmark(params) {
  const urlApi = `${enviroment.apiDomain.testClassfrontend}/TestClassUserTest/UpdateBookmark/${params?.idClassUserTest}/${params?.id}/${params?.isBookMark}`;
  const response = await client.get(urlApi);
  return response;
}
export async function ping() {
  const urlApi = `${enviroment.apiDomain.testClassfrontend}/TestClassUserTest/Ping`;
  const response = await client.get(urlApi);
  return response;
}
