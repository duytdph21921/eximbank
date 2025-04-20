/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Constant from '@utils/constants';
import { BackHandler, SafeAreaView, ScrollView, View } from 'react-native';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import QuestionBottom from '@components/QuestionBottom';
import { checkListEmpty } from '@utils/helpers';
import ItemQuestion from '@components/QuestionsResult/ItemQuestion';
import ItemQuestionMultiple from '@components/QuestionsResult/ItemQuestionMultiple';
import ItemQuestionFillBlank from '@components/QuestionsResult/ItemQuestionFillBlank';
import ItemQuestionParentChild from '@components/QuestionsResult/ItemQuestionParentChild';
import ItemQuestionEssay from '@components/QuestionsResult/ItemQuestionEssay';
import BottomSheetQuestionResult from '@components/BottomSheetQuestionResult';
import { useSwipe } from '@hooks/useSwipe';
import { styles } from './MyTestResultInClassScreen.styles';
import { getResultClassTestMobile } from '../../services/testclassusertest.api';

const MyTestResultInClassScreen = (props) => {
  const { navigation, route } = props;
  const { idMyTest, data } = route?.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [listResult, setListResult] = useState([]);
  const isMounteRef = useRef(false);
  const refPlay = useRef();
  const [totalQuestion, setTotalQuestion] = useState(0);
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const funcGetResultClassTestMobile = async (params) => {
    const response = await getResultClassTestMobile(params);
    if (response?.status && isMounteRef.current) {
      const listNew = response?.data?.dataTest?.filter(
        (item) => item?.questionType !== -1
      );
      const listNewBookMark = response?.data?.bookMark?.filter(
        (item) => item?.questionType !== -1
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
    };
    funcGetResultClassTestMobile(params);

    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Back to previous screen
   */
  const onBack = () => {
    navigation.navigate(Constant.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
    });
    // return true;
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
  const renderQuestionComponent = () => {
    const questionType = listQuestion[currentQuestion]?.questionType;
    switch (questionType) {
      case Constant.QUESTION_ONE_SELECT:
        return (
          <ItemQuestion
            isResult
            itemQuestion={listQuestion[currentQuestion]}
            currentQuestion={currentQuestion}
            showQuestionAnswer={data?.showQuestionAnswer}
          />
        );
      case Constant.QUESTION_MULTIPLE_SELECT:
        return (
          <ItemQuestionMultiple
            isResult
            itemQuestion={listQuestion[currentQuestion]}
            currentQuestion={currentQuestion}
            showQuestionAnswer={data?.showQuestionAnswer}
          />
        );
      case Constant.QUESTION_FILL_BLANK:
        return (
          <ItemQuestionFillBlank
            navigation={navigation}
            isResult
            itemQuestion={listQuestion[currentQuestion]}
            currentQuestion={currentQuestion}
            refPlay={refPlay}
          />
        );
      case Constant.QUESTION_TF:
        return (
          <ItemQuestion
            navigation={navigation}
            isResult
            itemQuestion={listQuestion[currentQuestion]}
            currentQuestion={currentQuestion}
            refPlay={refPlay}
            showQuestionAnswer={data?.showQuestionAnswer}
          />
        );
      case Constant.QUESTION_HC:
        return (
          <ItemQuestionParentChild
            navigation={navigation}
            isResult
            itemQuestion={listQuestion[currentQuestion]}
            currentQuestion={currentQuestion}
            refPlay={refPlay}
            showQuestionAnswer={data?.showQuestionAnswer}
          />
        );
      case Constant.QUESTION_ESSAY:
        return (
          <ItemQuestionEssay
            isResult
            itemQuestion={listQuestion[currentQuestion]}
            currentQuestion={currentQuestion}
            refPlay={refPlay}
          />
        );
      default:
        return <View />;
    }
  };

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
            {renderQuestionComponent()}
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

export default MyTestResultInClassScreen;
