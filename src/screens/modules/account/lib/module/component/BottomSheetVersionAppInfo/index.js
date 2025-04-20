"use strict";

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { screenHeight, screenWidth } from '@utils/platforms';
import IconClose from '@assets/icons/close.svg';
import IconAlertCirCle from '@assets/icons/alert-circle.svg';
import fonts from '@assets/value/fonts';
import DeviceInfo from 'react-native-device-info';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BottomSheetVersionAppInfo = ({
  isOpenModal,
  closeModal
}) => {
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [currentVersion, setCurrentVersion] = useState('');
  const [viewHeight, setViewHeight] = useState(0);

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
   * Inittial data version app .
   */
  useEffect(() => {
    const currentVersion = DeviceInfo.getVersion(); // Lấy phiên bản hiện tại
    setCurrentVersion(currentVersion);
  }, []);
  const translationStyles = useAnimatedStyle(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));
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
      }), /*#__PURE__*/_jsxs(TouchableDebounce, {
        style: {
          ...StyleSheet.absoluteFillObject
        },
        activeOpacity: 1,
        onPress: closeModal,
        children: [/*#__PURE__*/_jsx(View, {
          style: [styles.btnCancel, {
            bottom: viewHeight + vertical(10)
          }],
          children: /*#__PURE__*/_jsx(TouchableDebounce, {
            onPress: closeModal,
            children: /*#__PURE__*/_jsx(IconClose, {
              width: 48,
              height: 48
            })
          })
        }), /*#__PURE__*/_jsxs(View, {
          style: styles.content,
          onLayout: onViewLayout,
          children: [/*#__PURE__*/_jsx(CMText, {
            style: styles.textLabel,
            title: "Tr\xED Nam E-Learning"
          }), /*#__PURE__*/_jsxs(View, {
            style: styles.flexDirectionRow,
            children: [/*#__PURE__*/_jsx(IconAlertCirCle, {
              width: 20,
              height: 20,
              style: {
                marginRight: 8
              }
            }), /*#__PURE__*/_jsx(CMText, {
              style: styles.textInfomation,
              i18nKey: "text-current-version"
            }), /*#__PURE__*/_jsx(CMText, {
              style: styles.textInfomation,
              title: currentVersion
            })]
          })]
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
  content: {
    position: 'absolute',
    width: screenWidth,
    backgroundColor: Color.white,
    bottom: 0,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 24
  },
  textLabel: {
    fontFamily: fonts.regular,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    marginBottom: vertical(10)
  },
  textInfomation: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.text_color_hover
  },
  iconInfo: {
    width: 20,
    height: 20
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
export default /*#__PURE__*/React.memo(BottomSheetVersionAppInfo);
//# sourceMappingURL=index.js.map