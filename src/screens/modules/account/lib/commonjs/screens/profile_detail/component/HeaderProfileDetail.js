"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _helpers = require("@utils/helpers");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable global-require */

const HeaderDetailProfile = props => {
  const {
    avatar,
    displayName,
    email
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.boxInfo,
      children: [avatar ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: {
          uri: (0, _helpers.loadFile)(avatar)
        },
        resizeMode: "contain",
        style: styles.avatarProfile
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: require('@assets/img/avatar.jpeg'),
        resizeMode: "contain",
        style: styles.avatarProfile
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: require('@assets/img/camera.png'),
        resizeMode: "contain",
        style: styles.camera
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        style: styles.textDisplayNameInfo,
        title: displayName
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        style: styles.textUserNameInfo,
        title: email
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    marginTop: (0, _scales.horizontal)(10),
    alignItems: 'center'
  },
  boxInfo: {
    marginTop: (0, _scales.horizontal)(20),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarProfile: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  camera: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  textDisplayNameInfo: {
    textAlign: 'center',
    fontFamily: 'manrope-bold',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700'
  },
  textUserNameInfo: {
    textAlign: 'center',
    fontFamily: 'manrope-regular',
    fontSize: 14,
    lineHeight: 23.8,
    fontWeight: '400'
  }
});
var _default = exports.default = HeaderDetailProfile;
//# sourceMappingURL=HeaderProfileDetail.js.map