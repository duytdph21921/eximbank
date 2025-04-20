"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _icon_back_login = _interopRequireDefault(require("@assets/icons/icon_back_login.svg"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Header = props => {
  const {
    onPressReturnLogin
  } = props;
  /**
   * Xử lý click vào btn quay lại trang đăng nhập.
   */
  const onHandleReturnLogin = () => {
    onPressReturnLogin();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.btnReturn,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        style: styles.btnLanguage,
        onPress: onPressReturnLogin,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_back_login.default, {
          width: 44,
          height: 44
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.textHeaderRegister,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "sigup-text-header",
        style: styles.textLogin
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "sigup-text-header-info",
        style: styles.textHello
      })]
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    marginHorizontal: (0, _scales.horizontal)(15)
  },
  textLogin: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    paddingRight: (0, _scales.horizontal)(5)
  },
  textHello: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    color: _colors.Color.text_color_hover,
    marginTop: (0, _scales.vertical)(5)
  },
  btnReturn: {
    marginBottom: (0, _scales.horizontal)(24)
  },
  textHeaderRegister: {
    marginBottom: (0, _scales.horizontal)(24)
  }
});
var _default = exports.default = Header;
//# sourceMappingURL=Header.js.map