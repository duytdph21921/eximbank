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

const BottomSheetFilterClassSearch = (props) => {
  const { isOpenModal, closeModal, handleApplyOnPress, model, type } = props;
  const appColor = useSelector((state) => state.global.appColor);
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [lmsClassFilter, setLmsClassFilter] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    orderBy: {
      A: model?.orderBy === 1,
      B: model?.orderBy === 2,
    },
    statusRelation: [
      {
        A: model?.statusRelation[0] === 1,
        B: model?.statusRelation[1] === 2,
      },
    ],
    statusClass: [
      {
        A: model?.statusClass[0] === 1,
        B: model?.statusClass[1] === 2,
        C: model?.statusClass[2] === 3,
      },
    ],
    statusLearn: [
      {
        A: model?.statusLearn[0] === 1,
        B: model?.statusLearn[1] === 2,
        C: model?.statusLearn[2] === 3,
      },
    ],
    dataRange: [
      {
        A: model?.dataRange[0] === 1,
        B: model?.dataRange[1] === 2,
      },
    ],
    classOrganizationType: [
      {
        A: model?.classOrganizationType[0] === 1,
        B: model?.classOrganizationType[1] === 2,
      },
    ],
    classCategoryId: model?.classCategoryId,
  });
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
  const onDeleteAction = useCallback(
    (key) => {
      const getUpdatedFilter = (updates) => ({
        ...lmsClassFilter,
        ...updates,
      });

      let updatedFilter;

      switch (key) {
        case 'type_of_item':
          updatedFilter =
            type === 1
              ? getUpdatedFilter({
                  orderBy: { A: true, B: false },
                  statusRelation: [{ A: false, B: false }],
                  statusClass: [{ A: false, B: false, C: false }],
                  dataRange: [{ A: false, B: false }],
                  classOrganizationType: [{ A: false, B: false }],
                })
              : getUpdatedFilter({
                  orderBy: { A: true, B: false },
                  statusRelation: [{ A: false, B: false }],
                  statusClass: [{ A: false, B: false, C: false }],
                });
          break;

        case 'text_sorted_by':
          updatedFilter = getUpdatedFilter({
            orderBy: { A: true, B: false },
          });
          break;

        case 'text-study-state-required':
          updatedFilter = getUpdatedFilter({
            statusRelation: [{ A: false, B: false }],
          });
          break;

        case 'text-time-process':
          updatedFilter = getUpdatedFilter({
            statusClass: [{ A: false, B: false, C: false }],
          });
          break;

        case 'text-data-range':
          updatedFilter = getUpdatedFilter({
            dataRange: [{ A: false, B: false }],
          });
          break;

        case 'text-study-organization-type':
          updatedFilter = getUpdatedFilter({
            classOrganizationType: [{ A: false, B: false }],
          });
          break;

        default:
          return; // Không làm gì nếu không có case phù hợp
      }

      setLmsClassFilter(updatedFilter);
    },
    [lmsClassFilter, setLmsClassFilter, type],
  );

  const RenderViewSearch = useCallback(
    () => (
      <View>
        <RenderViewTitle
          i18keyContext="text_sorted_by"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={onDeleteAction}
        />
        <ItemSwitchDots
          i18nKeyContext="text_latest_creation_time"
          type={1}
          status={lmsClassFilter.orderBy.A}
          containerStyle={styles.viewDots}
          onPress={() =>
            setLmsClassFilter((prevState) => ({
              ...prevState,
              orderBy: { A: true, B: false },
            }))
          }
        />
        <ItemSwitchDots
          i18nKeyContext="text_highest_number_of_people"
          type={1}
          status={lmsClassFilter.orderBy.B}
          containerStyle={styles.viewDots}
          onPress={() =>
            setLmsClassFilter((prevState) => ({
              ...prevState,
              orderBy: { A: false, B: true },
            }))
          }
        />
        <View style={styles.viewLine} />
      </View>
    ),
    [lmsClassFilter, onDeleteAction, setLmsClassFilter],
  ); // Đảm bảo dependencies đầy đủ

  const toggleStatus = useCallback(
    (key, field) => {
      setLmsClassFilter((prevState) => ({
        ...prevState,
        [field]: prevState[field].map((item, i) =>
          i === 0 ? { ...item, [key]: !item[key] } : item,
        ),
      }));
    },
    [setLmsClassFilter],
  );

  const RenderViewStateRequired = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18keyContext="text-study-state-required"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={onDeleteAction}
        />
        <ItemSwitchDots
          i18nKeyContext="text-study-required"
          type={2}
          status={lmsClassFilter.statusRelation[0].A}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('A', 'statusRelation')}
        />
        <ItemSwitchDots
          i18nKeyContext="text-study-state-elective"
          type={2}
          status={lmsClassFilter.statusRelation[0].B}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('B', 'statusRelation')}
        />
        <View style={styles.viewLine} />
      </>
    ),
    [lmsClassFilter, toggleStatus, onDeleteAction],
  );

  const RenderViewTimeProcess = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18keyContext="text-time-process"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={onDeleteAction}
        />
        <ItemSwitchDots
          i18nKeyContext="text-time-processing"
          type={2}
          status={lmsClassFilter.statusClass[0].A}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('A', 'statusClass')}
        />
        <ItemSwitchDots
          i18nKeyContext="text-time-will-processing"
          type={2}
          status={lmsClassFilter.statusClass[0].B}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('B', 'statusClass')}
        />
        <ItemSwitchDots
          i18nKeyContext="text-time-processed"
          type={2}
          status={lmsClassFilter.statusClass[0].C}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('C', 'statusClass')}
        />
        <View style={styles.viewLine} />
      </>
    ),
    [lmsClassFilter, toggleStatus, onDeleteAction],
  );

  const RenderViewDataRange = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18keyContext="text-data-range"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={onDeleteAction}
        />
        <ItemSwitchDots
          i18nKeyContext="text-data-general"
          type={2}
          status={lmsClassFilter.dataRange[0].A}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('A', 'dataRange')}
        />
        <ItemSwitchDots
          i18nKeyContext="text-data-owner"
          type={2}
          status={lmsClassFilter.dataRange[0].B}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('B', 'dataRange')}
        />
        <View style={styles.viewLine} />
      </>
    ),
    [lmsClassFilter, toggleStatus, onDeleteAction],
  );

  const RenderViewOrganizationType = useCallback(
    () => (
      <>
        <RenderViewTitle
          i18keyContext="text-study-organization-type"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={onDeleteAction}
        />
        <ItemSwitchDots
          i18nKeyContext="text-study-simple-type"
          type={2}
          status={lmsClassFilter.classOrganizationType[0].A}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('A', 'classOrganizationType')}
        />
        <ItemSwitchDots
          i18nKeyContext="text-study-program"
          type={2}
          status={lmsClassFilter.classOrganizationType[0].B}
          containerStyle={styles.viewDots}
          onPress={() => toggleStatus('B', 'classOrganizationType')}
        />
      </>
    ),
    [lmsClassFilter, toggleStatus, onDeleteAction],
  );

  const transformObject = (obj) => {
    // Transform statusTime
    let newOrderBy;
    if (obj.orderBy.A) {
      newOrderBy = 1;
    } else if (obj.orderBy.B) {
      newOrderBy = 2;
    }
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
    // Transform statusClass
    const newStatusClass = obj.statusClass.flatMap((item) => {
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
    // Transform statusLearn¸
    const newStatusLearn = [];
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

    // Transform classOrganizationType
    const newClassOrganizationType = obj.classOrganizationType.flatMap((item) => {
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
      orderBy: newOrderBy,
      statusRelation: newStatusRelation,
      statusClass: newStatusClass,
      statusLearn: newStatusLearn,
      dataRange: newDataRange,
      classOrganizationType: newClassOrganizationType,
    };
  };

  const checkDataCallBack = () => {
    const newObj = transformObject(lmsClassFilter);
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
          <TouchableDebounce style={styles.btnCancel} onPress={closeModal}>
            <IconCancel width={24} height={24} />
          </TouchableDebounce>
          <TouchableWithoutFeedback>
            <View style={[styles.buttonSheet]}>
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
                  <RenderViewStateRequired />
                  {/** 1 */}
                  <RenderViewTimeProcess />
                  {/** 3 */}
                  {type === 1 && <RenderViewDataRange />}
                  {/** 4 */}
                  {type === 1 && <RenderViewOrganizationType />}
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
    height: screenHeight * 0.7,
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
    height: screenHeight * 0.7,
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
    top: screenHeight * 0.3 - 60,
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
    lineHeight: textSize(20),
  },
});

export default BottomSheetFilterClassSearch;
