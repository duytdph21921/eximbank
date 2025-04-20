"use strict";

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import IconOclock from '@assets/icons/icon_olock';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TabOverViewResult = props => {
  const {
    dataResultOverView,
    onPressHistory
  } = props;
  return /*#__PURE__*/_jsxs(ScrollView, {
    style: styles.container,
    bounces: false,
    children: [/*#__PURE__*/_jsxs(TouchableDebounce, {
      style: styles.viewDate,
      onPress: onPressHistory,
      children: [/*#__PURE__*/_jsx(IconOclock, {
        width: 16,
        height: 16
      }), /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-history-access",
        style: [styles.textHistory, {
          color: Color.base_color
        }]
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-join-date",
        style: styles.textTitle
      }), /*#__PURE__*/_jsx(CMText, {
        title: dataResultOverView?.registerDate,
        style: styles.textValue
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-complete-date",
        style: styles.textTitle
      }), /*#__PURE__*/_jsx(CMText, {
        title: dataResultOverView?.finishDate,
        style: styles.textValue
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-total-time-watching",
        style: styles.textTitle
      }), /*#__PURE__*/_jsx(CMText, {
        title: `${dataResultOverView?.totalTimeLearn}`,
        style: styles.textValue
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-late-access",
        style: styles.textTitle
      }), /*#__PURE__*/_jsx(CMText, {
        title: dataResultOverView?.lastActiveDate,
        style: styles.textValue
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontal(20)
  },
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textHistory: {
    color: Color.color_check_answer,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: horizontal(5)
  },
  itemResult: {
    borderRadius: 20,
    height: 56,
    borderColor: Color.color_border,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vertical(15),
    paddingHorizontal: horizontal(15)
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color_hover,
    fontFamily: fonts.regular
  },
  textValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Color.text_color,
    fontFamily: fonts.semi
  }
});
export default TabOverViewResult;
//# sourceMappingURL=TabOverViewResult.js.map