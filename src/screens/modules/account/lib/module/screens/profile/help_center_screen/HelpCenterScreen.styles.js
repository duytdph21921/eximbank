"use strict";

import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, textSize } from '@utils/scales';
import { screenWidth } from '@utils/platforms';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignContent: 'center'
  },
  viewContent: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontal(24)
  },
  textTitle: {
    lineHeight: textSize(36),
    fontSize: textSize(24),
    fontWeight: '700'
  },
  textContent: {
    lineHeight: textSize(23.8),
    fontSize: textSize(14),
    fontWeight: '400',
    color: Color.text_color_hover,
    marginTop: 10
  },
  textInput: {
    width: screenWidth - horizontal(24 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 20
  },
  viewLine: {
    height: 15,
    backgroundColor: Color.color_border,
    marginVertical: 20
  },
  boxMenuItem: {
    flexDirection: 'row',
    width: screenWidth - horizontal(24) * 2,
    alignSelf: 'center',
    marginTop: 10
  },
  textMenu: {
    marginHorizontal: 5,
    marginVertical: 12,
    fontWeight: '700',
    fontSize: textSize(14),
    lineHeight: 23.8
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    marginVertical: 12
  }
});
//# sourceMappingURL=HelpCenterScreen.styles.js.map