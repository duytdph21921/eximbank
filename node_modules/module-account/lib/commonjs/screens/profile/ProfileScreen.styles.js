"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WIDTH_IMAGE = _platforms.screenWidth - (0, _scales.horizontal)(24) * 2;
const HEIGHT_IMAGE = WIDTH_IMAGE * 172 / 327;
const SIZE_ITEM = _platforms.isTablet ? 100 : 50;
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: _colors.Color.white
  },
  boxInfo: {
    marginTop: (0, _scales.horizontal)(30),
    borderRadius: (0, _scales.horizontal)(24),
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    backgroundColor: _colors.Color.color_bg_image_profile,
    padding: (0, _scales.horizontal)(16),
    marginHorizontal: 24,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  boxUserInfo: {
    flexDirection: 'row',
    width: '100%'
  },
  avatarProfile: {
    width: SIZE_ITEM,
    height: SIZE_ITEM,
    borderRadius: SIZE_ITEM
  },
  boxProfileInfoText: {
    marginLeft: (0, _scales.vertical)(15),
    justifyContent: 'space-evenly'
  },
  textProfileUsername: {
    fontSize: (0, _scales.textSize)(18),
    fontWeight: '700',
    lineHeight: 25.2,
    color: _colors.Color.white,
    fontFamily: _fonts.default.medium
  },
  textProfileDepartment: {
    fontSize: (0, _scales.textSize)(12),
    fontWeight: '400',
    lineHeight: 20.4,
    color: _colors.Color.white,
    fontFamily: _fonts.default.regular
  },
  boxViewLearnInfoItem: {
    width: (0, _scales.horizontal)(90),
    height: (0, _scales.vertical)(65),
    borderRadius: 16,
    padding: 10,
    backgroundColor: _colors.Color.color_bg_item_profile,
    color: _colors.Color.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxViewLearnInfo: {
    flexDirection: 'row',
    marginTop: (0, _scales.horizontal)(20),
    justifyContent: 'space-between',
    width: '100%'
  },
  textInfoLearn: {
    color: _colors.Color.white,
    fontWeight: '700',
    fontSize: (0, _scales.textSize)(10),
    lineHeight: (0, _scales.textSize)(16),
    fontFamily: _fonts.default.bold,
    marginTop: (0, _scales.vertical)(3)
  },
  boxMenuContent: {
    width: _platforms.screenWidth
  },
  boxMenuProfile: {
    paddingHorizontal: (0, _scales.horizontal)(24),
    marginBottom: (0, _scales.horizontal)(10),
    marginTop: (0, _scales.horizontal)(20)
  },
  boxMenuItem: {
    height: 44,
    flexDirection: 'row',
    width: _platforms.screenWidth - (0, _scales.horizontal)(24) * 2,
    alignItems: 'center'
  },
  textMenu: {
    marginHorizontal: 5,
    fontWeight: '700',
    fontSize: (0, _scales.textSize)(14),
    lineHeight: 23.8
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    marginVertical: 12
  },
  boxDevider: {
    width: _platforms.screenWidth,
    height: 10,
    backgroundColor: _colors.Color.color_bg_tab_view
  },
  btnReturn: {
    marginLeft: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(10)
  }
});
//# sourceMappingURL=ProfileScreen.styles.js.map