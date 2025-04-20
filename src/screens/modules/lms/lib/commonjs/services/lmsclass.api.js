"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frUserFinishTestNew = frUserFinishTestNew;
exports.frUserJoinClassNew = frUserJoinClassNew;
exports.frUserRegisterClass = frUserRegisterClass;
exports.frUserUnRegisterClass = frUserUnRegisterClass;
exports.getById = getById;
exports.getBySubjectIdAndUser = getBySubjectIdAndUser;
exports.getClassJoined = getClassJoined;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getClassJoined(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetClassJoined`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
async function getById(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetById/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function frUserJoinClassNew(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserJoinClassNew/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function getBySubjectIdAndUser(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetBySubjectIdAndUser`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
/**
 * Api học viên đăng ký lớp
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
async function frUserRegisterClass(classId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserRegisterClass/${classId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
/**
 * Api học viên huỷ đăng ký lớp
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
async function frUserUnRegisterClass(classId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserUnRegisterClass/${classId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
/**
 * Api học viên đã thi xong
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
async function frUserFinishTestNew(classId, classUserId, classContentId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserFinishTestNew/${classId}/${classUserId}/${classContentId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=lmsclass.api.js.map