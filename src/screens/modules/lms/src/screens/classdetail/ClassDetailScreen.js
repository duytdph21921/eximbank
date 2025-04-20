/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-promise-executor-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Animated, FlatList, View, useWindowDimensions } from 'react-native';
import React, {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import globalStyles from '@theme/globalStyles';
import BackHeader from '@components/BackHeader';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import DialogWarnCustom from '@components/DialogWarnCustom';
import { LmsClassModel } from '../model/lmsclass.model';
import { styles } from './ClassDetail.style';
import { getById } from '../../services/lmsclass.api';
import ClassTopicScreen from './class_topic/ClassTopicScreen';
import IntroductionScreen from './introduction/IntroductionScreen';
import ContentScreen from './content/ContentScreen';
import ExerciseScreen from './excercise/ExerciseScreen';
import ResultStudyScreen from './result_study_screen/ResultStudyScreen';
import NotificationClassScreen from './notifications/NotificationClassScreen';

const ClassDetailScreen = (props) => {
  const { navigation, route } = props;
  /**
   * id: id của lớp.
   * indexTab: hiển thị tab khi khởi tạo.
   */
  const { id, indexTab } = route?.params;
  const dispatch = useDispatch();
  const [index, setIndex] = useState(indexTab ?? 0);
  const [classInfo, setClassInfo] = useState(new LmsClassModel());
  const [isShowPopup, setIsShowPopup] = useState(false);

  const [routes] = useState([
    { key: 'introduction', title: 'text-introduction-class' },
    { key: 'content', title: 'text-content-class' },
    { key: 'exercise', title: 'text-exercise-class' },
    { key: 'result', title: 'text-result-class' },
    { key: 'topic', title: 'text-topic-class' },
    { key: 'notification', title: 'text-tab-notification' },
  ]);

  const IntroductionRoute = useCallback(
    () => (
      <IntroductionScreen
        classInfo={classInfo}
        onPressLearn={handleNextContent}
        index={index}
      />
    ),
    [index, classInfo]
  );

  const ContentRoute = useCallback(
    () => (
      <ContentScreen
        classInfo={classInfo}
        navigation={navigation}
        // classUser={classUser}
        index={index}
        setIndex={setIndex}
      />
    ),
    [index, classInfo]
  );

  const ExerciseRoute = useCallback(
    () => <ExerciseScreen classInfo={classInfo} index={index} />,
    [index, classInfo]
  );

  const ResultRoute = useCallback(
    () => (
      <ResultStudyScreen
        classInfo={classInfo}
        navigation={navigation}
        index={index}
      />
    ),
    [index, classInfo]
  );

  const NotificationRoute = useCallback(
    () => (
      <NotificationClassScreen
        classInfo={classInfo}
        navigation={navigation}
        index={index}
      />
    ),
    [index, classInfo]
  );

  const TopicRoute = useCallback(
    () => (
      <ClassTopicScreen
        classInfo={classInfo}
        navigation={navigation}
        index={index}
      />
    ),
    [index, classInfo]
  );

  const renderScene = SceneMap({
    introduction: IntroductionRoute,
    content: ContentRoute,
    exercise: ExerciseRoute,
    result: ResultRoute,
    topic: TopicRoute,
    notification: NotificationRoute,
  });
  const isMounteRef = useRef(false);
  const scrollViewRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const layout = useWindowDimensions();
  const barTranslate = Animated.multiply(scrollX, -1);
  const barTranslate1 = useRef(new Animated.Value(0)).current;
  const [headerWidths, setWidths] = useState([]);

  const onHeaderLayout = (width, index) => {
    const newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    };
  }, []);
  useEffect(() => {
    // Phai set lại index ở đây
    isMounteRef.current = true;
    if (isMounteRef.current) {
      setIndex(indexTab ?? 0);
    }
    let leftOffset = 0;
    for (let i = 0; i < index; i += 1) {
      leftOffset += headerWidths[i] || 0;
    }
    scrollViewRef?.current?.scrollToIndex({
      index,
      viewPosition: 0.5,
    });
    Animated.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const getItemLayout = (data, index) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      offset += headerWidths[i] || 0;
    }
    const length = headerWidths[index] || 0;
    return { length, offset, index };
  };

  const handleScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      scrollViewRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  const renderTabBar = () => (
    <View style={styles.btnContainer}>
      <FlatList
        bounces={false}
        data={routes}
        ref={scrollViewRef}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={(itemTab) => (
          <View style={styles.viewItemHeader}>
            <TouchableDebounce
              onLayout={(e) => {
                onHeaderLayout(e.nativeEvent.layout.width, itemTab.index);
              }}
              onPress={() => {
                setIndex(itemTab.index);
                // if(classInfo?.isCloseClass){
                //   if(itemTab.index === 0 || itemTab.index === 3){
                //     setIndex(itemTab.index);
                //   }
                // }
                // else{
                //   setIndex(itemTab.index);
                // }
              }}
              style={[index === itemTab.index ? styles.btnActive : styles.btn]}
            >
              <CMText
                style={
                  index === itemTab.index
                    ? styles.btnTextActive
                    : styles.btnText
                }
                i18nKey={itemTab?.item?.title}
              />
            </TouchableDebounce>
          </View>
        )}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={handleScrollToIndexFailed}
      />
      <Animated.View
        style={[
          styles.headerBar,
          {
            width: headerWidths[index],
            transform: [
              { translateX: barTranslate },
              { translateX: barTranslate1 },
            ],
          },
        ]}
      />
    </View>
  );
  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;
  const renderHeaderRight = () => <View />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: () => (
        <CMText
          title={classInfo?.title ?? ''}
          style={globalStyles.titleScreen}
          numberOfLines={2}
        />
      ),
    });
  }, [navigation, classInfo]);

  const funcGetClassById = async () => {
    const response = await getById(id);
    if (response?.status && isMounteRef.current) {
      setClassInfo(response?.data);
      if (!response?.data?.isJoined) {
        setTimeout(() => {
          gotoListClassJoined();
        }, 500);
      }
    } else {
      setTimeout(() => {
        gotoListClassJoined();
      }, 500);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetClassById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [id]);
  const gotoListClassJoined = () => {
    navigation.navigate(Constant.LEARNING_STACK, {
      screen: Constant.STUDY_SCREEN,
    });
  };

  const handleNextContent = () => {
    setIndex(1);
  };
  const onBack = () => {
    navigation.navigate(Constant.LEARNING_STACK, {
      screen: Constant.STUDY_SCREEN,
      params: {
        dataBack: Math.random().toString(36).slice(2, 7),
      },
    });
    // navigation.navigate(Constant.STUDY_SCREEN,
    //   {
    //     dataBack: Math.random().toString(36).slice(2, 7)
    //   }
    // );
  };
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />

      <DialogWarnCustom
        isShowModal={isShowPopup}
        keyHeader="text-notification"
        keyMessage="text-access-denined-class"
        keySubmit="text-button-submit-exam"
        isShowCancel={false}
        submitOnPress={() => {
          setIsShowPopup(false);
          gotoListClassJoined();
        }}
      />
    </View>
  );
};

export default ClassDetailScreen;
