"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _platforms = require("@utils/platforms");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WIDTH_ITEM = (_platforms.screenWidth - (0, _scales.horizontal)(20 * 2) - (0, _scales.horizontal)(20)) / 2;
const IMAGE_HEIGHT = WIDTH_ITEM * 154 / 216;
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  tabView: {
    paddingTop: 30,
    backgroundColor: _colors.Color.color_white_education_program
  },
  scene1: {
    flex: 1,
    backgroundColor: _colors.Color.color_red_education_program,
    justifyContent: 'center',
    alignItems: 'center',
    width: _platforms.screenWidth
  },
  scene2: {
    flex: 1,
    backgroundColor: _colors.Color.color_purple_education_program,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerBar: {
    height: (0, _scales.vertical)(1.5),
    backgroundColor: _colors.Color.base_color,
    position: 'absolute',
    bottom: 0
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: _platforms.screenWidth / 2
  },
  viewItemHeader: {
    backgroundColor: _colors.Color.color_bg_tab_view,
    height: (0, _scales.vertical)(42),
    justifyContent: 'center'
  },
  textItemHeader: {
    paddingHorizontal: (0, _scales.horizontal)(20),
    color: _colors.Color.color_text_item
  },
  contentContainerStyle: {
    backgroundColor: _colors.Color.white
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: (0, _scales.vertical)(15),
    marginRight: (0, _scales.horizontal)(20),
    paddingHorizontal: (0, _scales.horizontal)(20)
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8
  },
  textTitleMyClass: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: _colors.Color.text_color,
    marginTop: (0, _scales.vertical)(10),
    height: (0, _scales.vertical)(30)
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(5)
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: _colors.Color.text_color,
    lineHeight: 16,
    paddingHorizontal: (0, _scales.horizontal)(5),
    fontFamily: _fonts.default.regular,
    width: WIDTH_ITEM - 16
  },
  viewProgress: {
    marginTop: (0, _scales.vertical)(10),
    backgroundColor: _colors.Color.color_bg_progress_bar
  },
  textProgress: {
    fontSize: 10,
    fontWeight: '600',
    color: _colors.Color.color_text_progress_bar,
    marginTop: (0, _scales.vertical)(5)
  },
  viewRmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: (0, _scales.vertical)(20)
    // width: screenWidth - horizontal(30),
  },
  textEmptyClass: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: (0, _scales.vertical)(15),
    fontFamily: _fonts.default.bold,
    textAlign: 'center'
  }
});
//# sourceMappingURL=ClassRoom.styles.js.map