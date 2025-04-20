"use strict";

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
import { useSelector } from 'react-redux';
import RenderViewTitle from '@components/RenderViewTitle';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BottomSheetFilterClassRoom = props => {
  const {
    isOpenModal,
    closeModal,
    handleApplyOnPress,
    model
  } = props;
  const appColor = useSelector(state => state.global.appColor);
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [lmsClassFilter, setLmsClassFilter] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    orderBy: 1,
    // Ko dùng
    statusLearn: [{
      A: model?.statusLearn[0] === 1,
      B: model?.statusLearn[1] === 2,
      C: model?.statusLearn[2] === 3
    }],
    statusRelation: [{
      A: model?.statusRelation[0] === 1,
      B: model?.statusRelation[1] === 2
    }],
    statusClass: [{
      A: model?.statusClass[0] === 1,
      B: model?.statusClass[1] === 2,
      C: model?.statusClass[2] === 3
    }],
    classOrganizationType: [{
      A: model?.classOrganizationType[0] === 1,
      B: model?.classOrganizationType[1] === 2
    }],
    dataRange: [],
    // ko dùng
    classCategoryId: model?.classCategoryId
  });
  useEffect(() => {
    if (isOpenModal) {
      translateY.value = withTiming(0, {
        duration: 500
      }, () => {
        opacity.value = withTiming(1, {
          duration: 300
        });
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 300
      }, () => {
        translateY.value = withTiming(screenHeight, {
          duration: 500
        });
      });
    }
  }, [isOpenModal]);
  const translationStyles = useAnimatedStyle(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  /**
   * Trạng thái học tập.
   */
  const RederStatusLearn = useCallback(() => /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(RenderViewTitle, {
      i18keyContext: "text-study-state",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-studying-state",
      type: 2,
      status: lmsClassFilter.statusLearn[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusLearn: prevState.statusLearn.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-studyed-state",
      type: 2,
      status: lmsClassFilter.statusLearn[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusLearn: prevState.statusLearn.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-study-no-state",
      type: 2,
      status: lmsClassFilter.statusLearn[0].C,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusLearn: prevState.statusLearn.map((item, i) => i === 0 ? {
            ...item,
            C: !item.C
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(View, {
      style: styles.viewLine
    })]
  }), [lmsClassFilter]);

  /**
   * Trạng thái bắt buộc.
   */
  const RenderStatusRelation = useCallback(() => /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(RenderViewTitle, {
      i18keyContext: "text-study-state-required",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-study-required",
      type: 2,
      status: lmsClassFilter.statusRelation[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusRelation: prevState.statusRelation.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-study-state-elective",
      type: 2,
      status: lmsClassFilter.statusRelation[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusRelation: prevState.statusRelation.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(View, {
      style: styles.viewLine
    })]
  }), [lmsClassFilter]);

  /**
   * Tiến trình thời gian.
   */
  const RenderStatusClass = useCallback(() => /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(RenderViewTitle, {
      i18keyContext: "text-time-process",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-time-processing",
      type: 2,
      status: lmsClassFilter.statusClass[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusClass: prevState.statusClass.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-time-will-processing",
      type: 2,
      status: lmsClassFilter.statusClass[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusClass: prevState.statusClass.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-time-processed",
      type: 2,
      status: lmsClassFilter.statusClass[0].C,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          statusClass: prevState.statusClass.map((item, i) => i === 0 ? {
            ...item,
            C: !item.C
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(View, {
      style: styles.viewLine
    })]
  }), [lmsClassFilter]);

  /**
   * Loại tổ chức.
   */
  const RenderClassOrganizationType = useCallback(() => /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(RenderViewTitle, {
      i18keyContext: "text-study-organization-type",
      i18KeyDelete: "delete_button_sheet",
      type: 2,
      onDeleteAction: keyDelete => {
        onDeleteAction(keyDelete);
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-study-simple-type",
      type: 2,
      status: lmsClassFilter.classOrganizationType[0].A,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          classOrganizationType: prevState.classOrganizationType.map((item, i) => i === 0 ? {
            ...item,
            A: !item.A
          } : item)
        }));
      }
    }), /*#__PURE__*/_jsx(ItemSwitchDots, {
      i18nKeyContext: "text-study-program",
      type: 2,
      status: lmsClassFilter.classOrganizationType[0].B,
      containerStyle: styles.viewDots,
      onPress: () => {
        setLmsClassFilter(prevState => ({
          ...prevState,
          classOrganizationType: prevState.classOrganizationType.map((item, i) => i === 0 ? {
            ...item,
            B: !item.B
          } : item)
        }));
      }
    })]
  }), [lmsClassFilter]);
  const onDeleteAction = key => {
    let lmsClassFilterNew = {
      ...lmsClassFilter
    };
    switch (key) {
      case 'type_of_item':
        // Xoa het
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusLearn: [{
            A: false,
            B: false,
            C: false
          }],
          statusRelation: [{
            A: false,
            B: false
          }],
          statusClass: [{
            A: false,
            B: false,
            C: false
          }],
          classOrganizationType: [{
            A: false,
            B: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-state':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusLearn: [{
            A: false,
            B: false,
            C: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-state-required':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusRelation: [{
            A: false,
            B: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-time-process':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          statusClass: [{
            A: false,
            B: false,
            C: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      case 'text-study-organization-type':
        lmsClassFilterNew = {
          ...lmsClassFilter,
          classOrganizationType: [{
            A: false,
            B: false
          }]
        };
        setLmsClassFilter(lmsClassFilterNew);
        break;
      default:
        break;
    }
  };

  /**
   * Get height view bottomsheet.
   * @param {} event
   */
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
  };
  const transformObject = obj => {
    // Transform statusLearn
    const newStatusLearn = obj.statusLearn.flatMap(item => {
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

    // Transform statusRelation
    const newStatusRelation = obj.statusRelation.flatMap(item => {
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
    const newStatusClass = obj.statusClass.flatMap(item => {
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

    // Transform classOrganizationType
    const newClassOrganizationType = obj.classOrganizationType.flatMap(item => {
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
      statusLearn: newStatusLearn,
      statusRelation: newStatusRelation,
      statusClass: newStatusClass,
      classOrganizationType: newClassOrganizationType
    };
  };
  const checkDataCallBack = () => {
    const newObj = transformObject(lmsClassFilter);
    handleApplyOnPress(newObj);
    closeModal();
  };
  return /*#__PURE__*/_jsx(Modal, {
    supportedOrientations: ['portrait', 'landscape'],
    animationType: "fade",
    transparent: true,
    visible: isOpenModal,
    propagateSwipe: true,
    children: /*#__PURE__*/_jsxs(Animated.View, {
      style: [styles.viewButtonSheet, translationStyles],
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#0000004D'
        }, opacityStyles]
      }), /*#__PURE__*/_jsxs(TouchableDebounce, {
        style: {
          ...StyleSheet.absoluteFillObject
        },
        activeOpacity: 1,
        children: [/*#__PURE__*/_jsx(TouchableDebounce, {
          style: [styles.btnCancel, {
            bottom: viewHeight + vertical(10)
          }],
          onPress: closeModal,
          children: /*#__PURE__*/_jsx(IconCancel, {
            width: 24,
            height: 24
          })
        }), /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
          children: /*#__PURE__*/_jsx(View, {
            style: [styles.buttonSheet],
            onLayout: onViewLayout,
            children: /*#__PURE__*/_jsx(ScrollView, {
              scrollEnabled: true,
              bounces: false,
              showsVerticalScrollIndicator: false,
              style: styles.scrollView,
              children: /*#__PURE__*/_jsxs(TouchableDebounce, {
                activeOpacity: 1,
                children: [/*#__PURE__*/_jsx(RenderViewTitle, {
                  i18keyContext: "type_of_item",
                  i18KeyDelete: "delete_all_button_sheet",
                  type: 1,
                  onDeleteAction: keyDelete => {
                    onDeleteAction(keyDelete);
                  }
                }), /*#__PURE__*/_jsx(RederStatusLearn, {}), /*#__PURE__*/_jsx(RenderStatusRelation, {}), /*#__PURE__*/_jsx(RenderStatusClass, {}), /*#__PURE__*/_jsx(RenderClassOrganizationType, {}), /*#__PURE__*/_jsx(TouchableDebounce, {
                  style: [styles.btnApply, {
                    backgroundColor: appColor?.base_color
                  }],
                  onPress: checkDataCallBack,
                  children: /*#__PURE__*/_jsx(CMText, {
                    i18nKey: "text_btn_apply",
                    style: styles.textBtnApply
                  })
                })]
              })
            })
          })
        })]
      })]
    })
  });
};
const styles = StyleSheet.create({
  viewButtonSheet: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
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
    paddingVertical: 24
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vertical(14),
    paddingHorizontal: vertical(14)
  },
  textTitle: {
    fontSize: textSize(20),
    color: Color.text_color,
    fontWeight: '700',
    lineHeight: 28
  },
  textDelete: {
    fontWeight: '400',
    color: Color.base_color,
    fontSize: textSize(12)
  },
  scrollView: {
    height: screenHeight * 0.7
  },
  viewBody: {
    marginTop: vertical(15),
    paddingHorizontal: horizontal(20)
  },
  textItem: {
    fontSize: textSize(16),
    color: Color.cl_text_app
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  viewLine: {
    height: vertical(10),
    width: '100%',
    backgroundColor: Color.color_border
  },
  viewDots: {
    paddingHorizontal: vertical(14)
  },
  btnApply: {
    backgroundColor: Color.base_color,
    height: 56,
    marginHorizontal: horizontal(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtnApply: {
    fontSize: textSize(16),
    fontWeight: '700',
    color: Color.white,
    lineHeight: textSize(20)
  }
});
export default BottomSheetFilterClassRoom;
//# sourceMappingURL=index.js.map