"use strict";

import React, { useLayoutEffect, useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import CMText from '@components/CMText';
import BackHeader from '@components/BackHeader';
import globalStyles from '@theme/globalStyles';
import WebView from 'react-native-webview';
import { styles } from "./TermScreen.styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
const TermScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    title,
    url
  } = route?.params;
  const webviewRef = useRef(null);
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(BackHeader, {
    handleGoBack: () => {
      navigation.goBack();
    }
  });
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: `${title}`,
    style: globalStyles.titleScreen
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, []);
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(WebView, {
      originWhitelist: ['*'],
      source: {
        uri: url
      },
      style: styles.webView,
      ref: webviewRef,
      javaScriptEnabled: true,
      domStorageEnabled: true,
      mediaPlaybackRequiresUserAction: false,
      allowsInlineMediaPlayback: true,
      startInLoadingState: true,
      mixedContentMode: "always",
      showsVerticalScrollIndicator: false
    })
  });
};
export default /*#__PURE__*/React.memo(TermScreen);
//# sourceMappingURL=TermScreen.js.map