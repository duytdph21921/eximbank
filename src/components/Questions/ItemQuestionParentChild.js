import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Constant from '@utils/constants';
import { horizontal, vertical } from '@utils/scales';
import IconBookmark from '@assets/icons/icon_bookmark';
import IconUnBookmark from '@assets/icons/icon_unbookmark';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import HTMLView from 'react-native-htmlview';
import globalStyles from '@theme/globalStyles';
import ItemQuestion from './ItemQuestion';
import RenderMediaType from './RenderMediaType';
import ItemQuestionMultiple from './ItemQuestionMultiple';
import ItemQuestionEssay from './ItemQuestionEssay';
/**
 * Loại câu hỏi cha con, có câu hỏi phụ và chỉ được trả lời 1 đáp án.
 * @param {*} props
 * @returns
 */
const ItemQuestionParentChild = (props) => {
  const {
    itemQuestion,
    currentQuestion,
    onAnswerPress,
    onAnswerPressEssay,
    refPlay,
    updateBookmark,
    itemBookmark,
  } = props;
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
      isBookMark: true,
      itemQuestion: item,
      indexQuestion: index,
      itemQuestionParent: itemQuestion,
      currentQuestion,
      refPlay,
    };

    if (
      item?.question?.type === Constant.QUESTION_ONE_SELECT ||
      item?.question?.type === Constant.QUESTION_TF
    ) {
      return (
        <ItemQuestion
          {...commonProps}
          onAnswerPress={(idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            onAnswerPress(
              idQuestion,
              registorUserTestId,
              idAnswer,
              indexAnswer,
              itemQuestion?.id,
              item?.question?.type,
            );
          }}
        />
      );
    }

    if (item?.question?.type === Constant.QUESTION_MULTIPLE_SELECT) {
      return (
        <ItemQuestionMultiple
          {...commonProps}
          onAnswerPress={(idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            onAnswerPress(
              idQuestion,
              registorUserTestId,
              idAnswer,
              indexAnswer,
              itemQuestion?.id,
              item?.question?.type,
            );
          }}
        />
      );
    }

    if (item?.question?.type === Constant.QUESTION_ESSAY) {
      return (
        <ItemQuestionEssay
          {...commonProps}
          onAnswerPress={(idQuestion, registorUserTestId, answer) => {
            onAnswerPressEssay(
              idQuestion,
              registorUserTestId,
              answer,
              itemQuestion?.id,
              item?.question?.type,
            );
          }}
        />
      );
    }

    return <View />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewQuestion}>
        <CMText i18nKey="text-question-number" style={styles.textQuestion}>
          <CMText title={`${currentQuestion + 1}`} style={styles.textQuestion} />
        </CMText>
        <TouchableDebounce
          onPress={() => updateBookmark(itemBookmark?.id, !itemBookmark?.isBookMark)}
        >
          {itemBookmark?.isBookMark ? (
            <IconBookmark width={24} height={24} />
          ) : (
            <IconUnBookmark width={24} height={24} />
          )}
        </TouchableDebounce>
      </View>
      <View style={styles.viewQuestion}>
        <HTMLView value={contentValue} renderNode={renderNode} />
      </View>
      <RenderMediaType
        refPlay={refPlay}
        mediaType={itemQuestion?.question?.mediaType}
        mediaUrl={itemQuestion?.question?.mediaUrl}
      />
      {itemQuestion?.listSubQuestion?.map((item, index) => (
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
    justifyContent: 'space-between',
  },
  textQuestion: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    color: Color.text_color_hover,
  },
  viewTitleQuestion: {
    paddingHorizontal: horizontal(20),
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
    marginTop: vertical(5),
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
