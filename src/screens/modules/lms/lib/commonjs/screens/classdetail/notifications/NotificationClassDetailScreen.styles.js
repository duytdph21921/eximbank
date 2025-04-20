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
    backgroundColor: _colors.Color.white
  },
  scrollView: {
    paddingHorizontal: (0, _scales.horizontal)(20),
    paddingTop: (0, _scales.vertical)(70)
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: (0, _scales.vertical)(20)
  },
  btnConfim: {
    height: 56,
    width: _platforms.screenWidth - (0, _scales.horizontal)(20) * 2,
    borderRadius: 100,
    marginTop: (0, _scales.vertical)(50),
    marginBottom: (0, _scales.vertical)(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _colors.Color.base_color
  },
  textBtnConfim: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: _colors.Color.white
  },
  textContact: {
    fontSize: 12,
    fontWeight: '400'
  }
});
//# sourceMappingURL=NotificationClassDetailScreen.styles.js.map