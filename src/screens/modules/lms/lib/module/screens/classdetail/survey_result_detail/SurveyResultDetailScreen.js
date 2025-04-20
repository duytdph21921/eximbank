"use strict";

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
import { getBySurveyUserDetailResult } from "../../../services/lmssurvey.api.js";
import ItemSurveyEssay from "../survey_detail/components/ItemSurveyEssay.js";
import ItemSurveyMultipeSelect from "../survey_detail/components/ItemSurveyMultipeSelect.js";
import ItemSurveyOneSelect from "../survey_detail/components/ItemSurveyOneSelect.js";
import ItemSurveyParentChild from "../survey_detail/components/ItemSurveyParentChild.js";
import { styles } from "./SurveyResultDetail.styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SurveyResultDetailScreen = props => {
  const dispatch = useDispatch();
  const {
    navigation,
    route
  } = props;
  const {
    surveyId,
    surveyUserId
  } = route?.params || {};
  const [listSurveyResult, setListSurveyResult] = useState([]);
  const isRefreshing = false;
  const isMounteRef = useRef(false);
  const renderHearderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: "text-header-survey-result-detail-screen",
    style: globalStyles.titleScreen
  }); // Title screen
  /**
   * Custom header.
   */
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHearderTitle
    });
  }, [navigation]);

  /**
   * Call api kết quả chi tiết làm bài khảo sát.
   */
  const funcGetBySurveyUserDetailResult = async () => {
    const response = await getBySurveyUserDetailResult(surveyUserId, surveyId);
    if (response?.status && response?.data && isMounteRef.current) {
      const listResult = response?.data;
      listResult.forEach(survey => {
        survey.lmsSurveyQuestions.forEach(question => {
          if (question.subContentData) {
            question.subContentData = question.subContentData.map(data => ({
              id: data.id,
              title: data.title,
              mark: data.mark,
              answerData: question.answerData.map(answer => ({
                id: answer.id,
                title: answer.title,
                mark: answer.mark,
                selected: false
              }))
            }));
          }
        });
      });
      listResult.forEach(survey => {
        survey.lmsSurveyQuestions.forEach(question => {
          if (question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
            question.answerData.forEach(answer1 => {
              const found = question?.lmsSurveyUserQuestionResult?.answerData.find(answer2 => answer2.row === answer1.id);
              if (found) {
                answer1.selected = true;
              } else {
                answer1.selected = false;
              }
            });
          } else if (question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3 || question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4) {
            question.answerData.forEach(answer1 => {
              const found = question?.lmsSurveyUserQuestionResult?.answerData.find(answer2 => answer2.row === answer1.id);
              if (found) {
                answer1.selected = true;
              } else {
                answer1.selected = false;
              }
            });
          } else if (question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || question.type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
            question?.subContentData.forEach(subContent => {
              const matchedAnswers = question?.lmsSurveyUserQuestionResult?.answerData?.filter(answer => answer.row === subContent.id);
              subContent.answerData.forEach(answer => {
                const matchedAnswer = matchedAnswers?.find(matched => matched.col === answer.id);
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
    const {
      type
    } = question;
    if (type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1 || type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3) {
      return /*#__PURE__*/_jsx(ItemSurveyOneSelect, {
        item: question,
        index: index,
        isDisable: true
      }, index);
    }
    if (type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2 || type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4 || type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8) {
      return /*#__PURE__*/_jsx(ItemSurveyMultipeSelect, {
        item: question,
        index: index,
        isDisable: true
      }, index);
    }
    if (type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5 || type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6) {
      return /*#__PURE__*/_jsx(ItemSurveyParentChild, {
        item: question,
        index: index,
        isDisable: true
      }, index);
    }
    if (type === Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7) {
      return /*#__PURE__*/_jsx(ItemSurveyEssay, {
        item: question,
        index: index,
        isDisable: false
      }, index);
    }
    return /*#__PURE__*/_jsx(View, {}, index);
  };
  const itemGroupSurvey = (item, index) => /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(CMText, {
      title: item?.name,
      style: styles.textTitleGroup
    }), /*#__PURE__*/_jsx(View, {
      style: [styles.viewItemSurvey, {
        marginTop: index > 0 ? vertical(15) : 0
      }],
      children: checkListEmpty(item?.lmsSurveyQuestions) && item?.lmsSurveyQuestions.map(renderSurveyItem)
    })]
  });
  const onRefresh = () => {};
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(FlatList, {
      bounces: false,
      refreshControl: /*#__PURE__*/_jsx(RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      data: listSurveyResult,
      renderItem: ({
        item,
        index
      }) => itemGroupSurvey(item, index),
      ListEmptyComponent: /*#__PURE__*/_jsx(View, {}),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false
    })
  });
};
export default SurveyResultDetailScreen;
//# sourceMappingURL=SurveyResultDetailScreen.js.map