"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LmsClassSearch = exports.LmsClassModel = void 0;
/* eslint-disable max-classes-per-file */
class LmsClassSearch {
  offset = 0;
  limit = 20;
  keyword = '';
  orderBy = null;
  statusRelation = [];
  statusClass = [];
  statusLearn = []; // Trạng thái học tập

  dataRange = [];
  classOrganizationType = []; // Loại tổ chức

  classCategoryId = '00000000-0000-0000-0000-000000000000';
  constructor(offset, limit, keyword, orderBy, statusRelation, statusClass, dataRange, classOrganizationType, classCategoryId, statusLearn) {
    this.offset = offset;
    this.limit = limit;
    this.keyword = keyword;
    this.orderBy = orderBy;
    this.statusRelation = statusRelation;
    this.statusClass = statusClass;
    this.dataRange = dataRange;
    this.classOrganizationType = classOrganizationType;
    this.classCategoryId = classCategoryId;
    this.statusLearn = statusLearn;
  }
  static updateStatusClass(arr, value) {
    let i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        i += 1;
      }
    }
    return arr;
  }
}
exports.LmsClassSearch = LmsClassSearch;
class LmsClassModel {
  constructor(id, title, code, avatar, classTypeName, numUser, description, registerTypeName, startDate, endDate) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.avatar = avatar;
    this.classTypeName = classTypeName;
    this.numUser = numUser;
    this.description = description;
    this.registerTypeName = registerTypeName;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
exports.LmsClassModel = LmsClassModel;
//# sourceMappingURL=lmsclass.model.js.map