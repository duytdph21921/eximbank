"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMe = deleteMe;
exports.getSettingBiometric = getSettingBiometric;
exports.updateBiometricUser = updateBiometricUser;
exports.userChangePassword = userChangePassword;
exports.userLogout = userLogout;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Api đổi mật khẩu người dùng
async function userChangePassword(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/UserChangePassword`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
// Api xóa tài khoản
async function deleteMe() {
  const urlApi = `${_enviroment.enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/deleteMe`;
  const response = await _instance.default.get(urlApi);
  return response;
}

/**
 * Api logout.
 */
async function userLogout(refreshToken) {
  const urlApi = `${_enviroment.enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/userlogout?refreshToken=${refreshToken}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
// get setting biometric
async function getSettingBiometric(deviceId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/GetSettingBiometric?deviceId=${deviceId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
// insert setting biometric

async function updateBiometricUser(isBiometric, deviceId) {
  const urlApi = `${_enviroment.enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/UpdateBiometricUser?isBiometric=${isBiometric}&deviceId=${deviceId}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=authenticationusers.api.js.map