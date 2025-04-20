"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _FrequentlyQuestionScreenStyles = require("./FrequentlyQuestionScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PLACEHOLDER = {
  en: {
    userplaceholder: 'What do you want to help with?'
  },
  vn: {
    userplaceholder: 'Bạn muốn trợ giúp điều gì'
  }
};
const FrequentlyQuestionScreen = props => {
  const {
    navigation,
    route
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: () => {
      navigation.goBack();
    }
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-frequently-asked-questions",
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
    style: _FrequentlyQuestionScreenStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
      placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.userplaceholder : PLACEHOLDER.en.userplaceholder,
      returnKeyType: "next",
      blurOnSubmit: false,
      value: "",
      onChangeText: help => {},
      isSearch: true,
      textInputStyle: _FrequentlyQuestionScreenStyles.styles.textInput,
      maxLength: 200
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(FrequentlyQuestionScreen);
//# sourceMappingURL=FrequentlyQuestionScreen.js.map