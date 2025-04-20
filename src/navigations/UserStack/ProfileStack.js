/* eslint-disable import/no-extraneous-dependencies */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Constant from '@utils/constants';
import {
  ProfileScreen,
  ProfileDetailScreen,
  ProfileDetailEditScreen,
  ProfileChangePasswordScreen,
  ProtectAccountScreen,
} from 'module-account';
import useDefaultConfig from '@hooks/useDefaultConfig';

const Profile = createStackNavigator();
export const ProfileStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Profile.Navigator initialRouteName={Constant.PROFILE_SCREEN} screenOptions={defaultConfig}>
      <Profile.Screen
        name={Constant.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
      <Profile.Screen
        name={Constant.PROFILE_DETAIL_SCREEN}
        component={ProfileDetailScreen}
        options={{ headerShown: true }}
      />
      <Profile.Screen
        name={Constant.PROFILE_DETAIL_EDIT_SCREEN}
        component={ProfileDetailEditScreen}
        options={{ headerShown: true }}
      />
      <Profile.Screen
        name={Constant.PROFILE_CHANGE_PASSWORD_SCREEN}
        component={ProfileChangePasswordScreen}
        options={{ headerShown: true }}
      />
      <Profile.Screen
        name={Constant.PROFILE_ACCOUNT_SECURITY_SCREEN}
        component={ProtectAccountScreen}
        options={{ headerShown: true }}
      />
    </Profile.Navigator>
  );
};
