"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _BottomSheetQuestion = _interopRequireDefault(require("@components/BottomSheetQuestion"));
var _CountDownHandle = _interopRequireDefault(require("@components/CountDownHandle"));
var _DialogWarnCustom = _interopRequireDefault(require("@components/DialogWarnCustom"));
var _QuestionBottom = _interopRequireDefault(require("@components/QuestionBottom"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _helpers = require("@utils/helpers");
var _ItemQuestion = _interopRequireDefault(require("@components/Questions/ItemQuestion"));
var _ItemQuestionEssay = _interopRequireDefault(require("@components/Questions/ItemQuestionEssay"));
var _ItemQuestionFillBlank = _interopRequireDefault(require("@components/Questions/ItemQuestionFillBlank"));
var _ItemQuestionMultiple = _interopRequireDefault(require("@components/Questions/ItemQuestionMultiple"));
var _ItemQuestionParentChild = _interopRequireDefault(require("@components/Questions/ItemQuestionParentChild"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _iconBack = _interopRequireDefault(require("@assets/icons/icon-back.svg"));
var _netinfo = _interopRequireDefault(require("@react-native-community/netinfo"));
var _useSwipe = require("@hooks/useSwipe");
var _colors = require("@theme/colors");
var _testclassusertestApi = require("../../services/testclassusertest.api.js");
var _lmsclassApi = require("../../services/lmsclass.api.js");
var _MyTestQuestionInClassScreenStyles = require("./MyTestQuestionInClassScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */

const MyTestQuestionInClassScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    id,
    dataMyTest,
    timeCountDown,
    classId,
    content,
    classUserId,
    data,
    learningId
  } = route?.params;
  const [currentQuestion, setCurrentQuestion] = (0, _react.useState)(0);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [listQuestion, setListQuestion] = (0, _react.useState)(dataMyTest?.dataTest ?? []);
  const [listBookmark, setListBookmark] = (0, _react.useState)(dataMyTest?.bookMark ?? []);
  const [isResult, setIsResult] = (0, _react.useState)(false);
  const [isShowModal, setShowModal] = (0, _react.useState)(false);
  const isStopTime = false;
  const refPlay = (0, _react.useRef)();
  const [totalQuestion, setTotalQuestion] = (0, _react.useState)(0);
  const {
    onTouchStart,
    onTouchEnd
  } = (0, _useSwipe.useSwipe)(onSwipeLeft, onSwipeRight, 6);
  /**
   * Back to previous screen
   */
  const onBack = () => {
    navigation.navigate(_constants.default.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
      content,
      classId,
      classUserId,
      learningId
    });
    return true;
  };

  /**
   * Back hander.
   */
  (0, _react.useEffect)(() => {
    _reactNative.BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      _reactNative.BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);

  /**
   * Detect network && state app.
   */
  (0, _react.useEffect)(() => {
    // Lấy trạng thái mạng ban đầu
    const fetchNetworkStatus = async () => {
      // const state = await NetInfo.fetch();
    };
    fetchNetworkStatus();
    const unsubscribe = _netinfo.default.addEventListener(state => {
      // Neu co mang tro lai
      if (state?.isConnected) {
        // Neu ma da het thoi gian thi thu bai
        if (timeCountDown <= 1) {
          onHandlerSubmit();
        }
      }
    });
    const subscriptionAppState = _reactNative.AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        onBack();
      }
    });

    // const unsubscribe = NetInfo.addEventListener((state) => {
    //   if (!state?.isConnected) {
    //     onBack();
    //   }
    // });

    return () => {
      unsubscribe();
      subscriptionAppState.remove();
    };
  }, []);
  (0, _react.useEffect)(() => {
    const listNew = dataMyTest?.dataTest?.filter(item => item.questionType !== -1);
    const listBookmarkNew = dataMyTest?.bookMark?.filter(item => item.questionType !== -1);
    let lastIndex = listNew.findLastIndex(x => x.answer !== '' || x.listSubQuestion && x.listSubQuestion.findLastIndex(c => c.answer !== '') !== -1);
    if (lastIndex === -1) {
      lastIndex = 0;
    }
    setListQuestion(listNew);
    setTotalQuestion(listNew.length);
    setListBookmark(listBookmarkNew);
    setCurrentQuestion(lastIndex);
  }, []);
  const RenderCount = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CountDownHandle.default, {
    durationInSeconds: timeCountDown,
    onPressEndTime: () => {
      /**
       * Hết thời gian làm bài => disable tất cả các câu trả lời.
       * Call api nộp bài update data => chuyển sang màn kết quả bài thi.
       */
      setIsResult(true);
      onHandlerSubmit();
    },
    isStop: isStopTime
  }), [isStopTime, timeCountDown]);

  /**
   * Custom header screeen.
   */
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _MyTestQuestionInClassScreenStyles.styles.viewHeader,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RenderCount, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: _MyTestQuestionInClassScreenStyles.styles.btnSubmitHeader,
      onPress: () => {
        setShowModal(true);
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-button-enter-submit",
        style: [_MyTestQuestionInClassScreenStyles.styles.textSubmitHeader, {
          color: _colors.Color.base_color
        }]
      })
    })]
  });
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
    style: _MyTestQuestionInClassScreenStyles.styles.btnBack,
    onPress: () => {
      refPlay?.current?.hidde();
      onBack();
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconBack.default, {
      width: 44,
      height: 44
    })
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: ''
    });
  }, [isStopTime]);

  /**
   * Click câu trả lời loại chọn nhiều đáp án.
   * @param {*} answerIndex
   */
  const onPressMultipeAnswer = async (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
    const params = {
      idClassUserTest: registorUserTestId,
      id: idQuestion
    };
    const contentAnswer = listQuestion[currentQuestion]?.question?.testAnswer;
    const selectedIndexes = contentAnswer.map(item => {
      if (item.selected) {
        return item.id;
      }
      return undefined;
    }).filter(index => index !== undefined);
    const bodyData = {
      answer: selectedIndexes
    };
    if (selectedIndexes.includes(idAnswer) === true) {
      bodyData.answer = selectedIndexes.filter(item => item !== idAnswer);
    } else {
      bodyData.answer.push(idAnswer);
    }
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await (0, _testclassusertestApi.updateAnswerNew)(params, bodyData);
    if (response?.status) {
      setListQuestion(prevData => prevData.map((item, index) => {
        if (index === currentQuestion) {
          return {
            ...item,
            question: {
              ...item.question,
              testAnswer: item.question.testAnswer.map((answer, i) => {
                if (i === indexAnswer) {
                  return {
                    ...answer,
                    selected: !item.question.testAnswer[indexAnswer].selected
                  };
                }
                return answer;
              })
            }
          };
        }
        return item;
      }));
    }
  };

  /**
   * Click câu trả lời loại chọn 1 đáp án.
   * @param {*} answerIndex
   */
  const onPressAnswer = async (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
    const params = {
      idClassUserTest: registorUserTestId,
      id: idQuestion
    };
    const bodyData = {
      answer: []
    };
    bodyData.answer[0] = idAnswer;
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await (0, _testclassusertestApi.updateAnswerNew)(params, bodyData);
    if (response?.status) {
      setListQuestion(prevData => prevData.map((item, index) => {
        if (index === currentQuestion) {
          return {
            ...item,
            question: {
              ...item.question,
              testAnswer: item.question.testAnswer.map((answer, i) => {
                if (i === indexAnswer) {
                  return {
                    ...answer,
                    selected: true
                  };
                }
                return {
                  ...answer,
                  selected: false
                };
              })
            }
          };
        }
        return item;
      }));
    }
  };

  /**
   * Click câu trả lời cha con với các loại type (1, 2, 4, 5, 10) khác nhau.
   */
  const onPressParentChild = async (idQuestion, registorUserTestId, idAnswer, indexAnswer, parentId, typeChild) => {
    if (typeChild === _constants.default.QUESTION_ONE_SELECT || typeChild === _constants.default.QUESTION_TF) {
      const params = {
        idClassUserTest: registorUserTestId,
        id: idQuestion,
        parentId
      };
      const bodyData = {
        answer: []
      };
      bodyData.answer[0] = idAnswer;
      bodyData.answer = JSON.stringify(bodyData.answer);
      const response = await (0, _testclassusertestApi.updateAnswerNew)(params, bodyData);
      if (response?.status) {
        setListQuestion(prevData => {
          const updatedListQuestion = prevData.map(questionItem => {
            if (questionItem?.registorUserTestId === registorUserTestId) {
              const updatedListSubQuestion = questionItem?.listSubQuestion?.map(subQuestionItem => {
                if (subQuestionItem?.id === idQuestion) {
                  const updatedTestAnswer = subQuestionItem?.question?.testAnswer?.map((answerItem, answerIndex) => {
                    if (answerIndex === indexAnswer) {
                      return {
                        ...answerItem,
                        selected: true
                      };
                    }
                    return {
                      ...answerItem,
                      selected: false
                    };
                  });
                  return {
                    ...subQuestionItem,
                    question: {
                      ...subQuestionItem?.question,
                      testAnswer: updatedTestAnswer
                    }
                  };
                }
                return subQuestionItem;
              });
              return {
                ...questionItem,
                listSubQuestion: updatedListSubQuestion
              };
            }
            return questionItem;
          });
          return updatedListQuestion;
        });
      }
    } else if (typeChild === _constants.default.QUESTION_MULTIPLE_SELECT) {
      const params = {
        idClassUserTest: registorUserTestId,
        id: idQuestion,
        parentId
      };
      const contentAnswer = listQuestion[currentQuestion]?.listSubQuestion?.filter(item => item.id === idQuestion)[0]?.question?.testAnswer;
      const selectedIndexes = contentAnswer.map(item => {
        if (item?.selected) {
          return item?.id;
        }
        return undefined;
      }).filter(index => index !== undefined);
      const bodyData = {
        answer: selectedIndexes
      };
      if (selectedIndexes?.includes(idAnswer) === true) {
        bodyData.answer = selectedIndexes?.filter(item => item !== idAnswer);
      } else {
        bodyData.answer.push(idAnswer);
      }
      bodyData.answer = JSON.stringify(bodyData.answer);
      const response = await (0, _testclassusertestApi.updateAnswerNew)(params, bodyData);
      if (response?.status) {
        setListQuestion(prevData => {
          const updatedListQuestion = prevData.map(questionItem => {
            if (questionItem?.registorUserTestId === registorUserTestId) {
              const updatedListSubQuestion = questionItem?.listSubQuestion?.map(subQuestionItem => {
                if (subQuestionItem?.id === idQuestion) {
                  const updatedTestAnswer = subQuestionItem?.question?.testAnswer?.map((answerItem, answerIndex) => {
                    if (answerIndex === indexAnswer) {
                      return {
                        ...answerItem,
                        selected: !answerItem?.selected
                      };
                    }
                    return answerItem;
                  });
                  return {
                    ...subQuestionItem,
                    question: {
                      ...subQuestionItem?.question,
                      testAnswer: updatedTestAnswer
                    }
                  };
                }
                return subQuestionItem;
              });
              return {
                ...questionItem,
                listSubQuestion: updatedListSubQuestion
              };
            }
            return questionItem;
          });
          return updatedListQuestion;
        });
      }
    }
  };

  /**
   * Click câu trả lời câu hỏi tự luận.
   */
  const onPressAnswerEssay = async (idQuestion, registorUserTestId, answer, parentId) => {
    const params = {
      idClassUserTest: registorUserTestId,
      id: idQuestion,
      parentId
    };
    const bodyData = {
      answer: ''
    };
    const answerContent = {
      content: answer
    };
    bodyData.answer = JSON.stringify(answerContent);
    const response = await (0, _testclassusertestApi.updateAnswerNew)(params, bodyData);
    if (response?.status) {
      const answervalue = `{\"content\":\"${answer}\"}`;
      const updatedData = [...listQuestion];
      updatedData[currentQuestion].answer = answervalue;
      setListQuestion(updatedData);
    }
  };

  /**
   * Submit xử lý nộp bài thi.
   */
  const onHandlerSubmit = (0, _react.useCallback)(async () => {
    setShowModal(false);
    setIsResult(true);
    refPlay?.current?.hidde();
    const response = await (0, _testclassusertestApi.endTestNew)(id);
    if (response?.status) {
      await (0, _lmsclassApi.frUserFinishTestNew)(classId, classUserId, content?.id);
      if (data?.resultDisplayType !== _constants.default.RESULT_DISPLAY_TYPE.showNotDetail && data?.resultDisplayType !== _constants.default.RESULT_DISPLAY_TYPE.showNotAll) {
        navigation.navigate(_constants.default.MY_TEST_RESULT_IN_CLASS_SCREEN, {
          idMyTest: id,
          data
        });
      } else {
        navigation.navigate(_constants.default.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
          callBack: true,
          dataBack: Math.random().toString(36).slice(2, 7),
          content,
          classId,
          classUserId,
          learningId
        });
      }
    }
  }, []);

  /**
   * Render số lượng câu hỏi bottom.
   */
  const RenderBottomQuestion = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_QuestionBottom.default, {
    countQuestion: listQuestion?.length > 0 && listQuestion?.length,
    currentQuestion: currentQuestion + 1,
    onHandleBack: () => {
      refPlay?.current?.hidde();
      setCurrentQuestion(currentQuestion - 1);
    },
    onHandleNext: () => {
      refPlay?.current?.hidde();
      setCurrentQuestion(currentQuestion + 1);
    },
    onHandleBottom: () => {
      setIsOpenModal(true);
    }
  }), [currentQuestion, listQuestion]);

  /**
   * Call api update list bookmark.
   * @param {*} idQuestion
   * @param {*} isBookMark
   */
  const onHandleUpdateBookmark = async (idQuestion, isBookMark) => {
    const params = {
      idClassUserTest: id,
      id: idQuestion,
      isBookMark
    };
    const response = await (0, _testclassusertestApi.updateBookmark)(params);
    if (response?.status) {
      setListBookmark(prevList => prevList.map(item => {
        if (item.id === idQuestion) {
          return {
            ...item,
            isBookMark: !item.isBookMark
          };
        }
        return item;
      }));
    }
  };
  const onHandleNextBackQuestion = index => {
    if (currentQuestion + index < 0 || currentQuestion + index >= totalQuestion) {
      setCurrentQuestion(currentQuestion);
    } else {
      refPlay?.current?.hidde();
      setCurrentQuestion(currentQuestion + index);
    }
  };
  function onSwipeLeft() {
    onHandleNextBackQuestion(1);
  }
  function onSwipeRight() {
    onHandleNextBackQuestion(-1);
  }
  const renderQuestionComponent = () => {
    const questionType = listQuestion[currentQuestion]?.questionType;
    switch (questionType) {
      case _constants.default.QUESTION_ONE_SELECT:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestion.default, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            // Trả về id câu hỏi và id câu trả lời.
            // Call api update câu hỏi.
            onPressAnswer(idQuestion, registorUserTestId, idAnswer, indexAnswer);
          }
        });
      case _constants.default.QUESTION_MULTIPLE_SELECT:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionMultiple.default, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            onPressMultipeAnswer(idQuestion, registorUserTestId, idAnswer, indexAnswer);
          }
        });
      case _constants.default.QUESTION_FILL_BLANK:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionFillBlank.default, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, isAnswer, indexAnswer) => {
            onPressAnswer(indexAnswer);
          }
        });
      case _constants.default.QUESTION_TF:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestion.default, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            onPressAnswer(idQuestion, registorUserTestId, idAnswer, indexAnswer);
          }
        });
      case _constants.default.QUESTION_HC:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionParentChild.default, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer, parentId, typeChild) => {
            onPressParentChild(idQuestion, registorUserTestId, idAnswer, indexAnswer, parentId, typeChild);
          },
          onAnswerPressEssay: (idQuestion, registorUserTestId, answer, parentId) => {
            onPressAnswerEssay(idQuestion, registorUserTestId, answer, parentId);
          }
        });
      case _constants.default.QUESTION_ESSAY:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionEssay.default, {
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, answer) => {
            onPressAnswerEssay(idQuestion, registorUserTestId, answer, 0);
          }
        });
      default:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _MyTestQuestionInClassScreenStyles.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: _MyTestQuestionInClassScreenStyles.styles.container,
      children: [(0, _helpers.checkListEmpty)(listQuestion) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
          bounces: false,
          contentContainerStyle: _MyTestQuestionInClassScreenStyles.styles.viewScrollView,
          showsVerticalScrollIndicator: false,
          onTouchStart: onTouchStart,
          onTouchEnd: onTouchEnd,
          children: renderQuestionComponent()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomQuestion, {})]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetQuestion.default, {
        isOpenModal: isOpenModal,
        closeModal: () => {
          setIsOpenModal(false);
        },
        listQuestion: listQuestion,
        listBookmark: listBookmark,
        onPressQuestion: index => {
          setCurrentQuestion(index);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogWarnCustom.default, {
        isShowModal: isShowModal,
        keyHeader: "text-button-enter-submit",
        keyMessage: "text_dialog_test_submit",
        keySubmit: "text-button-enter-submit",
        submitOnPress: onHandlerSubmit,
        cancelOnPress: () => {
          setShowModal(false);
        }
      })]
    })
  });
};
var _default = exports.default = MyTestQuestionInClassScreen;
//# sourceMappingURL=MyTestQuestionInClassScreen.js.map