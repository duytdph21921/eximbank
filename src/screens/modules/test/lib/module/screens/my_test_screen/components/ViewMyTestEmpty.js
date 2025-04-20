"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import IconEmpty from '@assets/icons/icon_empty.svg';
import { horizontal, vertical } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { screenWidth } from '@utils/platforms';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ViewMyTestEmpty = ({
  onHandleExplore
}) => {
  const onPressExplore = () => {
    onHandleExplore();
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.viewRmpty,
    children: [/*#__PURE__*/_jsx(IconEmpty, {
      width: 120,
      height: 100
    }), /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-are-no-exams-yet",
      style: styles.textEmptyClass
    }), /*#__PURE__*/_jsx(TouchableDebounce, {
      style: [styles.btnExplore, {
        backgroundColor: Color.base_color
      }],
      onPress: onPressExplore,
      children: /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-button-explore-exam",
        style: styles.textBtnExplore
      })
    })]
  });
};
const styles = StyleSheet.create({
  viewRmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vertical(20)
    // width: screenWidth - horizontal(30),
  },
  textEmptyClass: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: vertical(15),
    fontFamily: fonts.bold,
    textAlign: 'center'
  },
  textEmptyContent: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: vertical(15),
    width: screenWidth * 0.75,
    textAlign: 'center',
    fontFamily: fonts.bold,
    marginBottom: vertical(30)
  },
  btnExplore: {
    backgroundColor: Color.base_color,
    height: 56,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vertical(20),
    paddingHorizontal: horizontal(20),
    marginBottom: vertical(30)
  },
  textBtnExplore: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '700'
  }
});
export default ViewMyTestEmpty;
//# sourceMappingURL=ViewMyTestEmpty.js.map