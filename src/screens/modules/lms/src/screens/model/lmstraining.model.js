/* eslint-disable max-classes-per-file */
export class LmsTrainingSearch {
  constructor(
    offset = 0,
    limit = 20,
    keyword = '',
    statusTraining = [],
    dataRange = [],
    trainingCategoryTreeId = '00000000-0000-0000-0000-000000000000'
  ) {
    this.offset = offset;
    this.limit = limit;
    this.keyword = keyword;
    this.statusTraining = statusTraining;
    this.dataRange = dataRange;
    this.trainingCategoryTreeId = trainingCategoryTreeId;
  }

  static updateStatusTraining(arr, value) {
    return arr.filter((item) => item !== value);
  }
}

export class LmsTrainingModel {
  constructor(
    id,
    title,
    code,
    avatar,
    classTypeName,
    numUser,
    description,
    registerTypeName,
    startDate,
    endDate
  ) {
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

export class LmsTrainingClassSearch {
  constructor(
    offset = 0,
    limit = 20,
    keyword = '',
    subjectId = '59c00ce2-fe4f-4b2a-aca6-362a786f542e',
    trainingId = '00000000-0000-0000-0000-000000000000',
    orderBy = 1,
    statusRelation = [],
    statusClass = []
  ) {
    this.offset = offset;
    this.limit = limit;
    this.keyword = keyword;
    this.subjectId = subjectId;
    this.trainingId = trainingId;
    this.orderBy = orderBy;
    this.statusRelation = statusRelation;
    this.statusClass = statusClass;
  }

  static updateStatusClass(arr, value) {
    return arr.filter((item) => item !== value);
  }
}
