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
  contentBox: {
    paddingHorizontal: (0, _scales.horizontal)(30)
  },
  boxInfomation: {
    marginTop: (0, _scales.horizontal)(30)
  },
  textLabel: {
    fontFamily: _fonts.default.medium,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    textAlign: 'left'
  },
  textNomal: {
    fontFamily: 'manrope-regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left'
  },
  boxItem: {
    marginBottom: 10,
    textAlign: 'left'
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: (0, _scales.vertical)(20)
  },
  btnEdit: {
    borderRadius: 100,
    paddingHorizontal: (0, _scales.horizontal)(16),
    paddingVertical: (0, _scales.vertical)(8),
    backgroundColor: _colors.Color.base_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: _colors.Color.base_color,
    borderWidth: 1,
    minWidth: '45%'
  },
  btnDefault: {
    borderRadius: 100,
    paddingHorizontal: (0, _scales.horizontal)(16),
    paddingVertical: (0, _scales.vertical)(8),
    backgroundColor: _colors.Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: _colors.Color.text_color,
    borderWidth: 1,
    minWidth: '45%'
  },
  whiteColor: {
    color: _colors.Color.white
  },
  textBtn: {
    fontFamily: 'manrope-bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4
  },
  btnReturn: {
    marginLeft: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(10)
  }
});
//# sourceMappingURL=ProfileDetailScreen.style.js.map