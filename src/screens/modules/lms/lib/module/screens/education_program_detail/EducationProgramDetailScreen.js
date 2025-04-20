"use strict";

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import CustomTabView from '@components/CustomTabView';
import { styles } from "./EducationProgramDetail.styles.js";
import IntroduceEdu from "./subject/IntroduceEdu.js";
import ListSubject from "./subject/ListSubject.js";
import { jsx as _jsx } from "react/jsx-runtime";
const EducationProgramDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    params
  } = route;
  const [activeTab, setActiveTab] = useState(0);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route?.params?.title,
      headerRight: () =>
      /*#__PURE__*/
      // <TouchableDebounce style={styles.viewBtnBack} onPress={() => {}}>
      //   <IconNote width={44} height={44} />
      // </TouchableDebounce>
      _jsx(View, {})
    });
  }, []);
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none'
      }
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined
      });
    };
  }, []);
  const renderRoute1 = () => /*#__PURE__*/_jsx(IntroduceEdu, {
    navigation: navigation,
    params: params
  });
  const renderRoute2 = () => /*#__PURE__*/_jsx(ListSubject, {
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
        title: 'text-list-subject'
      }]
    })
  });
};
export default EducationProgramDetailScreen;
//# sourceMappingURL=EducationProgramDetailScreen.js.map