/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { screenHeight } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCancel from '@assets/icons/icon_cancel.svg';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';
import ItemSwitchDots from '@components/ItemSwitchDots';
import RenderViewTitle from '@components/RenderViewTitle';
import TouchableDebounce from '@components/TouchableDebounce';

const BottomSheetFilterListExam = (props) => {
  const appColor = useSelector((state) => state.global.appColor);
  const { isOpenModal, closeModal, handleApplyOnPress, model } = props;
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [lmsMytestFilter, setLmsMyTestFilter] = useState({
    offset: 0,
    limit: 20,
    statusRegistor: [
      {
        A: model?.statusRegistor[0] === 1,
        B: model?.statusRegistor[1] === 2,
        C: model?.statusRegistor[2] === 3,
      },
    ],
    registorId: model?.registorId,
  });
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

  const onViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const RenderViewTimeProcess = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18keyContext="text-time-process"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={(keyDelete) => {
            onDeleteAction(keyDelete);
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-time-processing"
          type={2}
          status={lmsMytestFilter.statusRegistor[0].A}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsMyTestFilter((prevState) => ({
              ...prevState,
              statusRegistor: prevState.statusRegistor.map((item, i) =>
                i === 0 ? { ...item, A: !item.A } : item,
              ),
            }));
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-time-will-processing"
          type={2}
          status={lmsMytestFilter.statusRegistor[0].B}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsMyTestFilter((prevState) => ({
              ...prevState,
              statusRegistor: prevState.statusRegistor.map((item, i) =>
                i === 0 ? { ...item, B: !item.B } : item,
              ),
            }));
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-time-processed"
          type={2}
          status={lmsMytestFilter.statusRegistor[0].C}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsMyTestFilter((prevState) => ({
              ...prevState,
              statusRegistor: prevState.statusRegistor.map((item, i) =>
                i === 0 ? { ...item, C: !item.C } : item,
              ),
            }));
          }}
        />
        <View style={styles.viewLine} />
      </>
    ),
    [lmsMytestFilter],
  );

  const onDeleteAction = (key) => {
    let lmsMyTestFilterNew = { ...lmsMytestFilter };
    switch (key) {
      case 'type_of_item':
        lmsMyTestFilterNew = {
          ...lmsMytestFilter,
          statusRegistor: [
            {
              A: false,
              B: false,
              C: false,
            },
          ],
        };
        setLmsMyTestFilter(lmsMyTestFilterNew);
        break;
      case 'text-time-process':
        lmsMyTestFilterNew = {
          ...lmsMytestFilter,
          statusRegistor: [
            {
              A: false,
              B: false,
              C: false,
            },
          ],
        };
        setLmsMyTestFilter(lmsMyTestFilterNew);
        break;
      default:
        break;
    }
  };

  const transformObject = (obj) => {
    // Transform statusRegistor
    const statusRegistor = obj.statusRegistor.flatMap((item) => {
      const result = [];
      if (item.A) {
        result.push(1);
      } else {
        result.push(0);
      }
      if (item.B) {
        result.push(2);
      } else {
        result.push(0);
      }
      if (item.C) {
        result.push(3);
      } else {
        result.push(0);
      }
      return result;
    });

    return {
      ...obj,
      statusRegistor,
    };
  };
  const checkDataCallBack = () => {
    const newObj = transformObject(lmsMytestFilter);
    handleApplyOnPress(newObj);
    closeModal();
  };
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="fade"
      transparent
      visible={isOpenModal}
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
              <ScrollView
                scrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
              >
                <TouchableOpacity activeOpacity={1}>
                  <RenderViewTitle
                    i18keyContext="type_of_item"
                    i18KeyDelete="delete_all_button_sheet"
                    type={1}
                    onDeleteAction={(keyDelete) => {
                      onDeleteAction(keyDelete);
                    }}
                  />
                  <View style={styles.viewLine} />
                  <RenderViewTimeProcess />

                  <TouchableDebounce
                    style={[
                      styles.btnApply,
                      {
                        backgroundColor: appColor?.base_color,
                      },
                    ]}
                    onPress={checkDataCallBack}
                  >
                    <CMText i18nKey="text_btn_apply" style={styles.textBtnApply} />
                  </TouchableDebounce>
                </TouchableOpacity>
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
    maxHeight: screenHeight * 0.7,
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
  scrollView: {},
  viewBody: {
    marginTop: vertical(15),
    paddingHorizontal: horizontal(20),
  },
  textItem: {
    fontSize: textSize(16),
    color: Color.cl_text_app,
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
  viewLine: {
    height: vertical(10),
    width: '100%',
    backgroundColor: Color.color_bg_progress_bar,
  },
  viewDots: {
    paddingHorizontal: vertical(14),
  },
  btnApply: {
    backgroundColor: Color.base_color,
    height: 56,
    marginHorizontal: horizontal(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnApply: {
    fontSize: textSize(16),
    fontWeight: '700',
    color: Color.white,
  },
});

export default BottomSheetFilterListExam;
