"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  tabBar: {
    backgroundColor: _colors.Color.color_bg_tab_view,
    paddingHorizontal: (0, _scales.horizontal)(15),
    marginTop: (0, _scales.vertical)(10)
  },
  titleScreen: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 16,
    paddingHorizontal: (0, _scales.horizontal)(5),
    color: _colors.Color.text_color,
    marginVertical: (0, _scales.vertical)(10),
    fontFamily: _fonts.default.bold
  }
});
//# sourceMappingURL=MyTestInClassInforScreen.styles.js.map