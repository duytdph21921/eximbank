"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _icon_faceid = _interopRequireDefault(require("@assets/icons/icon_faceid.svg"));
var _icon_finger = _interopRequireDefault(require("@assets/icons/icon_finger.svg"));
var _icon_wifi_off = _interopRequireDefault(require("@assets/icons/icon_wifi_off.svg"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FooterLogin = props => {
  const {
    isShowFaceID,
    isShowTouchID,
    onPressLoginBiometry,
    onPressRegister
  } = props;
  const listFooter = [{
    id: 1,
    title: 'text-face-id',
    icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_faceid.default, {
      width: 24,
      height: 24
    }),
    isShow: isShowFaceID
  }, {
    id: 2,
    title: 'text-finger',
    icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_finger.default, {
      width: 24,
      height: 24
    }),
    isShow: isShowTouchID
  }, {
    id: 3,
    title: 'text-wifi-off',
    icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_wifi_off.default, {
      width: 24,
      height: 24
    }),
    isShow: true
  }];
  const itemFooter = item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [item?.isShow && item?.id !== 3 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
      style: styles.btnFooter,
      onPress: onPressLoginBiometry,
      children: [item.icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: item?.title,
        style: styles.textFooter
      })]
    }), item?.isShow && item?.id === 3 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
      style: styles.btnFooter,
      children: [item.icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: item?.title,
        style: styles.textFooter
      })]
    })]
  }, item.id);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.container,
      children: listFooter.map(item => itemFooter(item))
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewNotAcount,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-do-not-account",
        style: styles.textNotAccount
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        onPress: onPressRegister,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "sigup-button",
          style: [styles.textRegister, {
            color: _colors.Color.base_color
          }]
        })
      })]
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: (0, _scales.horizontal)(15),
    marginTop: (0, _scales.vertical)(15)
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
    marginTop: (0, _scales.vertical)(10)
  },
  viewNotAcount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: (0, _scales.vertical)(20)
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
var _default = exports.default = FooterLogin;
//# sourceMappingURL=FooterLogin.js.map