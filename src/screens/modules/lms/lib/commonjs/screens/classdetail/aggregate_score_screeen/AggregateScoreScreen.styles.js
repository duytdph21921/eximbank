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
    backgroundColor: _colors.Color.white
  },
  viewItemAggregate: {
    flexDirection: 'row',
    paddingHorizontal: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(20)
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: _colors.Color.color_text_progress_bar
  },
  viewContent: {
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: _fonts.default.bold
  },
  viewScore: {
    flexDirection: 'row',
    paddingVertical: (0, _scales.vertical)(10)
  },
  textScore: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: _fonts.default.regular
  },
  viewVertical: {
    backgroundColor: _colors.Color.color_text_progress_bar,
    width: 1,
    height: 20,
    marginHorizontal: (0, _scales.horizontal)(5)
  },
  btnState: {
    borderRadius: 100,
    width: (0, _scales.horizontal)(120),
    alignItems: 'center'
  },
  textStatus: {
    color: _colors.Color.white,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: _fonts.default.bold,
    paddingVertical: (0, _scales.vertical)(5)
  },
  textScoreRequired: {
    fontSize: 12,
    fontFamily: _fonts.default.regular,
    color: _colors.Color.white,
    fontWeight: '700'
  }
});
//# sourceMappingURL=AggregateScoreScreen.styles.js.map