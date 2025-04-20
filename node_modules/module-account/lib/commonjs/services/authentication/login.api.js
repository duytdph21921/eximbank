"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = postLogin;
var _enviroment = require("@assets/enviroment/enviroment.default");
var _instance = _interopRequireDefault(require("@services/instance"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Api lấy thông tin người dùng
 * @param {*} param
 * @returns
 */
async function postLogin(params) {
  const body = new FormData();
  body.append('grant_type', 'password');
  body.append('client_id', 'web');
  body.append('id_token', params?.id_token ?? '');
  body.append('deviceId', params?.deviceId ?? '');
  body.append('username', params?.usename);
  body.append('password', params?.password);
  const response = await _instance.default.post(_enviroment.enviroment.apiDomain.loginEndpoint, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
}
//# sourceMappingURL=login.api.js.map