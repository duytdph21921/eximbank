"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import { View, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { isIOS, isTablet, screenHeight, screenWidth } from '@utils/platforms';
import TouchableDebounce from '@components/TouchableDebounce';
import IconCancel from '@assets/icons/icon_cancel.svg';
import CMText from '@components/CMText';
import { horizontal, textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import Constant from '@utils/constants';
import CMTextInput from '@components/CMTextInput';
import { hasNotch } from 'react-native-device-info';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    placeholderTitle: 'Enter title',
    placeholder: 'Enter content'
  },
  vn: {
    placeholderTitle: 'Nhập tiêu đề',
    placeholder: 'Nhập nội dung'
  }
};
const BottomAddClassTopic = props => {
  const {
    isOpenModal,
    closeModal,
    handleSubmitTopic,
    item
  } = props;
  const languageLocal = useSelector(state => state.global.language);
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [enterContent, setEnterContent] = useState('');
  const [enterTitle, setEnterTitle] = useState('');
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
    // filter noi dung vao neu co
    if (item) {
      setEnterContent(item?.content);
      setEnterTitle(item?.title);
    }
  }, []);
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
  const onHandleSubmitTopic = () => {
    if (item) {
      const newItem = {
        ...item,
        title: enterTitle,
        content: enterContent
      };
      handleSubmitTopic(newItem);
    } else {
      const model = {
        title: enterTitle,
        content: enterContent
      };
      handleSubmitTopic(model);
    }
    closeModal();
  };
  const translationStyles = useAnimatedStyle(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));
  return /*#__PURE__*/_jsx(KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: isIOS && hasNotch() ? 0 : 10,
    behavior: isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/_jsx(Modal, {
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
        }), /*#__PURE__*/_jsxs(TouchableOpacity, {
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
            onPress: Keyboard.dismiss,
            children: /*#__PURE__*/_jsxs(View, {
              style: [styles.buttonSheet],
              onLayout: onViewLayout,
              children: [/*#__PURE__*/_jsx(CMText, {
                i18nKey: "text-topic-class",
                style: styles.textHeader
              }), /*#__PURE__*/_jsx(CMTextInput, {
                textInputStyle: styles.textInputTitle,
                multiline: false,
                placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.placeholderTitle : PLACEHOLDER.en.placeholderTitle,
                onChangeText: enterTitle => setEnterTitle(enterTitle),
                value: enterTitle,
                maxLength: 500
              }), /*#__PURE__*/_jsx(CMTextInput, {
                textInputStyle: styles.textInput,
                multiline: true,
                placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
                onChangeText: enterContent => setEnterContent(enterContent),
                value: enterContent,
                maxLength: 4000
              }), /*#__PURE__*/_jsx(TouchableDebounce, {
                style: [styles.btnShare, {
                  backgroundColor: Color.base_color
                }],
                onPress: onHandleSubmitTopic,
                children: /*#__PURE__*/_jsx(CMText, {
                  i18nKey: "text-share",
                  style: styles.textShare
                })
              })]
            })
          })]
        })]
      })
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
    maxHeight: screenHeight * 0.7,
    paddingHorizontal: horizontal(30),
    paddingVertical: vertical(15)
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
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
  viewDots: {
    paddingHorizontal: horizontal(15)
  },
  btnApply: {
    backgroundColor: Color.base_color,
    height: 56,
    marginHorizontal: horizontal(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vertical(16),
    marginBottom: vertical(5)
  },
  textBtnApply: {
    fontSize: textSize(16),
    fontWeight: '700',
    color: Color.white
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    height: 240,
    textAlignVertical: 'top',
    paddingVertical: isIOS ? vertical(15) : vertical(5),
    width: '100%',
    marginBottom: vertical(16)
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.color_bg_tab_view,
    borderWidth: 1,
    borderColor: Color.color_gray_bm,
    marginTop: vertical(16),
    marginHorizontal: horizontal(18),
    height: vertical(100)
  },
  viewIcon: {
    alignItems: 'center',
    padding: vertical(10)
  },
  titleFile: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: textSize(12),
    color: Color.color_check_answer,
    paddingHorizontal: horizontal(5),
    flexWrap: 'wrap'
  },
  iconFile: {
    marginLeft: 20,
    marginTop: 5
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: horizontal(18),
    flex: 1
  },
  textUpfile: {
    fontSize: textSize(14),
    fontWeight: '400',
    fontFamily: fonts.medium
  },
  viewContent: {
    flexDirection: 'row',
    width: screenWidth - 100
  },
  textErrorMessage: {
    fontSize: textSize(14),
    fontWeight: '400',
    fontFamily: fonts.medium,
    color: Color.red,
    marginTop: vertical(16),
    marginHorizontal: horizontal(18)
  },
  buttonRemoveFile: {
    justifyContent: 'center'
  },
  boxView: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
    marginTop: vertical(20)
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: textSize(16),
    fontWeight: '700'
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: textSize(16),
    fontWeight: '400'
  },
  textHeader: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: textSize(20),
    lineHeight: 28,
    marginBottom: vertical(15)
  },
  btnShare: {
    width: screenWidth - horizontal(24 * 2),
    height: isTablet ? 65 : 56,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(10),
    borderRadius: 100,
    marginTop: 8
  },
  textShare: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: textSize(16),
    lineHeight: 26.4
  },
  textInputTitle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    height: 56,
    textAlignVertical: 'top',
    width: '100%',
    marginBottom: vertical(16)
  }
});
export default BottomAddClassTopic;
//# sourceMappingURL=index.js.map