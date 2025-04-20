"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _reactNative = require("react-native");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _DialogWarnCustom = _interopRequireDefault(require("@components/DialogWarnCustom"));
var _scales = require("@utils/scales");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _helpers = require("@utils/helpers");
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _colors = require("@theme/colors");
var _lmssurveyApi = require("../../../services/lmssurvey.api.js");
var _ItemSurveyEssay = _interopRequireDefault(require("./components/ItemSurveyEssay.js"));
var _ItemSurveyParentChild = _interopRequireDefault(require("./components/ItemSurveyParentChild.js"));
var _ItemSurveyMultipeSelect = _interopRequireDefault(require("./components/ItemSurveyMultipeSelect.js"));
var _ItemSurveyOneSelect = _interopRequireDefault(require("./components/ItemSurveyOneSelect.js"));
var _SurveyDetailScreenStyles = require("./SurveyDetailScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

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
  const dispatch = (0, _reactRedux.useDispatch)();
  const [isShowModal, setShowModal] = (0, _react.useState)(false);
  const [listSurvey, setListSurvey] = (0, _react.useState)([]);
  const isMounteRef = (0, _react.useRef)(false);
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
    style: _SurveyDetailScreenStyles.styles.btnRightHeader,
    onPress: () => {
      const result = (0, _helpers.checkSurveyRequiredEmpty)(listSurvey);
      if (result) {
        setShowModal(true);
      } else {
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-title-survey-screen",
      style: [_SurveyDetailScreenStyles.styles.textRightHeader, {
        color: _colors.Color.base_color
      }]
    })
  });
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-header-survey-screen",
    style: _globalStyles.default.titleScreen
  });
  /**
   * Custom header.
   */
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation, listSurvey]);

  /**
   * Call api survey.
   */
  const funcGetDataSurvey = async () => {
    const response = await (0, _lmssurveyApi.getDataSurvey)(surveyId);
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
          if (question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
            question?.answerData?.forEach(answer => {
              answer.selected = false;
            });
          } else if (question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
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
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetDataSurvey();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
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
        if (item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
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
        } else if (item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 || item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4) {
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
        } else if (item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
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
        } else if (item.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7) {
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
    const response = await (0, _lmssurveyApi.saveUserQuestions)(listResult);
    if (response?.status) {
      const response1 = await (0, _lmssurveyApi.saveUser)(params);
      if (response1?.status) {
        navigation.replace(_constants.default.SURVEY_RESULT_SCREEN, {
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
  const itemGroupSurvey = (item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: item?.name,
      style: _SurveyDetailScreenStyles.styles.textTitleGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [_SurveyDetailScreenStyles.styles.viewItemSurvey, {
        marginTop: index > 0 ? (0, _scales.vertical)(15) : 0
      }],
      children: (0, _helpers.checkListEmpty)(item?.lmsSurveyQuestions) && item?.lmsSurveyQuestions.map((items, indexs) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        children: [items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyOneSelect.default, {
          isDisable: false,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answerId, currState) => onHandleUpdateAnswerSurvey(item?.id, questionId, answerId, currState),
          onHandleUpdateAnswer: (questionId, newAnswer, states) => {
            onHandleUpdateAnswer(item?.id, questionId, newAnswer, states);
          }
        }) : null, items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyMultipeSelect.default, {
          isDisable: false,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answerId, currState) => onHandleUpdateAnswerSurvey(item?.id, questionId, answerId, currState),
          onHandleUpdateAnswer: (questionId, newAnswer, states) => {
            onHandleUpdateAnswer(item?.id, questionId, newAnswer, states);
          }
        }) : null, items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyParentChild.default, {
          isDisable: false,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answerId, subId) => onHandleUpdateSubSurvey(item?.id, questionId, answerId, subId)
        }) : null, items?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSurveyEssay.default, {
          isDisable: true,
          item: items,
          index: indexs,
          onHandleSelect: (questionId, answer) => {
            onHandleUpdateSurveyEssay(item?.id, questionId, answer);
          }
        }) : null, items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 && items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 && items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 && items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 && items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 && items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6 && items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7 && items?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {}) : null]
      }, items?.id || indexs))
    })]
  });
  const renderSubContentData = question => {
    if (question?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 && question?.type !== _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4) {
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
  const onHandleUpdateAnswerSurvey = (0, _react.useCallback)((groupId, questionId, answerId) => {
    setListSurvey(prevListSurvey => prevListSurvey.map(survey => {
      if (survey?.id === groupId) {
        return {
          ...survey,
          lmsSurveyQuestions: survey.lmsSurveyQuestions.map((question, index) => {
            if (question.id === questionId) {
              return {
                ...question,
                answerData: question.answerData.map(answer => {
                  if (question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3) {
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
                  if (question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
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
  const onHandleUpdateSubSurvey = (0, _react.useCallback)((groupId, questionId, answerId, subId) => {
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
                        if (question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5) {
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
                        if (question?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
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
  const onHandleUpdateSurveyEssay = (0, _react.useCallback)((groupId, questionId, newAnswer) => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: _SurveyDetailScreenStyles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      bounces: false,
      data: listSurvey,
      renderItem: ({
        item,
        index
      }) => itemGroupSurvey(item, index),
      ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {}),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogWarnCustom.default, {
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
var _default = exports.default = SurveyDetailScreen;
//# sourceMappingURL=SurveyDetailScreen.js.map