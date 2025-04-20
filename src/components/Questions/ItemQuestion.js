import React, { useCallback, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import RenderMediaType from '@components/Questions/RenderMediaType';
import IconBookmark from '@assets/icons/icon_bookmark';
import IconUnBookmark from '@assets/icons/icon_unbookmark';
import globalStyles from '@theme/globalStyles';
import HTMLView from 'react-native-htmlview';
import { replaceHtml } from '@utils/helpers';

/**
 * Loại câu hỏi chỉ chọn 1 đáp án và đáp án true/false.
 * @param {*} props
 * @returns
 */
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
    onAnswerPress,
    refPlay,
    updateBookmark,
    itemBookmark,
    isBookMark,
  } = props;
  const contentValue = /<\/?[a-z][\s\S]*>/i.test(itemQuestion?.question?.content ?? '')
    ? (itemQuestion?.question?.content ?? '')
    : `<p>${itemQuestion?.question?.content ?? ''}</p>`;
  /**
   * Click answer.
   * Mỗi lần click vào trả lời câu trả lời call api với id câu hỏi và id câu trả lời.
   * @param {*} index
   */
  const onHandleAnswer = (item, index) => {
    onAnswerPress(itemQuestion?.id, itemQuestion?.registorUserTestId, item?.id, index);
  };

  /**
   * Render item answer.
   * @param {*} param0
   * @returns
   */
  const itemAnswer = (item, index) => (
    <TouchableDebounce
      activeOpacity={1}
      style={[styles.viewItemAnswer]}
      onPress={() => onHandleAnswer(item, index)}
      key={item?.id || index}
    >
      <View
        style={[
          styles.viewDots,
          {
            borderWidth: item?.selected === true ? 7 : 1,
            borderColor: item?.selected === true ? Color.base_color : Color.color_uncheck_answer,
          },
        ]}
      />
      <CMText title={replaceHtml(item?.content)} style={styles.textAnswer} />
      <View style={styles.viewIconResult} />
    </TouchableDebounce>
  );
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
  return (
    <View>
      <View style={styles.viewQuestion}>
        <CMText i18nKey="text-question-number" style={styles.textQuestion}>
          <CMText
            title={`${
              itemQuestionParent?.subOrderNo === -1
                ? `${itemQuestionParent.orderNo}.${indexQuestion + 1}`
                : itemQuestion?.orderNo
            }`}
            style={styles.textQuestion}
          />
        </CMText>
        {!isBookMark && (
          <TouchableDebounce
            onPress={() => updateBookmark(itemBookmark?.id, !itemBookmark?.isBookMark)}
          >
            {itemBookmark?.isBookMark ? (
              <IconBookmark width={24} height={24} />
            ) : (
              <IconUnBookmark width={24} height={24} />
            )}
          </TouchableDebounce>
        )}
      </View>
      <View style={styles.viewTitleQuestion}>
        <View>
          <HTMLView value={contentValue} renderNode={renderNode} />
        </View>
        <RenderMediaType
          refPlay={refPlay}
          mediaType={itemQuestion?.question?.mediaType}
          mediaUrl={itemQuestion?.question?.mediaUrl}
        />
        <CMText i18nKey="text-select-one-answer" style={styles.textTypeOption} />
      </View>
      <View style={styles.viewContentQuestion}>
        {itemQuestion?.question?.testAnswer?.map((item, index) => itemAnswer(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
