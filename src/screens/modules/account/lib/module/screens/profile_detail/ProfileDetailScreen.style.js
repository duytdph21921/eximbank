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
  contentBox: {
    paddingHorizontal: horizontal(30)
  },
  boxInfomation: {
    marginTop: horizontal(30)
  },
  textLabel: {
    fontFamily: fonts.medium,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    textAlign: 'left'
  },
  textNomal: {
    fontFamily: 'manrope-regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left'
  },
  boxItem: {
    marginBottom: 10,
    textAlign: 'left'
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vertical(20)
  },
  btnEdit: {
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(8),
    backgroundColor: Color.base_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.base_color,
    borderWidth: 1,
    minWidth: '45%'
  },
  btnDefault: {
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(8),
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.text_color,
    borderWidth: 1,
    minWidth: '45%'
  },
  whiteColor: {
    color: Color.white
  },
  textBtn: {
    fontFamily: 'manrope-bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4
  },
  btnReturn: {
    marginLeft: horizontal(20),
    marginTop: vertical(10)
  }
});
//# sourceMappingURL=ProfileDetailScreen.style.js.map