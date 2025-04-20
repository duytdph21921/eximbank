"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _platforms = require("@utils/platforms");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  viewScrollView: {
    paddingBottom: (0, _scales.vertical)(90 + 15)
  },
  viewHeader: {
    flex: 1,
    flexDirection: 'row',
    width: _platforms.screenWidth - (0, _scales.horizontal)(125),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  btnSubmitHeader: {},
  textSubmitHeader: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    color: _colors.Color.base_color
  }
});
//# sourceMappingURL=MyTestResultInClassScreen.styles.js.map