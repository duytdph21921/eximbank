"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByKey = getByKey;
exports.getConfigApp = getConfigApp;
exports.getConfigColor = getConfigColor;
exports.getConfigImageLogin = getConfigImageLogin;
exports.getListModule = getListModule;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Api lấy danh sách lớp học của tôi màn home.
 * @param {*} param
 * @returns
 */
async function getConfigApp(urlApi, domain) {
  const url = `https://${urlApi.trim()}/settings.api/api/v1/SystemSettings`;
  try {
    const urlApi = `${url}/GetConfigApp?domain=${domain}`;
    const data = await fetch(urlApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = await data.json();
    return response;
  } catch (error) {
    return error;
  }
}
async function getListModule() {
  const urlApi = `${_enviroment.enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetListModule`;
  const response = await _instance.default.get(urlApi);
  return response;
}
async function getConfigImageLogin() {
  const urlApi = `${_enviroment.enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetConfigImageLogin`;
  const response = await _instance.default.get(urlApi);
  return response;
}
/**
 * Api lấy mã màu
 * @param {*} param
 * @returns
 */
async function getConfigColor() {
  const urlApi = `${_enviroment.enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetConfigColor`;
  const response = await _instance.default.get(urlApi);
  return response;
}
/**
 * Api lấy cau hinh theo key dau vao
 * @param {*} param
 * @returns
 */
async function getByKey(key) {
  const urlApi = `${_enviroment.enviroment.apiDomain.settingsEndpoint}/SystemSettings/GetByKey?key=${key}`;
  const response = await _instance.default.get(urlApi);
  return response;
}
//# sourceMappingURL=systemsettings.api.js.map