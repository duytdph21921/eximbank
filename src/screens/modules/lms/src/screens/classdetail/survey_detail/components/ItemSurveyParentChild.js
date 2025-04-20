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
import ItemSelect from './ItemSelect';
import ItemCheckbox from './ItemCheckbox';

const ItemSurveyParentChild = (props) => {
  const { item, index, onHandleSelect, isDisable } = props;
  return (
    <View style={styles.container}>
      <CMText i18nKey="text-question-number" style={styles.textQuestion}>
        <CMText title={`${index + 1}`} style={styles.textQuestion} />
      </CMText>
      <View style={{ flexDirection: 'row' }}>
        <CMText
          title={`${he.decode(replaceHtml(`${item?.description}`))} `}
          style={globalStyles.questionContent}
        />
        {item?.required === Constant.IS_REQUIRED && (
          <CMText title="(*)" style={globalStyles.textRequired} />
        )}
      </View>
      <CMText
        i18nKey={
          item?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5
            ? 'text-select-one-answer'
            : 'text-select-more-answer'
        }
        style={styles.textTypeOption}
      />
      {item?.subContentData?.map((itemSub, indexSub) => (
        <View key={itemSub?.id || indexSub} style={styles.viewQuestionSub}>
          <CMText title={`${itemSub?.title}`} style={styles.textQuestionSub} />
          {itemSub?.answerData?.map((itemAnswer, indexAnswer) => (
            <View key={itemAnswer?.id || `answer-${indexAnswer}`}>
              {item?.type ===
              Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 ? (
                <ItemSelect
                  selected={itemAnswer?.selected}
                  titleContent={itemAnswer?.title}
                  isDisable={isDisable}
                  onHandleSelect={() =>
                    onHandleSelect(item?.id, itemAnswer?.id, itemSub?.id)
                  }
                />
              ) : (
                <ItemCheckbox
                  selected={itemAnswer?.selected}
                  titleContent={itemAnswer?.title}
                  isDisable={isDisable}
                  onHandleSelect={() =>
                    onHandleSelect(item?.id, itemAnswer?.id, itemSub?.id)
                  }
                />
              )}
            </View>
          ))}
        </View>
      ))}
      <View style={styles.viewLine} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: vertical(10),
  },
  textQuestion: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    color: Color.text_color_hover,
  },
  textTitleQuestion: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    marginTop: vertical(15),
  },
  textTypeOption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover,
    fontFamily: fonts.regular,
  },
  viewLine: {
    height: vertical(10),
    width: '100%',
    backgroundColor: Color.color_bg_tab_view,
    marginTop: vertical(10),
  },
  viewQuestionSub: {
    paddingTop: vertical(15),
  },
  textQuestionSub: {
    color: Color.text_color,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 26.4,
  },
});

export default ItemSurveyParentChild;
