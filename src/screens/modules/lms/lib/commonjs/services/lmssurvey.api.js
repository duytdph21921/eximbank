"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBySurveyUserDetailResult = getBySurveyUserDetailResult;
exports.getDataSurvey = getDataSurvey;
exports.getDetail = getDetail;
exports.saveUser = saveUser;
exports.saveUserQuestions = saveUserQuestions;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getDetail(id, classId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/GetDetail/${id}/${classId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api Lấy/ cập nhật thông tin người tham gia khảo sát.
 * @param {*} param
 * @returns
 */
async function saveUser(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/SaveUser`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}

/**
 * Api Lấy danh sách câu hỏi khảo sát.
 * @param {*} param
 * @returns
 */
async function getDataSurvey(surveyId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/GetDataSurvey/${surveyId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api Nộp khảo sát.
 * @param {*} param
 * @returns
 */
async function saveUserQuestions(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/SaveUserQuestions`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}

/**
 * Api Xem lại chi tiết bài khảo sát.
 * @param {*} param
 * @returns
 */
async function getBySurveyUserDetailResult(surveyUserId, surveyId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSurvey/GetBySurveyUserDetailResult/${surveyUserId}/${surveyId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=lmssurvey.api.js.map