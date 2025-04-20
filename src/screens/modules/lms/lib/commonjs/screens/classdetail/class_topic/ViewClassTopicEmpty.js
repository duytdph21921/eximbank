"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _icon_empty_class_room = _interopRequireDefault(require("@assets/icons/icon_empty_class_room.svg"));
var _platforms = require("@utils/platforms");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ViewClassTopicEmpty = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: styles.viewRmpty,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_empty_class_room.default, {
    width: 120,
    height: 100
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-empty-class-topic",
    style: styles.textEmptyClass
  })]
});
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
  }
});
var _default = exports.default = ViewClassTopicEmpty;
//# sourceMappingURL=ViewClassTopicEmpty.js.map