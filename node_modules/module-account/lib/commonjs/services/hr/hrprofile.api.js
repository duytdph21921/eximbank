"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMyInfo = getMyInfo;
exports.getUserInfoDetail = getUserInfoDetail;
exports.register = register;
exports.updateUserInfoDetail = updateUserInfoDetail;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Api lấy thông tin người dùng màn hình tài khoản
async function getMyInfo() {
  const urlApi = `${_enviroment.enviroment.apiDomain.hrEndpoint}/HrProfile/GetMyInfo`;
  const response = await _instance.default.get(urlApi);
  return response;
}
// Api thông tin chi tiết thông tin tài khoản
async function getUserInfoDetail() {
  const urlApi = `${_enviroment.enviroment.apiDomain.hrEndpoint}/HrProfile/GetUserInfoDetail`;
  const response = await _instance.default.get(urlApi);
  return response;
}
// Api cập nhật thông tin tài khoản
async function updateUserInfoDetail(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.hrEndpoint}/HrProfile/UpdateUserInfoDetail`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
// Api thêm mới tài khoản
async function register(model) {
  const urlApi = `${_enviroment.enviroment.apiDomain.hrEndpoint}/HrProfile/Register`;
  const response = await _instance.default.post(urlApi, model);
  return response;
}
//# sourceMappingURL=hrprofile.api.js.map