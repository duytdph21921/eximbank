"use strict";

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Constant from '@utils/constants';
import { isIOS, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { replaceHtml } from '@utils/helpers';
import { useSelector } from 'react-redux';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import he from 'he';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const languageLocal = useSelector(state => state.global.language);
  const [search, setSearch] = useState(item?.answer ?? '');
  const getKey18n = () => {
    if (search === null && item?.subContentData == null) {
      return 'text-save-question';
    }
    if (search === item?.subContentData) {
      return 'text-saved-question';
    }
    return 'text-save-question';
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-question-number",
      style: styles.textQuestion,
      children: /*#__PURE__*/_jsx(CMText, {
        title: `${index + 1}`,
        style: styles.textQuestion
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        flexDirection: 'row'
      },
      children: [/*#__PURE__*/_jsx(CMText, {
        title: `${he.decode(replaceHtml(`<p>${item?.description}`))} `,
        style: globalStyles.questionContent
      }), item?.required === Constant.IS_REQUIRED && /*#__PURE__*/_jsx(CMText, {
        title: "(*)",
        style: globalStyles.textRequired
      })]
    }), /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-answer-questions-in-text-format",
      style: styles.textTypeOption
    }), /*#__PURE__*/_jsx(CMTextInput, {
      textInputStyle: styles.textInput,
      maxLength: 1000,
      multiline: true,
      placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.answer_placeholder : PLACEHOLDER.en.answer_placeholder,
      onChangeText: answer => {
        setSearch(answer);
      },
      editable: isDisable,
      value: isDisable ? search : item?.lmsSurveyUserQuestionResult?.answer
    }), isDisable && /*#__PURE__*/_jsx(TouchableDebounce, {
      activeOpacity: 0.7,
      onPress: () => {
        onHandleSelect(item?.id, search.trim());
      },
      style: [styles.buttonSave, {
        backgroundColor: Color.base_color
      }],
      children: /*#__PURE__*/_jsx(CMText, {
        i18nKey: getKey18n(),
        style: styles.textSave
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.viewLine
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: vertical(10)
  },
  textQuestion: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    color: Color.text_color_hover
  },
  textTitleQuestion: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    marginTop: vertical(15)
  },
  textTypeOption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover,
    fontFamily: fonts.regular
  },
  viewLine: {
    height: vertical(10),
    width: '100%',
    backgroundColor: Color.color_bg_tab_view,
    marginTop: vertical(10)
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    height: vertical(150),
    width: screenWidth - horizontal(20 * 2),
    marginTop: vertical(20),
    textAlignVertical: 'top',
    paddingVertical: isIOS ? vertical(15) : vertical(5)
  },
  buttonSave: {
    backgroundColor: Color.base_color,
    borderRadius: 20,
    width: horizontal(80),
    marginVertical: vertical(10),
    alignItems: 'center',
    paddingVertical: vertical(5)
  },
  textSave: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.white
  }
});
export default /*#__PURE__*/React.memo(ItemSurveyEssay, areEqual);
//# sourceMappingURL=ItemSurveyEssay.js.map