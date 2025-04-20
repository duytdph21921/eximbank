"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _scales = require("@utils/scales");
var _icon_filter = _interopRequireDefault(require("@assets/icons/icon_filter.svg"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _platforms = require("@utils/platforms");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PLACEHOLDER = {
  en: {
    placeholder: 'Enter search keywords'
  },
  vn: {
    placeholder: 'Nhập từ khóa tìm kiếm'
  }
};
const HeaderEduProgramComponent = props => {
  const {
    countEduProgram,
    onPressFilter,
    onSearch
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [search, setSearch] = (0, _react.useState)('');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
    onPress: _reactNative.Keyboard.dismiss,
    accessible: false,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
        placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
        returnKeyType: "next",
        onSubmitEditing: () => {
          onSearch(search);
        },
        onSubmitSearch: () => {
          onSearch(search);
        },
        blurOnSubmit: false,
        onChangeText: search => {
          setSearch(search?.trim());
        },
        textInputStyle: styles.textInput,
        maxLength: 100,
        isSearch: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewClassFilter,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.viewTextClass,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-tab-edu-programer",
            style: styles.textClass
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: ` (${countEduProgram ?? 0})`,
            style: [styles.textClass, {
              color: _colors.Color.color_text_progress_bar
            }]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          onPress: onPressFilter,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_filter.default, {
            width: 24,
            height: 24
          })
        })]
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: (0, _scales.vertical)(15),
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    alignSelf: 'center'
  },
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: (0, _scales.vertical)(20),
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    alignSelf: 'center'
  },
  viewTextClass: {
    flexDirection: 'row'
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700'
  }
});
var _default = exports.default = HeaderEduProgramComponent;
//# sourceMappingURL=HeaderEduProgramComponent.js.map