"use strict";

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AppState, BackHandler, KeyboardAvoidingView, SafeAreaView, ScrollView, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import BottomSheetQuestion from '@components/BottomSheetQuestion';
import CountDownHandle from '@components/CountDownHandle';
import DialogWarnCustom from '@components/DialogWarnCustom';
import QuestionBottom from '@components/QuestionBottom';
import TouchableDebounce from '@components/TouchableDebounce';
import { checkListEmpty } from '@utils/helpers';
import ItemQuestion from '@components/Questions/ItemQuestion';
import ItemQuestionEssay from '@components/Questions/ItemQuestionEssay';
import ItemQuestionFillBlank from '@components/Questions/ItemQuestionFillBlank';
import ItemQuestionMultiple from '@components/Questions/ItemQuestionMultiple';
import ItemQuestionParentChild from '@components/Questions/ItemQuestionParentChild';
import CMText from '@components/CMText';
import IconBack from '@assets/icons/icon-back.svg';
import NetInfo from '@react-native-community/netinfo';
import { useSwipe } from '@hooks/useSwipe';
import { Color } from '@theme/colors';
import { endTestNew, updateAnswerNew, updateBookmark } from "../../services/testclassusertest.api.js";
import { frUserFinishTestNew } from "../../services/lmsclass.api.js";
import { styles } from "./MyTestQuestionInClassScreen.styles.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const MyTestQuestionInClassScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    id,
    dataMyTest,
    timeCountDown,
    classId,
    content,
    classUserId,
    data,
    learningId
  } = route?.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listQuestion, setListQuestion] = useState(dataMyTest?.dataTest ?? []);
  const [listBookmark, setListBookmark] = useState(dataMyTest?.bookMark ?? []);
  const [isResult, setIsResult] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const isStopTime = false;
  const refPlay = useRef();
  const [totalQuestion, setTotalQuestion] = useState(0);
  const {
    onTouchStart,
    onTouchEnd
  } = useSwipe(onSwipeLeft, onSwipeRight, 6);
  /**
   * Back to previous screen
   */
  const onBack = () => {
    navigation.navigate(Constant.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
      content,
      classId,
      classUserId,
      learningId
    });
    return true;
  };

  /**
   * Back hander.
   */
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);

  /**
   * Detect network && state app.
   */
  useEffect(() => {
    // Lấy trạng thái mạng ban đầu
    const fetchNetworkStatus = async () => {
      // const state = await NetInfo.fetch();
    };
    fetchNetworkStatus();
    const unsubscribe = NetInfo.addEventListener(state => {
      // Neu co mang tro lai
      if (state?.isConnected) {
        // Neu ma da het thoi gian thi thu bai
        if (timeCountDown <= 1) {
          onHandlerSubmit();
        }
      }
    });
    const subscriptionAppState = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        onBack();
      }
    });

    // const unsubscribe = NetInfo.addEventListener((state) => {
    //   if (!state?.isConnected) {
    //     onBack();
    //   }
    // });

    return () => {
      unsubscribe();
      subscriptionAppState.remove();
    };
  }, []);
  useEffect(() => {
    const listNew = dataMyTest?.dataTest?.filter(item => item.questionType !== -1);
    const listBookmarkNew = dataMyTest?.bookMark?.filter(item => item.questionType !== -1);
    let lastIndex = listNew.findLastIndex(x => x.answer !== '' || x.listSubQuestion && x.listSubQuestion.findLastIndex(c => c.answer !== '') !== -1);
    if (lastIndex === -1) {
      lastIndex = 0;
    }
    setListQuestion(listNew);
    setTotalQuestion(listNew.length);
    setListBookmark(listBookmarkNew);
    setCurrentQuestion(lastIndex);
  }, []);
  const RenderCount = useCallback(() => /*#__PURE__*/_jsx(CountDownHandle, {
    durationInSeconds: timeCountDown,
    onPressEndTime: () => {
      /**
       * Hết thời gian làm bài => disable tất cả các câu trả lời.
       * Call api nộp bài update data => chuyển sang màn kết quả bài thi.
       */
      setIsResult(true);
      onHandlerSubmit();
    },
    isStop: isStopTime
  }), [isStopTime, timeCountDown]);

  /**
   * Custom header screeen.
   */
  const renderHeaderRight = () => /*#__PURE__*/_jsxs(View, {
    style: styles.viewHeader,
    children: [/*#__PURE__*/_jsx(RenderCount, {}), /*#__PURE__*/_jsx(TouchableDebounce, {
      style: styles.btnSubmitHeader,
      onPress: () => {
        setShowModal(true);
      },
      children: /*#__PURE__*/_jsx(CMText, {
        i18nKey: "text-button-enter-submit",
        style: [styles.textSubmitHeader, {
          color: Color.base_color
        }]
      })
    })]
  });
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(TouchableDebounce, {
    style: styles.btnBack,
    onPress: () => {
      refPlay?.current?.hidde();
      onBack();
    },
    children: /*#__PURE__*/_jsx(IconBack, {
      width: 44,
      height: 44
    })
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: ''
    });
  }, [isStopTime]);

  /**
   * Click câu trả lời loại chọn nhiều đáp án.
   * @param {*} answerIndex
   */
  const onPressMultipeAnswer = async (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
    const params = {
      idClassUserTest: registorUserTestId,
      id: idQuestion
    };
    const contentAnswer = listQuestion[currentQuestion]?.question?.testAnswer;
    const selectedIndexes = contentAnswer.map(item => {
      if (item.selected) {
        return item.id;
      }
      return undefined;
    }).filter(index => index !== undefined);
    const bodyData = {
      answer: selectedIndexes
    };
    if (selectedIndexes.includes(idAnswer) === true) {
      bodyData.answer = selectedIndexes.filter(item => item !== idAnswer);
    } else {
      bodyData.answer.push(idAnswer);
    }
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await updateAnswerNew(params, bodyData);
    if (response?.status) {
      setListQuestion(prevData => prevData.map((item, index) => {
        if (index === currentQuestion) {
          return {
            ...item,
            question: {
              ...item.question,
              testAnswer: item.question.testAnswer.map((answer, i) => {
                if (i === indexAnswer) {
                  return {
                    ...answer,
                    selected: !item.question.testAnswer[indexAnswer].selected
                  };
                }
                return answer;
              })
            }
          };
        }
        return item;
      }));
    }
  };

  /**
   * Click câu trả lời loại chọn 1 đáp án.
   * @param {*} answerIndex
   */
  const onPressAnswer = async (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
    const params = {
      idClassUserTest: registorUserTestId,
      id: idQuestion
    };
    const bodyData = {
      answer: []
    };
    bodyData.answer[0] = idAnswer;
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await updateAnswerNew(params, bodyData);
    if (response?.status) {
      setListQuestion(prevData => prevData.map((item, index) => {
        if (index === currentQuestion) {
          return {
            ...item,
            question: {
              ...item.question,
              testAnswer: item.question.testAnswer.map((answer, i) => {
                if (i === indexAnswer) {
                  return {
                    ...answer,
                    selected: true
                  };
                }
                return {
                  ...answer,
                  selected: false
                };
              })
            }
          };
        }
        return item;
      }));
    }
  };

  /**
   * Click câu trả lời cha con với các loại type (1, 2, 4, 5, 10) khác nhau.
   */
  const onPressParentChild = async (idQuestion, registorUserTestId, idAnswer, indexAnswer, parentId, typeChild) => {
    if (typeChild === Constant.QUESTION_ONE_SELECT || typeChild === Constant.QUESTION_TF) {
      const params = {
        idClassUserTest: registorUserTestId,
        id: idQuestion,
        parentId
      };
      const bodyData = {
        answer: []
      };
      bodyData.answer[0] = idAnswer;
      bodyData.answer = JSON.stringify(bodyData.answer);
      const response = await updateAnswerNew(params, bodyData);
      if (response?.status) {
        setListQuestion(prevData => {
          const updatedListQuestion = prevData.map(questionItem => {
            if (questionItem?.registorUserTestId === registorUserTestId) {
              const updatedListSubQuestion = questionItem?.listSubQuestion?.map(subQuestionItem => {
                if (subQuestionItem?.id === idQuestion) {
                  const updatedTestAnswer = subQuestionItem?.question?.testAnswer?.map((answerItem, answerIndex) => {
                    if (answerIndex === indexAnswer) {
                      return {
                        ...answerItem,
                        selected: true
                      };
                    }
                    return {
                      ...answerItem,
                      selected: false
                    };
                  });
                  return {
                    ...subQuestionItem,
                    question: {
                      ...subQuestionItem?.question,
                      testAnswer: updatedTestAnswer
                    }
                  };
                }
                return subQuestionItem;
              });
              return {
                ...questionItem,
                listSubQuestion: updatedListSubQuestion
              };
            }
            return questionItem;
          });
          return updatedListQuestion;
        });
      }
    } else if (typeChild === Constant.QUESTION_MULTIPLE_SELECT) {
      const params = {
        idClassUserTest: registorUserTestId,
        id: idQuestion,
        parentId
      };
      const contentAnswer = listQuestion[currentQuestion]?.listSubQuestion?.filter(item => item.id === idQuestion)[0]?.question?.testAnswer;
      const selectedIndexes = contentAnswer.map(item => {
        if (item?.selected) {
          return item?.id;
        }
        return undefined;
      }).filter(index => index !== undefined);
      const bodyData = {
        answer: selectedIndexes
      };
      if (selectedIndexes?.includes(idAnswer) === true) {
        bodyData.answer = selectedIndexes?.filter(item => item !== idAnswer);
      } else {
        bodyData.answer.push(idAnswer);
      }
      bodyData.answer = JSON.stringify(bodyData.answer);
      const response = await updateAnswerNew(params, bodyData);
      if (response?.status) {
        setListQuestion(prevData => {
          const updatedListQuestion = prevData.map(questionItem => {
            if (questionItem?.registorUserTestId === registorUserTestId) {
              const updatedListSubQuestion = questionItem?.listSubQuestion?.map(subQuestionItem => {
                if (subQuestionItem?.id === idQuestion) {
                  const updatedTestAnswer = subQuestionItem?.question?.testAnswer?.map((answerItem, answerIndex) => {
                    if (answerIndex === indexAnswer) {
                      return {
                        ...answerItem,
                        selected: !answerItem?.selected
                      };
                    }
                    return answerItem;
                  });
                  return {
                    ...subQuestionItem,
                    question: {
                      ...subQuestionItem?.question,
                      testAnswer: updatedTestAnswer
                    }
                  };
                }
                return subQuestionItem;
              });
              return {
                ...questionItem,
                listSubQuestion: updatedListSubQuestion
              };
            }
            return questionItem;
          });
          return updatedListQuestion;
        });
      }
    }
  };

  /**
   * Click câu trả lời câu hỏi tự luận.
   */
  const onPressAnswerEssay = async (idQuestion, registorUserTestId, answer, parentId) => {
    const params = {
      idClassUserTest: registorUserTestId,
      id: idQuestion,
      parentId
    };
    const bodyData = {
      answer: ''
    };
    const answerContent = {
      content: answer
    };
    bodyData.answer = JSON.stringify(answerContent);
    const response = await updateAnswerNew(params, bodyData);
    if (response?.status) {
      const answervalue = `{\"content\":\"${answer}\"}`;
      const updatedData = [...listQuestion];
      updatedData[currentQuestion].answer = answervalue;
      setListQuestion(updatedData);
    }
  };

  /**
   * Submit xử lý nộp bài thi.
   */
  const onHandlerSubmit = useCallback(async () => {
    setShowModal(false);
    setIsResult(true);
    refPlay?.current?.hidde();
    const response = await endTestNew(id);
    if (response?.status) {
      await frUserFinishTestNew(classId, classUserId, content?.id);
      if (data?.resultDisplayType !== Constant.RESULT_DISPLAY_TYPE.showNotDetail && data?.resultDisplayType !== Constant.RESULT_DISPLAY_TYPE.showNotAll) {
        navigation.navigate(Constant.MY_TEST_RESULT_IN_CLASS_SCREEN, {
          idMyTest: id,
          data
        });
      } else {
        navigation.navigate(Constant.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
          callBack: true,
          dataBack: Math.random().toString(36).slice(2, 7),
          content,
          classId,
          classUserId,
          learningId
        });
      }
    }
  }, []);

  /**
   * Render số lượng câu hỏi bottom.
   */
  const RenderBottomQuestion = useCallback(() => /*#__PURE__*/_jsx(QuestionBottom, {
    countQuestion: listQuestion?.length > 0 && listQuestion?.length,
    currentQuestion: currentQuestion + 1,
    onHandleBack: () => {
      refPlay?.current?.hidde();
      setCurrentQuestion(currentQuestion - 1);
    },
    onHandleNext: () => {
      refPlay?.current?.hidde();
      setCurrentQuestion(currentQuestion + 1);
    },
    onHandleBottom: () => {
      setIsOpenModal(true);
    }
  }), [currentQuestion, listQuestion]);

  /**
   * Call api update list bookmark.
   * @param {*} idQuestion
   * @param {*} isBookMark
   */
  const onHandleUpdateBookmark = async (idQuestion, isBookMark) => {
    const params = {
      idClassUserTest: id,
      id: idQuestion,
      isBookMark
    };
    const response = await updateBookmark(params);
    if (response?.status) {
      setListBookmark(prevList => prevList.map(item => {
        if (item.id === idQuestion) {
          return {
            ...item,
            isBookMark: !item.isBookMark
          };
        }
        return item;
      }));
    }
  };
  const onHandleNextBackQuestion = index => {
    if (currentQuestion + index < 0 || currentQuestion + index >= totalQuestion) {
      setCurrentQuestion(currentQuestion);
    } else {
      refPlay?.current?.hidde();
      setCurrentQuestion(currentQuestion + index);
    }
  };
  function onSwipeLeft() {
    onHandleNextBackQuestion(1);
  }
  function onSwipeRight() {
    onHandleNextBackQuestion(-1);
  }
  const renderQuestionComponent = () => {
    const questionType = listQuestion[currentQuestion]?.questionType;
    switch (questionType) {
      case Constant.QUESTION_ONE_SELECT:
        return /*#__PURE__*/_jsx(ItemQuestion, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            // Trả về id câu hỏi và id câu trả lời.
            // Call api update câu hỏi.
            onPressAnswer(idQuestion, registorUserTestId, idAnswer, indexAnswer);
          }
        });
      case Constant.QUESTION_MULTIPLE_SELECT:
        return /*#__PURE__*/_jsx(ItemQuestionMultiple, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            onPressMultipeAnswer(idQuestion, registorUserTestId, idAnswer, indexAnswer);
          }
        });
      case Constant.QUESTION_FILL_BLANK:
        return /*#__PURE__*/_jsx(ItemQuestionFillBlank, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, isAnswer, indexAnswer) => {
            onPressAnswer(indexAnswer);
          }
        });
      case Constant.QUESTION_TF:
        return /*#__PURE__*/_jsx(ItemQuestion, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer) => {
            onPressAnswer(idQuestion, registorUserTestId, idAnswer, indexAnswer);
          }
        });
      case Constant.QUESTION_HC:
        return /*#__PURE__*/_jsx(ItemQuestionParentChild, {
          navigation: navigation,
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, idAnswer, indexAnswer, parentId, typeChild) => {
            onPressParentChild(idQuestion, registorUserTestId, idAnswer, indexAnswer, parentId, typeChild);
          },
          onAnswerPressEssay: (idQuestion, registorUserTestId, answer, parentId) => {
            onPressAnswerEssay(idQuestion, registorUserTestId, answer, parentId);
          }
        });
      case Constant.QUESTION_ESSAY:
        return /*#__PURE__*/_jsx(ItemQuestionEssay, {
          isResult: isResult,
          itemQuestion: listQuestion[currentQuestion],
          itemBookmark: listBookmark[currentQuestion],
          currentQuestion: currentQuestion,
          refPlay: refPlay,
          updateBookmark: onHandleUpdateBookmark,
          onAnswerPress: (idQuestion, registorUserTestId, answer) => {
            onPressAnswerEssay(idQuestion, registorUserTestId, answer, 0);
          }
        });
      default:
        return /*#__PURE__*/_jsx(View, {});
    }
  };
  return /*#__PURE__*/_jsx(KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: isIOS && hasNotch() ? 0 : 10,
    behavior: isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/_jsxs(SafeAreaView, {
      style: styles.container,
      children: [checkListEmpty(listQuestion) && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(ScrollView, {
          bounces: false,
          contentContainerStyle: styles.viewScrollView,
          showsVerticalScrollIndicator: false,
          onTouchStart: onTouchStart,
          onTouchEnd: onTouchEnd,
          children: renderQuestionComponent()
        }), /*#__PURE__*/_jsx(RenderBottomQuestion, {})]
      }), /*#__PURE__*/_jsx(BottomSheetQuestion, {
        isOpenModal: isOpenModal,
        closeModal: () => {
          setIsOpenModal(false);
        },
        listQuestion: listQuestion,
        listBookmark: listBookmark,
        onPressQuestion: index => {
          setCurrentQuestion(index);
        }
      }), /*#__PURE__*/_jsx(DialogWarnCustom, {
        isShowModal: isShowModal,
        keyHeader: "text-button-enter-submit",
        keyMessage: "text_dialog_test_submit",
        keySubmit: "text-button-enter-submit",
        submitOnPress: onHandlerSubmit,
        cancelOnPress: () => {
          setShowModal(false);
        }
      })]
    })
  });
};
export default MyTestQuestionInClassScreen;
//# sourceMappingURL=MyTestQuestionInClassScreen.js.map