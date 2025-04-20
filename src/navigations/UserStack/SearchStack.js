import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Constant from '@utils/constants';
import useDefaultConfig from '@hooks/useDefaultConfig';
import { View } from 'react-native';
import SearchScreen from '@base/search/SearchScreen';

const Search = createStackNavigator();
export const SearchStack = (props) => {
  const defaultConfig = useDefaultConfig(props);

  const renderHeaderLeft = () => <View />;

  return (
    <Search.Navigator initialRouteName={Constant.SEARCH_SCREEN} screenOptions={defaultConfig}>
      <Search.Screen
        name={Constant.SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerLeft: renderHeaderLeft,
        }}
      />
    </Search.Navigator>
  );
};
