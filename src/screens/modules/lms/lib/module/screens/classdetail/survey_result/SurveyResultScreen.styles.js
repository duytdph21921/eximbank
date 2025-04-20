"use strict";

import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { screenWidth } from '@utils/platforms';
import fonts from '@assets/value/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textComplete: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    fontFamily: fonts.medium
  },
  textCompleteTk: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    fontFamily: fonts.medium,
    color: Color.text_color_hover,
    width: screenWidth - horizontal(80),
    textAlign: 'center',
    marginTop: vertical(15)
  },
  btnFooter: {
    height: 56,
    width: screenWidth - horizontal(15 * 2),
    borderRadius: 28,
    paddingHorizontal: 15,
    backgroundColor: Color.base_color,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 1,
    position: 'absolute'
  },
  textFooter: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.white
  }
});
//# sourceMappingURL=SurveyResultScreen.styles.js.map