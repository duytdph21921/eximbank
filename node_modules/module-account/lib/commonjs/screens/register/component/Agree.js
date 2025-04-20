"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _icon_checkbox = _interopRequireDefault(require("@assets/icons/icon_checkbox"));
var _icon_uncheckbox = _interopRequireDefault(require("@assets/icons/icon_uncheckbox.svg"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Agree = props => {
  const {
    onPressAgree,
    isAgree,
    onPolicyDetail
  } = props;
  const [toggleCheckBox, setToggleCheckBox] = (0, _react.useState)(isAgree);

  /**
   * Xử lí button checkbox.
   */
  const onHandleCheckboxAgree = () => {
    onPressAgree(!toggleCheckBox);
    setToggleCheckBox(!toggleCheckBox);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewCheckbox,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        onPress: () => {
          onHandleCheckboxAgree();
        },
        children: toggleCheckBox ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_checkbox.default, {
          width: 22,
          height: 22
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_uncheckbox.default, {
          width: 22,
          height: 22
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "signup-agree-text",
        style: styles.textAgree
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        onPress: onPolicyDetail,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "signup-terms-of-use-text",
          style: styles.textTerms
        })
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: (0, _scales.horizontal)(20),
    marginVertical: (0, _scales.vertical)(15)
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textAgree: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.4,
    color: _colors.Color.text_color_hover,
    marginLeft: (0, _scales.horizontal)(5)
  },
  textTerms: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22.4,
    color: _colors.Color.text_color_hover,
    marginHorizontal: (0, _scales.horizontal)(5)
  }
});
var _default = exports.default = Agree;
//# sourceMappingURL=Agree.js.map