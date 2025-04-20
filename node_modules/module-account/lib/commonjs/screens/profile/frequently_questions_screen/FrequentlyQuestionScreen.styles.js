"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: _colors.Color.white
  },
  textInput: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(24 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 20
  }
});
//# sourceMappingURL=FrequentlyQuestionScreen.styles.js.map