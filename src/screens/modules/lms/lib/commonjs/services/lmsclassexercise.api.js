"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frGetByClassId = frGetByClassId;
exports.viewComment = viewComment;
exports.viewDetailExercise = viewDetailExercise;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Api bài tập học.
 * @param {*} param
 * @returns
 */
async function frGetByClassId(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExercise/FrGetByClassId`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
async function viewDetailExercise(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExercise/ViewDetailExercise/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function viewComment(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExercise/ViewComment/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=lmsclassexercise.api.js.map