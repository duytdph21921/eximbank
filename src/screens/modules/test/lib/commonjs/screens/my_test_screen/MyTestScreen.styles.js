"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.color_home_background
  },
  titleScreen: {
    fontSize: (0, _scales.textSize)(20),
    fontWeight: '700',
    lineHeight: 36,
    marginHorizontal: (0, _scales.horizontal)(15)
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewTextTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCountExam: {
    fontSize: (0, _scales.textSize)(18),
    fontWeight: '700',
    lineHeight: (0, _scales.textSize)(25.2)
  },
  contentContainerStyle: {
    paddingHorizontal: (0, _scales.horizontal)(24)
  }
});
//# sourceMappingURL=MyTestScreen.styles.js.map