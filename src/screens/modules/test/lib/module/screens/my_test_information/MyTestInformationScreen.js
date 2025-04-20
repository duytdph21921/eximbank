"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CMText from '@components/CMText';
import CustomTabView from '@components/CustomTabView';
import globalStyles from '@theme/globalStyles';
import { updateLoadingAction, updateParamTestInforScreen } from '@store/reducers/globalSlice';
import { getByIdAndUserId } from "../../services/testregistortestform.api.js";
import { styles } from "./MyTestInformationScreen.styles.js";
import TabExamResult from "./components/TabExamResult.js";
import TabInformation from "./components/TabInformation.js";
/**
 * V.1. Màn hình thông tin bài thi-thông tin chung.
 * @returns
 */
import { jsx as _jsx } from "react/jsx-runtime";
const MyTestInformationScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    id
  } = route?.params;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [dataInformation, setDataInformation] = useState();
  const [dataResult, setDataResult] = useState();
  const isMounteRef = useRef(false);
  const paramsTestInforScreen = useSelector(state => state.global.paramsTestInforScreen);

  /**
   * Check call api lúc vào lần đầu và goBack();
   */
  const funcGetByIdAndUserId = async () => {
    const idMyTest = route?.params && route?.params?.callBack ? paramsTestInforScreen?.id : id;
    const response = await getByIdAndUserId(idMyTest);
    if (response?.status && isMounteRef.current) {
      dispatch(updateParamTestInforScreen({
        id: idMyTest,
        dataInformation: response?.data,
        dataResult: response?.data?.listResult
      }));
      setDataInformation(response?.data);
      setDataResult(response?.data?.listResult);
    }
  };
  useEffect(() => {
    dispatch(updateLoadingAction(true));
    isMounteRef.current = true;
    funcGetByIdAndUserId();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
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
  const renderRoute1 = () => /*#__PURE__*/_jsx(TabInformation, {
    navigation: navigation,
    type: activeTab,
    data: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation : dataInformation,
    isCurrentTestStatus: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation?.currentTestStatus : dataInformation?.currentTestStatus
  });
  const renderRoute2 = () => /*#__PURE__*/_jsx(TabExamResult, {
    navigation: navigation,
    type: activeTab,
    data: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataResult : dataResult,
    dataInformation: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation : dataInformation,
    isCurrentTestStatus: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation?.currentTestStatus : dataInformation?.currentTestStatus
  });
  /**
   * Custom header screeen.
   */

  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText
  // i18nKey={"text-header-test-information-screen"}
  , {
    style: globalStyles.titleScreen,
    title: route?.params?.title ?? ''
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(CustomTabView, {
      style: styles.tabBar,
      onIndexChange: index => setActiveTab(index),
      firstRoute: renderRoute1,
      secondRoute: renderRoute2,
      routes: [{
        key: 'first',
        title: 'text-tab-general-information'
      }, {
        key: 'second',
        title: 'text-tab-result-exam'
      }]
    })
  });
};
export default MyTestInformationScreen;
//# sourceMappingURL=MyTestInformationScreen.js.map