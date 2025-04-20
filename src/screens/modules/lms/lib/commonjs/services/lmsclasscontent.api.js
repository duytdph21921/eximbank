"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPassWordTest = checkPassWordTest;
exports.frGetByClassId = frGetByClassId;
exports.frGetById = frGetById;
exports.frUserCanViewNew = frUserCanViewNew;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function frGetByClassId(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/FrGetByClassId`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
// Api hoc vien xem chi tiet hoc phan
async function frUserCanViewNew(classUserId, classContentId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/FrUserCanViewNew/${classUserId}/${classContentId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
// Api xem chi tiet thong tin noi dung
async function frGetById(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/FrGetById/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function checkPassWordTest(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassContent/CheckPassWordTest`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
//# sourceMappingURL=lmsclasscontent.api.js.map