"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _arrowRight = _interopRequireDefault(require("@assets/icons/arrow-right.svg"));
var _icon_mail = _interopRequireDefault(require("@assets/icons/icon_mail.svg"));
var _icon_phone = _interopRequireDefault(require("@assets/icons/icon_phone.svg"));
var _support = _interopRequireDefault(require("@assets/icons/support.svg"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _HelpCenterScreenStyles = require("./HelpCenterScreen.styles.js");
var _HelpHeader = _interopRequireDefault(require("./conponents/HelpHeader.js"));
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
const listItem = [{
  id: 1,
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_support.default, {
    width: 44,
    height: 44
  }),
  isNext: true,
  title: 'text-frequently-asked-questions'
}, {
  id: 2,
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_mail.default, {
    width: 44,
    height: 44
  }),
  isNext: false,
  title: 'text-mail'
}, {
  id: 3,
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_phone.default, {
    width: 44,
    height: 44
  }),
  isNext: false,
  title: 'text-phone'
}];
const HelpCenterScreen = props => {
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
    i18nKey: "text-support-center",
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: _HelpCenterScreenStyles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HelpHeader.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _HelpCenterScreenStyles.styles.viewContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-title-help-center",
        style: _HelpCenterScreenStyles.styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-content-help-center",
        style: _HelpCenterScreenStyles.styles.textContent
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
      placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.userplaceholder : PLACEHOLDER.en.userplaceholder,
      returnKeyType: "next",
      blurOnSubmit: false,
      value: "",
      onChangeText: () => {},
      isSearch: true,
      textInputStyle: _HelpCenterScreenStyles.styles.textInput,
      maxLength: 200
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _HelpCenterScreenStyles.styles.viewLine
    }), listItem.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
      style: _HelpCenterScreenStyles.styles.boxMenuItem,
      onPress: () => {
        if (item?.id === 1) {
          navigation.navigate(_constants.default.FREQUENTLY_QUESTION_SCREEN);
        }
      },
      children: [item?.icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        style: _HelpCenterScreenStyles.styles.textMenu,
        i18nKey: item.title
      }), item?.isNext && /*#__PURE__*/(0, _jsxRuntime.jsx)(_arrowRight.default, {
        style: _HelpCenterScreenStyles.styles.arrowRight,
        width: 18,
        height: 18
      })]
    }, item?.id))]
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(HelpCenterScreen);
//# sourceMappingURL=HelpCenterScreen.js.map