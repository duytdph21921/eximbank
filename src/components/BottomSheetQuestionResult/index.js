/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { screenHeight, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCancel from '@assets/icons/icon_cancel.svg';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';

const BottomSheetQuestionResult = (props) => {
  const { isOpenModal, closeModal, listResult, onPressQuestion } = props;
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
  }, [isOpenModal, opacity, translateY]);

  const translationStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  /**
   * Click button câu hỏi.
   */
  const onHandleQuestion = (index) => {
    onPressQuestion(index);
    closeModal();
  };

  const renderItem = ({ item, index }) => (
    <TouchableDebounce
      style={[
        styles.viewItem,
        {
          backgroundColor: item?.isTrue === true ? Color.color_pass : Color.color_not_pass,
        },
      ]}
      onPress={() => onHandleQuestion(index)}
    >
      <CMText title={`${index + 1}`} style={styles.textItem} />
    </TouchableDebounce>
  );

  /**
   * Get height view bottomsheet.
   * @param {} event
   */
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
              <CMText style={styles.textTitle} i18nKey="text_list_result" />
              <FlatList
                data={listResult}
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
    justifyContent: 'flex-start', // Start from the beginning
    alignItems: 'flex-start', // Start from the beginning
    paddingHorizontal: 2, // Adjust as needed
    backgroundColor: 'white',
  },
  viewItem: {
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    borderRadius: 8,
    width: 52.6,
    height: 43,
    margin: (screenWidth - 52.6 * 5 - 10) / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    fontSize: textSize(14),
    color: Color.white,
    fontWeight: '400',
  },
  viewCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 18.47,
    borderBottomWidth: 18.5,
    borderLeftColor: 'transparent',
    borderBottomColor: Color.color_yellow_bm,
    transform: [{ rotate: '180deg' }],
    borderBottomRightRadius: 8,
  },
});
export default BottomSheetQuestionResult;
