"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endTestNew = endTestNew;
exports.getResultClassTestMobile = getResultClassTestMobile;
exports.getTestFormInfo = getTestFormInfo;
exports.ping = ping;
exports.startTestMobile = startTestMobile;
exports.updateAnswerNew = updateAnswerNew;
exports.updateBookmark = updateBookmark;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getTestFormInfo(params) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testClassfrontend}/TestClassUserTest/GetTestFormInfo?testFormId=${params?.testFormId}&classUserId=${params?.classUserId}&classContentId=${params?.classContentId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api bài thi bên trong lớp học.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
async function startTestMobile(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testClassfrontend}/TestClassUserTest/StartTestMobile`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}

/**
 * Api update câu trả lời bài thi bên trong lớp học.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
async function updateAnswerNew(params, model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testClassfrontend}/TestClassUserTest/UpdateAnswerNew/${params?.idClassUserTest}/${params?.id}`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}

/**
 * Api nộp bài thi bên trong lớp học.
 * @param {*} param
 * @returns
 */
async function endTestNew(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testClassfrontend}/TestClassUserTest/EndTestNew?id=${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api xem kết quả bài thi bên trong lớp học.
 * @param {*} param
 * @returns
 */
async function getResultClassTestMobile(params) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testClassfrontend}/TestClassUserTest/GetResultMobile/${params?.id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api update bookmark bài thi bên trong lớp học.
 * @param {*} param
 * @returns
 */
async function updateBookmark(params) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testClassfrontend}/TestClassUserTest/UpdateBookmark/${params?.idClassUserTest}/${params?.id}/${params?.isBookMark}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function ping() {
  const urlApi = `${_enviroment.enviroment.apiDomain.testClassfrontend}/TestClassUserTest/Ping`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=testclassusertest.api.js.map