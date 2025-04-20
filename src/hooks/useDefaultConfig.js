/* eslint-disable no-nested-ternary */
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { hasNotch } from 'react-native-device-info';
import IconNote from '@assets/other/icon_note.svg';
import { Color } from '@theme/colors.js';
import { isIOS, isTablet } from '@utils/platforms.js';
import { horizontal, vertical } from '@utils/scales.js';
import TouchableDebounce from '@components/TouchableDebounce';
import BackHeader from '@components/BackHeader';

export default function useDefaultConfig({ navigation }) {
  /**
   * Custom handle button headerRight.
   */
  const onHeaderRight = () => {
    //
  };
  const defaultConfig = {
    ...TransitionPresets.SlideFromRightIOS,
    headerTitleStyle: {
      textAlign: 'center',
      textAlignVertical: 'center',
      alignSelf: 'center',
      fontWeight: '700',
      fontSize: 16,
      paddingHorizontal: horizontal(5),
      color: Color.text_color,
      marginVertical: vertical(10),
    },
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Color.white,
      height: isIOS && hasNotch() ? 120 : isTablet ? 130 : 70,
      elevation: 0,
    },
    headerTintColor: Color.cl_text_title,
    headerLeft: () => <BackHeader {...navigation} />,
    headerRight: () => (
      <TouchableDebounce style={{ right: horizontal(15) }} onPress={onHeaderRight}>
        <IconNote width={44} height={44} />
      </TouchableDebounce>
    ),
  };

  return defaultConfig;
}
