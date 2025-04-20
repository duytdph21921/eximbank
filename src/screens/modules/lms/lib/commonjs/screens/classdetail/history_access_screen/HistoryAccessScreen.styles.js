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
  viewItemHistory: {
    flexDirection: 'row',
    paddingHorizontal: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(20)
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: _fonts.default.bold,
    lineHeight: 23.8
  },
  textDate: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: _fonts.default.regular,
    lineHeight: 20.4,
    paddingTop: (0, _scales.vertical)(5)
  }
});
//# sourceMappingURL=HistoryAccessScreen.styles.js.map