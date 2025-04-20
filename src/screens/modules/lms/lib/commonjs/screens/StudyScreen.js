"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeTabView = require("react-native-tab-view");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _StudyStyles = require("./Study.styles.js");
var _ClassRoomScreen = _interopRequireDefault(require("./classroom/ClassRoomScreen.js"));
var _EducationProgramScreen = _interopRequireDefault(require("./educationprogram/EducationProgramScreen.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

// StudyScreen.propTypes = {};

// StudyScreen.defaultProps = {};
const StudyScreen = props => {
  const {
    navigation,
    route
  } = props;
  const [index, setIndex] = (0, _react.useState)(0);
  const [routes] = (0, _react.useState)([{
    key: 'first',
    title: 'text-tab-class-room'
  }, {
    key: 'second',
    title: 'text-tab-edu-programer'
  }
  // { key: "three", title: "text-tab-live-class" },
  // { key: "four", title: "text-tab-class-downloaded" },
  // { key: "five", title: "text-tab-document" },
  ]);
  const [headerWidths, setWidths] = (0, _react.useState)([]);
  const scrollX = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const barTranslate1 = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const scrollViewRef = (0, _react.useRef)();
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-tab-study-screen",
    style: _StudyStyles.styles.textTitleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      title: ''
    });
  }, []);
  const onHeaderLayout = (width, index) => {
    const newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };
  (0, _react.useEffect)(() => {
    let leftOffset = 0;
    for (let i = 0; i < index; i += 1) {
      leftOffset += headerWidths[i];
    }
    scrollViewRef.current.scrollToIndex({
      index,
      viewPosition: 0.5
    });
    _reactNative.Animated.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0
    }).start();
  }, [index]);
  const layout = (0, _reactNative.useWindowDimensions)();
  const ClassRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassRoomScreen.default, {
    navigation: navigation,
    index: index,
    route: route
  }), [index || route?.params?.dataBack]);
  const EduTrandingRoute = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_EducationProgramScreen.default, {
    navigation: navigation,
    index: index,
    route: route
  }), [index]);

  // const FirstRoute = () => (
  //   <View
  //     style={{
  //       marginHorizontal: horizontal(24),
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       flex: 1,
  //     }}
  //   >
  //     <CMText i18nKey="text-comming-soon" />
  //   </View>
  // );

  const renderScene = (0, _reactNativeTabView.SceneMap)({
    first: ClassRoute,
    second: EduTrandingRoute
    // three: FirstRoute,
    // four: FirstRoute,
    // five: FirstRoute,
  });
  const renderTabBar = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: _StudyStyles.styles.btnContainer,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
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
        style: _StudyStyles.styles.viewItemHeader,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          onLayout: e => {
            onHeaderLayout(e.nativeEvent.layout.width, itemTab.index);
          },
          onPress: () => {
            setIndex(itemTab.index);
          },
          style: [_StudyStyles.styles.btnActive, {
            borderBottomColor: index === itemTab.index ? _colors.Color.base_color : _colors.Color.color_bg_tab_view
          }],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: [_StudyStyles.styles.btnTextActive, {
              color: index === itemTab.index ? _colors.Color.base_color : _colors.Color.text_color,
              fontWeight: index === itemTab.index ? '700' : '400'
            }],
            i18nKey: itemTab.item.title
          })
        })
      })
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _StudyStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeTabView.TabView, {
      navigationState: {
        index,
        routes
      },
      renderScene: renderScene,
      onIndexChange: setIndex,
      initialLayout: {
        width: layout.width
      },
      renderTabBar: renderTabBar,
      swipeEnabled: false
    })
  });
};
var _default = exports.default = StudyScreen;
//# sourceMappingURL=StudyScreen.js.map