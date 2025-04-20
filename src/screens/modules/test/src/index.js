import useDefaultConfig from '@hooks/useDefaultConfig';
import Constant from '@utils/constants';
import { View } from 'react-native';
import MyTestScreen from './screens/my_test_screen/MyTestSceen';
import MyTestInformationScreen from './screens/my_test_information/MyTestInformationScreen';
import MyTestQuestionScreen from './screens/my_test_question/MyTestQuestionScreen';
import MyTestResultScreen from './screens/my_test_result_screen/MyTestResultScreen';

const { createStackNavigator } = require('@react-navigation/stack');

const Test = createStackNavigator();

export const TestStack = (props) => {
  const defaultConfig = useDefaultConfig(props);

  const renderHeaderLeft = () => <View />;

  return (
    <Test.Navigator
      initialRouteName={Constant.MY_TEST_SCREEN}
      screenOptions={defaultConfig}
    >
      <Test.Screen
        name={Constant.MY_TEST_SCREEN}
        component={MyTestScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerLeft: renderHeaderLeft,
        }}
      />
      <Test.Screen
        name={Constant.MY_TEST_INFORMATION_SCREEN}
        component={MyTestInformationScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Test.Screen
        name={Constant.MY_TEST_QUESTION_SCREEN}
        component={MyTestQuestionScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Test.Screen
        name={Constant.MY_TEST_RESULT_SCREEN}
        component={MyTestResultScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
        }}
      />
    </Test.Navigator>
  );
};
