"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, View, BackHandler } from 'react-native';
import CMText from '@components/CMText';
import IconMessage from '@assets/icons/icon_notification_detail.svg';
import { horizontal } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import RenderHtml from 'react-native-render-html';
import { screenWidth } from '@utils/platforms';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import Constant from '@utils/constants';
import BackHeader from '@components/BackHeader';
import { styles } from "./NotificationClassDetailScreen.styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NotificationClassDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const params = route?.params;
  const source = {
    html: params?.message?.content
  };
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(BackHeader, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: ''
    });
  }, [navigation]);

  /**
   * Back to previous screen
   */
  const onBack = useCallback(() => {
    navigation.navigate(Constant.NOTIFICATION_SCREEN, {
      callBack: true
    });
    return true;
  }, []);

  /**
   * Back hander.
   */
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);
  return /*#__PURE__*/_jsxs(SafeAreaView, {
    style: styles.container,
    children: [/*#__PURE__*/_jsxs(ScrollView, {
      contentContainerStyle: styles.scrollView,
      children: [/*#__PURE__*/_jsx(IconMessage, {
        width: 67,
        height: 67
      }), /*#__PURE__*/_jsx(CMText, {
        title: params?.message?.title,
        style: styles.textTitle
      }), /*#__PURE__*/_jsx(RenderHtml, {
        contentWidth: screenWidth - horizontal(2 * 20),
        source: source,
        tagsStyles: mixedStyle
      })]
    }), /*#__PURE__*/_jsx(TouchableDebounce, {
      style: [styles.btnConfim],
      children: /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-confim",
        style: [styles.textBtnConfim]
      })
    }), /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-contact",
      style: styles.textContact
    })]
  });
};
const mixedStyle = {
  p: {
    color: Color.text_color,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.medium
  }
};
export default NotificationClassDetailScreen;
//# sourceMappingURL=NotificationClassDetailScreen.js.map