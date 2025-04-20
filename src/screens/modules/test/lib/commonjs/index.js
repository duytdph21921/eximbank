"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestStack = void 0;
var _useDefaultConfig = _interopRequireDefault(require("@hooks/useDefaultConfig"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _reactNative = require("react-native");
var _MyTestSceen = _interopRequireDefault(require("./screens/my_test_screen/MyTestSceen.js"));
var _MyTestInformationScreen = _interopRequireDefault(require("./screens/my_test_information/MyTestInformationScreen.js"));
var _MyTestQuestionScreen = _interopRequireDefault(require("./screens/my_test_question/MyTestQuestionScreen.js"));
var _MyTestResultScreen = _interopRequireDefault(require("./screens/my_test_result_screen/MyTestResultScreen.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  createStackNavigator
} = require('@react-navigation/stack');
const Test = createStackNavigator();
const TestStack = props => {
  const defaultConfig = (0, _useDefaultConfig.default)(props);
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Test.Navigator, {
    initialRouteName: _constants.default.MY_TEST_SCREEN,
    screenOptions: defaultConfig,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Test.Screen, {
      name: _constants.default.MY_TEST_SCREEN,
      component: _MyTestSceen.default,
      options: {
        headerShown: true,
        gestureEnabled: false,
        headerLeft: renderHeaderLeft
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Test.Screen, {
      name: _constants.default.MY_TEST_INFORMATION_SCREEN,
      component: _MyTestInformationScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Test.Screen, {
      name: _constants.default.MY_TEST_QUESTION_SCREEN,
      component: _MyTestQuestionScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Test.Screen, {
      name: _constants.default.MY_TEST_RESULT_SCREEN,
      component: _MyTestResultScreen.default,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    })]
  });
};
exports.TestStack = TestStack;
//# sourceMappingURL=index.js.map