"use strict";

import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { jsx as _jsx } from "react/jsx-runtime";
const DetailLearningResultScreen = props => {
  const {
    navigation
  } = props;
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: "text-header-result-study-detail",
    style: globalStyles.titleScreen
  });
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  return /*#__PURE__*/_jsx(View, {});
};
export default DetailLearningResultScreen;
//# sourceMappingURL=DetailLearningResultScreen.js.map