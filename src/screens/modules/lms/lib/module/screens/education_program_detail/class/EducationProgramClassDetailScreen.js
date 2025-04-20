"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconNote from '@assets/other/icon_note.svg';
import CustomTabView from '@components/CustomTabView';
import globalStyles from '@theme/globalStyles';
import { styles } from "../EducationProgramDetail.styles.js";
import IntroduceEdu from "./IntroduceEdu.js";
import ListClass from "./ListClass.js";
import { jsx as _jsx } from "react/jsx-runtime";
const EducationProgramClassDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    params
  } = route;
  const [activeTab, setActiveTab] = useState(0);
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText, {
    title: route?.params?.title,
    style: globalStyles.titleScreen,
    numberOfLines: 1
  });
  const renderHeaderRight = () => /*#__PURE__*/_jsx(TouchableDebounce, {
    style: styles.viewBtnBack,
    onPress: () => {},
    children: /*#__PURE__*/_jsx(IconNote, {
      width: 44,
      height: 44
    })
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerRight: renderHeaderRight
    });
  }, []);
  const renderRoute1 = () => /*#__PURE__*/_jsx(IntroduceEdu, {
    navigation: navigation,
    params: params
  });
  const renderRoute2 = () => /*#__PURE__*/_jsx(ListClass, {
    navigation: navigation,
    params: params
  });
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(CustomTabView, {
      style: styles.tabBar,
      onIndexChange: index => setActiveTab(index),
      firstRoute: renderRoute1,
      secondRoute: renderRoute2,
      routes: [{
        key: 'first',
        title: 'text-introduction-class'
      }, {
        key: 'second',
        title: 'text-list-class'
      }]
    })
  });
};
export default EducationProgramClassDetailScreen;
//# sourceMappingURL=EducationProgramClassDetailScreen.js.map