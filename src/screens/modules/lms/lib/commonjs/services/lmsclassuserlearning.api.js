"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassResultDashboard = getClassResultDashboard;
exports.getClassUserInfo = getClassUserInfo;
exports.getMarkDetail = getMarkDetail;
exports.getMarkExerciseDetail = getMarkExerciseDetail;
exports.getMarkInfomation = getMarkInfomation;
exports.updateLastState = updateLastState;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getClassResultDashboard(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetClassResultDashboard/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function getClassUserInfo(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetClassUserInfo/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function getMarkInfomation(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetMarkInfomation/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function getMarkDetail(id, classContentId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetMarkDetail/${id}/${classContentId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function getMarkExerciseDetail(id, classExerciseId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/GetMarkExerciseDetail/${id}/${classExerciseId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function updateLastState(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassUserLearning/UpdateLastState`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
//# sourceMappingURL=lmsclassuserlearning.api.js.map