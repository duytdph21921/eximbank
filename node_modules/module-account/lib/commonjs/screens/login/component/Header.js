"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _icon_user = _interopRequireDefault(require("@assets/icons/icon_user.svg"));
var _icon_vn = _interopRequireDefault(require("@assets/icons/icon_vn.svg"));
var _icon_en = _interopRequireDefault(require("@assets/icons/icon_en.svg"));
var _icon_down = _interopRequireDefault(require("@assets/icons/icon_down.svg"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _img_login = _interopRequireDefault(require("@assets/icons/img_login.svg"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _helpers = require("@utils/helpers");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Header = props => {
  const {
    onPressLanguage,
    imageLogin
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  /**
   * Xử lý click vào btn thay đổi ngôn ngữ.
   */
  const onHandleLanguage = () => {
    onPressLanguage();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewUser,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewIconUser,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "login-button",
          style: styles.textLogin
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_user.default, {
          width: 22,
          height: 22
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
        style: styles.btnLanguage,
        onPress: onHandleLanguage,
        children: [languageLocal === _constants.default.LANGUAGE_VN ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_vn.default, {
          width: 24,
          height: 24
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_en.default, {
          width: 24,
          height: 24
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_down.default, {
          width: 9.6,
          height: 6.17
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-hello-user",
      style: styles.textHello
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      children: imageLogin ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: {
          uri: (0, _helpers.loadFile)(imageLogin)
        },
        resizeMode: "cover",
        style: styles.imageFileUpload
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_img_login.default, {
        width: 310,
        height: 187,
        style: styles.viewImage
      })
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    marginHorizontal: (0, _scales.horizontal)(15)
  },
  viewUser: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewIconUser: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  textLogin: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    paddingRight: (0, _scales.horizontal)(5)
  },
  textHello: {
    fontSize: 12,
    fontWeight: '400'
  },
  btnLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    width: _platforms.isTablet ? (0, _scales.horizontal)(20) : (0, _scales.horizontal)(40),
    justifyContent: 'space-between'
  },
  viewImage: {
    alignItems: 'center',
    marginTop: (0, _scales.vertical)(50)
  },
  imageFileUpload: {
    height: 327,
    width: _platforms.screenWidth - (0, _scales.horizontal)(15) * 2,
    marginTop: (0, _scales.vertical)(25)
  }
});
var _default = exports.default = Header;
//# sourceMappingURL=Header.js.map