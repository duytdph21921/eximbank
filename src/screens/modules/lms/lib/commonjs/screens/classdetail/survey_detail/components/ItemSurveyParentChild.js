"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _helpers = require("@utils/helpers");
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _he = _interopRequireDefault(require("he"));
var _ItemSelect = _interopRequireDefault(require("./ItemSelect.js"));
var _ItemCheckbox = _interopRequireDefault(require("./ItemCheckbox.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ItemSurveyParentChild = props => {
  const {
    item,
    index,
    onHandleSelect,
    isDisable
  } = props;
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
        title: `${_he.default.decode((0, _helpers.replaceHtml)(`${item?.description}`))} `,
        style: _globalStyles.default.questionContent
      }), item?.required === _constants.default.IS_REQUIRED && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: "(*)",
        style: _globalStyles.default.textRequired
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: item?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 ? 'text-select-one-answer' : 'text-select-more-answer',
      style: styles.textTypeOption
    }), item?.subContentData?.map((itemSub, indexSub) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewQuestionSub,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${itemSub?.title}`,
        style: styles.textQuestionSub
      }), itemSub?.answerData?.map((itemAnswer, indexAnswer) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        children: item?.type === _constants.default.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemSelect.default, {
          selected: itemAnswer?.selected,
          titleContent: itemAnswer?.title,
          isDisable: isDisable,
          onHandleSelect: () => onHandleSelect(item?.id, itemAnswer?.id, itemSub?.id)
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemCheckbox.default, {
          selected: itemAnswer?.selected,
          titleContent: itemAnswer?.title,
          isDisable: isDisable,
          onHandleSelect: () => onHandleSelect(item?.id, itemAnswer?.id, itemSub?.id)
        })
      }, itemAnswer?.id || `answer-${indexAnswer}`))]
    }, itemSub?.id || indexSub)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
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
  viewQuestionSub: {
    paddingTop: (0, _scales.vertical)(15)
  },
  textQuestionSub: {
    color: _colors.Color.text_color,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 26.4
  }
});
var _default = exports.default = ItemSurveyParentChild;
//# sourceMappingURL=ItemSurveyParentChild.js.map