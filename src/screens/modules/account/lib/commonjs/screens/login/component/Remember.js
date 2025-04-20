"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _icon_uncheckbox = _interopRequireDefault(require("@assets/icons/icon_uncheckbox.svg"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _reactRedux = require("react-redux");
var _icon_checkbox = _interopRequireDefault(require("@assets/icons/icon_checkbox"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Remember = props => {
  const {
    onPressRemember,
    diasbleRemember
  } = props;
  const userState = (0, _reactRedux.useSelector)(state => state.auth.userState);
  const [toggleCheckBox, setToggleCheckBox] = (0, _react.useState)(userState?.isRemember);

  /**
   * Xử lí button checkbox.
   */
  const onHandleCheckbox = () => {
    setToggleCheckBox(!toggleCheckBox);
    onPressRemember(!toggleCheckBox);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
      style: styles.viewCheckbox,
      onPress: onHandleCheckbox,
      disabled: diasbleRemember,
      children: [toggleCheckBox === _constants.default.IS_REMEMBER ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_checkbox.default, {
        width: 22,
        height: 22
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_uncheckbox.default, {
        width: 22,
        height: 22
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-remember-account",
        style: [styles.textRememer, {
          marginHorizontal: (0, _scales.horizontal)(5)
        }]
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
    marginVertical: (0, _scales.vertical)(10)
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textRememer: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: _colors.Color.text_color_hover
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(Remember);
//# sourceMappingURL=Remember.js.map