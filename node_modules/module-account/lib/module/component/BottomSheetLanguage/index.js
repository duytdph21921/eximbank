"use strict";

/* eslint-disable global-require */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Modal, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { horizontal, textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { screenHeight } from '@utils/platforms';
import FastImage from 'react-native-fast-image';
import { updateLanguageAction } from '@store/reducers/globalSlice';
import Constant from '@utils/constants';
import { storage } from '@utils/storage';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BottomSheetLanguage = ({
  isOpenModal,
  closeModal
}) => {
  const dispatch = useDispatch();
  const appColor = useSelector(state => state.global.appColor);
  const [language, setLanguage] = useState([{
    id: 1,
    title: 'English',
    value: 'en',
    icon: require('@assets/other/check.png'),
    isSelect: false
  }, {
    id: 2,
    title: 'Việt Nam',
    value: 'vn',
    icon: require('@assets/other/check.png'),
    isSelect: false
  }]);
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
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

  /**
   * Inittial data language .
   */
  useEffect(() => {
    const getLanguage = async () => {
      const languages = storage.getString(Constant.LANGUAGE_APP);
      setLanguage(prevItems => prevItems.map((item, index) => item.value === languages ? {
        ...item,
        isSelect: true
      } : {
        ...item,
        isSelect: false
      }));
    };
    getLanguage();
  }, []);
  const translationStyles = useAnimatedStyle(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  /**
   * Select language for app.
   */
  const onSelectLanguage = useCallback(async items => {
    setLanguage(prevItems => prevItems.map((item, index) => item.id !== items.id ? {
      ...item,
      isSelect: false
    } : {
      ...item,
      isSelect: true
    }));
    dispatch(updateLanguageAction(items.value));
    storage.set(Constant.LANGUAGE_APP, items.value);
    closeModal();
  }, []);
  return /*#__PURE__*/_jsx(Modal, {
    supportedOrientations: ['portrait', 'landscape'],
    animationType: "fade",
    transparent: true,
    visible: isOpenModal,
    children: /*#__PURE__*/_jsxs(Animated.View, {
      style: [styles.viewButtonSheet, translationStyles],
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: [{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: Color.bg_cl_order_history
        }, opacityStyles]
      }), /*#__PURE__*/_jsx(TouchableDebounce, {
        style: {
          ...StyleSheet.absoluteFillObject
        },
        activeOpacity: 1,
        onPress: closeModal,
        children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
          children: /*#__PURE__*/_jsx(View, {
            style: [styles.buttonSheet],
            children: /*#__PURE__*/_jsxs(View, {
              onStartShouldSetResponder: () => true,
              style: styles.sheet,
              children: [/*#__PURE__*/_jsx(View, {
                style: styles.viewDot
              }), /*#__PURE__*/_jsx(CMText, {
                i18nKey: "languge-title-dialog",
                style: styles.textTitle
              }), /*#__PURE__*/_jsx(View, {
                style: [styles.viewLanguage, {
                  borderColor: appColor?.base_color
                }],
                children: language.map((item, index) => /*#__PURE__*/_jsxs(TouchableDebounce, {
                  style: styles.btnLanguage,
                  onPress: () => {
                    onSelectLanguage(item);
                  },
                  children: [/*#__PURE__*/_jsx(Text, {
                    style: [styles.textItemLanguage, {
                      color: item.isSelect ? appColor?.base_color : Color.text_color
                    }],
                    children: item.title
                  }), item.isSelect && /*#__PURE__*/_jsx(FastImage, {
                    source: item.icon,
                    resizeMode: "contain",
                    style: styles.iconCheck
                  })]
                }, item.id))
              })]
            })
          })
        })
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
  sheet: {
    paddingHorizontal: horizontal(15)
  },
  buttonSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.white,
    paddingTop: 10,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22
  },
  viewDot: {
    width: horizontal(50),
    height: vertical(4),
    backgroundColor: Color.gray,
    borderRadius: 2.5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textTitle: {
    color: Color.text_color,
    fontSize: textSize(15),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: vertical(20)
  },
  viewLanguage: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingBottom: vertical(10),
    borderColor: Color.base_color
  },
  textLanguage: {
    color: Color.white,
    fontSize: textSize(15)
  },
  btnLanguage: {
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  textItemLanguage: {
    color: Color.text_color,
    fontSize: textSize(16)
  },
  iconCheck: {
    width: 15,
    height: 15
  },
  bntStart: {
    backgroundColor: Color.base_color,
    marginTop: 15,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  iamgeLanguage: {
    width: 30,
    height: 25
  },
  btnSelect: {
    width: '50%',
    height: 50,
    alignSelf: 'center',
    marginVertical: vertical(20)
  }
});
export default /*#__PURE__*/React.memo(BottomSheetLanguage);
//# sourceMappingURL=index.js.map