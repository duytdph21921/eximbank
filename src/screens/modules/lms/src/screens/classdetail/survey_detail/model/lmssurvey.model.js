/* eslint-disable max-classes-per-file */
import Constant from '@utils/constants';

export class AnswerDataModel {
  constructor(id, title, mark, selected) {
    this.id = id;
    this.title = title;
    this.mark = mark;
    this.selected = selected;
  }
}

export class SubContentDataModel {
  constructor(id, title, mark, answerData) {
    this.id = id;
    this.title = title;
    this.mark = mark;
    this.answerData = answerData?.map(
      (answer) =>
        new AnswerDataModel(
          answer.id,
          answer.title,
          answer.mark,
          answer.selected
        )
    );
  }
}

export class LmsSurveyQuestionsModel {
  constructor(
    id,
    description,
    type,
    required,
    answer,
    subContent,
    orderNo,
    surveyPartId,
    answerData,
    subContentData,
    lmsSurveyUserQuestionResult
  ) {
    this.id = id;
    this.description = description;
    this.type = type;
    this.required = required;
    this.answer = answer;
    this.subContent = subContent;
    this.orderNo = orderNo;
    this.surveyPartId = surveyPartId;
    this.answerData = answerData?.map(
      (answer) =>
        new AnswerDataModel(
          answer.id,
          answer.title,
          answer.mark,
          answer.selected
        )
    );
    this.subContentData = subContentData?.map(
      (sub) =>
        new SubContentDataModel(sub.id, sub.title, sub.mark, sub.answerData)
    );
    this.lmsSurveyUserQuestionResult = lmsSurveyUserQuestionResult;
  }

  // update survey type: 1, 2, 3, 4
  updateAnswerSelected(typeSelect, answerId) {
    this.answerData.forEach((answer) => {
      if (typeSelect === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1) {
        if (answer.id === answerId) {
          if (answer.selected === true) {
            answer.selected = false;
          } else {
            answer.selected = true;
          }
        } else {
          answer.selected = false;
        }
      } else if (
        typeSelect === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2
      ) {
        if (answer.id === answerId) {
          answer.selected = !answer.selected;
        } else {
          answer.selected = answer.selected ?? false;
        }
      }
    });
  }

  // update survey type: 5, 6
  updateSubSelected(typeSelect, answerId, subId) {
    this.subContentData.forEach((sub) => {
      if (sub.id === subId) {
        sub.answerData.forEach((answer) => {
          if (typeSelect === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5) {
            if (answer.id === answerId) {
              if (answer.selected === true) {
                answer.selected = false;
              } else {
                answer.selected = true;
              }
            } else {
              answer.selected = false;
            }
          } else if (
            typeSelect === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6
          ) {
            if (answer.id === answerId) {
              answer.selected = !answer.selected;
            } else {
              answer.selected = answer.selected ?? false;
            }
          }
        });
      }
    });
  }
}

export class LmsSurveyModel {
  constructor(id, name, description, orderNo, lmsSurveyQuestions) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.orderNo = orderNo;
    this.lmsSurveyQuestions = lmsSurveyQuestions?.map(
      (question) =>
        new LmsSurveyQuestionsModel(
          question.id,
          question.description,
          question.type,
          question.required,
          question.answer,
          question.subContent,
          question.orderNo,
          question.surveyPartId,
          question.answerData,
          question.subContentData,
          question.lmsSurveyUserQuestionResult
        )
    );
  }

  updateQuestionAnswerSelected(questionId, answerId) {
    this.lmsSurveyQuestions.forEach((question) => {
      if (question.id === questionId) {
        question.updateAnswerSelected(question?.type, answerId);
      }
    });
  }

  updateQuestionSubSelected(questionId, answerId, subId) {
    this.lmsSurveyQuestions.forEach((question) => {
      if (question.id === questionId) {
        question?.subContentData?.map((sub) => {
          if (sub.id === subId) {
            question.updateSubSelected(question?.type, answerId, subId);
          }
          return undefined;
        });
      }
    });
  }
}
