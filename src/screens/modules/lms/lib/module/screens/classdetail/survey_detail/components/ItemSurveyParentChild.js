"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '@theme/colors';
import { vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import Constant from '@utils/constants';
import { replaceHtml } from '@utils/helpers';
import globalStyles from '@theme/globalStyles';
import he from 'he';
import ItemSelect from "./ItemSelect.js";
import ItemCheckbox from "./ItemCheckbox.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ItemSurveyParentChild = props => {
  const {
    item,
    index,
    onHandleSelect,
    isDisable
  } = props;
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
        title: `${he.decode(replaceHtml(`${item?.description}`))} `,
        style: globalStyles.questionContent
      }), item?.required === Constant.IS_REQUIRED && /*#__PURE__*/_jsx(CMText, {
        title: "(*)",
        style: globalStyles.textRequired
      })]
    }), /*#__PURE__*/_jsx(CMText, {
      i18nKey: item?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 ? 'text-select-one-answer' : 'text-select-more-answer',
      style: styles.textTypeOption
    }), item?.subContentData?.map((itemSub, indexSub) => /*#__PURE__*/_jsxs(View, {
      style: styles.viewQuestionSub,
      children: [/*#__PURE__*/_jsx(CMText, {
        title: `${itemSub?.title}`,
        style: styles.textQuestionSub
      }), itemSub?.answerData?.map((itemAnswer, indexAnswer) => /*#__PURE__*/_jsx(View, {
        children: item?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 ? /*#__PURE__*/_jsx(ItemSelect, {
          selected: itemAnswer?.selected,
          titleContent: itemAnswer?.title,
          isDisable: isDisable,
          onHandleSelect: () => onHandleSelect(item?.id, itemAnswer?.id, itemSub?.id)
        }) : /*#__PURE__*/_jsx(ItemCheckbox, {
          selected: itemAnswer?.selected,
          titleContent: itemAnswer?.title,
          isDisable: isDisable,
          onHandleSelect: () => onHandleSelect(item?.id, itemAnswer?.id, itemSub?.id)
        })
      }, itemAnswer?.id || `answer-${indexAnswer}`))]
    }, itemSub?.id || indexSub)), /*#__PURE__*/_jsx(View, {
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
  viewQuestionSub: {
    paddingTop: vertical(15)
  },
  textQuestionSub: {
    color: Color.text_color,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 26.4
  }
});
export default ItemSurveyParentChild;
//# sourceMappingURL=ItemSurveyParentChild.js.map