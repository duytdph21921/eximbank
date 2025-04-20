"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNativeTabView = require("react-native-tab-view");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _globalSlice = require("@store/reducers/globalSlice");
var _DialogWarnCustom = _interopRequireDefault(require("@components/DialogWarnCustom"));
var _lmsclassModel = require("../model/lmsclass.model.js");
var _ClassDetailStyle = require("./ClassDetail.style.js");
var _lmsclassApi = require("../../services/lmsclass.api.js");
var _ClassTopicScreen = _interopRequireDefault(require("./class_topic/ClassTopicScreen.js"));
var _IntroductionScreen = _interopRequireDefault(require("./introduction/IntroductionScreen.js"));
var _ContentScreen = _interopRequireDefault(require("./content/ContentScreen.js"));
var _ExerciseScreen = _interopRequireDefault(require("./excercise/ExerciseScreen.js"));
var _ResultStudyScreen = _interopRequireDefault(require("./result_study_screen/ResultStudyScreen.js"));
var _NotificationClassScreen = _interopRequireDefault(require("./notifications/NotificationClassScreen.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-promise-executor-return */
/* eslint-disable react-hooks/exhaustive-deps */

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
  const dispatch = (0, _reactRedux.useDispatch)();
  const [index, setIndex] = (0, _react.useState)(indexTab ?? 0);
  const [classInfo, setClassInfo] = (0, _react.useState)(new _lmsclassModel.LmsClassModel());
  const [isShowPopup, setIsShowPopup] = (0, _react.useState)(false);
  const [routes] = (0, _react.useState)([{
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
  const IntroductionRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_IntroductionScreen.default, {
    classInfo: classInfo,
    onPressLearn: handleNextContent,
    index: index
  }), [index, classInfo]);
  const ContentRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContentScreen.default, {
    classInfo: classInfo,
    navigation: navigation
    // classUser={classUser}
    ,
    index: index,
    setIndex: setIndex
  }), [index, classInfo]);
  const ExerciseRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExerciseScreen.default, {
    classInfo: classInfo,
    index: index
  }), [index, classInfo]);
  const ResultRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ResultStudyScreen.default, {
    classInfo: classInfo,
    navigation: navigation,
    index: index
  }), [index, classInfo]);
  const NotificationRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_NotificationClassScreen.default, {
    classInfo: classInfo,
    navigation: navigation,
    index: index
  }), [index, classInfo]);
  const TopicRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassTopicScreen.default, {
    classInfo: classInfo,
    navigation: navigation,
    index: index
  }), [index, classInfo]);
  const renderScene = (0, _reactNativeTabView.SceneMap)({
    introduction: IntroductionRoute,
    content: ContentRoute,
    exercise: ExerciseRoute,
    result: ResultRoute,
    topic: TopicRoute,
    notification: NotificationRoute
  });
  const isMounteRef = (0, _react.useRef)(false);
  const scrollViewRef = (0, _react.useRef)();
  const scrollX = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const layout = (0, _reactNative.useWindowDimensions)();
  const barTranslate = _reactNative.Animated.multiply(scrollX, -1);
  const barTranslate1 = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const [headerWidths, setWidths] = (0, _react.useState)([]);
  const onHeaderLayout = (width, index) => {
    const newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
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
    _reactNative.Animated.spring(barTranslate1, {
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
  const renderTabBar = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _ClassDetailStyle.styles.btnContainer,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      bounces: false,
      data: routes,
      ref: scrollViewRef,
      keyExtractor: (_item, index) => index.toString(),
      horizontal: true,
      onScroll: _reactNative.Animated.event([{
        nativeEvent: {
          contentOffset: {
            x: scrollX
          }
        }
      }], {
        useNativeDriver: false
      }),
      showsHorizontalScrollIndicator: false,
      renderItem: itemTab => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _ClassDetailStyle.styles.viewItemHeader,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
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
          style: [index === itemTab.index ? _ClassDetailStyle.styles.btnActive : _ClassDetailStyle.styles.btn],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: index === itemTab.index ? _ClassDetailStyle.styles.btnTextActive : _ClassDetailStyle.styles.btnText,
            i18nKey: itemTab?.item?.title
          })
        })
      }),
      getItemLayout: getItemLayout,
      onScrollToIndexFailed: handleScrollToIndexFailed
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [_ClassDetailStyle.styles.headerBar, {
        width: headerWidths[index],
        transform: [{
          translateX: barTranslate
        }, {
          translateX: barTranslate1
        }]
      }]
    })]
  });
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: classInfo?.title ?? '',
        style: _globalStyles.default.titleScreen,
        numberOfLines: 2
      })
    });
  }, [navigation, classInfo]);
  const funcGetClassById = async () => {
    const response = await (0, _lmsclassApi.getById)(id);
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
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetClassById();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [id]);
  const gotoListClassJoined = () => {
    navigation.navigate(_constants.default.LEARNING_STACK, {
      screen: _constants.default.STUDY_SCREEN
    });
  };
  const handleNextContent = () => {
    setIndex(1);
  };
  const onBack = () => {
    navigation.navigate(_constants.default.LEARNING_STACK, {
      screen: _constants.default.STUDY_SCREEN,
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _ClassDetailStyle.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeTabView.TabView, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogWarnCustom.default, {
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
var _default = exports.default = ClassDetailScreen;
//# sourceMappingURL=ClassDetailScreen.js.map