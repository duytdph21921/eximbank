"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _platforms = require("@utils/platforms");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingVetical: 5
  },
  btnContainer: {
    height: 56,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: _colors.Color.color_bg_tab_view,
    padding: 8,
    width: _platforms.screenWidth,
    justifyContent: 'space-between'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  btnActive: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _colors.Color.color_active_tab_view,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  btnText: {
    color: _colors.Color.black,
    fontWeight: '600',
    fontFamily: _fonts.default.semi,
    fontSize: 12,
    lineHeight: 20.4
  },
  btnTextActive: {
    color: _colors.Color.white,
    fontWeight: '600',
    fontFamily: _fonts.default.semi,
    fontSize: 12,
    lineHeight: 20.4
  },
  btnReturn: {
    marginLeft: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(10)
  },
  headerBar: {
    backgroundColor: _colors.Color.base_color,
    position: 'absolute',
    bottom: 0
  }
});
//# sourceMappingURL=ClassDetail.style.js.map