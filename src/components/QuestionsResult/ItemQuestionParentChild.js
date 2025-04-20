import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Constant from '@utils/constants';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import HTMLView from 'react-native-htmlview';
import ItemQuestion from './ItemQuestion';
import ItemQuestionMultiple from './ItemQuestionMultiple';
import ItemQuestionEssay from './ItemQuestionEssay';

/**
 * Loại câu hỏi cha con, có câu hỏi phụ và chỉ được trả lời 1 đáp án.
 * @param {*} props
 * @returns
 */
const ItemQuestionParentChild = (props) => {
  const { itemQuestion, currentQuestion, refPlay, showResultQuestion, showQuestionAnswer } = props;
  const contentValue = /<\/?[a-z][\s\S]*>/i.test(itemQuestion?.question?.content ?? '')
    ? (itemQuestion?.question?.content ?? '')
    : `<p>${itemQuestion?.question?.content ?? ''}</p>`;
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
              <Text key={`${i + 1}`} style={globalStyles.pText}>
                {/* {defaultRenderer([child], parent)} */}
                {child?.data}
              </Text>
            );
          })}
        </View>
      );
    }
    return null;
  };

  const renderQuestionByType = (item, index) => {
    const commonProps = {
      showResultQuestion,
      showQuestionAnswer,
      itemQuestion: item,
      indexQuestion: index,
      itemQuestionParent: itemQuestion,
      currentQuestion,
    };

    switch (item?.questionType) {
      case Constant.QUESTION_ONE_SELECT:
      case Constant.QUESTION_TF:
        return <ItemQuestion {...commonProps} />;
      case Constant.QUESTION_MULTIPLE_SELECT:
        return <ItemQuestionMultiple {...commonProps} />;
      case Constant.QUESTION_ESSAY:
        return <ItemQuestionEssay {...commonProps} refPlay={refPlay} />;
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewQuestion}>
        <CMText i18nKey="text-question-number" style={styles.textQuestion}>
          <CMText title={`${currentQuestion + 1}`} style={styles.textQuestion} />
        </CMText>
      </View>
      <View style={styles.viewQuestion}>
        <HTMLView value={contentValue} renderNode={renderNode} />
      </View>
      {itemQuestion?.question?.listSubQuestion?.map((item, index) => (
        <View key={`${index + 1}`}>{renderQuestionByType(item, index)}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  viewDotsMultiple: {
    width: 24,
    height: 24,
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

export default ItemQuestionParentChild;
