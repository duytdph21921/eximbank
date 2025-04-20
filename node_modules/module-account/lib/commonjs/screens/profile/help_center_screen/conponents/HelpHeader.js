"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable global-require */

const RATE_IMAGE = 168.55 / (327 - 20 * 2);
const WIDTH_IMAGE = _platforms.screenWidth;
const HEIGHT_IMAGE = WIDTH_IMAGE * RATE_IMAGE;
const HelpHeader = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
  style: styles.container,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
    source: require('@assets/img/icon_background_help.png'),
    resizeMode: _reactNativeFastImage.default.resizeMode.stretch,
    style: styles.bgHeader
  })
});
const styles = _reactNative.StyleSheet.create({
  container: {
    elevation: 1,
    ..._reactNative.Platform.select({
      ios: {
        shadowColor: _colors.Color.cl_text_app,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 1,
        shadowOffset: {
          width: 0,
          height: 10
        },
        backgroundColor: _colors.Color.transparents
      },
      android: {
        elevation: 1,
        backgroundColor: _colors.Color.transparents
      }
    }),
    marginTop: (0, _scales.vertical)(20),
    alignSelf: 'center'
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: (0, _scales.horizontal)(20),
    position: 'absolute',
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE
  },
  bgHeader: {
    padding: 24,
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    alignSelf: 'center'
  }
});
var _default = exports.default = HelpHeader;
//# sourceMappingURL=HelpHeader.js.map