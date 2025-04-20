"use strict";

import { StyleSheet } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  tabBar: {
    backgroundColor: Color.color_bg_tab_view,
    paddingHorizontal: horizontal(15),
    marginTop: vertical(10)
  },
  titleScreen: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 16,
    paddingHorizontal: horizontal(5),
    color: Color.text_color,
    marginVertical: vertical(10),
    fontFamily: fonts.bold
  }
});
//# sourceMappingURL=MyTestInClassInforScreen.styles.js.map