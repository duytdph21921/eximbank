"use strict";

import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import IconArrowRight from '@assets/icons/arrow-right.svg';
import IconMail from '@assets/icons/icon_mail.svg';
import IconPhone from '@assets/icons/icon_phone.svg';
import IconSupport from '@assets/icons/support.svg';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { styles } from "./HelpCenterScreen.styles.js";
import HelpHeader from "./conponents/HelpHeader.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    userplaceholder: 'What do you want to help with?'
  },
  vn: {
    userplaceholder: 'Bạn muốn trợ giúp điều gì'
  }
};
const listItem = [{
  id: 1,
  icon: /*#__PURE__*/_jsx(IconSupport, {
    width: 44,
    height: 44
  }),
  isNext: true,
  title: 'text-frequently-asked-questions'
}, {
  id: 2,
  icon: /*#__PURE__*/_jsx(IconMail, {
    width: 44,
    height: 44
  }),
  isNext: false,
  title: 'text-mail'
}, {
  id: 3,
  icon: /*#__PURE__*/_jsx(IconPhone, {
    width: 44,
    height: 44
  }),
  isNext: false,
  title: 'text-phone'
}];
const HelpCenterScreen = props => {
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
    i18nKey: "text-support-center",
    style: globalStyles.titleScreen
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, []);
  return /*#__PURE__*/_jsxs(SafeAreaView, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(HelpHeader, {}), /*#__PURE__*/_jsxs(View, {
      style: styles.viewContent,
      children: [/*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-title-help-center",
        style: styles.textTitle
      }), /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-content-help-center",
        style: styles.textContent
      })]
    }), /*#__PURE__*/_jsx(CMTextInput, {
      placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.userplaceholder : PLACEHOLDER.en.userplaceholder,
      returnKeyType: "next",
      blurOnSubmit: false,
      value: "",
      onChangeText: () => {},
      isSearch: true,
      textInputStyle: styles.textInput,
      maxLength: 200
    }), /*#__PURE__*/_jsx(View, {
      style: styles.viewLine
    }), listItem.map((item, index) => /*#__PURE__*/_jsxs(TouchableDebounce, {
      style: styles.boxMenuItem,
      onPress: () => {
        if (item?.id === 1) {
          navigation.navigate(Constant.FREQUENTLY_QUESTION_SCREEN);
        }
      },
      children: [item?.icon, /*#__PURE__*/_jsx(CMText, {
        style: styles.textMenu,
        i18nKey: item.title
      }), item?.isNext && /*#__PURE__*/_jsx(IconArrowRight, {
        style: styles.arrowRight,
        width: 18,
        height: 18
      })]
    }, item?.id))]
  });
};
export default /*#__PURE__*/React.memo(HelpCenterScreen);
//# sourceMappingURL=HelpCenterScreen.js.map