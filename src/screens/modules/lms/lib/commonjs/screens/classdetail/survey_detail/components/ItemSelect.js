"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
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
 */const ItemSelect = props => {
  const {
    selected,
    titleContent,
    isDisable,
    onHandleSelect
  } = props;
  const getBorderColor = () => {
    if (selected) {
      return isDisable ? _colors.Color.color_border_answer : _colors.Color.base_color;
    }
    return _colors.Color.color_uncheck;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    activeOpacity: 1,
    style: styles.container,
    onPress: onHandleSelect,
    disabled: isDisable,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.viewDots, {
        borderWidth: selected ? 7 : 1,
        borderColor: getBorderColor()
      }]
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
  viewDots: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: _colors.Color.color_uncheck_answer,
    backgroundColor: _colors.Color.white,
    alignContent: 'center'
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color,
    paddingHorizontal: (0, _scales.horizontal)(15)
  }
});
var _default = exports.default = ItemSelect;
//# sourceMappingURL=ItemSelect.js.map