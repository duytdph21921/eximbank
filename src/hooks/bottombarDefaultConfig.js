import { TransitionPresets } from '@react-navigation/stack';
import { hasNotch } from 'react-native-device-info';
import { Color } from '@theme/colors';

export default function bottombarDefaultConfig() {
  const defaultConfig = {
    ...TransitionPresets.SlideFromRightIOS,
    activeTintColor: Color.base_color,
    style: {
      height: hasNotch ? 75 : 70,
    },
    tabStyle: {
      backgroundColor: Color.white,
      height: hasNotch ? 75 : 70,
    },
    labelStyle: {
      fontSize: 12,
      lineHeight: 14,
      marginBottom: hasNotch ? 15 : 10,
    },
  };

  return defaultConfig;
}
