"use strict";

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import IconCheckBox from '@assets/icons/icon_checkbox';
import IconUnCheckBox from '@assets/icons/icon_uncheckbox.svg';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Agree = props => {
  const {
    onPressAgree,
    isAgree,
    onPolicyDetail
  } = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(isAgree);

  /**
   * Xử lí button checkbox.
   */
  const onHandleCheckboxAgree = () => {
    onPressAgree(!toggleCheckBox);
    setToggleCheckBox(!toggleCheckBox);
  };
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.viewCheckbox,
      children: [/*#__PURE__*/_jsx(TouchableDebounce, {
        onPress: () => {
          onHandleCheckboxAgree();
        },
        children: toggleCheckBox ? /*#__PURE__*/_jsx(IconCheckBox, {
          width: 22,
          height: 22
        }) : /*#__PURE__*/_jsx(IconUnCheckBox, {
          width: 22,
          height: 22
        })
      }), /*#__PURE__*/_jsx(CMText, {
        i18nKey: "signup-agree-text",
        style: styles.textAgree
      }), /*#__PURE__*/_jsx(TouchableDebounce, {
        onPress: onPolicyDetail,
        children: /*#__PURE__*/_jsx(CMText, {
          i18nKey: "signup-terms-of-use-text",
          style: styles.textTerms
        })
      })]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontal(20),
    marginVertical: vertical(15)
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textAgree: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.4,
    color: Color.text_color_hover,
    marginLeft: horizontal(5)
  },
  textTerms: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22.4,
    color: Color.text_color_hover,
    marginHorizontal: horizontal(5)
  }
});
export default Agree;
//# sourceMappingURL=Agree.js.map