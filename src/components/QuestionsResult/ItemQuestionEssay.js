import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import RenderMediaType from '@components/Questions/RenderMediaType';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, screenWidth } from '@utils/platforms';
import CMTextInput from '@components/CMTextInput';
import HTMLView from 'react-native-htmlview';
import globalStyles from '@theme/globalStyles';

/**
 * Loại câu hỏi trả lời tự luận.
 * @param {*} props
 * @return
 */

const PLACEHOLDER = {
  en: {
    answer_placeholder: 'Enter your answer',
  },
  vn: {
    answer_placeholder: 'Nhập câu trả lời',
  },
};

const ItemQuestionEssay = (props) => {
  const { itemQuestion, indexQuestion, itemQuestionParent, currentQuestion, refPlay } = props;
  const languageLocal = useSelector((state) => state.global.language);
  const [answer, setAnswer] = useState('');
  const contentValue = /<\/?[a-z][\s\S]*>/i.test(itemQuestion?.question?.content ?? '')
    ? (itemQuestion?.question?.content ?? '')
    : `<p>${itemQuestion?.question?.content ?? ''}</p>`;
  useState(() => {
    if (itemQuestion?.answer !== '') {
      const answerValue = { answer: itemQuestion?.answer };
      const parsedAnswer = JSON.parse(answerValue?.answer);
      const content = parsedAnswer?.content ?? '';
      setAnswer(content);
    }
  }, []);

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
    <View style={styles.container}>
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
          refPlay={refPlay}
          mediaType={itemQuestion?.question?.mediaType}
          mediaUrl={itemQuestion?.question?.mediaUrl}
        />
      </View>
      <View>
        <CMTextInput
          style={styles.textInput}
          maxLength={1000}
          multiline
          placeholder={
            languageLocal === Constant.LANGUAGE_VN
              ? PLACEHOLDER.vn.answer_placeholder
              : PLACEHOLDER.en.answer_placeholder
          }
          onChangeText={(answer) => setAnswer(answer)}
          editable={false}
          value={answer}
        />
      </View>
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
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    height: 320,
    width: screenWidth - horizontal(20 * 2),
    marginTop: vertical(20),
    textAlignVertical: 'top',
    paddingVertical: isIOS ? vertical(15) : vertical(5),
  },
});

export default ItemQuestionEssay;
