"use strict";

import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Color } from '@theme/colors';
import { vertical } from '@utils/scales';
import CustomTabView from '@components/CustomTabView';
import ClassTopicDetail from "./ClassTopicDetail.js";
import ClassTopicGeneral from "./ClassTopicGeneral.js";
import ClassTopicContent from "./ClassTopicContent.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ClassTopicScreen = props => {
  const {
    classInfo,
    index
  } = props;
  const [activeTab, setActiveTab] = useState(0);
  const isLoadMain = true;
  const renderRoute1 = () => /*#__PURE__*/_jsx(ClassTopicGeneral, {
    classInfo: classInfo,
    index: index,
    activeTab: activeTab
  });
  const renderRoute2 = () => /*#__PURE__*/_jsx(ClassTopicContent, {
    classInfo: classInfo,
    index: index,
    activeTab: activeTab
  });
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: isLoadMain ? /*#__PURE__*/_jsx(CustomTabView, {
      style: styles.tabBar,
      activeTab: activeTab,
      onIndexChange: index => setActiveTab(index),
      firstRoute: renderRoute1,
      secondRoute: renderRoute2,
      routes: [{
        key: 'first',
        title: 'text-class-topic-general'
      }, {
        key: 'second',
        title: 'text-class-topic-content'
      }]
    }) : /*#__PURE__*/_jsx(ClassTopicDetail, {})
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingBottom: 25
  },
  tabBar: {
    backgroundColor: Color.white,
    marginTop: vertical(10)
  }
});
export default ClassTopicScreen;
//# sourceMappingURL=ClassTopicScreen.js.map