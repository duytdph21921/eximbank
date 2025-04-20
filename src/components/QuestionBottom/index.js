import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { vertical } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import IconBack from '@assets/other/icon_back_question.svg';
import IconNext from '@assets/other/icon_next_question.svg';
import { screenWidth } from '@utils/platforms';
import { Color } from '@theme/colors';
import * as Progress from 'react-native-progress';

const QuestionBottom = (props) => {
  const { countQuestion, currentQuestion, onHandleBack, onHandleNext, onHandleBottom } = props;
  const [question, setQuestion] = useState(currentQuestion);

  const onPressBack = () => {
    if (question > 1) {
      setQuestion(question - 1);
      onHandleBack();
    }
  };

  const onPressNext = () => {
    if (question < countQuestion) {
      setQuestion(question + 1);
      onHandleNext();
    }
  };

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={question / countQuestion}
        width={screenWidth}
        height={3}
        style={styles.viewProgress}
        color={Color.base_color}
        borderWidth={0}
      />
      <View style={styles.viewContent}>
        {question > 1 ? (
          <TouchableDebounce style={styles.button} onPress={onPressBack}>
            <IconBack width={24} height={24} />
          </TouchableDebounce>
        ) : (
          <View style={styles.button} />
        )}
        <TouchableDebounce onPress={onHandleBottom} style={styles.viewQuestion}>
          <CMText title={`${question}/${countQuestion}`} style={styles.textContent} />
          <CMText i18nKey="text_question_bottom" style={styles.textContent} />
        </TouchableDebounce>
        {question < countQuestion ? (
          <TouchableDebounce style={styles.button} onPress={onPressNext}>
            <IconNext width={24} height={24} />
          </TouchableDebounce>
        ) : (
          <View style={styles.button} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  viewContent: {
    height: vertical(90),
    width: '100%',
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: screenWidth / 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    textAlign: 'center',
    fontSize: 14,
    color: Color.text_color,
    fontWeight: '700',
  },
  viewProgress: {
    backgroundColor: Color.color_bg_progress_bar,
    borderRadius: 0,
  },
  viewQuestion: {
    flexDirection: 'row',
    width: (screenWidth * 2) / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default QuestionBottom;
