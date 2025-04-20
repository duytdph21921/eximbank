"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitContent = submitContent;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function submitContent(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.lmsFrontEndpoint}/LmsClassExerciseUser/SubmitContent`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
//# sourceMappingURL=lmsclassuserexercise.api.js.map