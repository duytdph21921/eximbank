"use strict";

import useDefaultConfig from '@hooks/useDefaultConfig';
import Constant from '@utils/constants';
import { View } from 'react-native';
import MyTestScreen from "./screens/my_test_screen/MyTestSceen.js";
import MyTestInformationScreen from "./screens/my_test_information/MyTestInformationScreen.js";
import MyTestQuestionScreen from "./screens/my_test_question/MyTestQuestionScreen.js";
import MyTestResultScreen from "./screens/my_test_result_screen/MyTestResultScreen.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const {
  createStackNavigator
} = require('@react-navigation/stack');
const Test = createStackNavigator();
export const TestStack = props => {
  const defaultConfig = useDefaultConfig(props);
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(View, {});
  return /*#__PURE__*/_jsxs(Test.Navigator, {
    initialRouteName: Constant.MY_TEST_SCREEN,
    screenOptions: defaultConfig,
    children: [/*#__PURE__*/_jsx(Test.Screen, {
      name: Constant.MY_TEST_SCREEN,
      component: MyTestScreen,
      options: {
        headerShown: true,
        gestureEnabled: false,
        headerLeft: renderHeaderLeft
      }
    }), /*#__PURE__*/_jsx(Test.Screen, {
      name: Constant.MY_TEST_INFORMATION_SCREEN,
      component: MyTestInformationScreen,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/_jsx(Test.Screen, {
      name: Constant.MY_TEST_QUESTION_SCREEN,
      component: MyTestQuestionScreen,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    }), /*#__PURE__*/_jsx(Test.Screen, {
      name: Constant.MY_TEST_RESULT_SCREEN,
      component: MyTestResultScreen,
      options: {
        headerShown: true,
        gestureEnabled: false
      }
    })]
  });
};
//# sourceMappingURL=index.js.map