"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _reactNativeWebview = _interopRequireDefault(require("react-native-webview"));
var _TermScreenStyles = require("./TermScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TermScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    title,
    url
  } = route?.params;
  const webviewRef = (0, _react.useRef)(null);
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: () => {
      navigation.goBack();
    }
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: `${title}`,
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _TermScreenStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeWebview.default, {
      originWhitelist: ['*'],
      source: {
        uri: url
      },
      style: _TermScreenStyles.styles.webView,
      ref: webviewRef,
      javaScriptEnabled: true,
      domStorageEnabled: true,
      mediaPlaybackRequiresUserAction: false,
      allowsInlineMediaPlayback: true,
      startInLoadingState: true,
      mixedContentMode: "always",
      showsVerticalScrollIndicator: false
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(TermScreen);
//# sourceMappingURL=TermScreen.js.map