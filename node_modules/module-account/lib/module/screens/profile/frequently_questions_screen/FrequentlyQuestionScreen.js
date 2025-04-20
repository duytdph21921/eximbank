"use strict";

import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import globalStyles from '@theme/globalStyles';
import { styles } from "./FrequentlyQuestionScreen.styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    userplaceholder: 'What do you want to help with?'
  },
  vn: {
    userplaceholder: 'Bạn muốn trợ giúp điều gì'
  }
};
const FrequentlyQuestionScreen = props => {
  const {
    navigation,
    route
  } = props;
  const languageLocal = useSelector(state => state.global.language);
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(BackHeader, {
    handleGoBack: () => {
      navigation.goBack();
    }
  });
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: "text-frequently-asked-questions",
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
    children: /*#__PURE__*/_jsx(CMTextInput, {
      placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.userplaceholder : PLACEHOLDER.en.userplaceholder,
      returnKeyType: "next",
      blurOnSubmit: false,
      value: "",
      onChangeText: help => {},
      isSearch: true,
      textInputStyle: styles.textInput,
      maxLength: 200
    })
  });
};
export default /*#__PURE__*/React.memo(FrequentlyQuestionScreen);
//# sourceMappingURL=FrequentlyQuestionScreen.js.map