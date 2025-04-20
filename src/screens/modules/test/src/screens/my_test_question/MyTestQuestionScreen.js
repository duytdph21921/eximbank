/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-escape */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  AppState,
  BackHandler,
  Keyboard,
} from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import CountDownHandle from '@components/CountDownHandle';
import QuestionBottom from '@components/QuestionBottom';
import ItemQuestion from '@components/Questions/ItemQuestion';
import ItemQuestionEssay from '@components/Questions/ItemQuestionEssay';
import ItemQuestionFillBlank from '@components/Questions/ItemQuestionFillBlank';
import ItemQuestionMultiple from '@components/Questions/ItemQuestionMultiple';
import ItemQuestionParentChild from '@components/Questions/ItemQuestionParentChild';
import BottomSheetQuestion from '@components/BottomSheetQuestion';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import { hasNotch } from 'react-native-device-info';
import DialogWarnCustom from '@components/DialogWarnCustom';
import IconBack from '@assets/icons/icon-back.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateLoadingAction,
  updateShowDialogWarnAction,
} from '@store/reducers/globalSlice';
import { checkListEmpty } from '@utils/helpers';
import { useSwipe } from '@hooks/useSwipe';
import * as signalR from '@microsoft/signalr';
import { enviroment } from '@assets/enviroment/enviroment.default';
import { Color } from '@theme/colors';
import { storage } from '@utils/storage';
import {
  doTestMobile,
  endTestNew,
  updateAnswer,
  updateBookmark,
  updateViolationLog,
} from '../../services/testregistorusertest.api';
import { styles } from './MyTestQuestionScreen.styles';

/**
 * V.2. Màn hình làm bài thi.
 * @param {*} props
 * @returns
 */
const MyTestQuestionScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation, route } = props;
  const { id, data } = route?.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [listBookmark, setListBookmark] = useState([]);
  const [timeCountDown, setTimeCountDown] = useState();
  const [isResult, setIsResult] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [idMyTest, setIdMyTest] = useState(id);
  const refPlay = useRef();
  const isMounteRef = useRef(false);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [registorModel, setRegistorModel] = useState();
  const [userTestModel, setUserTestModel] = useState();
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
  const isConnected = useSelector((state) => state.global.isConnected);
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  /**
   * Back to previous screen
   */
  const onBack = () => {
    // Ngat ket noi socket
    if (connection.state === signalR.HubConnectionState.Connected) {
      connection.stop();
    }
    onCheckUnFocus(true);
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
   * Connect socket.
   */
  useEffect(() => {
    const socketUrl = `${storage.getString(
      Constant.DOMAIN
    )}${enviroment.apiDomain.testRegistorFrontEndSocketEndpoint}?ruId=${id}`;
    connection = new signalR.HubConnectionBuilder()
      .withUrl(socketUrl, {
        accessTokenFactory: async () =>
          storage.getString(Constant.KEY_USER_TOKEN),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        logger: signalR.LogLevel.None,
      })
      .build();
    connection
      .start()
      .then(() => {
        clearTimeout(socketHanderId);
        socketHanderId = setTimeout(() => {
          if (connection.state === signalR.HubConnectionState.Disconnected) {
            connection.start();
          }
        }, 5000);
        connection.on('AddTimeCompleted', (payload, addTime) => {
          let newTime = timeCountDown;
          if (!isNaN(payload)) {
            newTime = Math.floor(payload);
          }
          setTimeCountDown(newTime);
          const textMessage = `Bạn vừa được cộng thêm ${
            addTime
          } phút vào thời gian làm bài!`;
          dispatch(
            updateShowDialogWarnAction({
              isShowModalWarn: true,
              isSigout: false,
              titleHeader: '',
              keyHeader: 'text-notification',
              contentMessage: textMessage,
              keyCancel: 'text-close',
              isShowCancel: true,
              isShowSubmit: false,
            })
          );
        });
      })
      .catch((error) => {});
    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, [isConnected]);
  /**
   * Lấy data danh sách câu hỏi bài thi bên ngoài lớp học.
   */
  const funcDoTestMobile = async () => {
    const response = await doTestMobile(id);
    if (response?.status && isMounteRef.current) {
      // Chỉ lấy câu hỏi thảo mãn dk.
      const listNew = response?.data?.dataTest.filter(
        (item) => item.questionType !== -1
      );
      const listBookmarkNew = response?.data?.bookMark.filter(
        (item) => item.questionType !== -1
      );
      // listNew.forEach(e=>{
      //   e.question?.mediaType = mediaType(e.question?.mediaUrl);
      // })
      let lastIndex = listNew.findLastIndex(
        (x) =>
          x.answer !== '' ||
          (x.listSubQuestion &&
            x.listSubQuestion.findLastIndex((c) => c.answer !== '') !== -1)
      );
      if (lastIndex === -1) {
        lastIndex = 0;
      }

      setUserTestModel(response?.data);
      setRegistorModel(response?.data?.registor);
      setIdMyTest(response?.data?.id);
      setListQuestion(listNew);
      setTotalQuestion(listNew.length);
      setListBookmark(listBookmarkNew);
      setTimeCountDown(Math.floor(response?.data?.totalSeconds));
      // setTimeCountDown(Math.floor(6000));
      setCurrentQuestion(lastIndex);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcDoTestMobile();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [isConnected]);

  const RenderCount = useCallback(
    () => (
      <CountDownHandle
        durationInSeconds={timeCountDown}
        onPressEndTime={() => {
          /**
           * Hết thời gian làm bài => disable tất cả các câu trả lời.
           * Call api nộp bài update data => chuyển sang màn kết quả bài thi.
           */
          // setIsResult(true);
          onHandlerSubmit();
        }}
      />
    ),
    [timeCountDown]
  );

  /**
   * Custom header screeen.
   */

  const renderHeaderRight = () => (
    <View style={styles.viewHeader}>
      <RenderCount />
      <TouchableDebounce
        style={styles.btnSubmitHeader}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <CMText
          i18nKey="text-button-enter-submit"
          style={[
            styles.textSubmitHeader,
            {
              color: Color.base_color,
            },
          ]}
        />
      </TouchableDebounce>
    </View>
  );

  const renderHeaderLeft = () => (
    <TouchableDebounce
      style={styles.btnBack}
      onPress={() => {
        refPlay?.current?.hidde();
        onBack();
      }}
    >
      <IconBack width={44} height={44} />
    </TouchableDebounce>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: '',
    });
  }, [timeCountDown]);

  /**
   * Detect network && state app
   */
  useEffect(() => {
    let stateApp = 'active';
    const subscriptionAppState = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (isIOS) {
          if (nextAppState === 'inactive' && stateApp === 'active') {
            stateApp = nextAppState;
            onCheckUnFocus(true);
          } else {
            stateApp = nextAppState;
          }
        } else if (nextAppState === 'background' && stateApp === 'active') {
          stateApp = nextAppState;
          onCheckUnFocus(true);
        } else {
          stateApp = nextAppState;
        }
      }
    );
    return () => {
      subscriptionAppState.remove();
    };
  }, [registorModel]);

  const onCheckUnFocus = async (isBack = false) => {
    if (!isResult) {
      if (
        registorModel &&
        userTestModel &&
        registorModel?.warningLostFocus &&
        registorModel?.autoFinishIfLostFocusCount &&
        registorModel?.autoFinishIfLostFocusCount > 0
      ) {
        // Update so lan thoat man hinh
        const response = await updateViolationLog(id);
        if (response?.status && response?.data) {
          // show canh bao cho nguoi dung
          const textMessage = `Bạn vừa thoát màn hình làm bài ${response?.data} lần. Vui lòng không thoát màn hình làm bài trong suốt thời gian làm bài`;
          if (response?.data >= registorModel?.autoFinishIfLostFocusCount) {
            onEndTest();
          }
          dispatch(
            updateShowDialogWarnAction({
              isShowModalWarn: true,
              isSigout: false,
              titleHeader: '',
              keyHeader: 'text-warning',
              contentMessage: textMessage,
              keyCancel: 'text-close',
              isShowCancel: true,
              isShowSubmit: false,
            })
          );
          if (isBack) {
            navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
              callBack: true,
              dataBack: Math.random().toString(36).slice(2, 7),
            });
          }
        } else if (isBack) {
          navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
            callBack: true,
            dataBack: Math.random().toString(36).slice(2, 7),
          });
        }
      } else if (isBack) {
        navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
          callBack: true,
          dataBack: Math.random().toString(36).slice(2, 7),
        });
      }
    } else if (isBack) {
      navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
        callBack: true,
        dataBack: Math.random().toString(36).slice(2, 7),
      });
    }
  };
  const onEndTest = async () => {
    setIsResult(true);
    refPlay?.current?.hidde();
    const response = await endTestNew(id);
    if (response?.status && response?.data) {
      if (data?.showResultAll) {
        navigation.navigate(Constant.MY_TEST_RESULT_SCREEN, {
          idMyTest: id,
          showMark: data?.showMark,
          showResultAll: data?.showResultAll,
          showResultQuestion: data?.showResultQuestion,
          showQuestionAnswer: data?.showQuestionAnswer,
        });
      } else {
        navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
          callBack: true,
          dataBack: Math.random().toString(36).slice(2, 7),
        });
      }
    } else {
      navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
        callBack: true,
        dataBack: Math.random().toString(36).slice(2, 7),
      });
    }
  };
  /**
   * Click câu trả lời loại chọn nhiều đáp án.
   * @param {*} answerIndex
   */
  const onPressMultipeAnswer = async (
    idQuestion,
    registorUserTestId,
    idAnswer,
    indexAnswer
  ) => {
    const params = {
      idRegistorUserTest: registorUserTestId,
      id: idQuestion,
    };
    const contentAnswer = listQuestion[currentQuestion]?.question?.testAnswer;
    const selectedIndexes = contentAnswer
      .map((item) => {
        if (item.selected) {
          return item.id;
        }
        return undefined;
      })
      .filter((index) => index !== undefined);
    const bodyData = {
      answer: selectedIndexes || [],
    };
    if (selectedIndexes.includes(idAnswer) === true) {
      bodyData.answer = selectedIndexes.filter((item) => item !== idAnswer);
    } else {
      bodyData.answer.push(idAnswer);
    }
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await updateAnswer(params, bodyData);
    if (response?.status) {
      setListQuestion((prevListQuestion) =>
        prevListQuestion.map((question) => {
          if (question.id === idQuestion) {
            return {
              ...question,
              question: {
                ...question.question,
                testAnswer: question.question.testAnswer.map((answer) =>
                  answer.id === idAnswer
                    ? { ...answer, selected: !answer.selected }
                    : answer
                ),
              },
            };
          }
          return question;
        })
      );
    }
  };
  /**
   * Click câu trả lời loại chọn 1 đáp án.
   * @param {*} answerIndex
   */
  const onPressAnswer = async (
    idQuestion,
    registorUserTestId,
    idAnswer,
    indexAnswer
  ) => {
    const params = {
      idRegistorUserTest: registorUserTestId,
      id: idQuestion,
    };
    const bodyData = {
      answer: [],
    };
    bodyData.answer[0] = idAnswer;
    bodyData.answer = JSON.stringify(bodyData.answer);
    const response = await updateAnswer(params, bodyData);
    if (response?.status) {
      setListQuestion((prevData) =>
        prevData.map((item, index) => {
          if (index === currentQuestion) {
            return {
              ...item,
              question: {
                ...item.question,
                testAnswer: item.question.testAnswer.map((answer, i) => {
                  if (i === indexAnswer) {
                    return {
                      ...answer,
                      selected: true,
                    };
                  }
                  return {
                    ...answer,
                    selected: false,
                  };
                }),
              },
            };
          }
          return item;
        })
      );
    }
  };
  /**
   * Click câu trả lời cha con với các loại type (1, 2, 4, 5, 10) khác nhau.
   */
  const onPressParentChild = async (
    idQuestion,
    registorUserTestId,
    idAnswer,
    indexAnswer,
    parentId,
    typeChild
  ) => {
    if (
      typeChild === Constant.QUESTION_ONE_SELECT ||
      typeChild === Constant.QUESTION_TF
    ) {
      const params = {
        idRegistorUserTest: registorUserTestId,
        id: idQuestion,
        parentId,
      };
      const bodyData = {
        answer: [],
      };
      bodyData.answer[0] = idAnswer;
      bodyData.answer = JSON.stringify(bodyData.answer);
      const response = await updateAnswer(params, bodyData);
      if (response?.status) {
        setListQuestion((prevData) => {
          const updatedListQuestion = prevData.map((questionItem) => {
            if (questionItem?.registorUserTestId === registorUserTestId) {
              const updatedListSubQuestion = questionItem?.listSubQuestion?.map(
                (subQuestionItem) => {
                  if (subQuestionItem?.id === idQuestion) {
                    const updatedTestAnswer =
                      subQuestionItem?.question?.testAnswer?.map(
                        (answerItem, answerIndex) => {
                          if (answerIndex === indexAnswer) {
                            return {
                              ...answerItem,
                              selected: true,
                            };
                          }
                          return {
                            ...answerItem,
                            selected: false,
                          };
                        }
                      );
                    return {
                      ...subQuestionItem,
                      question: {
                        ...subQuestionItem?.question,
                        testAnswer: updatedTestAnswer,
                      },
                    };
                  }
                  return subQuestionItem;
                }
              );
              return {
                ...questionItem,
                listSubQuestion: updatedListSubQuestion,
              };
            }
            return questionItem;
          });
          return updatedListQuestion;
        });
      }
    } else if (typeChild === Constant.QUESTION_MULTIPLE_SELECT) {
      const params = {
        idRegistorUserTest: registorUserTestId,
        id: idQuestion,
        parentId,
      };
      const contentAnswer = listQuestion[
        currentQuestion
      ]?.listSubQuestion?.filter((item) => item.id === idQuestion)[0]?.question
        ?.testAnswer;
      const selectedIndexes = contentAnswer
        .map((item) => {
          if (item?.selected) {
            return item?.id;
          }
          return undefined;
        })
        .filter((index) => index !== undefined);

      const bodyData = {
        answer: selectedIndexes,
      };
      if (selectedIndexes?.includes(idAnswer) === true) {
        bodyData.answer = selectedIndexes?.filter((item) => item !== idAnswer);
      } else {
        bodyData.answer.push(idAnswer);
      }
      bodyData.answer = JSON.stringify(bodyData.answer);
      const response = await updateAnswer(params, bodyData);
      if (response?.status) {
        setListQuestion((prevData) => {
          const updatedListQuestion = prevData.map((questionItem) => {
            if (questionItem?.registorUserTestId === registorUserTestId) {
              const updatedListSubQuestion = questionItem?.listSubQuestion?.map(
                (subQuestionItem) => {
                  if (subQuestionItem?.id === idQuestion) {
                    const updatedTestAnswer =
                      subQuestionItem?.question?.testAnswer?.map(
                        (answerItem, answerIndex) => {
                          if (answerIndex === indexAnswer) {
                            return {
                              ...answerItem,
                              selected: !answerItem?.selected,
                            };
                          }
                          return answerItem;
                        }
                      );
                    return {
                      ...subQuestionItem,
                      question: {
                        ...subQuestionItem?.question,
                        testAnswer: updatedTestAnswer,
                      },
                    };
                  }
                  return subQuestionItem;
                }
              );
              return {
                ...questionItem,
                listSubQuestion: updatedListSubQuestion,
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
  const onPressAnswerEssay = async (
    idQuestion,
    registorUserTestId,
    answer,
    parentId
  ) => {
    const params = {
      idRegistorUserTest: registorUserTestId,
      id: idQuestion,
      parentId,
    };
    const bodyData = {
      answer: '',
    };
    const answerContent = { content: answer };
    bodyData.answer = JSON.stringify(answerContent);
    const response = await updateAnswer(params, bodyData);
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
  const onHandlerSubmit = useCallback(
    async (event) => {
      setShowModal(false);
      setIsResult(true);
      refPlay?.current?.hidde();
      const response = await endTestNew(idMyTest);
      if (response?.status && response?.data) {
        if (data?.showResultAll) {
          navigation.navigate(Constant.MY_TEST_RESULT_SCREEN, {
            idMyTest,
            showMark: data?.showMark,
            showResultAll: data?.showResultAll,
            showResultQuestion: data?.showResultQuestion,
            showQuestionAnswer: data?.showQuestionAnswer,
          });
        } else {
          navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
            callBack: true,
            dataBack: Math.random().toString(36).slice(2, 7),
          });
        }
      }
    },
    [idMyTest]
  );

  /**
   * Render số lượng câu hỏi bottom.
   */
  const RenderBottomQuestion = useCallback(
    () => (
      <QuestionBottom
        countQuestion={listQuestion?.length > 0 && listQuestion?.length}
        currentQuestion={currentQuestion + 1}
        onHandleBack={() => {
          refPlay?.current?.hidde();
          setCurrentQuestion(currentQuestion - 1);
        }}
        onHandleNext={() => {
          refPlay?.current?.hidde();
          setCurrentQuestion(currentQuestion + 1);
        }}
        onHandleBottom={() => {
          setIsOpenModal(true);
        }}
      />
    ),
    [currentQuestion, listQuestion, idMyTest]
  );

  /**
   * Call api update list bookmark.
   * @param {*} idQuestion
   * @param {*} isBookMark
   */
  const onHandleUpdateBookmark = async (idQuestion, isBookMark) => {
    const params = {
      idMyTest,
      id: idQuestion,
      isBookmark: isBookMark,
    };
    const response = await updateBookmark(params);
    if (response?.status) {
      setListBookmark((prevList) =>
        prevList.map((item) => {
          if (item.id === idQuestion) {
            return { ...item, isBookMark: !item.isBookMark };
          }
          return item;
        })
      );
    }
  };
  const onHandleNextBackQuestion = (index) => {
    if (
      currentQuestion + index < 0 ||
      currentQuestion + index >= totalQuestion
    ) {
      setCurrentQuestion(currentQuestion);
    } else {
      refPlay?.current?.hidde();
      setCurrentQuestion(currentQuestion + index);
    }
  };
  function onSwipeLeft() {
    Keyboard.dismiss();
    onHandleNextBackQuestion(1);
  }

  function onSwipeRight() {
    Keyboard.dismiss();
    onHandleNextBackQuestion(-1);
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={isIOS && hasNotch() ? 0 : 10}
      behavior={isIOS ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        {checkListEmpty(listQuestion) && (
          <>
            <ScrollView
              bounces={false}
              contentContainerStyle={styles.viewScrollView}
              showsVerticalScrollIndicator={false}
              scrollEnabled
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {listQuestion[currentQuestion]?.questionType ===
              Constant.QUESTION_ONE_SELECT ? (
                <ItemQuestion
                  navigation={navigation}
                  isResult={isResult}
                  itemQuestion={listQuestion[currentQuestion]}
                  itemBookmark={listBookmark[currentQuestion]}
                  currentQuestion={currentQuestion}
                  refPlay={refPlay}
                  updateBookmark={onHandleUpdateBookmark}
                  onAnswerPress={(
                    idQuestion,
                    registorUserTestId,
                    idAnswer,
                    indexAnswer
                  ) => {
                    // Trả về id câu hỏi và id câu trả lời.
                    // Call api update câu hỏi.
                    onPressAnswer(
                      idQuestion,
                      registorUserTestId,
                      idAnswer,
                      indexAnswer
                    );
                  }}
                />
              ) : listQuestion[currentQuestion]?.questionType ===
                Constant.QUESTION_MULTIPLE_SELECT ? (
                <ItemQuestionMultiple
                  navigation={navigation}
                  isResult={isResult}
                  itemQuestion={listQuestion[currentQuestion]}
                  itemBookmark={listBookmark[currentQuestion]}
                  currentQuestion={currentQuestion}
                  refPlay={refPlay}
                  updateBookmark={onHandleUpdateBookmark}
                  onAnswerPress={(
                    idQuestion,
                    registorUserTestId,
                    idAnswer,
                    indexAnswer
                  ) => {
                    onPressMultipeAnswer(
                      idQuestion,
                      registorUserTestId,
                      idAnswer,
                      indexAnswer
                    );
                  }}
                />
              ) : listQuestion[currentQuestion]?.questionType ===
                Constant.QUESTION_FILL_BLANK ? (
                <ItemQuestionFillBlank
                  navigation={navigation}
                  isResult={isResult}
                  itemQuestion={listQuestion[currentQuestion]}
                  itemBookmark={listBookmark[currentQuestion]}
                  currentQuestion={currentQuestion}
                  refPlay={refPlay}
                  updateBookmark={onHandleUpdateBookmark}
                  onAnswerPress={(idQuestion, isAnswer, indexAnswer) => {
                    onPressAnswer(indexAnswer);
                  }}
                />
              ) : listQuestion[currentQuestion]?.questionType ===
                Constant.QUESTION_TF ? (
                <ItemQuestion
                  navigation={navigation}
                  isResult={isResult}
                  itemQuestion={listQuestion[currentQuestion]}
                  itemBookmark={listBookmark[currentQuestion]}
                  currentQuestion={currentQuestion}
                  refPlay={refPlay}
                  updateBookmark={onHandleUpdateBookmark}
                  onAnswerPress={(
                    idQuestion,
                    registorUserTestId,
                    idAnswer,
                    indexAnswer
                  ) => {
                    onPressAnswer(
                      idQuestion,
                      registorUserTestId,
                      idAnswer,
                      indexAnswer
                    );
                  }}
                />
              ) : listQuestion[currentQuestion]?.questionType ===
                Constant.QUESTION_HC ? (
                <ItemQuestionParentChild
                  navigation={navigation}
                  isResult={isResult}
                  itemQuestion={listQuestion[currentQuestion]}
                  itemBookmark={listBookmark[currentQuestion]}
                  currentQuestion={currentQuestion}
                  refPlay={refPlay}
                  updateBookmark={onHandleUpdateBookmark}
                  onAnswerPress={(
                    idQuestion,
                    registorUserTestId,
                    idAnswer,
                    indexAnswer,
                    parentId,
                    typeChild
                  ) => {
                    onPressParentChild(
                      idQuestion,
                      registorUserTestId,
                      idAnswer,
                      indexAnswer,
                      parentId,
                      typeChild
                    );
                  }}
                  onAnswerPressEssay={(
                    idQuestion,
                    registorUserTestId,
                    answer,
                    parentId
                  ) => {
                    onPressAnswerEssay(
                      idQuestion,
                      registorUserTestId,
                      answer,
                      parentId
                    );
                  }}
                />
              ) : listQuestion[currentQuestion]?.questionType ===
                Constant.QUESTION_ESSAY ? (
                <ItemQuestionEssay
                  isResult={isResult}
                  itemQuestion={listQuestion[currentQuestion]}
                  itemBookmark={listBookmark[currentQuestion]}
                  currentQuestion={currentQuestion}
                  refPlay={refPlay}
                  updateBookmark={onHandleUpdateBookmark}
                  onAnswerPress={(idQuestion, registorUserTestId, answer) => {
                    onPressAnswerEssay(
                      idQuestion,
                      registorUserTestId,
                      answer,
                      0
                    );
                  }}
                />
              ) : (
                <View />
              )}
            </ScrollView>
            <RenderBottomQuestion />
          </>
        )}
        <BottomSheetQuestion
          isOpenModal={isOpenModal}
          closeModal={() => {
            setIsOpenModal(false);
          }}
          listQuestion={listQuestion}
          listBookmark={listBookmark}
          onPressQuestion={(index) => {
            setCurrentQuestion(index);
          }}
        />
        <DialogWarnCustom
          isShowModal={isShowModal}
          keyHeader="text-button-enter-submit"
          keyMessage="text_dialog_test_submit"
          keySubmit="text-button-enter-submit"
          submitOnPress={onHandlerSubmit}
          cancelOnPress={(event) => {
            setShowModal(false);
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};
export default MyTestQuestionScreen;
