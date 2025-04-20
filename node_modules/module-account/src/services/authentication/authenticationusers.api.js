import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '@services/instance';

// Api đổi mật khẩu người dùng
export async function userChangePassword(model) {
  const urlApi = `${enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/UserChangePassword`;
  const response = await client.post(urlApi, model);
  return response;
}
// Api xóa tài khoản
export async function deleteMe() {
  const urlApi = `${enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/deleteMe`;
  const response = await client.get(urlApi);
  return response;
}

/**
 * Api logout.
 */
export async function userLogout(refreshToken) {
  const urlApi = `${enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/userlogout?refreshToken=${refreshToken}`;
  const response = await client.get(urlApi);
  return response;
}
// get setting biometric
export async function getSettingBiometric(deviceId) {
  const urlApi = `${enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/GetSettingBiometric?deviceId=${deviceId}`;
  const response = await client.get(urlApi);
  return response;
}
// insert setting biometric

export async function updateBiometricUser(isBiometric, deviceId) {
  const urlApi = `${enviroment.apiDomain.authenticationEndpoint}/AuthenticationUsers/UpdateBiometricUser?isBiometric=${isBiometric}&deviceId=${deviceId}`;
  const response = await client.get(urlApi);
  return response;
}
