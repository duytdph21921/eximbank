"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDevices = updateDevices;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function updateDevices(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.hrEndpoint}/HrProfileDevices/UpdateDevices`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
//# sourceMappingURL=hrprofiledevices.api.js.map