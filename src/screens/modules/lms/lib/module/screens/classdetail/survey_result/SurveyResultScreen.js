"use strict";

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';
import CMText from '@components/CMText';
import { SafeAreaView, View } from 'react-native';
import IconCompleteSurvey from '@assets/icons/icon_complete_survey.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalStyles from '@theme/globalStyles';
import BackHeader from '@components/BackHeader';
import Constant from '@utils/constants';
import useGoBackHandler from '@hooks/useGoBackHandler';
import RenderHtml from 'react-native-render-html';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { screenWidth } from '@utils/platforms';
import { horizontal } from '@utils/scales';
import { styles } from "./SurveyResultScreen.styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SurveyResultScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    surveyId,
    surveyUserId,
    sourceThank
  } = route?.params || {};
  const {
    bottom
  } = useSafeAreaInsets();
  const sourceThankHtml = sourceThank?.html;
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(BackHeader, {
    handleGoBack: onBack
  });
  const renderHearderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: "text-title-survey-result-screen",
    style: globalStyles.titleScreen
  }); // Title screen
  /**
   * Custom header.
   */
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHearderTitle
    });
  }, [navigation]);

  /**
   * Back to previous screen
   */
  const onBack = () => {
    navigation.navigate(Constant.SURVEY_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7)
    });
    return true;
  };
  useGoBackHandler(() => {
    navigation.navigate(Constant.SURVEY_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7)
    });
    return true;
  }, []);
  return /*#__PURE__*/_jsxs(SafeAreaView, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(IconCompleteSurvey, {
      width: 150,
      height: 150
    }), /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-complete-survey",
      style: styles.textComplete
    }), sourceThankHtml && /*#__PURE__*/_jsx(RenderHtml, {
      contentWidth: screenWidth - horizontal(2 * 20),
      source: sourceThank,
      tagsStyles: mixedStyle
    }), /*#__PURE__*/_jsx(TouchableDebounce, {
      style: [styles.btnFooter, {
        bottom: bottom + 20,
        backgroundColor: Color.base_color
      }],
      onPress: () => {
        navigation.navigate(Constant.SURVEY_RESULT_DETAIL_SCREEN, {
          surveyUserId,
          surveyId
        });
      },
      children: /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-buton-re-view-exam",
        style: styles.textFooter
      })
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
export default SurveyResultScreen;
//# sourceMappingURL=SurveyResultScreen.js.map