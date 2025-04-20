"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconBackLogIn from '@assets/icons/icon_back_login.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Header = props => {
  const {
    onPressReturnLogin
  } = props;
  /**
   * Xử lý click vào btn quay lại trang đăng nhập.
   */
  const onHandleReturnLogin = () => {
    onPressReturnLogin();
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.btnReturn,
      children: /*#__PURE__*/_jsx(TouchableDebounce, {
        style: styles.btnLanguage,
        onPress: onPressReturnLogin,
        children: /*#__PURE__*/_jsx(IconBackLogIn, {
          width: 44,
          height: 44
        })
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.textHeaderRegister,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "sigup-text-header",
        style: styles.textLogin
      }), /*#__PURE__*/_jsx(CMText, {
        i18nKey: "sigup-text-header-info",
        style: styles.textHello
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginHorizontal: horizontal(15)
  },
  textLogin: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    paddingRight: horizontal(5)
  },
  textHello: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    color: Color.text_color_hover,
    marginTop: vertical(5)
  },
  btnReturn: {
    marginBottom: horizontal(24)
  },
  textHeaderRegister: {
    marginBottom: horizontal(24)
  }
});
export default Header;
//# sourceMappingURL=Header.js.map