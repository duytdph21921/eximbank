"use strict";

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import IconUnCheckBox from '@assets/icons/icon_uncheckbox.svg';
import Constant from '@utils/constants';
import { useSelector } from 'react-redux';
import IconCheckBox from '@assets/icons/icon_checkbox';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Remember = props => {
  const {
    onPressRemember,
    diasbleRemember
  } = props;
  const userState = useSelector(state => state.auth.userState);
  const [toggleCheckBox, setToggleCheckBox] = useState(userState?.isRemember);

  /**
   * Xử lí button checkbox.
   */
  const onHandleCheckbox = () => {
    setToggleCheckBox(!toggleCheckBox);
    onPressRemember(!toggleCheckBox);
  };
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(TouchableDebounce, {
      style: styles.viewCheckbox,
      onPress: onHandleCheckbox,
      disabled: diasbleRemember,
      children: [toggleCheckBox === Constant.IS_REMEMBER ? /*#__PURE__*/_jsx(IconCheckBox, {
        width: 22,
        height: 22
      }) : /*#__PURE__*/_jsx(IconUnCheckBox, {
        width: 22,
        height: 22
      }), /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-remember-account",
        style: [styles.textRememer, {
          marginHorizontal: horizontal(5)
        }]
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
    marginVertical: vertical(10)
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textRememer: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: Color.text_color_hover
  }
});
export default /*#__PURE__*/React.memo(Remember);
//# sourceMappingURL=Remember.js.map