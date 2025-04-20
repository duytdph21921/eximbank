"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.color_bg_tab_view
  },
  btnRightHeader: {
    marginRight: (0, _scales.horizontal)(15)
  },
  textRightHeader: {
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.base_color
  },
  viewItemSurvey: {
    flex: 1,
    paddingHorizontal: (0, _scales.horizontal)(20),
    paddingTop: (0, _scales.vertical)(15),
    backgroundColor: _colors.Color.white
  },
  textTitleGroup: {
    fontSize: 20,
    fontWeight: '700',
    color: _colors.Color.text_color,
    fontFamily: _fonts.default.bold,
    lineHeight: 23.7,
    paddingHorizontal: (0, _scales.horizontal)(10),
    paddingVertical: (0, _scales.vertical)(10)
  }
});
//# sourceMappingURL=SurveyResultDetail.styles.js.map