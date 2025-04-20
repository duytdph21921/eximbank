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
import RenderViewTitle from '@components/RenderViewTitle';

const BottomSheetListSubjectClass = (props) => {
  const {
    isOpenModal,
    closeModal,
    handleApplyOnPress,
    model,
    type,
    showOrderby,
    showRequired,
    showStatusLearn,
    showStatusClass,
  } = props;
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [lmsClassFilter, setLmsClassFilter] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    subjectId: model?.subjectId,
    trainingId: model?.trainingId,
    orderBy: {
      A: model?.orderBy === 1,
      B: model?.orderBy === 2,
    },
    statusLearn: [
      {
        A: model?.statusLearn[0] === 1,
        B: model?.statusLearn[1] === 2,
        C: model?.statusLearn[2] === 3,
      },
    ],
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
    classCategoryId: model?.classCategoryId,
  });
  const onDeleteAction = (key) => {
    let lmsClassFilterNew;
    switch (key) {
      case 'type_of_item':
        if (type === 1) {
          lmsClassFilterNew = {
            ...lmsClassFilter,
            orderBy: {
              A: true,
              B: false,
            },
            statusRelation: [
              {
                A: false,
                B: false,
              },
            ],
            statusClass: [
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
            classOrganizationType: [
              {
                A: false,
                B: false,
              },
            ],
          };
        } else if (type === 2) {
          lmsClassFilterNew = {
            ...lmsClassFilter,
            orderBy: {
              A: true,
              B: false,
            },
            statusRelation: [
              {
                A: false,
                B: false,
              },
            ],
            statusClass: [
              {
                A: false,
                B: false,
                C: false,
              },
            ],
            statusLearn: [
              {
                A: false,
                B: false,
                C: false,
              },
            ],
          };
        }
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text_sorted_by':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          orderBy: {
            A: true,
            B: false,
          },
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-state-required':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusRelation: [
            {
              A: false,
              B: false,
            },
          ],
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-time-process':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusClass: [
            {
              A: false,
              B: false,
              C: false,
            },
          ],
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-data-range':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          dataRange: [
            {
              A: false,
              B: false,
            },
          ],
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-organization-type':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          classOrganizationType: [
            {
              A: false,
              B: false,
            },
          ],
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-state':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusLearn: [
            {
              A: false,
              B: false,
              C: false,
            },
          ],
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      default:
        break;
    }
  };
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

  const RenderViewSearch = useCallback(() => {
    const handleDeleteAction = (keyDelete) => {
      onDeleteAction(keyDelete);
    };

    const toggleOrderBy = (key) => {
      setLmsClassFilter((prevState) => ({
        ...prevState,
        orderBy: {
          A: key === 'A',
          B: key === 'B',
        },
      }));
    };

    const options = [
      { key: 'A', i18nKey: 'text_latest_creation_time' },
      { key: 'B', i18nKey: 'text_highest_number_of_people' },
    ];

    return (
      <>
        <RenderViewTitle
          i18keyContext="text_sorted_by"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={handleDeleteAction}
        />
        {options.map(({ key, i18nKey }) => (
          <ItemSwitchDots
            key={key}
            i18nKeyContext={i18nKey}
            type={1}
            status={lmsClassFilter.orderBy[key]}
            containerStyle={styles.viewDots}
            onPress={() => toggleOrderBy(key)}
          />
        ))}
        <View style={styles.viewLine} />
      </>
    );
  }, [lmsClassFilter, onDeleteAction, setLmsClassFilter]);

  const RenderViewStateRequired = useCallback(() => {
    const handleDeleteAction = (keyDelete) => {
      onDeleteAction(keyDelete);
    };

    const toggleStatus = (key) => {
      setLmsClassFilter((prevState) => ({
        ...prevState,
        statusRelation: prevState.statusRelation.map((item, index) =>
          index === 0 ? { ...item, [key]: !item[key] } : item,
        ),
      }));
    };

    const options = [
      { key: 'A', i18nKey: 'text-study-required' },
      { key: 'B', i18nKey: 'text-study-state-elective' },
    ];

    return (
      <>
        <RenderViewTitle
          i18keyContext="text-study-state-required"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={handleDeleteAction}
        />
        {options.map(({ key, i18nKey }) => (
          <ItemSwitchDots
            key={key}
            i18nKeyContext={i18nKey}
            type={2}
            status={lmsClassFilter.statusRelation[0][key]}
            containerStyle={styles.viewDots}
            onPress={() => toggleStatus(key)}
          />
        ))}
        <View style={styles.viewLine} />
      </>
    );
  }, [lmsClassFilter, onDeleteAction, setLmsClassFilter]);

  const RenderViewTimeProcess = useCallback(() => {
    const handleDeleteAction = (keyDelete) => {
      onDeleteAction(keyDelete);
    };

    const toggleStatus = (key) => {
      setLmsClassFilter((prevState) => ({
        ...prevState,
        statusClass: prevState.statusClass.map((item, index) =>
          index === 0 ? { ...item, [key]: !item[key] } : item,
        ),
      }));
    };

    const options = [
      { key: 'A', i18nKey: 'text-time-processing' },
      { key: 'B', i18nKey: 'text-time-will-processing' },
      { key: 'C', i18nKey: 'text-time-processed' },
    ];

    return (
      <>
        <RenderViewTitle
          i18keyContext="text-time-process"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={handleDeleteAction}
        />
        {options.map(({ key, i18nKey }) => (
          <ItemSwitchDots
            key={key}
            i18nKeyContext={i18nKey}
            type={2}
            status={lmsClassFilter.statusClass[0][key]}
            containerStyle={styles.viewDots}
            onPress={() => toggleStatus(key)}
          />
        ))}
        <View style={styles.viewLine} />
      </>
    );
  }, [lmsClassFilter, onDeleteAction, setLmsClassFilter]);

  const transformObject = (obj) => {
    let newOrderBy = 0;
    if (obj.orderBy.A) {
      newOrderBy = 1;
    } else if (obj.orderBy.B) {
      newOrderBy = 2;
    }
    const newStatusRelation = obj.statusRelation.flatMap((item) => [
      item.A ? 1 : 0,
      item.B ? 2 : 0,
    ]);
    const newStatusClass = obj.statusClass.flatMap((item) => [
      item.A ? 1 : 0,
      item.B ? 2 : 0,
      item.C ? 3 : 0,
    ]);
    const newStatusLearn = obj.statusLearn.flatMap((item) => [
      item.A ? 1 : 0,
      item.B ? 2 : 0,
      item.C ? 3 : 0,
    ]);
    return {
      ...obj,
      orderBy: newOrderBy,
      statusRelation: newStatusRelation,
      statusClass: newStatusClass,
      statusLearn: newStatusLearn,
    };
  };
  const RenderStatusLearn = useCallback(() => {
    const handleDeleteAction = (keyDelete) => {
      onDeleteAction(keyDelete);
    };

    const toggleStatus = (key) => {
      setLmsClassFilter((prevState) => ({
        ...prevState,
        statusLearn: prevState.statusLearn.map((item, index) =>
          index === 0 ? { ...item, [key]: !item[key] } : item,
        ),
      }));
    };

    const options = [
      { key: 'A', i18nKey: 'text-studying-state' },
      { key: 'B', i18nKey: 'text-studyed-state' },
      { key: 'C', i18nKey: 'text-study-no-state' },
    ];

    return (
      <View>
        <RenderViewTitle
          i18keyContext="text-study-state"
          i18KeyDelete="delete_button_sheet"
          type={2}
          onDeleteAction={handleDeleteAction}
        />
        {options.map(({ key, i18nKey }) => (
          <ItemSwitchDots
            key={key}
            i18nKeyContext={i18nKey}
            type={2}
            status={lmsClassFilter.statusLearn[0][key]}
            containerStyle={styles.viewDots}
            onPress={() => toggleStatus(key)}
          />
        ))}
        <View style={styles.viewLine} />
      </View>
    );
  }, [lmsClassFilter, onDeleteAction, setLmsClassFilter]);

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
                  {showOrderby && <RenderViewSearch />}
                  {showRequired && <RenderViewStateRequired />}
                  {showStatusLearn && <RenderStatusLearn />}
                  {showStatusClass && <RenderViewTimeProcess />}
                  <TouchableDebounce
                    style={[
                      styles.btnApply,
                      {
                        backgroundColor: Color.base_color,
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

export default BottomSheetListSubjectClass;
