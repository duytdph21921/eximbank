import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Constant from '@utils/constants';
import HomeScreen from '@base/home/HomeScreen';
import useDefaultConfig from '@hooks/useDefaultConfig';
import { View } from 'react-native';

const Home = createStackNavigator();
export const HomeStack = (props) => {
  const defaultConfig = useDefaultConfig(props);

  const renderHeaderLeft = () => <View />;

  return (
    <Home.Navigator initialRouteName={Constant.HOME_SCREEN} screenOptions={defaultConfig}>
      <Home.Screen
        name={Constant.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: true,
          gestureEnabled: true,
          headerLeft: renderHeaderLeft,
        }}
      />
    </Home.Navigator>
  );
};
