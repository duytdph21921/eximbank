"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import CMText from '@components/CMText';
import { FlatList, SafeAreaView, View } from 'react-native';
import TouchableDebounce from '@components/TouchableDebounce';
import DialogWarnCustom from '@components/DialogWarnCustom';
import { vertical } from '@utils/scales';
import Constant from '@utils/constants';
import { checkListEmpty, checkSurveyRequiredEmpty } from '@utils/helpers';
import globalStyles from '@theme/globalStyles';
import { useDispatch } from 'react-redux';
import { updateLoadingAction, updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { Color } from '@theme/colors';
import { getDataSurvey, saveUser, saveUserQuestions } from "../../../services/lmssurvey.api.js";
import ItemSurveyEssay from "./components/ItemSurveyEssay.js";
import ItemSurveyParentChild from "./components/ItemSurveyParentChild.js";
import ItemSurveyMultipeSelect from "./components/ItemSurveyMultipeSelect.js";
import ItemSurveyOneSelect from "./components/ItemSurveyOneSelect.js";
import { styles } from "./SurveyDetailScreen.styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SurveyDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    surveyId,
    surveyUserId,
    classId,
    learningId
  } = route?.params || {};
  const dispatch = useDispatch();
  const [isShowModal, setShowModal] = useState(false);
  const [listSurvey, setListSurvey] = useState([]);
  const isMounteRef = useRef(false);
  const renderHeaderRight = () => /*#__PURE__*/_jsx(TouchableDebounce, {
    style: styles.btnRightHeader,
    onPress: () => {
      const result = checkSurveyRequiredEmpty(listSurvey);
      if (result) {
        setShowModal(true);
      } else {
        dispatch(updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage: 'text-answer-required',
          contentMessage: '',
          isShowSubmit: false
        }));
      }
    },
    children: /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-title-survey-screen",
      style: [styles.textRightHeader, {
        color: Color.base_color
      }]
    })
  });
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: "text-header-survey-screen",
    style: globalStyles.titleScreen
  });
  /**
   * Custom header.
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation, listSurvey]);

  /**
   * Call api survey.
   */
  const funcGetDataSurvey = async () => {
    const response = await getDataSurvey(surveyId);
    if (response?.status && isMounteRef.current) {
      const listSurveyArray = response?.data;
      listSurveyArray.forEach(survey => {
        survey?.lmsSurveyQuestions?.forEach(question => {
          if (question.subContentData) {
            question.subContentData = question?.subContentData?.map(data => ({
              id: data?.id,
              title: data?.title,
              mark: data?.mark,
              answerData: question?.answerData?.map(answer => ({
                id: answer.id,
                title: answer.title,
                mark: answer.mark,
                selected: false
              }))
            }));
          }
        });
      });
      listSurveyArray.forEach(survey => {
        survey?.lmsSurveyQuestions?.forEach(question => {
          if (question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
            question?.answerData?.forEach(answer => {
              answer.selected = false;
            });
          } else if (question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
            question?.subContentData.forEach(subContent => {
              if (subContent?.answerData) {
                subContent?.answerData?.forEach(answer => {
                  answer.selected = false;
                });
              }
            });
          }
        });
      });
      setListSurvey(listSurveyArray);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetDataSurvey();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * On handle submit survey.
   */
  const onHandlerSubmit = async () => {
    setShowModal(false);
    const listResult = [];
    let diemKhaoSat = 0;
    listSurvey.forEach(itemSurvey => {
      itemSurvey.lmsSurveyQuestions.forEach(item => {
        if (item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
          const answer = item?.answerData?.filter(itemAnswer => itemAnswer.selected === true).map(item => ({
            row: item.id,
            col: -1,
            mark: item.mark
          }));
          answer.forEach(e => {
            diemKhaoSat += e.mark;
          });
          listResult.push({
            surveyQuestionId: item?.id,
            surveyUserId,
            surveyId,
            answer: JSON.stringify(answer),
            subAnswer: null
          });
        } else if (item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 || item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4) {
          let subAnswer = '';
          const answer = item.answerData.filter(itemAnswer => itemAnswer.selected === true).map(items => {
            subAnswer = item.subContentData;
            return {
              row: items.id,
              col: -1,
              mark: items.mark
            };
          });
          answer.forEach(e => {
            diemKhaoSat += e.mark;
          });
          listResult.push({
            surveyQuestionId: item?.id,
            surveyUserId,
            surveyId,
            answer: JSON.stringify(answer),
            subAnswer
          });
        } else if (item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
          const answer = [];
          let tieuChi56 = 0;
          let diem56 = 0;
          item.subContentData.forEach(item => {
            item.answerData.forEach((answerData, index) => {
              if (answerData.selected) {
                answer.push({
                  row: item.id,
                  col: index + 1,
                  mark: item.mark
                });
              }
            });
          });
          answer.forEach(e => {
            diem56 += e.mark;
            tieuChi56 += 1;
          });
          if (tieuChi56 > 0) {
            diemKhaoSat += diem56 / tieuChi56;
          }
          listResult.push({
            surveyQuestionId: item?.id,
            surveyUserId,
            surveyId,
            answer: JSON.stringify(answer),
            subAnswer: null
          });
        } else if (item.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7) {
          listResult.push({
            surveyQuestionId: item?.id,
            surveyUserId,
            surveyId,
            answer: item?.answer,
            subAnswer: null
          });
        }
      });
    });
    const params = {
      surveyId,
      classId,
      completeStatus: 1,
      userLearningId: learningId,
      mark: null,
      totalMark: null
    };
    if (diemKhaoSat > 0 && listResult?.length > 0) {
      params.mark = diemKhaoSat / (listResult?.length ?? 1);
      params.totalMark = diemKhaoSat;
    }
    const response = await saveUserQuestions(listResult);
    if (response?.status) {
      const response1 = await saveUser(params);
      if (response1?.status) {
        navigation.replace(Constant.SURVEY_RESULT_SCREEN, {
          surveyUserId,
          surveyId
        });
      }
    }
  };
  /**
   * Render item group survey.
   * @param {*} param0
   */
  const itemGroupSurvey = (item, index) => /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(CMText, {
      title: item?.name,
      style: styles.textTitleGroup
    }), /*#__PURE__*/_jsx(View, {
      style: [styles.viewItemSurvey, {
        marginTop: index > 0 ? vertical(15) : 0
      }],
      children: checkListEmpty(item?.lmsSurveyQuestions) && item?.lmsSurveyQuestions.map((items, indexs) => /*#__PURE__*/_jsxs(View, {
        children: [items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 ? /*#__PURE__*/_jsx(ItemSurveyOneSelect, {
          isDisable: false,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answerId, currState) => onHandleUpdateAnswerSurvey(item?.id, questionId, answerId, currState),
          onHandleUpdateAnswer: (questionId, newAnswer, states) => {
            onHandleUpdateAnswer(item?.id, questionId, newAnswer, states);
          }
        }) : null, items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8 ? /*#__PURE__*/_jsx(ItemSurveyMultipeSelect, {
          isDisable: false,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answerId, currState) => onHandleUpdateAnswerSurvey(item?.id, questionId, answerId, currState),
          onHandleUpdateAnswer: (questionId, newAnswer, states) => {
            onHandleUpdateAnswer(item?.id, questionId, newAnswer, states);
          }
        }) : null, items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6 ? /*#__PURE__*/_jsx(ItemSurveyParentChild, {
          isDisable: false,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answerId, subId) => onHandleUpdateSubSurvey(item?.id, questionId, answerId, subId)
        }) : null, items?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7 ? /*#__PURE__*/_jsx(ItemSurveyEssay, {
          isDisable: true,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answer) => {
            onHandleUpdateSurveyEssay(item?.id, questionId, answer);
          }
        }) : null, items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 && items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 && items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 && items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 && items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 && items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6 && items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7 && items?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8 ? /*#__PURE__*/_jsx(View, {}) : null]
      }, items?.id || indexs))
    })]
  });
  const renderSubContentData = question => {
    if (question?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 && question?.type !== Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4) {
      return question?.subContentData;
    }
    return null;
  };
  /**
   * Update câu khảo sát chọn 1, nhiều.
   * @param {*} groupId
   * @param {*} questionId
   * @param {*} answerId
   */
  const onHandleUpdateAnswerSurvey = useCallback((groupId, questionId, answerId) => {
    setListSurvey(prevListSurvey => prevListSurvey.map(survey => {
      if (survey?.id === groupId) {
        return {
          ...survey,
          lmsSurveyQuestions: survey.lmsSurveyQuestions.map((question, index) => {
            if (question.id === questionId) {
              return {
                ...question,
                answerData: question.answerData.map(answer => {
                  if (question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3) {
                    if (answer.id === answerId) {
                      return {
                        ...answer,
                        selected: true
                      };
                    }
                    return {
                      ...answer,
                      selected: false
                    };
                  }
                  if (question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
                    if (answer.id === answerId) {
                      return {
                        ...answer,
                        selected: !answer?.selected
                      };
                    }
                    return answer;
                  }
                  return answer;
                }),
                subContentData: renderSubContentData(question)
              };
            }
            return question;
          })
        };
      }
      return survey;
    }));
  }, []);

  /**
   * Update câu khảo sát dạng cha con.
   * @param {*} groupId
   * @param {*} questionId
   * @param {*} answerId
   * @param {*} subId
   */
  const onHandleUpdateSubSurvey = useCallback((groupId, questionId, answerId, subId) => {
    setListSurvey(prevListSurvey => prevListSurvey.map(survey => {
      if (survey?.id === groupId) {
        return {
          ...survey,
          lmsSurveyQuestions: survey.lmsSurveyQuestions.map(question => {
            if (question.id === questionId) {
              return {
                ...question,
                subContentData: question?.subContentData?.map(sub => {
                  if (sub?.id === subId) {
                    return {
                      ...sub,
                      answerData: sub?.answerData?.map(answer => {
                        if (question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5) {
                          if (answer?.id === answerId) {
                            return {
                              ...answer,
                              selected: true
                            };
                          }
                          return {
                            ...answer,
                            selected: false
                          };
                        }
                        if (question?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
                          if (answer?.id === answerId) {
                            return {
                              ...answer,
                              selected: !answer?.selected
                            };
                          }
                          return answer;
                        }
                        return answer;
                      })
                    };
                  }
                  return sub;
                })
              };
            }
            return question;
          })
        };
      }
      return survey;
    }));
  }, []);

  /**
   * Update câu khảo sát dạng tự luận.
   */
  const onHandleUpdateSurveyEssay = useCallback((groupId, questionId, newAnswer) => {
    setListSurvey(prevListSurvey => prevListSurvey.map(survey => {
      if (survey?.id === groupId) {
        return {
          ...survey,
          lmsSurveyQuestions: survey.lmsSurveyQuestions.map(question => {
            if (question.id === questionId) {
              return {
                ...question,
                answer: newAnswer
              };
            }
            return question;
          })
        };
      }
      return survey;
    }));
  }, []);

  /**
   *
   * @param {*} newAnswer : subContentData cần update cho loại 3, 4,
   * @param {*} state : trạng thái hiện tại của câu cần update.
   */
  const onHandleUpdateAnswer = (groupId, questionId, newAnswer, state) => {
    setListSurvey(prevListSurvey => prevListSurvey.map(survey => {
      if (survey?.id === groupId) {
        return {
          ...survey,
          lmsSurveyQuestions: survey.lmsSurveyQuestions.map(question => {
            if (question.id === questionId) {
              return {
                ...question,
                subContentData: state ? newAnswer : ''
              };
            }
            return question;
          })
        };
      }
      return survey;
    }));
  };
  return /*#__PURE__*/_jsxs(SafeAreaView, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(FlatList, {
      bounces: false,
      data: listSurvey,
      renderItem: ({
        item,
        index
      }) => itemGroupSurvey(item, index),
      ListEmptyComponent: /*#__PURE__*/_jsx(View, {}),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false
    }), /*#__PURE__*/_jsx(DialogWarnCustom, {
      isShowModal: isShowModal,
      keyHeader: "text-button-enter-submit",
      keyMessage: "text-content-dialog-survey",
      keySubmit: "text-submit-dialog",
      submitOnPress: onHandlerSubmit,
      cancelOnPress: () => {
        setShowModal(false);
      }
    })]
  });
};
export default SurveyDetailScreen;
//# sourceMappingURL=SurveyDetailScreen.js.map