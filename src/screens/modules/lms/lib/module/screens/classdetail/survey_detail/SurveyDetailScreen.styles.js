"use strict";

import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color_bg_tab_view
  },
  btnRightHeader: {
    marginRight: horizontal(15)
  },
  textRightHeader: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.base_color
  },
  viewItemSurvey: {
    flex: 1,
    paddingHorizontal: horizontal(20),
    paddingTop: vertical(15),
    backgroundColor: Color.white
  },
  textTitleGroup: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.text_color,
    fontFamily: fonts.bold,
    lineHeight: 23.7,
    paddingHorizontal: horizontal(10),
    paddingVertical: vertical(10)
  }
});
//# sourceMappingURL=SurveyDetailScreen.styles.js.map