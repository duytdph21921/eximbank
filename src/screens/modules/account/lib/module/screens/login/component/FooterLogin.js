"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconFaceID from '@assets/icons/icon_faceid.svg';
import IconFinger from '@assets/icons/icon_finger.svg';
import IconOffWifi from '@assets/icons/icon_wifi_off.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const FooterLogin = props => {
  const {
    isShowFaceID,
    isShowTouchID,
    onPressLoginBiometry,
    onPressRegister
  } = props;
  const listFooter = [{
    id: 1,
    title: 'text-face-id',
    icon: /*#__PURE__*/_jsx(IconFaceID, {
      width: 24,
      height: 24
    }),
    isShow: isShowFaceID
  }, {
    id: 2,
    title: 'text-finger',
    icon: /*#__PURE__*/_jsx(IconFinger, {
      width: 24,
      height: 24
    }),
    isShow: isShowTouchID
  }, {
    id: 3,
    title: 'text-wifi-off',
    icon: /*#__PURE__*/_jsx(IconOffWifi, {
      width: 24,
      height: 24
    }),
    isShow: true
  }];
  const itemFooter = item => /*#__PURE__*/_jsxs(View, {
    children: [item?.isShow && item?.id !== 3 && /*#__PURE__*/_jsxs(TouchableDebounce, {
      style: styles.btnFooter,
      onPress: onPressLoginBiometry,
      children: [item.icon, /*#__PURE__*/_jsx(CMText, {
        i18nKey: item?.title,
        style: styles.textFooter
      })]
    }), item?.isShow && item?.id === 3 && /*#__PURE__*/_jsxs(TouchableDebounce, {
      style: styles.btnFooter,
      children: [item.icon, /*#__PURE__*/_jsx(CMText, {
        i18nKey: item?.title,
        style: styles.textFooter
      })]
    })]
  }, item.id);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.container,
      children: listFooter.map(item => itemFooter(item))
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.viewNotAcount,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-do-not-account",
        style: styles.textNotAccount
      }), /*#__PURE__*/_jsx(TouchableDebounce, {
        onPress: onPressRegister,
        children: /*#__PURE__*/_jsx(CMText, {
          i18nKey: "sigup-button",
          style: [styles.textRegister, {
            color: Color.base_color
          }]
        })
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: horizontal(15),
    marginTop: vertical(15)
  },
  btnFooter: {
    borderWidth: 1,
    borderColor: Color.color_border,
    borderRadius: 8,
    height: vertical(72),
    width: horizontal(98),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textFooter: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.black,
    marginTop: vertical(10)
  },
  viewNotAcount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vertical(20)
  },
  textNotAccount: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color_hover
  },
  textRegister: {
    color: Color.base_color,
    fontSize: 14,
    fontWeight: '700'
  }
});
export default FooterLogin;
//# sourceMappingURL=FooterLogin.js.map