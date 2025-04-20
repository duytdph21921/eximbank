/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Constant from '@utils/constants';
import { screenHeight, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCancel from '@assets/icons/icon_cancel.svg';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';

const WIDTH_ITEM = (screenWidth - horizontal(24 * 2) - horizontal(10 * 4)) / 5;
const HEIGHT_ITEM = (WIDTH_ITEM * 43) / 52.6;

const BottomSheetQuestion = (props) => {
  const { isOpenModal, closeModal, listQuestion, listBookmark, onPressQuestion } = props;
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    if (isOpenModal) {
      translateY.value = withTiming(0, { duration: 500 }, () => {
        opacity.value = withTiming(1, { duration: 300 });
      });
    } else {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        translateY.value = withTiming(screenHeight, { duration: 500 });
      });
    }
  }, [isOpenModal]);

  const translationStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onHandleQuestion = (index) => {
    onPressQuestion(index);
    closeModal();
  };

  const checkStatusBookMark = (item, index) => {
    const itemQuestion = listQuestion[index];
    const isAnyItemSelected =
      itemQuestion?.question?.testAnswer?.some((item) => item.selected === true) ||
      itemQuestion?.answer.trim() !== '';
    let checkBookmark = 0;
    if (isAnyItemSelected) {
      checkBookmark = Constant.BM_COMPLETE;
    }
    if (!isAnyItemSelected) {
      checkBookmark = Constant.BM_DO_NOT;
    }
    if (isAnyItemSelected && item?.isBookMark) {
      checkBookmark = Constant.BM_COMPLETE_BOOKMARK;
    }
    if (!isAnyItemSelected && item?.isBookMark) {
      checkBookmark = Constant.BM_DO_NOT_BOOKMARK;
    }
    return checkBookmark;
  };
  const getBackgroundColor = (checkBookmark) => {
    if (checkBookmark === Constant.BM_COMPLETE || checkBookmark === Constant.BM_COMPLETE_BOOKMARK) {
      return Color.color_pass;
    }
    if (checkBookmark === Constant.BM_DO_NOT_BOOKMARK) {
      return Color.color_yellow_bm;
    }
    return Color.white;
  };
  const renderItem = ({ item, index }) => {
    const checkBookmark = checkStatusBookMark(item, index);
    return (
      <TouchableDebounce
        style={[styles.viewItem, { backgroundColor: getBackgroundColor(checkBookmark) }]}
        onPress={() => onHandleQuestion(index)}
      >
        {checkBookmark === Constant.BM_COMPLETE_BOOKMARK && (
          <View style={[styles.viewCircle, styles.flippedViewCircle]} />
        )}
        <CMText
          title={`${index + 1}`}
          style={[
            styles.textItem,
            {
              color: checkBookmark === Constant.BM_DO_NOT ? Color.text_color : Color.white,
            },
          ]}
        />
      </TouchableDebounce>
    );
  };

  const onViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="fade"
      transparent
      visible={isOpenModal}
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
              <CMText style={styles.textTitle} i18nKey="text_list_question" />
              <FlatList
                data={listBookmark}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={5}
                contentContainerStyle={styles.flatlist}
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
  textTitle: {
    fontSize: textSize(20),
    color: Color.text_color,
    fontWeight: '700',
    lineHeight: 28,
    paddingHorizontal: horizontal(14),
    paddingTop: vertical(20),
    paddingBottom: vertical(15),
  },
  flatlist: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    backgroundColor: 'white',
  },
  viewItem: {
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    borderRadius: 8,
    width: WIDTH_ITEM,
    height: HEIGHT_ITEM,
    margin: (screenWidth - WIDTH_ITEM * 5 - 10) / 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textItem: {
    fontSize: textSize(14),
    color: Color.text_color,
    fontWeight: '400',
  },
  viewCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderRightWidth: 22,
    borderBottomWidth: 22,
    borderRightColor: Color.transparents,
    borderBottomColor: Color.color_yellow_bm,
    borderStyle: 'solid',
    transform: [{ rotate: '90deg' }],
  },
});

export default BottomSheetQuestion;
