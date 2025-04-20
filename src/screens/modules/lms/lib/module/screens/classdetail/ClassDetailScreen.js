"use strict";

/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-promise-executor-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Animated, FlatList, View, useWindowDimensions } from 'react-native';
import React, { useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import globalStyles from '@theme/globalStyles';
import BackHeader from '@components/BackHeader';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import DialogWarnCustom from '@components/DialogWarnCustom';
import { LmsClassModel } from "../model/lmsclass.model.js";
import { styles } from "./ClassDetail.style.js";
import { getById } from "../../services/lmsclass.api.js";
import ClassTopicScreen from "./class_topic/ClassTopicScreen.js";
import IntroductionScreen from "./introduction/IntroductionScreen.js";
import ContentScreen from "./content/ContentScreen.js";
import ExerciseScreen from "./excercise/ExerciseScreen.js";
import ResultStudyScreen from "./result_study_screen/ResultStudyScreen.js";
import NotificationClassScreen from "./notifications/NotificationClassScreen.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ClassDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  /**
   * id: id của lớp.
   * indexTab: hiển thị tab khi khởi tạo.
   */
  const {
    id,
    indexTab
  } = route?.params;
  const dispatch = useDispatch();
  const [index, setIndex] = useState(indexTab ?? 0);
  const [classInfo, setClassInfo] = useState(new LmsClassModel());
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [routes] = useState([{
    key: 'introduction',
    title: 'text-introduction-class'
  }, {
    key: 'content',
    title: 'text-content-class'
  }, {
    key: 'exercise',
    title: 'text-exercise-class'
  }, {
    key: 'result',
    title: 'text-result-class'
  }, {
    key: 'topic',
    title: 'text-topic-class'
  }, {
    key: 'notification',
    title: 'text-tab-notification'
  }]);
  const IntroductionRoute = useCallback(() => /*#__PURE__*/_jsx(IntroductionScreen, {
    classInfo: classInfo,
    onPressLearn: handleNextContent,
    index: index
  }), [index, classInfo]);
  const ContentRoute = useCallback(() => /*#__PURE__*/_jsx(ContentScreen, {
    classInfo: classInfo,
    navigation: navigation
    // classUser={classUser}
    ,
    index: index,
    setIndex: setIndex
  }), [index, classInfo]);
  const ExerciseRoute = useCallback(() => /*#__PURE__*/_jsx(ExerciseScreen, {
    classInfo: classInfo,
    index: index
  }), [index, classInfo]);
  const ResultRoute = useCallback(() => /*#__PURE__*/_jsx(ResultStudyScreen, {
    classInfo: classInfo,
    navigation: navigation,
    index: index
  }), [index, classInfo]);
  const NotificationRoute = useCallback(() => /*#__PURE__*/_jsx(NotificationClassScreen, {
    classInfo: classInfo,
    navigation: navigation,
    index: index
  }), [index, classInfo]);
  const TopicRoute = useCallback(() => /*#__PURE__*/_jsx(ClassTopicScreen, {
    classInfo: classInfo,
    navigation: navigation,
    index: index
  }), [index, classInfo]);
  const renderScene = SceneMap({
    introduction: IntroductionRoute,
    content: ContentRoute,
    exercise: ExerciseRoute,
    result: ResultRoute,
    topic: TopicRoute,
    notification: NotificationRoute
  });
  const isMounteRef = useRef(false);
  const scrollViewRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const layout = useWindowDimensions();
  const barTranslate = Animated.multiply(scrollX, -1);
  const barTranslate1 = useRef(new Animated.Value(0)).current;
  const [headerWidths, setWidths] = useState([]);
  const onHeaderLayout = (width, index) => {
    const newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };
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
  useEffect(() => {
    // Phai set lại index ở đây
    isMounteRef.current = true;
    if (isMounteRef.current) {
      setIndex(indexTab ?? 0);
    }
    let leftOffset = 0;
    for (let i = 0; i < index; i += 1) {
      leftOffset += headerWidths[i] || 0;
    }
    scrollViewRef?.current?.scrollToIndex({
      index,
      viewPosition: 0.5
    });
    Animated.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0
    }).start();
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const getItemLayout = (data, index) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      offset += headerWidths[i] || 0;
    }
    const length = headerWidths[index] || 0;
    return {
      length,
      offset,
      index
    };
  };
  const handleScrollToIndexFailed = info => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      scrollViewRef.current?.scrollToIndex({
        index: info.index,
        animated: true
      });
    });
  };
  const renderTabBar = () => /*#__PURE__*/_jsxs(View, {
    style: styles.btnContainer,
    children: [/*#__PURE__*/_jsx(FlatList, {
      bounces: false,
      data: routes,
      ref: scrollViewRef,
      keyExtractor: (_item, index) => index.toString(),
      horizontal: true,
      onScroll: Animated.event([{
        nativeEvent: {
          contentOffset: {
            x: scrollX
          }
        }
      }], {
        useNativeDriver: false
      }),
      showsHorizontalScrollIndicator: false,
      renderItem: itemTab => /*#__PURE__*/_jsx(View, {
        style: styles.viewItemHeader,
        children: /*#__PURE__*/_jsx(TouchableDebounce, {
          onLayout: e => {
            onHeaderLayout(e.nativeEvent.layout.width, itemTab.index);
          },
          onPress: () => {
            setIndex(itemTab.index);
            // if(classInfo?.isCloseClass){
            //   if(itemTab.index === 0 || itemTab.index === 3){
            //     setIndex(itemTab.index);
            //   }
            // }
            // else{
            //   setIndex(itemTab.index);
            // }
          },
          style: [index === itemTab.index ? styles.btnActive : styles.btn],
          children: /*#__PURE__*/_jsx(CMText, {
            style: index === itemTab.index ? styles.btnTextActive : styles.btnText,
            i18nKey: itemTab?.item?.title
          })
        })
      }),
      getItemLayout: getItemLayout,
      onScrollToIndexFailed: handleScrollToIndexFailed
    }), /*#__PURE__*/_jsx(Animated.View, {
      style: [styles.headerBar, {
        width: headerWidths[index],
        transform: [{
          translateX: barTranslate
        }, {
          translateX: barTranslate1
        }]
      }]
    })]
  });
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(BackHeader, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: () => /*#__PURE__*/_jsx(CMText, {
        title: classInfo?.title ?? '',
        style: globalStyles.titleScreen,
        numberOfLines: 2
      })
    });
  }, [navigation, classInfo]);
  const funcGetClassById = async () => {
    const response = await getById(id);
    if (response?.status && isMounteRef.current) {
      setClassInfo(response?.data);
      if (!response?.data?.isJoined) {
        setTimeout(() => {
          gotoListClassJoined();
        }, 500);
      }
    } else {
      setTimeout(() => {
        gotoListClassJoined();
      }, 500);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetClassById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [id]);
  const gotoListClassJoined = () => {
    navigation.navigate(Constant.LEARNING_STACK, {
      screen: Constant.STUDY_SCREEN
    });
  };
  const handleNextContent = () => {
    setIndex(1);
  };
  const onBack = () => {
    navigation.navigate(Constant.LEARNING_STACK, {
      screen: Constant.STUDY_SCREEN,
      params: {
        dataBack: Math.random().toString(36).slice(2, 7)
      }
    });
    // navigation.navigate(Constant.STUDY_SCREEN,
    //   {
    //     dataBack: Math.random().toString(36).slice(2, 7)
    //   }
    // );
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(TabView, {
      navigationState: {
        index,
        routes
      },
      onIndexChange: setIndex,
      renderScene: renderScene,
      initialLayout: {
        width: layout.width
      },
      renderTabBar: renderTabBar,
      swipeEnabled: false
    }), /*#__PURE__*/_jsx(DialogWarnCustom, {
      isShowModal: isShowPopup,
      keyHeader: "text-notification",
      keyMessage: "text-access-denined-class",
      keySubmit: "text-button-submit-exam",
      isShowCancel: false,
      submitOnPress: () => {
        setIsShowPopup(false);
        gotoListClassJoined();
      }
    })]
  });
};
export default ClassDetailScreen;
//# sourceMappingURL=ClassDetailScreen.js.map