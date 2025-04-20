/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { screenHeight } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCancel from '@assets/icons/icon_cancel.svg';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';
import ItemSwitchDots from '@components/ItemSwitchDots';
import RenderViewTitle from '@components/RenderViewTitle';
import TouchableDebounce from '@components/TouchableDebounce';

const BottomSheetFilterEduProgram = (props) => {
  const { isOpenModal, closeModal, handleApplyOnPress, model } = props;
  const appColor = useSelector((state) => state.global.appColor);
  const translateY = useSharedValue(screenHeight);

  const [lmsEduProFilter, setLmsEduProFilter] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    statusTraining: [
      {
        A: model?.statusTraining[0] === 1,
        B: model?.statusTraining[1] === 2,
        C: model?.statusTraining[2] === 3,
      },
    ],
    dataRange: [],
  });
  const [viewHeight, setViewHeight] = useState(0);

  const opacity = useSharedValue(0);
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

  const RederStatusTraining = useCallback(
    () => (
      <View>
        <RenderViewTitle
          i18keyContext="text-time-process"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={(keyDelete) => {
            onDeleteAction(keyDelete);
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-studying-state"
          type={2}
          status={lmsEduProFilter.statusTraining[0].A}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsEduProFilter((prevState) => ({
              ...prevState,
              statusTraining: prevState.statusTraining.map((item, i) =>
                i === 0 ? { ...item, A: !item.A } : item
              ),
            }));
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-studyed-state"
          type={2}
          status={lmsEduProFilter.statusTraining[0].B}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsEduProFilter((prevState) => ({
              ...prevState,
              statusTraining: prevState.statusTraining.map((item, i) =>
                i === 0 ? { ...item, B: !item.B } : item
              ),
            }));
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-study-no-state"
          type={2}
          status={lmsEduProFilter.statusTraining[0].C}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsEduProFilter((prevState) => ({
              ...prevState,
              statusTraining: prevState.statusTraining.map((item, i) =>
                i === 0 ? { ...item, C: !item.C } : item
              ),
            }));
          }}
        />
        <View style={styles.viewLine} />
      </View>
    ),
    [lmsEduProFilter]
  );

  const onDeleteAction = (key) => {
    let lmsEduProFilterNew = { ...lmsEduProFilter };
    switch (key) {
      case 'type_of_item':
        // Xoa het
        lmsEduProFilterNew = {
          ...lmsEduProFilter,
          statusTraining: [
            {
              A: false,
              B: false,
              C: false,
            },
          ], // trạng thái học tập
        };
        setLmsEduProFilter(lmsEduProFilterNew);
        break;
      case 'text-study-state':
        lmsEduProFilterNew = {
          ...lmsEduProFilter,
          statusTraining: [
            {
              A: false,
              B: false,
              C: false,
            },
          ],
        };
        setLmsEduProFilter(lmsEduProFilterNew);
        break;
      default:
        break;
    }
  };

  /**
   * Get height view bottomsheet.
   * @param {} event
   */
  const onViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const transformObject = (obj) => {
    // Transform statusTraining
    const newStatusTraining = obj.statusTraining.flatMap((item) => {
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
      statusTraining: newStatusTraining,
    };
  };

  const checkDataCallBack = () => {
    const newObj = transformObject(lmsEduProFilter);
    handleApplyOnPress(newObj);
    closeModal();
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
              <RenderViewTitle
                i18keyContext="type_of_item"
                i18KeyDelete="delete_all_button_sheet"
                type={1}
                onDeleteAction={(keyDelete) => {
                  onDeleteAction(keyDelete);
                }}
              />
              <RederStatusTraining />
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
    backgroundColor: Color.color_border,
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
export default BottomSheetFilterEduProgram;
