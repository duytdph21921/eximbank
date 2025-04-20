"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _img_login = _interopRequireDefault(require("@assets/icons/img_login.svg"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _colors = require("@theme/colors");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _ForgetPasswordScreenStyles = require("./ForgetPasswordScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PLACEHOLDER = {
  en: {
    gmailplaceholder: 'Enter my gmail'
  },
  vn: {
    gmailplaceholder: 'Nhập gmail của bạn'
  }
};
const ForgetPasswordScreen = props => {
  const {
    navigation
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [gmail, setGmail] = (0, _react.useState)('');
  /**
   * Check empty for field
   */
  function checkEmptyEmail() {
    return gmail !== '';
  }
  const onHandleForgetPassword = () => {
    navigation.goBack();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _ForgetPasswordScreenStyles.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
      style: _ForgetPasswordScreenStyles.styles.container,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        style: _ForgetPasswordScreenStyles.styles.scrollView,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: _ForgetPasswordScreenStyles.styles.viewImage,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_img_login.default, {
            width: 310,
            height: 187
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
          placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.gmailplaceholder : PLACEHOLDER.en.gmailplaceholder,
          returnKeyType: "next",
          onSubmitEditing: () => {},
          blurOnSubmit: false,
          onChangeText: gmailText => {
            setGmail(gmailText);
          },
          value: gmail,
          textInputStyle: _ForgetPasswordScreenStyles.styles.textInputUser
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: [_ForgetPasswordScreenStyles.styles.btnForgetPass, {
            backgroundColor: checkEmptyEmail() ? _colors.Color.base_color : _colors.Color.color_border
          }],
          onPress: onHandleForgetPassword,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-btn-forget-password",
            style: [_ForgetPasswordScreenStyles.styles.textForgetPass, {
              color: checkEmptyEmail() ? _colors.Color.white : _colors.Color.color_uncheck_answer
            }]
          })
        })]
      })
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(ForgetPasswordScreen);
//# sourceMappingURL=ForgetPasswordScreen.js.map