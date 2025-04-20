/* eslint-disable eqeqeq */
import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconResult from '@assets/icons/icon_result.svg';
import IconError from '@assets/icons/icon_error.svg';
import RenderMediaType from '@components/Questions/RenderMediaType';
import Constant from '@utils/constants';
import HTMLView from 'react-native-htmlview';
import globalStyles from '@theme/globalStyles';
import { replaceHtml } from '@utils/helpers';

const ItemQuestion = (props) => {
  /**
   * itemQuestion: nội dung của câu hỏi hiện tại.
   * currentQuestion: câu hỏi hiện tại.
   * isResult: Item ở trạng thái của màn result.
   */
  const {
    itemQuestion,
    indexQuestion,
    itemQuestionParent,
    currentQuestion,
    showQuestionAnswer,
    showResultQuestion,
  } = props;
  const contentValue = /<\/?[a-z][\s\S]*>/i.test(itemQuestion?.question?.content ?? '')
    ? (itemQuestion?.question?.content ?? '')
    : `<p>${itemQuestion?.question?.content ?? ''}</p>`;
  /**
   * Render item answer.
   * @param {*} param0
   * @returns
   */
  const itemAnswer = (item, index) => {
    let result;
    if (itemQuestion?.answer !== '') {
      result = JSON.parse(itemQuestion?.answer);
    } else {
      result = JSON.parse('[]');
    }
    return (
      <View style={[styles.viewItemAnswer]} key={item?.id || index}>
        <TouchableDebounce
          disabled
          style={[
            styles.viewDots,
            {
              borderWidth: result != [] && result?.includes(item?.id) ? 7 : 1,
              borderColor:
                result != [] && result?.includes(item?.id)
                  ? Color.base_color
                  : Color.color_uncheck_answer,
            },
          ]}
        />
        <CMText title={replaceHtml(item?.content)} style={styles.textAnswer} />
        <View style={styles.viewIconResult}>
          {item?.isCheck == true &&
            showResultQuestion === true &&
            showQuestionAnswer === Constant.SHOW_QUESTION_ANSWER_RESULT.showQuestionAnswer && (
              <IconResult width={24} height={24} />
            )}
        </View>
      </View>
    );
  };
  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'p' || node.name === 'span' || node.name === 'strong') {
      return (
        <View key={index} style={globalStyles.pContainer}>
          {node.children.map((child, i) => {
            if (child.name === 'img') {
              return (
                <Image
                  key={`${i + 1}`}
                  source={{ uri: child.attribs.src }}
                  style={globalStyles.pImg}
                  resizeMode="cover"
                />
              );
            }
            return (
              <View key={`${i + 1}`} style={globalStyles.flexRowDirector}>
                <Text style={globalStyles.pText}>
                  {/* {defaultRenderer([child], parent)} */}
                  {child?.data}
                </Text>
                {(showQuestionAnswer === Constant.SHOW_QUESTION_ANSWER_RESULT.showQuestionAnswer ||
                  showQuestionAnswer === Constant.SHOW_QUESTION_ANSWER_RESULT.showQuestion) &&
                  (itemQuestion?.isTrue ? (
                    <IconResult width={24} height={24} />
                  ) : (
                    <IconError width={24} height={24} />
                  ))}
              </View>
            );
          })}
        </View>
      );
    }
    return null;
  };
  return (
    <View>
      <View style={styles.viewQuestion}>
        <CMText i18nKey="text-question-number" style={styles.textQuestion} />
        <CMText
          title={`${
            itemQuestionParent?.questionType === Constant.QUESTION_HC
              ? `${currentQuestion + 1}.${indexQuestion + 1}`
              : currentQuestion + 1
          }`}
          style={styles.textQuestion}
        />
      </View>
      <View style={styles.viewTitleQuestion}>
        <View>
          <HTMLView value={contentValue} renderNode={renderNode} />
        </View>
        <RenderMediaType
          mediaType={itemQuestion?.question?.mediaType}
          mediaUrl={itemQuestion?.question?.mediaUrl}
        />
        <CMText
          i18nKey={
            itemQuestion?.questionType === 1 ? 'text-select-one-answer' : 'text-select-more-answer'
          }
          style={styles.textTypeOption}
        />
      </View>
      <View style={styles.viewContentQuestion}>
        {itemQuestion?.question?.testAnswer.map((item, index) => itemAnswer(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewQuestion: {
    flexDirection: 'row',
    paddingHorizontal: horizontal(20),
    marginTop: vertical(20),
  },
  textQuestion: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    color: Color.text_color_hover,
  },
  viewTitleQuestion: {
    paddingHorizontal: horizontal(20),
    marginTop: vertical(20),
  },
  textTitleQuestion: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
  },
  textTypeOption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover,
    fontFamily: fonts.regular,
    marginTop: vertical(10),
  },
  viewContentQuestion: {
    paddingHorizontal: horizontal(20),
  },
  viewItemAnswer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vertical(15),
    backgroundColor: Color.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_border_answer,
    marginTop: vertical(20),
  },
  viewDots: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    backgroundColor: Color.white,
    alignContent: 'center',
    marginHorizontal: horizontal(10),
  },
  textAnswer: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    color: Color.text_color,
    fontFamily: fonts.regular,
    flex: 1,
  },
  viewIconResult: {
    width: horizontal(40),
    backgroundColor: Color.white,
    alignItems: 'center',
  },
});
export default ItemQuestion;
