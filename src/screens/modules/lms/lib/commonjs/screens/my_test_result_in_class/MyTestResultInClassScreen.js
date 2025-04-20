"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _reactNative = require("react-native");
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _QuestionBottom = _interopRequireDefault(require("@components/QuestionBottom"));
var _helpers = require("@utils/helpers");
var _ItemQuestion = _interopRequireDefault(require("@components/QuestionsResult/ItemQuestion"));
var _ItemQuestionMultiple = _interopRequireDefault(require("@components/QuestionsResult/ItemQuestionMultiple"));
var _ItemQuestionFillBlank = _interopRequireDefault(require("@components/QuestionsResult/ItemQuestionFillBlank"));
var _ItemQuestionParentChild = _interopRequireDefault(require("@components/QuestionsResult/ItemQuestionParentChild"));
var _ItemQuestionEssay = _interopRequireDefault(require("@components/QuestionsResult/ItemQuestionEssay"));
var _BottomSheetQuestionResult = _interopRequireDefault(require("@components/BottomSheetQuestionResult"));
var _useSwipe = require("@hooks/useSwipe");
var _MyTestResultInClassScreenStyles = require("./MyTestResultInClassScreen.styles.js");
var _testclassusertestApi = require("../../services/testclassusertest.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */

const MyTestResultInClassScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    idMyTest,
    data
  } = route?.params;
  const [currentQuestion, setCurrentQuestion] = (0, _react.useState)(0);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [listQuestion, setListQuestion] = (0, _react.useState)([]);
  const [listResult, setListResult] = (0, _react.useState)([]);
  const isMounteRef = (0, _react.useRef)(false);
  const refPlay = (0, _react.useRef)();
  const [totalQuestion, setTotalQuestion] = (0, _react.useState)(0);
  const {
    onTouchStart,
    onTouchEnd
  } = (0, _useSwipe.useSwipe)(onSwipeLeft, onSwipeRight, 6);
  const funcGetResultClassTestMobile = async params => {
    const response = await (0, _testclassusertestApi.getResultClassTestMobile)(params);
    if (response?.status && isMounteRef.current) {
      const listNew = response?.data?.dataTest?.filter(item => item?.questionType !== -1);
      const listNewBookMark = response?.data?.bookMark?.filter(item => item?.questionType !== -1);
      setListQuestion(listNew);
      setTotalQuestion(listNew.length);
      setListResult(listNewBookMark);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    const params = {
      id: idMyTest
    };
    funcGetResultClassTestMobile(params);
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Back to previous screen
   */
  const onBack = () => {
    navigation.navigate(_constants.default.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7)
    });
    // return true;
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
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-header-test-result-screen",
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  /**
   * Render số lượng câu hỏi bottom.
   */
  const RenderBottomQuestion = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_QuestionBottom.default, {
    countQuestion: listQuestion?.length > 0 && listQuestion?.length,
    currentQuestion: currentQuestion + 1,
    onHandleBack: () => {
      setCurrentQuestion(currentQuestion - 1);
    },
    onHandleNext: () => {
      setCurrentQuestion(currentQuestion + 1);
    },
    onHandleBottom: () => {
      setIsOpenModal(true);
    }
  }), [currentQuestion, listQuestion]);
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
          isResult: true,
          itemQuestion: listQuestion[currentQuestion],
          currentQuestion: currentQuestion,
          showQuestionAnswer: data?.showQuestionAnswer
        });
      case _constants.default.QUESTION_MULTIPLE_SELECT:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionMultiple.default, {
          isResult: true,
          itemQuestion: listQuestion[currentQuestion],
          currentQuestion: currentQuestion,
          showQuestionAnswer: data?.showQuestionAnswer
        });
      case _constants.default.QUESTION_FILL_BLANK:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionFillBlank.default, {
          navigation: navigation,
          isResult: true,
          itemQuestion: listQuestion[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay
        });
      case _constants.default.QUESTION_TF:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestion.default, {
          navigation: navigation,
          isResult: true,
          itemQuestion: listQuestion[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          showQuestionAnswer: data?.showQuestionAnswer
        });
      case _constants.default.QUESTION_HC:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionParentChild.default, {
          navigation: navigation,
          isResult: true,
          itemQuestion: listQuestion[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          showQuestionAnswer: data?.showQuestionAnswer
        });
      case _constants.default.QUESTION_ESSAY:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemQuestionEssay.default, {
          isResult: true,
          itemQuestion: listQuestion[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay
        });
      default:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: _MyTestResultInClassScreenStyles.styles.container,
    children: [(0, _helpers.checkListEmpty)(listQuestion) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
        bounces: false,
        contentContainerStyle: _MyTestResultInClassScreenStyles.styles.viewScrollView,
        showsVerticalScrollIndicator: false,
        onTouchStart: onTouchStart,
        onTouchEnd: onTouchEnd,
        children: renderQuestionComponent()
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomQuestion, {})]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetQuestionResult.default, {
      isOpenModal: isOpenModal,
      closeModal: () => {
        setIsOpenModal(false);
      },
      listResult: listResult,
      onPressQuestion: index => {
        setCurrentQuestion(index);
      }
    })]
  });
};
var _default = exports.default = MyTestResultInClassScreen;
//# sourceMappingURL=MyTestResultInClassScreen.js.map