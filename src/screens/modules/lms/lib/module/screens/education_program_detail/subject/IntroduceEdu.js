"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import he from 'he';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconSubject from '@assets/icons/icon_subject.svg';
import IconWatch from '@assets/icons/icon_watch.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import { Color } from '@theme/colors';
import { replaceHtml } from '@utils/helpers';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getById } from "../../../services/lmstraining.api.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const IMAGE_WIDTH = screenWidth - horizontal(24 * 2);
const IMAGE_HEIGHT = IMAGE_WIDTH * 150 / 327;
const IntroduceEdu = props => {
  const dispatch = useDispatch();
  const {
    params
  } = props;
  const isMounteRef = useRef(false);
  const [dataInfoEduProgram, setDataInfoEduProgram] = useState({
    description: ''
  });
  const id = params?.id;
  const funcGetById = async () => {
    const response = await getById(id);
    if (response?.status && isMounteRef.current) {
      setDataInfoEduProgram(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(CustomImage, {
      style: styles.viewImage,
      source: dataInfoEduProgram?.avatar
    }), /*#__PURE__*/_jsx(CMText, {
      title: dataInfoEduProgram?.title,
      style: styles.textTitle,
      numberOfLines: 3
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.viewDate,
      children: [(dataInfoEduProgram?.startDate !== '' || dataInfoEduProgram?.endDate !== '') && /*#__PURE__*/_jsx(IconWatch, {
        width: 18,
        height: 18
      }), /*#__PURE__*/_jsx(CMText, {
        title: `${dataInfoEduProgram?.startDate ?? ''}${dataInfoEduProgram?.endDate ? ` - ${dataInfoEduProgram?.endDate}` : ''}`,
        style: styles.textTime,
        numberOfLines: 2
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.viewDate,
      children: [/*#__PURE__*/_jsx(IconSubject, {
        width: 18,
        height: 18
      }), /*#__PURE__*/_jsx(CMText, {
        title: `${dataInfoEduProgram?.numSubject} `,
        style: styles.textTime,
        children: /*#__PURE__*/_jsx(CMText, {
          i18nKey: "text-subject",
          style: styles.textTime
        })
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.viewLine
    }), /*#__PURE__*/_jsx(View, {
      style: {
        flex: 1
      },
      children: /*#__PURE__*/_jsx(ScrollView, {
        scrollEnabled: true,
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          flexGrow: 1
        },
        children: /*#__PURE__*/_jsx(CMText, {
          title: `${he.decode(replaceHtml(dataInfoEduProgram?.description ?? ''))}`,
          style: styles.textContent
        })
      })
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontal(20)
  },
  viewImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    borderRadius: 16
  },
  textTitle: {
    fontWeight: '700',
    marginTop: vertical(20),
    fontFamily: fonts.regular,
    lineHeight: textSize(35),
    fontSize: textSize(20)
  },
  viewDate: {
    flexDirection: 'row',
    marginTop: vertical(20)
  },
  textTime: {
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: horizontal(10),
    fontFamily: fonts.regular,
    lineHeight: 20.4
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26.4
  },
  viewLine: {
    height: vertical(10),
    backgroundColor: Color.color_bg_tab_view,
    marginVertical: vertical(24)
  }
});
export default IntroduceEdu;
//# sourceMappingURL=IntroduceEdu.js.map