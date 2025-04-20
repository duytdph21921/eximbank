"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _icon_checkbox = _interopRequireDefault(require("@assets/icons/icon_checkbox"));
var _icon_uncheckbox = _interopRequireDefault(require("@assets/icons/icon_uncheckbox.svg"));
var _icon_check_result = _interopRequireDefault(require("@assets/icons/icon_check_result.svg"));
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Render item select.
 * @param {*} props
 * @returns
 */const ItemCheckbox = props => {
  const {
    selected,
    titleContent,
    isDisable,
    onHandleSelect
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    activeOpacity: 1,
    style: styles.container,
    disabled: isDisable,
    onPress: onHandleSelect,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewDots,
      children: [selected && (isDisable ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_check_result.default, {
        width: 24,
        height: 24
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_checkbox.default, {
        width: 24,
        height: 24
      })), !selected && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_uncheckbox.default, {
        width: 24,
        height: 24
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: titleContent,
      style: styles.textContent
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(15),
    borderWidth: 1,
    borderColor: _colors.Color.color_uncheck_answer,
    borderRadius: 20,
    padding: (0, _scales.horizontal)(15)
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color,
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  viewDots: {
    width: 24,
    height: 24
  }
});
var _default = exports.default = ItemCheckbox;
//# sourceMappingURL=ItemCheckbox.js.map