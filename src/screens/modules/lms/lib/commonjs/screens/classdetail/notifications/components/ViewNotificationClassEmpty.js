"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _icon_no_notification = _interopRequireDefault(require("@assets/icons/icon_no_notification.svg"));
var _scales = require("@utils/scales");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ViewNotificationClassEmpty = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: styles.container,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_no_notification.default, {
    width: 188,
    height: 140
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-empty-notification",
    style: styles.textEmpty
  })]
});
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%'
  },
  textEmpty: {
    marginTop: (0, _scales.vertical)(20),
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 35
  }
});
var _default = exports.default = ViewNotificationClassEmpty;
//# sourceMappingURL=ViewNotificationClassEmpty.js.map