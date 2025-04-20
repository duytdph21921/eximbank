"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _scales = require("@utils/scales");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _platforms = require("@utils/platforms");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */

const PLACEHOLDER = {
  en: {
    placeholder: 'Enter search keywords'
  },
  vn: {
    placeholder: 'Nhập từ khóa tìm kiếm'
  }
};
const ViewHeader = props => {
  const {
    valueSearch,
    onSubmitSearch
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [search, setSearch] = (0, _react.useState)(valueSearch);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
      placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
      textInputStyle: styles.textInput,
      isSearch: true,
      returnKeyType: "next",
      onSubmitEditing: () => {
        onSubmitSearch(search);
      },
      blurOnSubmit: false,
      onChangeText: search => {
        setSearch(search);
      },
      onSubmitSearch: () => {
        onSubmitSearch(search);
      }
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'relative',
    margin: (0, _scales.horizontal)(24)
  },
  viewInput: {
    borderRadius: 16,
    borderWidth: 1
  },
  textInput: {
    borderRadius: 16,
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    borderWidth: 1
  }
});
var _default = exports.default = ViewHeader;
//# sourceMappingURL=ViewHeader.js.map