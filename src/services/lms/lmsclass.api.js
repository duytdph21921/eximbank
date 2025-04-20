import { enviroment } from '@assets/enviroment/enviroment.default';
import client from '../instance';

/**
 * Api lấy danh sách lớp học của tôi màn home.
 * @param {*} param
 * @returns
 */
export async function myClassInHome() {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/MyClassInHome`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api lay danh sach lop hoc moi nhat
 * @returns
 */
export async function newClassInHome() {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/NewClassInHome`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api lay danh sach lop hoc noi bat
 * @returns
 */
export async function outstandingClassInHome() {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/OutstandingClassInHome`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api danh sach lop hoc goi y
 * @returns
 */
export async function topSuggestClassInHome() {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/TopSuggestClassInHome`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api tim kiem lop hoc
 * @param {*} model
 * @returns
 */
export async function searchClass(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/SearchClass`;
  const response = await client.post(urlApi, model);
  return response;
}
/**
 * Api lay thong tin chi tiet lop hoc
 * @param {*} id
 * @returns
 */
export async function getInfoById(id) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetInfoById/${id}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api lấy danh sách lớp học thuộc môn học.
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
export async function getBySubjectId(model) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/GetBySubjectId`;
  const response = await client.post(urlApi, model);
  return response;
}
/**
 * Api học viên đăng ký lớp
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
export async function frUserRegisterClass(classId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserRegisterClass/${classId}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api học viên huỷ đăng ký lớp
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
export async function frUserUnRegisterClass(classId) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserUnRegisterClass/${classId}`;
  const response = await client.get(urlApi);
  return response;
}
/**
 * Api học viên checkin
 * @param {*} dispatch
 * @param {*} paramsListClass
 * @returns
 */
export async function frUserCheckinQRCode(code) {
  const urlApi = `${enviroment.apiDomain.lmsFrontEndpoint}/LmsClass/FrUserCheckinQRCode/${code}`;
  const response = await client.get(urlApi);
  return response;
}
