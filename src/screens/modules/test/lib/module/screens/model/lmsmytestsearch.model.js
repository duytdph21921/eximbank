"use strict";

export class LmsMyTestSearch {
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
//# sourceMappingURL=lmsmytestsearch.model.js.map