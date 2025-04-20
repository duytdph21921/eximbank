import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { replaceHtml } from '@utils/helpers';
import RenderMediaType from '../Questions/RenderMediaType';

/**
 * Loại câu hỏi điền vào chổ trống.
 * @param {*} props
 * @returns
 */
const ItemQuestionFillBlank = (props) => {
  /**
   * itemQuestion: nội dung của câu hỏi hiện tại.
   * currentQuestion: câu hỏi hiện tại.
   * isResult: Item ở trạng thái của màn result.
   */
  const {
    // itemQuestion,
    currentQuestion,
    onAnswerPress,
    refPlay,
  } = props;

  const itemQuestion = {
    question: {
      questionTime: 0,
      newId: '00000000-0000-0000-0000-000000000000',
      totalAnswerTrue: 1,
      id: 'a2b52ed5-5ae1-4804-8f22-0ae30960d2fb',
      code: 'LMS_TN_08',
      content:
        'Các nội dung của lớp học khi thêm, sửa, xóa có ảnh hưởng đến nội dung môn học đã sử dụng không?',
      type: 1,
      partId: null,
      subQuestionCount: 0,
      mediaUrl: '',
      suggest: '',
      listQuestionParentChild: [
        {
          content: 'Nội dung câu hỏi số I',
          mediaType: 'png',
          mediaUrl: 'others/document/admin/20230825/tmpkgnocx_tmpe0lxrw_sldieshow_3.png',
          typeSelect: 1,
          testAnswer: [
            {
              id: 2,
              content: 'nôi dung câu trả lời I với nội dung rất dài để test',
              selected: false,
            },
            {
              id: 1,
              selected: false,
              content: 'nôi dung câu trả lời I',
            },
            {
              id: 3,
              selected: false,
              content: 'nôi dung câu trả lời I',
            },
          ],
        },
        {
          content: 'Nội dung câu hỏi hỏi số II',
          mediaType: '',
          mediaUrl: '',
          typeSelect: 2,
          testAnswer: [
            {
              id: 2,
              content: 'nôi dung câu trả lời II. với nội dung rất dài để test',
              selected: false,
            },
            {
              id: 1,
              selected: false,
              content: 'nôi dung câu trả lời II',
            },
          ],
        },
        {
          content: 'Nội dung câu hỏi hỏi số III',
          mediaType: '',
          mediaUrl: '',
          typeSelect: 1,
          testAnswer: [
            {
              id: 2,
              content: 'nôi dung câu trả lời III',
              selected: false,
            },
            {
              id: 1,
              selected: false,
              content: 'nôi dung câu trả lời III',
            },
          ],
        },
      ],
    },
    id: 305,
    registorUserTestId: '02e8557d-7d50-4b86-b857-6029320f4066',
    questionId: 'a2b52ed5-5ae1-4804-8f22-0ae30960d2fb',
    subQuestionId: 'a2b52ed5-5ae1-4804-8f22-0ae30960d2fb',
    answer: '',
    questionType: 1,
  };

  return (
    <View>
      <View style={styles.viewQuestion}>
        <CMText i18nKey="text-question-number" style={styles.textQuestion} />
        <CMText title={`${currentQuestion + 1}`} style={styles.textQuestion} />
      </View>
      <View style={styles.viewTitleQuestion}>
        <View>
          <CMText
            title={`${replaceHtml(itemQuestion?.question?.content)}`}
            style={styles.textTitleQuestion}
          />
        </View>
        <RenderMediaType
          refPlay={refPlay}
          mediaType={itemQuestion?.question?.mediaType}
          mediaUrl={itemQuestion?.question?.mediaUrl}
        />
        <CMText i18nKey="text-question-fill-blank" style={styles.textTypeOption} />
        <CMText title="Coming Soon" style={styles.textTypeOption} />
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
export default ItemQuestionFillBlank;
