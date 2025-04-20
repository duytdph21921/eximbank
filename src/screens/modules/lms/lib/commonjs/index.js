"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LmsStack = void 0;
var _stack = require("@react-navigation/stack");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _useDefaultConfig = _interopRequireDefault(require("@hooks/useDefaultConfig"));
var _reactNative = require("react-native");
var _ClassDetailScreen = _interopRequireDefault(require("./screens/classdetail/ClassDetailScreen.js"));
var _StudyScreen = _interopRequireDefault(require("./screens/StudyScreen.js"));
var _EducationProgramDetailScreen = _interopRequireDefault(require("./screens/education_program_detail/EducationProgramDetailScreen.js"));
var _SurveyScreen = _interopRequireDefault(require("./screens/classdetail/survey/SurveyScreen.js"));
var _SurveyDetailScreen = _interopRequireDefault(require("./screens/classdetail/survey_detail/SurveyDetailScreen.js"));
var _SurveyResultScreen = _interopRequireDefault(require("./screens/classdetail/survey_result/SurveyResultScreen.js"));
var _SurveyResultDetailScreen = _interopRequireDefault(require("./screens/classdetail/survey_result_detail/SurveyResultDetailScreen.js"));
var _HistoryAccessScreen = _interopRequireDefault(require("./screens/classdetail/history_access_screen/HistoryAccessScreen.js"));
var _AggregateScoreScreen = _interopRequireDefault(require("./screens/classdetail/aggregate_score_screeen/AggregateScoreScreen.js"));
var _VideoMediaScreen = _interopRequireDefault(require("./screens/classdetail/video_media_screen/VideoMediaScreen.js"));
var _MyTestInClassInforScreen = _interopRequireDefault(require("./screens/my_test/MyTestInClassInforScreen.js"));
var _MyTestQuestionInClassScreen = _interopRequireDefault(require("./screens/my_test_question_in_class/MyTestQuestionInClassScreen.js"));
var _MyTestResultInClassScreen = _interopRequireDefault(require("./screens/my_test_result_in_class/MyTestResultInClassScreen.js"));
var _ViewContentScreen = _interopRequireDefault(require("./screens/classdetail/content/ViewContentScreen.js"));
var _AggregateScoreDetailScreen = _interopRequireDefault(require("./screens/classdetail/aggregate_score_detail_screen/AggregateScoreDetailScreen.js"));
var _EducationProgramClassDetailScreen = _interopRequireDefault(require("./screens/education_program_detail/class/EducationProgramClassDetailScreen.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Lms = (0, _stack.createStackNavigator)();
const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
const LmsStack = props => {
  const defaultConfig = (0, _useDefaultConfig.default)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Lms.Navigator, {
    initialRouteName: _constants.default.STUDY_SCREEN,
    screenOptions: defaultConfig,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.STUDY_SCREEN,
      component: _StudyScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false,
        headerLeft: renderHeaderLeft
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.CLASS_DETAIL_SCREEN,
      component: _ClassDetailScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.EDU_PROGRAM_DETAIL_SCREEN,
      component: _EducationProgramDetailScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.SURVEY_SCREEN,
      component: _SurveyScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.SURVEY_DETAIL_SCREEN,
      component: _SurveyDetailScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.SURVEY_RESULT_SCREEN,
      component: _SurveyResultScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.SURVEY_RESULT_DETAIL_SCREEN,
      component: _SurveyResultDetailScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.HISTORY_ACCESS_SCREEN,
      component: _HistoryAccessScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.AGGREGATE_SCORE_SCREEN,
      component: _AggregateScoreScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.VIDEO_MEDIA_SCREEN,
      component: _VideoMediaScreen.default,
      options: {
        headerShown: false,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.MY_TEST_IN_CLASS_INFORMATION_SCREEN,
      component: _MyTestInClassInforScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.MY_TEST_IN_CLASS_QUESTION_SCREEN,
      component: _MyTestQuestionInClassScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.MY_TEST_RESULT_IN_CLASS_SCREEN,
      component: _MyTestResultInClassScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.CLASS_CONTENT_VIEW_SCREEN,
      component: _ViewContentScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true,
        headerLeft: renderHeaderLeft
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.DETAIL_LEARNING_RESULT_SCREEN,
      component: _AggregateScoreDetailScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Lms.Screen, {
      name: _constants.default.EDU_CLASS_DETAIL_SCREEN,
      component: _EducationProgramClassDetailScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: true
      }
    })]
  });
};
exports.LmsStack = LmsStack;
//# sourceMappingURL=index.js.map