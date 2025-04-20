"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _icon_filter = _interopRequireDefault(require("@assets/icons/icon_filter.svg"));
var _colors = require("@theme/colors");
var _MyTestScreenStyles = require("../MyTestScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/no-extraneous-dependencies */

const RenderHeaderList = props => {
  const {
    onPressFilter,
    totalRecord
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _MyTestScreenStyles.styles.viewHeader,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _MyTestScreenStyles.styles.viewTextTitle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-title-list-test",
        style: _MyTestScreenStyles.styles.textCountExam
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: ` (${totalRecord})`,
        style: [_MyTestScreenStyles.styles.textCountExam, {
          color: _colors.Color.text_color_hover
        }]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      onPress: onPressFilter,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_filter.default, {
        width: 24,
        height: 24
      })
    })]
  });
};
var _default = exports.default = RenderHeaderList;
//# sourceMappingURL=RenderHeaderList.js.map