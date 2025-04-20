"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _icon_empty_class_room = _interopRequireDefault(require("@assets/icons/icon_empty_class_room.svg"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ViewClassRoomEmpty = ({
  onPressExplore
}) => {
  /**
   * Click button Khám phá khoá học.
   */
  const onHandleExplore = () => {
    onPressExplore();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.viewRmpty,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_empty_class_room.default, {
      width: 120,
      height: 100
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-empty-class-room",
      style: styles.textEmptyClass
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-empty-content-class-room",
      style: styles.textEmptyContent,
      numberOfLines: 2
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: [styles.btnExplore, {
        backgroundColor: _colors.Color.base_color
      }],
      onPress: onHandleExplore,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-button-explore",
        style: styles.textBtnExplore
      })
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
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
  },
  textEmptyContent: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: (0, _scales.vertical)(15),
    width: _platforms.screenWidth * 0.75,
    textAlign: 'center',
    fontFamily: _fonts.default.bold,
    marginBottom: (0, _scales.vertical)(30)
  },
  btnExplore: {
    backgroundColor: _colors.Color.base_color,
    height: 56,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (0, _scales.vertical)(20),
    paddingHorizontal: (0, _scales.horizontal)(20),
    marginBottom: (0, _scales.vertical)(30)
  },
  textBtnExplore: {
    color: _colors.Color.white,
    fontSize: 16,
    fontWeight: '700'
  }
});
var _default = exports.default = ViewClassRoomEmpty;
//# sourceMappingURL=ViewClassRoomEmpty.js.map