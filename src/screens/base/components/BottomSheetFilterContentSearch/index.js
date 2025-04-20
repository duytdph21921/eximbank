/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { screenHeight } from '@utils/platforms';
import { Color } from '@theme/colors';
import { horizontal, textSize, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import ItemSwitchDots from '@components/ItemSwitchDots';
import IconCancel from '@assets/icons/icon_cancel.svg';
import { useSelector } from 'react-redux';
import RenderViewTitle from '@components/RenderViewTitle';

const BottomSheetFilterContentSearch = (props) => {
  const { isOpenModal, closeModal, handleApplyOnPress, model, isSortAll = false } = props;
  const appColor = useSelector((state) => state.global.appColor);
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [lmsContentFilter, setLmsContentFilter] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    statusTime: {
      A: model?.statusTime === 1,
      B: model?.statusTime === 2,
      C: model?.statusTime === 3,
    },
    dataRange: [
      {
        A: model?.dataRange[0] === 1,
        B: model?.dataRange[1] === 2,
      },
    ],
    contentCategoryId: model?.contentCategoryId,
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

  const RenderViewSearch = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18nKeyContext="text_sorted_by"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={(keyDelete) => {
            onDeleteAction(keyDelete);
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text_latest_creation_time"
          type={1}
          status={lmsContentFilter.statusTime.A}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
              ...prevState,
              statusTime: {
                ...prevState.statusTime,
                A: true,
                B: false,
                C: false,
              },
            }));
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-total-view-max"
          type={1}
          status={lmsContentFilter.statusTime.B}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
              ...prevState,
              statusTime: {
                ...prevState.statusTime,
                A: false,
                B: true,
                C: false,
              },
            }));
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-total-like-max"
          type={1}
          status={lmsContentFilter.statusTime.C}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
              ...prevState,
              statusTime: {
                ...prevState.statusTime,
                A: false,
                B: false,
                C: true,
              },
            }));
          }}
        />
        <View style={styles.viewLine} />
      </>
    ),
    [lmsContentFilter],
  );

  const RenderViewDataRange = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18nKeyContext="text-data-range"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={(keyDelete) => {
            onDeleteAction(keyDelete);
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-data-general"
          type={2}
          status={lmsContentFilter.dataRange[0].A}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
              ...prevState,
              dataRange: prevState.dataRange.map((item, i) =>
                i === 0 ? { ...item, A: !item.A } : item,
              ),
            }));
          }}
        />
        <ItemSwitchDots
          i18nKeyContext="text-data-owner"
          type={2}
          status={lmsContentFilter.dataRange[0].B}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
              ...prevState,
              dataRange: prevState.dataRange.map((item, i) =>
                i === 0 ? { ...item, B: !item.B } : item,
              ),
            }));
          }}
        />
        <View style={styles.viewLine} />
      </>
    ),
    [lmsContentFilter],
  );

  const onDeleteAction = (key) => {
    let lmsContentFilterNew = { ...lmsContentFilter };
    switch (key) {
      case 'type_of_item':
        lmsContentFilterNew = {
          ...lmsContentFilter,
          statusTime: {
            A: true,
            B: false,
            C: false,
          },
          dataRange: [
            {
              A: false,
              B: false,
            },
          ],
        };
        setLmsContentFilter(lmsContentFilterNew);
        break;
      case 'text_sorted_by':
        lmsContentFilterNew = {
          ...lmsContentFilter,
          statusTime: {
            A: true,
            B: false,
            C: false,
          },
        };
        setLmsContentFilter(lmsContentFilterNew);
        break;
      case 'text-data-range':
        lmsContentFilterNew = {
          ...lmsContentFilter,
          dataRange: [
            {
              A: false,
              B: false,
            },
          ],
        };
        setLmsContentFilter(lmsContentFilterNew);
        break;
      default:
        break;
    }
  };

  const onViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const transformObject = (obj) => {
    // Transform statusTime
    let newStatusTime;
    if (obj.statusTime.A) {
      newStatusTime = 1;
    } else if (obj.statusTime.B) {
      newStatusTime = 2;
    } else if (obj.statusTime.C) {
      newStatusTime = 3;
    }

    // Transform dataRange
    const newDataRange = obj.dataRange.flatMap((item) => {
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
      return result;
    });

    return {
      ...obj,
      statusTime: newStatusTime,
      dataRange: newDataRange,
    };
  };

  const checkDataCallBack = () => {
    const newObj = transformObject(lmsContentFilter);
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
            style={[styles.btnCancel, { bottom: viewHeight + vertical(10) }]}
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
                  <RenderViewSearch />
                  {/** 3 */}
                  {isSortAll === true && <RenderViewDataRange />}

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
    maxHeight: screenHeight * 0.7,
    height: 'auto',
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
  scrollView: {
    height: 'auto',
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
    lineHeight: textSize(20),
  },
});
export default BottomSheetFilterContentSearch;
