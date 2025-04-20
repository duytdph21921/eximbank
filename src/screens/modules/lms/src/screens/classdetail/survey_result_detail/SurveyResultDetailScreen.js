/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { vertical } from '@utils/scales';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { checkListEmpty } from '@utils/helpers';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getBySurveyUserDetailResult } from '../../../services/lmssurvey.api';
import ItemSurveyEssay from '../survey_detail/components/ItemSurveyEssay';
import ItemSurveyMultipeSelect from '../survey_detail/components/ItemSurveyMultipeSelect';
import ItemSurveyOneSelect from '../survey_detail/components/ItemSurveyOneSelect';
import ItemSurveyParentChild from '../survey_detail/components/ItemSurveyParentChild';
import { styles } from './SurveyResultDetail.styles';

const SurveyResultDetailScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation, route } = props;
  const { surveyId, surveyUserId } = route?.params || {};
  const [listSurveyResult, setListSurveyResult] = useState([]);
  const isRefreshing = false;
  const isMounteRef = useRef(false);
  const renderHearderTitle = () => (
    <CMText
      i18nKey="text-header-survey-result-detail-screen"
      style={globalStyles.titleScreen}
    />
  ); // Title screen
  /**
   * Custom header.
   */
  const renderHeaderRight = () => <View />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHearderTitle,
    });
  }, [navigation]);

  /**
   * Call api kết quả chi tiết làm bài khảo sát.
   */
  const funcGetBySurveyUserDetailResult = async () => {
    const response = await getBySurveyUserDetailResult(surveyUserId, surveyId);
    if (response?.status && response?.data && isMounteRef.current) {
      const listResult = response?.data;
      listResult.forEach((survey) => {
        survey.lmsSurveyQuestions.forEach((question) => {
          if (question.subContentData) {
            question.subContentData = question.subContentData.map((data) => ({
              id: data.id,
              title: data.title,
              mark: data.mark,
              answerData: question.answerData.map((answer) => ({
                id: answer.id,
                title: answer.title,
                mark: answer.mark,
                selected: false,
              })),
            }));
          }
        });
      });
      listResult.forEach((survey) => {
        survey.lmsSurveyQuestions.forEach((question) => {
          if (
            question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 ||
            question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 ||
            question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8
          ) {
            question.answerData.forEach((answer1) => {
              const found =
                question?.lmsSurveyUserQuestionResult?.answerData.find(
                  (answer2) => answer2.row === answer1.id
                );
              if (found) {
                answer1.selected = true;
              } else {
                answer1.selected = false;
              }
            });
          } else if (
            question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 ||
            question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4
          ) {
            question.answerData.forEach((answer1) => {
              const found =
                question?.lmsSurveyUserQuestionResult?.answerData.find(
                  (answer2) => answer2.row === answer1.id
                );
              if (found) {
                answer1.selected = true;
              } else {
                answer1.selected = false;
              }
            });
          } else if (
            question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 ||
            question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6
          ) {
            question?.subContentData.forEach((subContent) => {
              const matchedAnswers =
                question?.lmsSurveyUserQuestionResult?.answerData?.filter(
                  (answer) => answer.row === subContent.id
                );

              subContent.answerData.forEach((answer) => {
                const matchedAnswer = matchedAnswers?.find(
                  (matched) => matched.col === answer.id
                );
                answer.selected = !!matchedAnswer;
              });
            });
          }
          // else if (
          //   question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7
          // ) {
          // }
        });
      });
      setListSurveyResult(listResult);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetBySurveyUserDetailResult();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const renderSurveyItem = (question, index) => {
    const { type } = question;

    if (
      type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 ||
      type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3
    ) {
      return (
        <ItemSurveyOneSelect
          key={index}
          item={question}
          index={index}
          isDisable
        />
      );
    }

    if (
      type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 ||
      type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 ||
      type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8
    ) {
      return (
        <ItemSurveyMultipeSelect
          key={index}
          item={question}
          index={index}
          isDisable
        />
      );
    }

    if (
      type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 ||
      type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6
    ) {
      return (
        <ItemSurveyParentChild
          key={index}
          item={question}
          index={index}
          isDisable
        />
      );
    }

    if (type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7) {
      return (
        <ItemSurveyEssay
          key={index}
          item={question}
          index={index}
          isDisable={false}
        />
      );
    }

    return <View key={index} />;
  };

  const itemGroupSurvey = (item, index) => (
    <View>
      <CMText title={item?.name} style={styles.textTitleGroup} />
      <View
        style={[
          styles.viewItemSurvey,
          { marginTop: index > 0 ? vertical(15) : 0 },
        ]}
      >
        {checkListEmpty(item?.lmsSurveyQuestions) &&
          item?.lmsSurveyQuestions.map(renderSurveyItem)}
      </View>
    </View>
  );

  const onRefresh = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        bounces={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        data={listSurveyResult}
        renderItem={({ item, index }) => itemGroupSurvey(item, index)}
        ListEmptyComponent={<View />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SurveyResultDetailScreen;
