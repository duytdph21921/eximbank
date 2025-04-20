"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _platforms = require("@utils/platforms");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textComplete: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    fontFamily: _fonts.default.medium
  },
  textCompleteTk: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    fontFamily: _fonts.default.medium,
    color: _colors.Color.text_color_hover,
    width: _platforms.screenWidth - (0, _scales.horizontal)(80),
    textAlign: 'center',
    marginTop: (0, _scales.vertical)(15)
  },
  btnFooter: {
    height: 56,
    width: _platforms.screenWidth - (0, _scales.horizontal)(15 * 2),
    borderRadius: 28,
    paddingHorizontal: 15,
    backgroundColor: _colors.Color.base_color,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 1,
    position: 'absolute'
  },
  textFooter: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: _colors.Color.white
  }
});
//# sourceMappingURL=SurveyResultScreen.styles.js.map