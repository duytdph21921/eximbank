"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FooterRegister = props => {
  const {
    onPressLogIn
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.viewNotAcount,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-do-have-account",
      style: styles.textNotAccount
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      onPress: onPressLogIn,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "login-button",
        style: [styles.textRegister, {
          color: _colors.Color.base_color
        }]
      })
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: (0, _scales.horizontal)(15)
  },
  btnFooter: {
    borderWidth: 1,
    borderColor: _colors.Color.color_border,
    borderRadius: 8,
    height: (0, _scales.vertical)(72),
    width: (0, _scales.horizontal)(98),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textFooter: {
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.black,
    marginTop: (0, _scales.vertical)(5)
  },
  viewNotAcount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (0, _scales.vertical)(40),
    marginTop: (0, _scales.vertical)(15)
  },
  textNotAccount: {
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color_hover
  },
  textRegister: {
    color: _colors.Color.base_color,
    fontSize: 14,
    fontWeight: '700'
  }
});
var _default = exports.default = FooterRegister;
//# sourceMappingURL=Footer.js.map