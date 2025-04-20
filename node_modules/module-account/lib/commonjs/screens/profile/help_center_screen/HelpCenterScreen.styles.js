"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _platforms = require("@utils/platforms");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    alignContent: 'center'
  },
  viewContent: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: (0, _scales.horizontal)(24)
  },
  textTitle: {
    lineHeight: (0, _scales.textSize)(36),
    fontSize: (0, _scales.textSize)(24),
    fontWeight: '700'
  },
  textContent: {
    lineHeight: (0, _scales.textSize)(23.8),
    fontSize: (0, _scales.textSize)(14),
    fontWeight: '400',
    color: _colors.Color.text_color_hover,
    marginTop: 10
  },
  textInput: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(24 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 20
  },
  viewLine: {
    height: 15,
    backgroundColor: _colors.Color.color_border,
    marginVertical: 20
  },
  boxMenuItem: {
    flexDirection: 'row',
    width: _platforms.screenWidth - (0, _scales.horizontal)(24) * 2,
    alignSelf: 'center',
    marginTop: 10
  },
  textMenu: {
    marginHorizontal: 5,
    marginVertical: 12,
    fontWeight: '700',
    fontSize: (0, _scales.textSize)(14),
    lineHeight: 23.8
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    marginVertical: 12
  }
});
//# sourceMappingURL=HelpCenterScreen.styles.js.map