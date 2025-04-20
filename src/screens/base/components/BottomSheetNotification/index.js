/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View, Modal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { screenHeight } from '@utils/platforms';
import { Color } from '@theme/colors';
import { horizontal, textSize, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import ItemSwitchDots from '@components/ItemSwitchDots';
import IconCancel from '@assets/icons/icon_cancel.svg';
import RenderViewTitle from '@components/RenderViewTitle';

const BottomSheetNotification = (props) => {
  const { isOpenModal, closeModal, handleApplyOnPress, filter } = props;
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [model, setModel] = useState([
    {
      id: -1,
      key_title: 'text-all-state',
      isSelect: filter === -1,
    },
    {
      id: 1,
      key_title: 'text-state-is-readed',
      isSelect: filter === 1,
    },
    {
      id: 2,
      key_title: 'text-state-un-read',
      isSelect: filter === 2,
    },
  ]);

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

  const handleOptionSelect = (id) => {
    const newModel = model.map((item) =>
      item.id === id ? { ...item, isSelect: true } : { ...item, isSelect: false },
    );
    setModel(newModel);
  };

  const onHandleApply = () => {
    handleApplyOnPress(model.find((item) => item.isSelect === true).id);
  };

  /**
   * Get height view bottomsheet.
   * @param {} event
   */
  const onViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const RenderItem = useCallback(
    () =>
      model.map((item) => (
        <ItemSwitchDots
          key={item?.id}
          i18nKeyContext={item?.key_title}
          type={1}
          status={item?.isSelect}
          containerStyle={styles.viewDots}
          onPress={() => {
            handleOptionSelect(item?.id);
          }}
        />
      )),
    [model],
  );

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
              <ScrollView
                scrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
              >
                <TouchableDebounce activeOpacity={1}>
                  <RenderViewTitle
                    i18keyContext="type_of_item"
                    i18KeyDelete="delete_all_button_sheet"
                    type={1}
                    onDeleteAction={() => {
                      handleOptionSelect(-1);
                    }}
                  />
                  <RenderItem />
                  <TouchableDebounce
                    style={[
                      styles.btnApply,
                      {
                        backgroundColor: Color.base_color,
                      },
                    ]}
                    onPress={onHandleApply}
                  >
                    <CMText i18nKey="text_btn_apply" style={styles.textBtnApply} />
                  </TouchableDebounce>
                </TouchableDebounce>
              </ScrollView>
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
    paddingVertical: 24,
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
    lineHeight: textSize(20),
  },
});

export default BottomSheetNotification;
