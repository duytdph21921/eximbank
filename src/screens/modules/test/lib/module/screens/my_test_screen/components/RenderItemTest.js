"use strict";

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import IconDocument from '@assets/icons/icon_document';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconMark from '@assets/icons/icon_mark.svg';
import IconPackage from '@assets/icons/icon_package.svg';
import IconClock from '@assets/icons/icon_clock.svg';
import Constant from '@utils/constants';
import { changeColor } from '@utils/helpers';
import { screenWidth } from '@utils/platforms';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RenderItemTest = props => {
  const {
    item,
    index,
    navigation
  } = props;

  /**
   * Click item my test.
   */
  const onHandleItem = () => {
    navigation.navigate(Constant.MY_TEST_INFORMATION_SCREEN, item);
  };
  return /*#__PURE__*/_jsxs(TouchableDebounce, {
    style: styles.container,
    onPress: onHandleItem,
    children: [/*#__PURE__*/_jsx(View, {
      style: [styles.viewIcon, {
        backgroundColor: changeColor(Color.base_color)
      }],
      children: /*#__PURE__*/_jsx(IconDocument, {
        width: 32,
        height: 32
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.viewContent,
      children: [/*#__PURE__*/_jsx(CMText, {
        title: item?.title,
        numberOfLines: 2,
        style: styles.textTitleItem
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.viewItem,
        children: [/*#__PURE__*/_jsx(IconMark, {
          width: 16,
          height: 16
        }), /*#__PURE__*/_jsx(CMText, {
          style: styles.textContentItem,
          i18nKey: "text-title-marks"
        }), /*#__PURE__*/_jsx(CMText, {
          title: `${item?.minMark}`,
          numberOfLines: 1,
          style: [styles.textContentItem, {
            width: screenWidth - horizontal(15 * 5) - 16 - horizontal(100)
          }]
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.viewItem,
        children: [/*#__PURE__*/_jsx(IconPackage, {
          width: 16,
          height: 16
        }), /*#__PURE__*/_jsx(CMText, {
          style: styles.textContentItem,
          i18nKey: "text-title-exam"
        }), /*#__PURE__*/_jsx(CMText, {
          title: item?.registorName,
          numberOfLines: 1,
          style: [styles.textContentItem, {
            width: screenWidth - horizontal(15 * 5) - 16 - horizontal(100)
          }]
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.viewItem,
        children: [(item?.startDate !== '' || item?.endDate !== '') && /*#__PURE__*/_jsx(IconClock, {
          width: 16,
          height: 16
        }), /*#__PURE__*/_jsx(CMText, {
          title: ` ${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`,
          numberOfLines: 1,
          style: styles.textContentItem
        })]
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: horizontal(15),
    paddingVertical: vertical(20),
    marginTop: vertical(15),
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 1
  },
  viewIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Color.color_bg_item_my_test,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewContent: {
    flex: 1,
    paddingLeft: horizontal(15)
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: vertical(10)
  },
  textTitleItem: {
    fontSize: textSize(12),
    fontWeight: '700',
    lineHeight: textSize(20.4)
  },
  textContentItem: {
    fontSize: textSize(10),
    fontWeight: '400',
    lineHeight: 16
  }
});
export default RenderItemTest;
//# sourceMappingURL=RenderItemTest.js.map