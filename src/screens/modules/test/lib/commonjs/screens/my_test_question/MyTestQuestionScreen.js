"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _CountDownHandle = _interopRequireDefault(require("@components/CountDownHandle"));
var _QuestionBottom = _interopRequireDefault(require("@components/QuestionBottom"));
var _ItemQuestion = _interopRequireDefault(require("@components/Questions/ItemQuestion"));
var _ItemQuestionEssay = _interopRequireDefault(require("@components/Questions/ItemQuestionEssay"));
var _ItemQuestionFillBlank = _interopRequireDefault(require("@components/Questions/ItemQuestionFillBlank"));
var _ItemQuestionMultiple = _interopRequireDefault(require("@components/Questions/ItemQuestionMultiple"));
var _ItemQuestionParentChild = _interopRequireDefault(require("@components/Questions/ItemQuestionParentChild"));
var _BottomSheetQuestion = _interopRequireDefault(require("@components/BottomSheetQuestion"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _DialogWarnCustom = _interopRequireDefault(require("@components/DialogWarnCustom"));
var _iconBack = _interopRequireDefault(require("@assets/icons/icon-back.svg"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _helpers = require("@utils/helpers");
var _useSwipe = require("@hooks/useSwipe");
var signalR = _interopRequireWildcard(require("@microsoft/signalr"));
var _enviroment = require("@assets/enviroment/enviroment.default");
var _colors = require("@theme/colors");
var _storage = require("@utils/storage");
var _testregistorusertestApi = require("../../services/testregistorusertest.api.js");
var _MyTestQuestionScreenStyles = require("./MyTestQuestionScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-escape */

/**
 * V.2. Màn hình làm bài thi.
 * @param {*} props
 * @returns
 */const MyTestQuestionScreen = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    navigation,
    route
  } = props;
  const {
    id,
    data
  } = route?.params;
  const [currentQuestion, setCurrentQuestion] = (0, _react.useState)(0);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [listQuestion, setListQuestion] = (0, _react.useState)([]);
  const [listBookmark, setListBookmark] = (0, _react.useState)([]);
  const [timeCountDown, setTimeCountDown] = (0, _react.useState)();
  const [isResult, setIsResult] = (0, _react.useState)(false);
  const [isShowModal, setShowModal] = (0, _react.useState)(false);
  const [idMyTest, setIdMyTest] = (0, _react.useState)(id);
  const refPlay = (0, _react.useRef)();
  const isMounteRef = (0, _react.useRef)(false);
  const [totalQuestion, setTotalQuestion] = (0, _react.useState)(0);
  const [registorModel, setRegistorModel] = (0, _react.useState)();
  const [userTestModel, setUserTestModel] = (0, _react.useState)();
  const {
    onTouchStart,
    onTouchEnd
  } = (0, _useSwipe.useSwipe)(onSwipeLeft, onSwipeRight, 6);
  const isConnected = (0, _reactRedux.useSelector)(state => state.global.isConnected);
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  /**
   * Back to previous screen
   */
  const onBack = () => {
    // Ngat ket noi socket
    if (connection.state === signalR.HubConnectionState.Connected) {
      connection.stop();
    }
    onCheckUnFocus(true);
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
   * Connect socket.
   */
  (0, _react.useEffect)(() => {
    const socketUrl = `${_storage.storage.getString(_constants.default.DOMAIN)}${_enviroment.enviroment.apiDomain.testRegistorFrontEndSocketEndpoint}?ruId=${id}`;
    connection = new signalR.HubConnectionBuilder().withUrl(socketUrl, {
      accessTokenFactory: async () => _storage.storage.getString(_constants.default.KEY_USER_TOKEN),
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      logger: signalR.LogLevel.None
    }).build();
    connection.start().then(() => {
      clearTimeout(socketHanderId);
      socketHanderId = setTimeout(() => {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          connection.start();
        }
      }, 5000);
      connection.on('AddTimeCompleted', (payload, addTime) => {
        let newTime = timeCountDown;
        if (!isNaN(payload)) {
          newTime = Math.floor(payload);
        }
        setTimeCountDown(newTime);
        const textMessage = `Bạn vừa được cộng thêm ${addTime} phút vào thời gian làm bài!`;
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-notification',
          contentMessage: textMessage,
          keyCancel: 'text-close',
          isShowCancel: true,
          isShowSubmit: false
        }));
      });
    }).catch(error => {});
    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, [isConnected]);
  /**
   * Lấy data danh sách câu hỏi bài thi bên ngoài lớp học.
   */
  const funcDoTestMobile = async () => {
    const response = await (0, _testregistorusertestApi.doTestMobile)(id);
    if (response?.status && isMounteRef.current) {
      // Chỉ lấy câu hỏi thảo mãn dk.
      const listNew = response?.data?.dataTest.filter(item => item.questionType !== -1);
      const listBookmarkNew = response?.data?.bookMark.filter(item => item.questionType !== -1);
      // listNew.forEach(e=>{
      //   e.question?.mediaType = mediaType(e.question?.mediaUrl);
      // })
      let lastIndex = listNew.findLastIndex(x => x.answer !== '' || x.listSubQuestion && x.listSubQuestion.findLastIndex(c => c.answer !== '') !== -1);
      if (lastIndex === -1) {
        lastIndex = 0;
      }
      setUserTestModel(response?.data);
      setRegistorModel(response?.data?.registor);
      setIdMyTest(response?.data?.id);
      setListQuestion(listNew);
      setTotalQuestion(listNew.length);
      setListBookmark(listBookmarkNew);
      setTimeCountDown(Math.floor(response?.data?.totalSeconds));
      // setTimeCountDown(Math.floor(6000));
      setCurrentQuestion(lastIndex);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcDoTestMobile();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [isConnected]);
  const RenderCount = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CountDownHandle.default, {
    durationInSeconds: timeCountDown,
    onPressEndTime: () => {
      /**
       * Hết thời gian làm bài => disable tất cả các câu trả lời.
       * Call api nộp bài update data => chuyển sang màn kết quả bài thi.
       */
      // setIsResult(true);
      onHandlerSubmit();
    }
  }), [timeCountDown]);

  /**
   * Custom header screeen.
   */

  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _MyTestQuestionScreenStyles.styles.viewHeader,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RenderCount, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: _MyTestQuestionScreenStyles.styles.btnSubmitHeader,
      onPress: () => {
        setShowModal(true);
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-button-enter-submit",
        style: [_MyTestQuestionScreenStyles.styles.textSubmitHeader, {
          color: _colors.Color.base_color
        }]
      })
    })]
  });
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
    style: _MyTestQuestionScreenStyles.styles.btnBack,
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
  }, [timeCountDown]);

  /**
   * Detect network && state app
   */
  (0, _react.useEffect)(() => {
    let stateApp = 'active';
    const subscriptionAppState = _reactNative.AppState.addEventListener('change', nextAppState => {
      if (_platforms.isIOS) {
        if (nextAppState === 'inactive' && stateApp === 'active') {
          stateApp = nextAppState;
          onCheckUnFocus(true);
        } else {
          stateApp = nextAppState;
        }
      } else if (nextAppState === 'background' && stateApp === 'active') {
        stateApp = nextAppState;
        onCheckUnFocus(true);
      } else {
        stateApp = nextAppState;
      }
    });
    return () => {
      subscriptionAppState.remove();
    };
  }, [registorModel]);
  const onCheckUnFocus = async (isBack = false) => {
    if (!isResult) {
      if (registorModel && userTestModel && registorModel?.warningLostFocus && registorModel?.autoFinishIfLostFocusCount && registorModel?.autoFinishIfLostFocusCount > 0) {
        // Update so lan thoat man hinh
        const response = await (0, _testregistorusertestApi.updateViolationLog)(id);
        if (response?.status && response?.data) {
          // show canh bao cho nguoi dung
          const textMessage = `Bạn vừa thoát màn hình làm bài ${response?.data} lần. Vui lòng không thoát màn hình làm bài trong suốt thời gian làm bài`;
          if (response?.data >= registorModel?.autoFinishIfLostFocusCount) {
            onEndTest();
          }
          dispatch((0, _globalSlice.updateShowDialogWarnAction)({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-warning',
            contentMessage: textMessage,
            keyCancel: 'text-close',
            isShowCancel: true,
            isShowSubmit: false
          }));
          if (isBack) {
            navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, {
              callBack: true,
              dataBack: Math.random().toString(36).slice(2, 7)
            });
          }
        } else if (isBack) {
          navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, {
            callBack: true,
            dataBack: Math.random().toString(36).slice(2, 7)
          });
        }
      } else if (isBack) {
        navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, {
          callBack: true,
          dataBack: Math.random().toString(36).slice(2, 7)
        });
      }
    } else if (isBack) {
      navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, {
        callBack: true,
        dataBack: Math.random().toString(36).slice(2, 7)
      });
    }
  };
  const onEndTest = async () => {
    setIsResult(true);
    refPlay?.current?.hidde();
    const response = await (0, _testregistorusertestApi.endTestNew)(id);
    if (response?.status && response?.data) {
      if (data?.showResultAll) {
        navigation.navigate(_constants.default.MY_TEST_RESULT_SCREEN, {
          idMyTest: id,
          showMark: data?.showMark,
          showResultAll: data?.showResultAll,
          showResultQuestion: data?.showResultQuestion,
          showQuestionAnswer: data?.showQuestionAnswer
        });
      } else {
        navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, {
          callBack: true,
          dataBack: Math.random().toString(36).slice(2, 7)
        });
      }
    } else {
      navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, {
        callBack: true,
        dataBack: Math.random().toString(36).slice(2, 7)
      });
    }
  };
  /**
   * Click câu trả lời loại chọn nhiều đáp án.
   * @param {*} answerIndex
   */
  const onPressMultipeAnswer = async (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
    const params = {
      idRegistorUserTest: registorUserTestId,
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
      answer: selectedIndexes || []
    };
    if (selectedIndexes.includes(idAnswer) === true) {
      bodyData.answer = selectedIndexes.filter(item => item !== idAnswer);
    } else {
      bodyData.answer.push(idAnswer);
    }
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await (0, _testregistorusertestApi.updateAnswer)(params, bodyData);
    if (response?.status) {
      setListQuestion(prevListQuestion => prevListQuestion.map(question => {
        if (question.id === idQuestion) {
          return {
            ...question,
            question: {
              ...question.question,
              testAnswer: question.question.testAnswer.map(answer => answer.id === idAnswer ? {
                ...answer,
                selected: !answer.selected
              } : answer)
            }
          };
        }
        return question;
      }));
    }
  };
  /**
   * Click câu trả lời loại chọn 1 đáp án.
   * @param {*} answerIndex
   */
  const onPressAnswer = async (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
    const params = {
      idRegistorUserTest: registorUserTestId,
      id: idQuestion
    };
    const bodyData = {
      answer: []
    };
    bodyData.answer[0] = idAnswer;
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await (0, _testregistorusertestApi.updateAnswer)(params, bodyData);
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
        idRegistorUserTest: registorUserTestId,
        id: idQuestion,
        parentId
      };
      const bodyData = {
        answer: []
      };
      bodyData.answer[0] = idAnswer;
      bodyData.answer = JSON.stringify(bodyData.answer);
      const response = await (0, _testregistorusertestApi.updateAnswer)(params, bodyData);
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
        idRegistorUserTest: registorUserTestId,
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
      const response = await (0, _testregistorusertestApi.updateAnswer)(params, bodyData);
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
      idRegistorUserTest: registorUserTestId,
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
    const response = await (0, _testregistorusertestApi.updateAnswer)(params, bodyData);
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
  const onHandlerSubmit = (0, _react.useCallback)(async event => {
    setShowModal(false);
    setIsResult(true);
    refPlay?.current?.hidde();
    const response = await (0, _testregistorusertestApi.endTestNew)(idMyTest);
    if (response?.status && response?.data) {
      if (data?.showResultAll) {
        navigation.navigate(_constants.default.MY_TEST_RESULT_SCREEN, {
          idMyTest,
          showMark: data?.showMark,
          showResultAll: data?.showResultAll,
          showResultQuestion: data?.showResultQuestion,
          showQuestionAnswer: data?.showQuestionAnswer
        });
      } else {
        navigation.navigate(_constants.default.MY_TEST_INFORMATION_SCREEN, {
          callBack: true,
          dataBack: Math.random().toString(36).slice(2, 7)
        });
      }
    }
  }, [idMyTest]);

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
  }), [currentQuestion, listQuestion, idMyTest]);

  /**
   * Call api update list bookmark.
   * @param {*} idQuestion
   * @param {*} isBookMark
   */
  const onHandleUpdateBookmark = async (idQuestion, isBookMark) => {
    const params = {
      idMyTest,
      id: idQuestion,
      isBookmark: isBookMark
    };
    const response = await (0, _testregistorusertestApi.updateBookmark)(params);
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
    _reactNative.Keyboard.dismiss();
    onHandleNextBackQuestion(1);
  }
  function onSwipeRight() {
    _reactNative.Keyboard.dismiss();
    onHandleNextBackQuestion(-1);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _MyTestQuestionScreenStyles.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: _MyTestQuestionScreenStyles.styles.container,
      children: [(0, _helpers.checkListEmpty)(listQuestion) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
          bounces: false,
          contentContainerStyle: _MyTestQuestionScreenStyles.styles.viewScrollView,
          showsVerticalScrollIndicator: false,
          scrollEnabled: true,
          onTouchStart: onTouchStart,
          onTouchEnd: onTouchEnd,
          children: listQuestion[currentQuestion]?.questionType === _constants.default.QUESTION_ONE_SELECT ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestion.default, {
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
          }) : listQuestion[currentQuestion]?.questionType === _constants.default.QUESTION_MULTIPLE_SELECT ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionMultiple.default, {
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
          }) : listQuestion[currentQuestion]?.questionType === _constants.default.QUESTION_FILL_BLANK ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionFillBlank.default, {
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
          }) : listQuestion[currentQuestion]?.questionType === _constants.default.QUESTION_TF ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestion.default, {
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
          }) : listQuestion[currentQuestion]?.questionType === _constants.default.QUESTION_HC ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionParentChild.default, {
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
          }) : listQuestion[currentQuestion]?.questionType === _constants.default.QUESTION_ESSAY ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionEssay.default, {
            isResult: isResult,
            itemQuestion: listQuestion[currentQuestion],
            itemBookmark: listBookmark[currentQuestion],
            currentQuestion: currentQuestion,
            refPlay: refPlay,
            updateBookmark: onHandleUpdateBookmark,
            onAnswerPress: (idQuestion, registorUserTestId, answer) => {
              onPressAnswerEssay(idQuestion, registorUserTestId, answer, 0);
            }
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {})
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
        cancelOnPress: event => {
          setShowModal(false);
        }
      })]
    })
  });
};
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
var _default = exports.default = MyTestQuestionScreen;
//# sourceMappingURL=MyTestQuestionScreen.js.map