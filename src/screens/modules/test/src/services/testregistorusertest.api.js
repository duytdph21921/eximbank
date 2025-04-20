import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function startTest(params) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/StartTest?registorId=${params?.registorId}&registorUserId=${params?.registorUserId}&testFormId=${params?.testFormId}&securityCode=${params?.securityCode}&isExtraTest=${params?.isExtraTest}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api làm bài thi bên ngoài lớp học của tôi.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
export async function doTestMobile(id) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/DoTestMobile?id=${id}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api nộp bài thi bên ngoài lớp học của tôi.
 * @param {*} id
 * @param {*} dispatch
 * @returns
 */
export async function endTestNew(idMyTest) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/EndTestNew?id=${idMyTest}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api update câu trả lời bài thi bên ngoài lớp học của tôi.
 * @param {*} dispatch
 * @returns
 */
export async function updateAnswer(params, model) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/UpdateAnswer/${params?.idRegistorUserTest}/${params?.id}`;
  const response = await client.post(urlApi, model);
  return response;
}

/**
 * Api kết quả bài thi bên ngoài lớp học của tôi.
 * @param {*} id : id bài thi.
 * @param {*} dispatch
 * @returns
 */
export async function getResultMobile(params) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/GetResultMobile?id=${params?.id}&viewDetails=${params?.viewDetails}&isUser=${params?.isUser}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api update bookmark bài thi bên ngoài lớp học của tôi.
 * @param {*} idMyTest : id bài thi.
 * @param {*} id : id câu hỏi thi.
 * @param {*} isBookmark : trạng thái update.
 * @param {*} dispatch
 * @returns
 */
export async function updateBookmark(params) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/UpdateBookmark/${params?.idMyTest}/${params?.id}/${params?.isBookmark}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api update vi phạm thoát màn hình bài thi bên ngoài lớp học của tôi.
 * @param {*} id : id bài thi.
 * @param {*} dispatch
 * @returns
 */
export async function updateViolationLog(id) {
  const urlApi = `${enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/UpdateViolationLog?id=${id}`;
  const response = await client.get(urlApi);
  return response;
}
