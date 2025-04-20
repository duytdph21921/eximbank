/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Constant from '@utils/constants';
import { LoginScreen, RegisterScreen, ForgetPasswordScreen } from 'module-account';
import StartScreen from '@/screens/base/start_screen/StartScreen';
import Introduction from '@/screens/base/introduction/Introduction';

const Author = createStackNavigator();

export const AuthStack = ({ route }) => (
  <Author.Navigator
    initialRouteName={route?.params?.userState?.logout ? Constant.LOGIN : Constant.INTRODUCTION}
  >
    <Author.Screen
      name={Constant.INTRODUCTION}
      component={Introduction}
      options={{ headerShown: false }}
    />
    <Author.Screen name={Constant.START} component={StartScreen} options={{ headerShown: false }} />
    <Author.Screen name={Constant.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
    <Author.Screen
      name={Constant.REGISTER}
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Author.Screen
      name={Constant.FORGET_PASSWORD_SCREEN}
      component={ForgetPasswordScreen}
      options={{
        headerShown: false,
        gestureEnabled: true,
      }}
    />
  </Author.Navigator>
);
