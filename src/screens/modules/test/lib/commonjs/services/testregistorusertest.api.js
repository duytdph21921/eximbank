"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doTestMobile = doTestMobile;
exports.endTestNew = endTestNew;
exports.getResultMobile = getResultMobile;
exports.startTest = startTest;
exports.updateAnswer = updateAnswer;
exports.updateBookmark = updateBookmark;
exports.updateViolationLog = updateViolationLog;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function startTest(params) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/StartTest?registorId=${params?.registorId}&registorUserId=${params?.registorUserId}&testFormId=${params?.testFormId}&securityCode=${params?.securityCode}&isExtraTest=${params?.isExtraTest}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api làm bài thi bên ngoài lớp học của tôi.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
async function doTestMobile(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/DoTestMobile?id=${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api nộp bài thi bên ngoài lớp học của tôi.
 * @param {*} id
 * @param {*} dispatch
 * @returns
 */
async function endTestNew(idMyTest) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/EndTestNew?id=${idMyTest}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api update câu trả lời bài thi bên ngoài lớp học của tôi.
 * @param {*} dispatch
 * @returns
 */
async function updateAnswer(params, model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/UpdateAnswer/${params?.idRegistorUserTest}/${params?.id}`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}

/**
 * Api kết quả bài thi bên ngoài lớp học của tôi.
 * @param {*} id : id bài thi.
 * @param {*} dispatch
 * @returns
 */
async function getResultMobile(params) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/GetResultMobile?id=${params?.id}&viewDetails=${params?.viewDetails}&isUser=${params?.isUser}`;
  const response = await _instance.default.get(urlApi);
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
async function updateBookmark(params) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/UpdateBookmark/${params?.idMyTest}/${params?.id}/${params?.isBookmark}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api update vi phạm thoát màn hình bài thi bên ngoài lớp học của tôi.
 * @param {*} id : id bài thi.
 * @param {*} dispatch
 * @returns
 */
async function updateViolationLog(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorUserTest/UpdateViolationLog?id=${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=testregistorusertest.api.js.map