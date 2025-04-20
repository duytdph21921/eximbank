"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = getById;
exports.searchTrainingByUser = searchTrainingByUser;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function searchTrainingByUser(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsTraining/SearchTrainingByUser`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
async function getById(id) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsTraining/GetById/${id}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=lmstraining.api.js.map