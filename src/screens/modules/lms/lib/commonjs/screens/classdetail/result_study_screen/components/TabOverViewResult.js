"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _icon_olock = _interopRequireDefault(require("@assets/icons/icon_olock"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TabOverViewResult = props => {
  const {
    dataResultOverView,
    onPressHistory
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
    style: styles.container,
    bounces: false,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
      style: styles.viewDate,
      onPress: onPressHistory,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_olock.default, {
        width: 16,
        height: 16
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-history-access",
        style: [styles.textHistory, {
          color: _colors.Color.base_color
        }]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-join-date",
        style: styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: dataResultOverView?.registerDate,
        style: styles.textValue
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-complete-date",
        style: styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: dataResultOverView?.finishDate,
        style: styles.textValue
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-total-time-watching",
        style: styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${dataResultOverView?.totalTimeLearn}`,
        style: styles.textValue
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.itemResult,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-late-access",
        style: styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: dataResultOverView?.lastActiveDate,
        style: styles.textValue
      })]
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: (0, _scales.horizontal)(20)
  },
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textHistory: {
    color: _colors.Color.color_check_answer,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: (0, _scales.horizontal)(5)
  },
  itemResult: {
    borderRadius: 20,
    height: 56,
    borderColor: _colors.Color.color_border,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (0, _scales.vertical)(15),
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color_hover,
    fontFamily: _fonts.default.regular
  },
  textValue: {
    fontSize: 12,
    fontWeight: '600',
    color: _colors.Color.text_color,
    fontFamily: _fonts.default.semi
  }
});
var _default = exports.default = TabOverViewResult;
//# sourceMappingURL=TabOverViewResult.js.map