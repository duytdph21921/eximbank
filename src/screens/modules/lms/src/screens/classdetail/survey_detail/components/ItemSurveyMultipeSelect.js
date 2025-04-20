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
import ItemAnother from './ItemAnother';
import ItemCheckbox from './ItemCheckbox';

/**
 * Loại khảo sát chọn nhiều và loại chọn nhiều có kèm trả lời tự luận.
 * @param {*} props
 * @returns
 */
const ItemSurveyMultipeSelect = (props) => {
  const { item, index, onHandleSelect, isDisable, onHandleUpdateAnswer } =
    props;

  return (
    <View style={styles.container}>
      <CMText i18nKey="text-question-number" style={styles.textQuestion}>
        <CMText title={`${index + 1}`} style={styles.textQuestion} />
      </CMText>
      <View style={{ flexDirection: 'row' }}>
        <CMText
          title={`${he.decode(replaceHtml(`<p>${item?.description}`))} `}
          style={globalStyles.questionContent}
        />
        {item?.required === Constant.IS_REQUIRED && (
          <CMText title="(*)" style={globalStyles.textRequired} />
        )}
      </View>
      <CMText i18nKey="text-select-more-answer" style={styles.textTypeOption} />
      {item?.answerData?.map((items, index) => (
        <View key={items?.id || index}>
          {item?.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 &&
          index === (item?.answerData?.length ?? 0) - 1 ? (
            <ItemAnother
              multipe
              selected={items?.selected}
              titleContent={items?.title}
              isDisable={isDisable}
              item={item}
              onHandleSelect={() =>
                onHandleSelect(item?.id, items?.id, items?.selected)
              }
              onHandleUpdateAnswer={(answer) => {
                onHandleUpdateAnswer(item?.id, answer, items?.selected);
              }}
            />
          ) : (
            <ItemCheckbox
              selected={items?.selected}
              titleContent={items?.title}
              isDisable={isDisable}
              onHandleSelect={() => onHandleSelect(item?.id, items?.id)}
            />
          )}
        </View>
      ))}
      <View style={styles.viewLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vertical(15),
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
});
export default ItemSurveyMultipeSelect;
