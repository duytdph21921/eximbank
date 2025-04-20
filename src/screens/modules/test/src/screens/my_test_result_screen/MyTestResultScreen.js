/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BackHandler, SafeAreaView, ScrollView, View } from 'react-native';
import CMText from '@components/CMText';
import QuestionBottom from '@components/QuestionBottom';
import BottomSheetQuestionResult from '@components/BottomSheetQuestionResult';
import ItemQuestion from '@components/QuestionsResult/ItemQuestion';
import ItemQuestionMultiple from '@components/QuestionsResult/ItemQuestionMultiple';
import ItemQuestionFillBlank from '@components/QuestionsResult/ItemQuestionFillBlank';
import ItemQuestionParentChild from '@components/QuestionsResult/ItemQuestionParentChild';
import ItemQuestionEssay from '@components/QuestionsResult/ItemQuestionEssay';
import Constant from '@utils/constants';
import { checkListEmpty } from '@utils/helpers';
import { useDispatch } from 'react-redux';
import BackHeader from '@components/BackHeader';
import globalStyles from '@theme/globalStyles';
import { useSwipe } from '@hooks/useSwipe';
import { getResultMobile } from '../../services/testregistorusertest.api';
import { styles } from './MyTestResultScreen.styles';
/**
 * V.2.4. Màn hình xem lại bài làm.
 * @param {*} props
 * @returns
 */
const MyTestResultScreen = (props) => {
  const { navigation, route } = props;
  const {
    idMyTest,
    showMark,
    showResultAll,
    showResultQuestion,
    showQuestionAnswer,
  } = route?.params;
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [listResult, setListResult] = useState([]);
  const isMounteRef = useRef(false);
  const refPlay = useRef();
  const [totalQuestion, setTotalQuestion] = useState(0);
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const funcGetResultMobile = async (model) => {
    const response = await getResultMobile(model);
    if (response?.status && isMounteRef.current) {
      const listNew = response?.data?.dataTest.filter(
        (item) => item.questionType !== -1
      );
      const listNewBookMark = response?.data?.bookMark.filter(
        (item) => item.questionType !== -1
      );
      setListQuestion(listNew);
      setTotalQuestion(listNew.length);
      setListResult(listNewBookMark);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    const params = {
      id: idMyTest,
      viewDetails: true,
      isUser: true,
    };
    funcGetResultMobile(params);
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Back to previous screen
   */
  const onBack = () => {
    navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
    });
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

  const renderHeaderRight = () => <View />;

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderTitle = () => (
    <CMText
      i18nKey="text-header-test-result-screen"
      style={globalStyles.titleScreen}
    />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      headerTitle: renderHeaderTitle,
    });
  }, [navigation]);

  /**
   * Render số lượng câu hỏi bottom.
   */
  const RenderBottomQuestion = useCallback(
    () => (
      <QuestionBottom
        countQuestion={listQuestion?.length > 0 && listQuestion?.length}
        currentQuestion={currentQuestion + 1}
        onHandleBack={() => {
          setCurrentQuestion(currentQuestion - 1);
        }}
        onHandleNext={() => {
          setCurrentQuestion(currentQuestion + 1);
        }}
        onHandleBottom={() => {
          setIsOpenModal(true);
        }}
      />
    ),
    [currentQuestion, listQuestion]
  );
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
    onHandleNextBackQuestion(1);
  }

  function onSwipeRight() {
    onHandleNextBackQuestion(-1);
  }
  return (
    <SafeAreaView style={styles.container}>
      {checkListEmpty(listQuestion) && (
        <>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.viewScrollView}
            showsVerticalScrollIndicator={false}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {listQuestion[currentQuestion]?.questionType ===
            Constant.QUESTION_ONE_SELECT ? (
              <ItemQuestion
                isResult
                showResultQuestion={showResultQuestion}
                showQuestionAnswer={showQuestionAnswer}
                itemQuestion={listQuestion[currentQuestion]}
                currentQuestion={currentQuestion}
              />
            ) : listQuestion[currentQuestion]?.questionType ===
              Constant.QUESTION_MULTIPLE_SELECT ? (
              <ItemQuestionMultiple
                isResult
                showResultQuestion={showResultQuestion}
                showQuestionAnswer={showQuestionAnswer}
                itemQuestion={listQuestion[currentQuestion]}
                currentQuestion={currentQuestion}
              />
            ) : listQuestion[currentQuestion]?.questionType ===
              Constant.QUESTION_FILL_BLANK ? (
              <ItemQuestionFillBlank
                navigation={navigation}
                isResult
                itemQuestion={listQuestion[currentQuestion]}
                currentQuestion={currentQuestion}
                refPlay={refPlay}
              />
            ) : listQuestion[currentQuestion]?.questionType ===
              Constant.QUESTION_TF ? (
              <ItemQuestion
                navigation={navigation}
                isResult
                showResultQuestion={showResultQuestion}
                showQuestionAnswer={showQuestionAnswer}
                itemQuestion={listQuestion[currentQuestion]}
                currentQuestion={currentQuestion}
                refPlay={refPlay}
              />
            ) : listQuestion[currentQuestion]?.questionType ===
              Constant.QUESTION_HC ? (
              <ItemQuestionParentChild
                navigation={navigation}
                isResult
                showResultQuestion={showResultQuestion}
                showQuestionAnswer={showQuestionAnswer}
                itemQuestion={listQuestion[currentQuestion]}
                currentQuestion={currentQuestion}
                refPlay={refPlay}
              />
            ) : listQuestion[currentQuestion]?.questionType ===
              Constant.QUESTION_ESSAY ? (
              <ItemQuestionEssay
                isResult
                itemQuestion={listQuestion[currentQuestion]}
                currentQuestion={currentQuestion}
                refPlay={refPlay}
              />
            ) : (
              <View />
            )}
          </ScrollView>
          <RenderBottomQuestion />
        </>
      )}
      <BottomSheetQuestionResult
        isOpenModal={isOpenModal}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        listResult={listResult}
        onPressQuestion={(index) => {
          setCurrentQuestion(index);
        }}
      />
    </SafeAreaView>
  );
};
export default MyTestResultScreen;
