"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LmsMyTestSearch = void 0;
class LmsMyTestSearch {
  offset = 0;
  limit = 10;
  keyword = '';
  statusRelation = [];
  statusTime = [];
  constructor(offset, limit, keyword, statusRelation, statusTime) {
    this.offset = offset;
    this.limit = limit;
    this.keyword = keyword;
    this.statusRelation = statusRelation;
    this.statusTime = statusTime;
  }
}
exports.LmsMyTestSearch = LmsMyTestSearch;
//# sourceMappingURL=lmsmytestsearch.model.js.map