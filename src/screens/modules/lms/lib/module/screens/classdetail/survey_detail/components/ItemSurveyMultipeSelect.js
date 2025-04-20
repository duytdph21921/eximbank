"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { replaceHtml } from '@utils/helpers';
import fonts from '@assets/value/fonts';
import { vertical } from '@utils/scales';
import Constant from '@utils/constants';
import globalStyles from '@theme/globalStyles';
import he from 'he';
import ItemAnother from "./ItemAnother.js";
import ItemCheckbox from "./ItemCheckbox.js";

/**
 * Loại khảo sát chọn nhiều và loại chọn nhiều có kèm trả lời tự luận.
 * @param {*} props
 * @returns
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ItemSurveyMultipeSelect = props => {
  const {
    item,
    index,
    onHandleSelect,
    isDisable,
    onHandleUpdateAnswer
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
        title: `${he.decode(replaceHtml(`<p>${item?.description}`))} `,
        style: globalStyles.questionContent
      }), item?.required === Constant.IS_REQUIRED && /*#__PURE__*/_jsx(CMText, {
        title: "(*)",
        style: globalStyles.textRequired
      })]
    }), /*#__PURE__*/_jsx(CMText, {
      i18nKey: "text-select-more-answer",
      style: styles.textTypeOption
    }), item?.answerData?.map((items, index) => /*#__PURE__*/_jsx(View, {
      children: item?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 && index === (item?.answerData?.length ?? 0) - 1 ? /*#__PURE__*/_jsx(ItemAnother, {
        multipe: true,
        selected: items?.selected,
        titleContent: items?.title,
        isDisable: isDisable,
        item: item,
        onHandleSelect: () => onHandleSelect(item?.id, items?.id, items?.selected),
        onHandleUpdateAnswer: answer => {
          onHandleUpdateAnswer(item?.id, answer, items?.selected);
        }
      }) : /*#__PURE__*/_jsx(ItemCheckbox, {
        selected: items?.selected,
        titleContent: items?.title,
        isDisable: isDisable,
        onHandleSelect: () => onHandleSelect(item?.id, items?.id)
      })
    }, items?.id || index)), /*#__PURE__*/_jsx(View, {
      style: styles.viewLine
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vertical(15)
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
  }
});
export default ItemSurveyMultipeSelect;
//# sourceMappingURL=ItemSurveyMultipeSelect.js.map