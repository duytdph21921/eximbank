"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByIdAndUserId = getByIdAndUserId;
exports.getMyTest = getMyTest;
exports.myTestInHome = myTestInHome;
exports.testRegistorUserTest = testRegistorUserTest;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getMyTest(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm/GetMyTest`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}

/**
 * Api thông tin bài thi bên ngoài lớp học.
 * @param {*} param
 * @returns
 */
async function getByIdAndUserId(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm/GetByIdAndUserId?id=${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api làm bài thi bên ngoài lớp học của tôi.
 * @param {*} param
 * @returns
 */
async function testRegistorUserTest() {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm`;
  const response = await _instance.default.get(urlApi);
  return response;
}
/**
 * Api lấy danh sách lớp học của tôi màn home.
 * @param {*} param
 * @returns
 */
async function myTestInHome() {
  const urlApi = `${_enviroment.enviroment.apiDomain.testRegistorFrontEndEndpoint}/TestRegistorTestForm/MyTestInHome`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=testregistortestform.api.js.map