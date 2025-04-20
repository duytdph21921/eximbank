"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconHeader from '@assets/icons/icon_result_class_detail.svg';
import IconMark from '@assets/icons/icon_mark_a.svg';
import IconNext from '@assets/icons/icon_next_detail.svg';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import fonts from '@assets/value/fonts';
import { ProgressCircle } from 'react-native-svg-charts';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RATE_IMAGE = 153 / 327;
const WIDTH_IMAGE = screenWidth - horizontal(20 * 2);
const HEIGHT_IMAGE = WIDTH_IMAGE * RATE_IMAGE;
const HEIGHT_CHART = HEIGHT_IMAGE * 0.7;
const HeaderResult = props => {
  const {
    onHandleAggregate,
    dataChart
  } = props;
  const data = dataChart?.percentLearning ?? 0;
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(IconHeader, {
      width: WIDTH_IMAGE,
      height: HEIGHT_IMAGE
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.viewContent,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.viewMark,
        children: [/*#__PURE__*/_jsx(CMText, {
          i18nKey: "text-header-mark",
          style: styles.textTitleMark
        }), /*#__PURE__*/_jsxs(View, {
          style: styles.viewMarkDetail,
          children: [/*#__PURE__*/_jsx(IconMark, {
            width: 24,
            height: 24
          }), /*#__PURE__*/_jsx(CMText, {
            title: `${dataChart?.totalMark ?? 0}`,
            style: styles.textMark
          }), /*#__PURE__*/_jsxs(TouchableDebounce, {
            style: styles.btnMarkDetail,
            onPress: onHandleAggregate,
            children: [/*#__PURE__*/_jsx(CMText, {
              i18nKey: "text-header-mark-detail",
              style: styles.textDetail
            }), /*#__PURE__*/_jsx(IconNext, {
              width: 24,
              height: 24
            })]
          })]
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          style: styles.btnStateStudy,
          children: /*#__PURE__*/_jsx(CMText, {
            title: dataChart?.statusLearning ?? 'Không có trạng thái',
            style: styles.textStateStudy
          })
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.viewChart,
        children: [/*#__PURE__*/_jsx(ProgressCircle, {
          style: styles.progressCircle,
          progress: data / 100,
          progressColor: Color.color_uncheck_answer,
          backgroundColor: Color.white,
          startAngle: -Math.PI,
          endAngle: Math.PI,
          strokeWidth: 20
        }), /*#__PURE__*/_jsx(CMText, {
          title: `${data}%`,
          style: styles.percentage
        })]
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    // ...Platform.select({
    //   ios: {
    //     shadowColor: Color.cl_text_app,
    //     shadowOpacity: 0.5,
    //     shadowRadius: 10,
    //     shadowOffset: { width: 0, height: 10 },
    //     backgroundColor: Color.white,
    //   },
    //   android: {
    //     elevation: 1,
    //     backgroundColor: Color.white,
    //   },
    // }),
    marginVertical: vertical(20),
    alignSelf: 'center'
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontal(20),
    position: 'absolute',
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE
  },
  viewMarkDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnMarkDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewMark: {
    justifyContent: 'space-evenly',
    paddingVertical: vertical(10)
  },
  textTitleMark: {
    color: Color.white,
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: '700'
  },
  textMark: {
    color: Color.white,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: fonts.bold,
    lineHeight: 36,
    paddingHorizontal: 5
  },
  textDetail: {
    color: Color.white,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 5
  },
  btnStateStudy: {
    backgroundColor: Color.white,
    borderRadius: 100,
    paddingVertical: vertical(5),
    alignItems: 'center'
  },
  textStateStudy: {
    color: Color.color_pass,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: fonts.semi,
    paddingHorizontal: horizontal(10)
  },
  viewChart: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelValueStyle: {
    color: Color.white,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2
  },
  progressCircle: {
    height: HEIGHT_CHART - 1,
    width: HEIGHT_CHART
  },
  percentage: {
    position: 'absolute',
    color: Color.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.medium
  }
});
export default HeaderResult;
//# sourceMappingURL=HeaderResult.js.map