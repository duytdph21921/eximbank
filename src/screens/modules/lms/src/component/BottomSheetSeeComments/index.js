/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { isIOS, screenHeight, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCancel from '@assets/icons/icon_cancel.svg';
import CustomTabView from '@components/CustomTabView';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import ExercisceContentScreen from '../../screens/classdetail/excercise/ExercisceContentScreen';
import TeacherCommentedScreen from '../../screens/classdetail/excercise/TeacherCommentedScreen';
import {
  viewComment,
  viewDetailExercise,
} from '../../services/lmsclassexercise.api';

const BottomSheetSeeComments = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const { isOpenModalComment, closeModal, idExercise } = props;
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [dataContent, setDataContent] = useState();
  const [dataArrayUrlExercise, setDataArrayUrlExercise] = useState([]);
  const [dataArrayUrlTeacherComment, setDataArrayUrlTeacherComment] = useState(
    []
  );
  const [teacherComment, setTeacherComment] = useState();

  const isMounteRef = useRef(false);

  const funcViewDetailExercise = async () => {
    const response = await viewDetailExercise(idExercise);
    if (response?.status && isMounteRef.current) {
      setDataContent(response?.data);
      const string = response?.data?.fileId;
      if (string) {
        const array = string.split(',');
        setDataArrayUrlExercise(array);
      }
    }
  };
  const funcViewComment = async () => {
    const response = await viewComment(idExercise);
    if (response?.status && isMounteRef.current) {
      setTeacherComment(response?.data);
      const string = response?.data?.fileId;
      if (string) {
        const array = string.split(',');
        setDataArrayUrlTeacherComment(array);
      }
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    funcViewDetailExercise();
    funcViewComment();
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOpenModalComment) {
      translateY.value = withTiming(0, { duration: 500 }, () => {
        opacity.value = withTiming(1, { duration: 300 });
      });
    } else {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        translateY.value = withTiming(screenHeight, { duration: 500 });
      });
    }
  }, [isOpenModalComment]);

  const translationStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const renderRoute1 = () => (
    <ExercisceContentScreen
      dataContent={dataContent}
      dataArrayUrlExercise={dataArrayUrlExercise}
    />
  );
  const renderRoute2 = () => (
    <TeacherCommentedScreen
      teacherComment={teacherComment}
      dataArrayUrlTeacherComment={dataArrayUrlTeacherComment}
    />
  );

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="fade"
      transparent
      visible={isOpenModalComment}
      propagateSwipe
    >
      <Animated.View style={[styles.viewButtonSheet, translationStyles]}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#0000004D',
            },
            opacityStyles,
          ]}
        />
        <TouchableDebounce
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          activeOpacity={1}
        >
          <TouchableDebounce
            style={[
              styles.btnCancel,
              {
                bottom: viewHeight + vertical(10),
              },
            ]}
            onPress={closeModal}
          >
            <IconCancel width={24} height={24} />
          </TouchableDebounce>
          <TouchableWithoutFeedback>
            <View style={[styles.buttonSheet]} onLayout={onViewLayout}>
              <CustomTabView
                style={styles.tabBar}
                onIndexChange={(index) => setActiveTab(index)}
                firstRoute={renderRoute1}
                secondRoute={renderRoute2}
                routes={[
                  { key: 'first', title: 'text-tab-content-of-assignment' },
                  { key: 'second', title: 'text-tab-teacher-comments' },
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableDebounce>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewButtonSheet: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: vertical(14),
    maxHeight: screenHeight / 2,
    height: screenHeight / 2,
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vertical(14),
    paddingHorizontal: vertical(14),
  },
  textTitle: {
    fontSize: textSize(20),
    color: Color.text_color,
    fontWeight: '700',
    lineHeight: 28,
  },
  textDelete: {
    fontWeight: '400',
    color: Color.base_color,
    fontSize: textSize(12),
  },
  viewDots: {
    paddingHorizontal: horizontal(15),
  },
  btnApply: {
    backgroundColor: Color.base_color,
    height: 56,
    marginHorizontal: horizontal(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vertical(20),
    bottom: vertical(0),
  },
  textBtnApply: {
    fontSize: textSize(16),
    fontWeight: '700',
    color: Color.white,
  },

  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    height: 240,
    width: screenWidth - horizontal(20 * 2),
    textAlignVertical: 'top',
    paddingVertical: isIOS ? vertical(15) : vertical(5),
  },

  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.color_bg_tab_view,
    borderRadius: 8,
    borderColor: Color.color_gray_bm,
    borderWidth: 1,
    elevation: 1,
    marginTop: vertical(5),
    paddingVertical: isIOS ? vertical(15) : vertical(5),
    height: 120,
    width: screenWidth - horizontal(20 * 2),
    marginHorizontal: horizontal(18),
    justifyContent: 'center',
  },
  iconUpload: {
    marginHorizontal: 10,
  },
  titleFile: {
    paddingVertical: 7,
    fontSize: textSize(16),
    color: Color.base_color,
    marginLeft: 5,
  },
  iconFile: {
    marginLeft: 20,
    marginTop: 5,
  },
  tabBar: {
    justifyContent: 'flex-start', // Start from the beginning
    alignItems: 'flex-start', // Start from the beginning
    paddingHorizontal: 2, // Adjust as needed
    backgroundColor: 'white',
    marginTop: vertical(16),
  },
});

export default BottomSheetSeeComments;
