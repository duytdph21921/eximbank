"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLearningHistory = getLearningHistory;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function getLearningHistory(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.logEndpoint}/Logs/GetLearningHistory`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
//# sourceMappingURL=logs.api.js.map