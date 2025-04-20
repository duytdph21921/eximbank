"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _icon_notification_detail = _interopRequireDefault(require("@assets/icons/icon_notification_detail.svg"));
var _scales = require("@utils/scales");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactNativeRenderHtml = _interopRequireDefault(require("react-native-render-html"));
var _platforms = require("@utils/platforms");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _NotificationClassDetailScreenStyles = require("./NotificationClassDetailScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const NotificationClassDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const params = route?.params;
  const source = {
    html: params?.message?.content
  };
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: ''
    });
  }, [navigation]);

  /**
   * Back to previous screen
   */
  const onBack = (0, _react.useCallback)(() => {
    navigation.navigate(_constants.default.NOTIFICATION_SCREEN, {
      callBack: true
    });
    return true;
  }, []);

  /**
   * Back hander.
   */
  (0, _react.useEffect)(() => {
    _reactNative.BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      _reactNative.BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: _NotificationClassDetailScreenStyles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      contentContainerStyle: _NotificationClassDetailScreenStyles.styles.scrollView,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_notification_detail.default, {
        width: 67,
        height: 67
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: params?.message?.title,
        style: _NotificationClassDetailScreenStyles.styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeRenderHtml.default, {
        contentWidth: _platforms.screenWidth - (0, _scales.horizontal)(2 * 20),
        source: source,
        tagsStyles: mixedStyle
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: [_NotificationClassDetailScreenStyles.styles.btnConfim],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-confim",
        style: [_NotificationClassDetailScreenStyles.styles.textBtnConfim]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-contact",
      style: _NotificationClassDetailScreenStyles.styles.textContact
    })]
  });
};
const mixedStyle = {
  p: {
    color: _colors.Color.text_color,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: _fonts.default.medium
  }
};
var _default = exports.default = NotificationClassDetailScreen;
//# sourceMappingURL=NotificationClassDetailScreen.js.map