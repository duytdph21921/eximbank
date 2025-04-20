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

const BottomSheetFilterExam = (props) => {
  const { isOpenModal, closeModal, handleApplyOnPress, model, isSortAll = false } = props;
  const appColor = useSelector((state) => state.global.appColor);
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  const [lmsContentFilter, setLmsContentFilter] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    statusRelation: [
      {
        A: model?.statusRelation[0] === 1,
        B: model?.statusRelation[1] === 2,
      },
    ],
    statusRegistor: [
      {
        A: model?.statusRegistor[0] === 1,
        B: model?.statusRegistor[1] === 2,
        C: model?.statusRegistor[2] === 3,
      },
    ],
    dataRange: [
      {
        A: model?.dataRange[0] === 1,
        B: model?.dataRange[1] === 2,
      },
    ],
    categoryId: model?.categoryId,
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

  // const RenderViewSearch = useCallback(
  //   () => (
  //     <>
  //       <RenderViewTitle
  //         i18keyContext="text-study-state-required"
  //         i18KeyDelete="delete_button_sheet"
  //         type={2}
  //         onDeleteAction={(keyDelete) => {
  //           onDeleteAction(keyDelete);
  //         }}
  //       />
  //       <ItemSwitchDots
  //         i18nKeyContext="text-officially"
  //         type={2}
  //         status={lmsContentFilter.statusRelation[0].A}
  //         containerStyle={styles.viewDots}
  //         onPress={() => {
  //           setLmsContentFilter((prevState) => ({
  //             ...prevState,
  //             statusRelation: prevState.statusRelation.map((item, i) =>
  //               i === 0 ? { ...item, A: !item.A } : item,
  //             ),
  //           }));
  //         }}
  //       />
  //       <ItemSwitchDots
  //         i18nKeyContext="text-practice"
  //         type={2}
  //         status={lmsContentFilter.statusRelation[0].B}
  //         containerStyle={styles.viewDots}
  //         onPress={() => {
  //           setLmsContentFilter((prevState) => ({
  //             ...prevState,
  //             statusRelation: prevState.statusRelation.map((item, i) =>
  //               i === 0 ? { ...item, B: !item.B } : item,
  //             ),
  //           }));
  //         }}
  //       />
  //       <View style={styles.viewLine} />
  //     </>
  //   ),
  //   [lmsContentFilter],
  // );
  const RenderViewStatusRegistor = useCallback(
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
          status={lmsContentFilter.statusRegistor[0].A}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
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
          status={lmsContentFilter.statusRegistor[0].B}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
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
          status={lmsContentFilter.statusRegistor[0].C}
          containerStyle={styles.viewDots}
          onPress={() => {
            setLmsContentFilter((prevState) => ({
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
    [lmsContentFilter],
  );
  const RenderViewDataRange = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18keyContext="text-data-range"
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
          statusRelation: [
            {
              A: false,
              B: false,
            },
          ],
          statusRegistor: [
            {
              A: false,
              B: false,
              C: false,
            },
          ],
          dataRange: [
            {
              A: false,
              B: false,
            },
          ],
        };
        setLmsContentFilter(lmsContentFilterNew);
        break;
      case 'text-study-state-required':
        lmsContentFilterNew = {
          ...lmsContentFilter,
          statusRelation: [
            {
              A: false,
              B: false,
            },
          ],
        };
        setLmsContentFilter(lmsContentFilterNew);
        break;
      case 'text-time-process':
        lmsContentFilterNew = {
          ...lmsContentFilter,
          statusRegistor: [
            {
              A: false,
              B: false,
              C: false,
            },
          ],
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

  const transformObject = (obj) => {
    // Transform statusRelation
    const newStatusRelation = obj.statusRelation.flatMap((item) => {
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

    // Transform statusRegistor
    const newStatusRegistor = obj.statusRegistor.flatMap((item) => {
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
      statusRelation: newStatusRelation,
      statusRegistor: newStatusRegistor,
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
                  {/* <RenderViewSearch /> */}
                  <RenderViewStatusRegistor />
                  {isSortAll && <RenderViewDataRange />}
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
export default BottomSheetFilterExam;
