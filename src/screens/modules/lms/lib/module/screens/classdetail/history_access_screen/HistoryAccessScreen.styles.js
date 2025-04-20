"use strict";

import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  viewItemHistory: {
    flexDirection: 'row',
    paddingHorizontal: horizontal(20),
    marginTop: vertical(20)
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: horizontal(15)
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.bold,
    lineHeight: 23.8
  },
  textDate: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fonts.regular,
    lineHeight: 20.4,
    paddingTop: vertical(5)
  }
});
//# sourceMappingURL=HistoryAccessScreen.styles.js.map