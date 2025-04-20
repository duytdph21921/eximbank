/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import RenderMediaType from '@components/Questions/RenderMediaType';
import CMTextInput from '@components/CMTextInput';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, screenWidth } from '@utils/platforms';
import TouchableDebounce from '@components/TouchableDebounce';
import IconBookmark from '@assets/icons/icon_bookmark';
import IconUnBookmark from '@assets/icons/icon_unbookmark';
import { useSwipe } from '@hooks/useSwipe';
import globalStyles from '@theme/globalStyles';
import debounce from 'lodash/debounce';
import HTMLView from 'react-native-htmlview';

/**
 * Loại câu hỏi trả lời tự luận.
 * @param {*} props
 * @returns
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
  const languageLocal = useSelector((state) => state.global.language);
  const [answer, setAnswer] = useState('');
  const [isDifferent, setIsDifferent] = useState(false);
  const [isSaveServer, setIsSaveServe] = useState(false);
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
  useEffect(() => {
    if (itemQuestion?.answer) {
      const answerValue = {
        answer: itemQuestion?.answer.replaceAll('\n', '\\n'),
      };
      try {
        const parsedAnswer = JSON.parse(answerValue?.answer);
        const content = parsedAnswer?.content ?? '';
        setAnswer(content);
      } catch (error) {
        // Handle error or add a comment to explain why it's empty
        console.error('Failed to parse answer:', error);
      }
    }
  }, []);
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);
  useEffect(
    () => () => {
      if (answer) {
        onHandleAnswer();
      }
    },
    [],
  );
  function onSwipeLeft() {
    if (answer) {
      onHandleAnswer();
    }
  }

  function onSwipeRight() {
    if (answer) {
      onHandleAnswer();
    }
  }
  // console.log("itemQuestion:   " + JSON.stringify(itemQuestion));
  /**
   * Click answer.
   * Mỗi lần click vào trả lời câu trả lời call api với id câu hỏi và id câu trả lời.
   * @param {*} index
   */
  const onHandleAnswer = () => {
    setIsSaveServe(true);
    setIsDifferent(true);
    onAnswerPress(itemQuestion?.id, itemQuestion?.registorUserTestId, answer);
  };
  // Xu ly saveAnswer moi 3s
  const saveToStorage = useCallback(
    debounce(async (inputText) => {
      onAnswerPress(itemQuestion?.id, itemQuestion?.registorUserTestId, inputText);
    }, 2000), // 2 giây debounce
    [],
  );
  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'p' || node.name === 'span' || node.name === 'strong') {
      return (
        <View key={index} style={globalStyles.pContainer}>
          {node.children.map((child) => {
            if (child.name === 'img') {
              return (
                <Image
                  key={child.attribs.src}
                  source={{ uri: child.attribs.src }}
                  style={globalStyles.pImg}
                  resizeMode="cover"
                />
              );
            }
            return (
              <Text key={child.data} style={globalStyles.pText}>
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
  const getSaveButtonText = () => {
    if (answer === '') return 'text-save-question';
    return isDifferent ? 'text-saved-question' : 'text-save-question';
  };
  return (
    <View style={styles.container} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
          onChangeText={(newAnswer) => {
            setIsDifferent(false);
            setAnswer(newAnswer);
            setIsSaveServe(false);
            saveToStorage(newAnswer);
          }}
          editable
          value={answer}
          onEndEditing={(e) => {
            // setIsDifferent(false);
            // setAnswer(newAnswer);
            onHandleAnswer();
          }}
        />
        <TouchableDebounce
          style={[
            styles.btnSaveAnswer,
            {
              backgroundColor: answer === '' ? Color.color_border : Color.base_color,
            },
          ]}
          onPress={onHandleAnswer}
        >
          <CMText
            i18nKey={getSaveButtonText()}
            style={[
              styles.textSaveAnswer,
              {
                color: answer === '' ? Color.color_uncheck_answer : Color.white,
              },
            ]}
          />
        </TouchableDebounce>
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
  btnSaveAnswer: {
    height: 56,
    width: screenWidth - horizontal(20) * 2,
    borderRadius: 100,
    marginTop: vertical(20),
    marginBottom: vertical(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSaveAnswer: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
  },
});

export default ItemQuestionEssay;
