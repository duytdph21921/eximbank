"use strict";

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconFilter from '@assets/icons/icon_filter.svg';
import { Color } from '@theme/colors';
import { styles } from "../MyTestScreen.styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RenderHeaderList = props => {
  const {
    onPressFilter,
    totalRecord
  } = props;
  return /*#__PURE__*/_jsxs(View, {
    style: styles.viewHeader,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.viewTextTitle,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-title-list-test",
        style: styles.textCountExam
      }), /*#__PURE__*/_jsx(CMText, {
        title: ` (${totalRecord})`,
        style: [styles.textCountExam, {
          color: Color.text_color_hover
        }]
      })]
    }), /*#__PURE__*/_jsx(TouchableDebounce, {
      onPress: onPressFilter,
      children: /*#__PURE__*/_jsx(IconFilter, {
        width: 24,
        height: 24
      })
    })]
  });
};
export default RenderHeaderList;
//# sourceMappingURL=RenderHeaderList.js.map