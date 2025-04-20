"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _colors = require("@theme/colors");
var _helpers = require("@utils/helpers");
var _reactRedux = require("react-redux");
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _he = _interopRequireDefault(require("he"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PLACEHOLDER = {
  en: {
    answer_placeholder: 'Enter your answer'
  },
  vn: {
    answer_placeholder: 'Nhập câu trả lời'
  }
};
function areEqual(prevProps, nextProps) {
  return prevProps.item.answer === nextProps.item.answer;
}

/**
 * Loại khảo sát trả lời tự luận.
 * @param {*} props
 * @returns
 */
const ItemSurveyEssay = ({
  item,
  index,
  onHandleSelect,
  isDisable
}) => {
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [search, setSearch] = (0, _react.useState)(item?.answer ?? '');
  const getKey18n = () => {
    if (search === null && item?.subContentData == null) {
      return 'text-save-question';
    }
    if (search === item?.subContentData) {
      return 'text-saved-question';
    }
    return 'text-save-question';
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-question-number",
      style: styles.textQuestion,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${index + 1}`,
        style: styles.textQuestion
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        flexDirection: 'row'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${_he.default.decode((0, _helpers.replaceHtml)(`<p>${item?.description}`))} `,
        style: _globalStyles.default.questionContent
      }), item?.required === _constants.default.IS_REQUIRED && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: "(*)",
        style: _globalStyles.default.textRequired
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-answer-questions-in-text-format",
      style: styles.textTypeOption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
      textInputStyle: styles.textInput,
      maxLength: 1000,
      multiline: true,
      placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.answer_placeholder : PLACEHOLDER.en.answer_placeholder,
      onChangeText: answer => {
        setSearch(answer);
      },
      editable: isDisable,
      value: isDisable ? search : item?.lmsSurveyUserQuestionResult?.answer
    }), isDisable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      activeOpacity: 0.7,
      onPress: () => {
        onHandleSelect(item?.id, search.trim());
      },
      style: [styles.buttonSave, {
        backgroundColor: _colors.Color.base_color
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: getKey18n(),
        style: styles.textSave
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.viewLine
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: (0, _scales.vertical)(10)
  },
  textQuestion: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    color: _colors.Color.text_color_hover
  },
  textTitleQuestion: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    marginTop: (0, _scales.vertical)(15)
  },
  textTypeOption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: _colors.Color.text_color_hover,
    fontFamily: _fonts.default.regular
  },
  viewLine: {
    height: (0, _scales.vertical)(10),
    width: '100%',
    backgroundColor: _colors.Color.color_bg_tab_view,
    marginTop: (0, _scales.vertical)(10)
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: _colors.Color.color_uncheck_answer,
    height: (0, _scales.vertical)(150),
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    marginTop: (0, _scales.vertical)(20),
    textAlignVertical: 'top',
    paddingVertical: _platforms.isIOS ? (0, _scales.vertical)(15) : (0, _scales.vertical)(5)
  },
  buttonSave: {
    backgroundColor: _colors.Color.base_color,
    borderRadius: 20,
    width: (0, _scales.horizontal)(80),
    marginVertical: (0, _scales.vertical)(10),
    alignItems: 'center',
    paddingVertical: (0, _scales.vertical)(5)
  },
  textSave: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 26.4,
    color: _colors.Color.white
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(ItemSurveyEssay, areEqual);
//# sourceMappingURL=ItemSurveyEssay.js.map