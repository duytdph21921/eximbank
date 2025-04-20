"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = getById;
exports.getByTrainingId = getByTrainingId;
exports.getByTrainingIdAndUser = getByTrainingIdAndUser;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getByTrainingIdAndUser(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSubject/GetByTrainingIdAndUser`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
async function getById(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSubject/GetById/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api lấy danh sách môn học trong 1 chương trình học.
 * @param {*} params
 * @param {*} dispatch
 * @returns
 */
async function getByTrainingId(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsSubject/GetByTrainingId`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
//# sourceMappingURL=lmssubject.api.js.map