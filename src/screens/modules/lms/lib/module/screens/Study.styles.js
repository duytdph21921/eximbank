"use strict";

import { StyleSheet } from 'react-native';
import { horizontal, textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { isTablet, screenWidth } from '@utils/platforms';
import fonts from '@assets/value/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVetical: 5
  },
  textTitleScreen: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginLeft: horizontal(15)
  },
  btnContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: Color.color_bg_tab_view,
    width: screenWidth,
    justifyContent: 'space-between'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: isTablet ? 4 : 2
  },
  btnActive: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: isTablet ? 4 : 2
  },
  btnText: {
    color: Color.white,
    fontWeight: '600',
    fontFamily: fonts.semi,
    fontSize: 12,
    lineHeight: 20.4
  },
  btnTextActive: {
    fontWeight: '600',
    fontFamily: fonts.semi,
    fontSize: textSize(14),
    lineHeight: textSize(20.4)
  },
  btnReturn: {
    marginLeft: horizontal(20),
    marginTop: vertical(10)
  },
  headerBar: {
    backgroundColor: Color.base_color,
    position: 'absolute',
    bottom: 0
  }
});
//# sourceMappingURL=Study.styles.js.map