import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

export async function getDetail(id, classId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/GetDetail/${id}/${classId}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api Lấy/ cập nhật thông tin người tham gia khảo sát.
 * @param {*} param
 * @returns
 */
export async function saveUser(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/SaveUser`;
  const response = await client.post(urlApi, model);
  return response;
}

/**
 * Api Lấy danh sách câu hỏi khảo sát.
 * @param {*} param
 * @returns
 */
export async function getDataSurvey(surveyId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/GetDataSurvey/${surveyId}`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api Nộp khảo sát.
 * @param {*} param
 * @returns
 */
export async function saveUserQuestions(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/SaveUserQuestions`;
  const response = await client.post(urlApi, model);
  return response;
}

/**
 * Api Xem lại chi tiết bài khảo sát.
 * @param {*} param
 * @returns
 */
export async function getBySurveyUserDetailResult(surveyUserId, surveyId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/GetBySurveyUserDetailResult/${surveyUserId}/${surveyId}`;
  const response = await client.get(urlApi);
  return response;
}
