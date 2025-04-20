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
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _icon_checkbox = _interopRequireDefault(require("@assets/icons/icon_checkbox"));
var _icon_uncheckbox = _interopRequireDefault(require("@assets/icons/icon_uncheckbox.svg"));
var _icon_check_result = _interopRequireDefault(require("@assets/icons/icon_check_result.svg"));
var _platforms = require("@utils/platforms");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PLACEHOLDER = {
  en: {
    answer_placeholder: 'Enter another option'
  },
  vn: {
    answer_placeholder: 'Nhập phương án khác'
  }
};

/**
 * Item answer survey contain textinput.
 * @param {*} props
 * @returns
 */
const ItemAnother = props => {
  const {
    selected,
    titleContent,
    isDisable,
    onHandleSelect,
    multipe,
    item,
    onHandleUpdateAnswer
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [answer, setAnswer] = (0, _react.useState)(item?.subContentData);
  const getBorderColor = () => {
    if (selected) {
      return isDisable ? _colors.Color.color_border_answer : _colors.Color.base_color;
    }
    return _colors.Color.color_uncheck;
  };
  const getKey18n = () => {
    if (answer === null && item?.subContentData == null) {
      return 'text-save-question';
    }
    if (answer === item?.subContentData) {
      return 'text-saved-question';
    }
    return 'text-save-question';
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
      activeOpacity: 1,
      style: styles.viewTitle,
      disabled: isDisable,
      onPress: onHandleSelect,
      children: [multipe ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.viewDotsMultipe,
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
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.viewDots, {
          borderWidth: selected ? 7 : 1,
          borderColor: getBorderColor()
        }]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: titleContent,
        style: styles.textContent
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      style: styles.textInput,
      maxLength: 1000,
      multiline: true,
      placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.answer_placeholder : PLACEHOLDER.en.answer_placeholder,
      onChangeText: answer => setAnswer(answer),
      editable: !isDisable,
      value: !isDisable ? answer : item?.lmsSurveyUserQuestionResult?.subAnswer
    }), !isDisable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: [styles.btnSave, {
        backgroundColor: selected ? _colors.Color.base_color : _colors.Color.color_uncheck_answer
      }],
      onPress: () => {
        if (selected) {
          onHandleUpdateAnswer(answer);
        }
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: getKey18n(),
        style: styles.textBtnSave
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeToastMessage.default, {})]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (0, _scales.vertical)(15),
    borderWidth: 1,
    borderColor: _colors.Color.color_uncheck_answer,
    borderRadius: 20,
    paddingVertical: (0, _scales.vertical)(10),
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  viewTitle: {
    flexDirection: 'row'
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
  viewDotsMultipe: {
    width: 24,
    height: 24
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: _colors.Color.text_color,
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  textInput: {
    height: (0, _scales.vertical)(80),
    marginTop: _platforms.isIOS ? (0, _scales.vertical)(5) : 0,
    paddingLeft: (0, _scales.horizontal)(15) + 24,
    textAlignVertical: 'top',
    color: _colors.Color.text_color
  },
  btnSave: {
    backgroundColor: _colors.Color.base_color,
    padding: 5,
    borderRadius: 10,
    width: 80,
    alignItems: 'center'
  },
  textBtnSave: {
    color: _colors.Color.white,
    fontSize: 14,
    fontWeight: '700'
  }
});
var _default = exports.default = ItemAnother;
//# sourceMappingURL=ItemAnother.js.map