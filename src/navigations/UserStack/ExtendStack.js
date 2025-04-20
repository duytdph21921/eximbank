import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Constant from '@utils/constants';
import useDefaultConfig from '@hooks/useDefaultConfig';
import { View } from 'react-native';
import ExtendScreen from '@base/extend/extend_screen/ExtendScreen';

const Extend = createStackNavigator();
export const ExtendStack = (props) => {
  const defaultConfig = useDefaultConfig(props);

  const renderHeaderLeft = () => <View />;

  const renderHeaderRight = () => <View />;

  return (
    <Extend.Navigator initialRouteName={Constant.EXTEND_SCREEN} screenOptions={defaultConfig}>
      <Extend.Screen
        name={Constant.EXTEND_SCREEN}
        component={ExtendScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />
    </Extend.Navigator>
  );
};
