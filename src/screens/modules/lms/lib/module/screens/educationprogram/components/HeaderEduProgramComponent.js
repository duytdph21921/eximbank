"use strict";

import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { horizontal, vertical } from '@utils/scales';
import IconFilter from '@assets/icons/icon_filter.svg';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { screenWidth } from '@utils/platforms';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    placeholder: 'Enter search keywords'
  },
  vn: {
    placeholder: 'Nhập từ khóa tìm kiếm'
  }
};
const HeaderEduProgramComponent = props => {
  const {
    countEduProgram,
    onPressFilter,
    onSearch
  } = props;
  const languageLocal = useSelector(state => state.global.language);
  const [search, setSearch] = useState('');
  return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    onPress: Keyboard.dismiss,
    accessible: false,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.container,
      children: [/*#__PURE__*/_jsx(CMTextInput, {
        placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
        returnKeyType: "next",
        onSubmitEditing: () => {
          onSearch(search);
        },
        onSubmitSearch: () => {
          onSearch(search);
        },
        blurOnSubmit: false,
        onChangeText: search => {
          setSearch(search?.trim());
        },
        textInputStyle: styles.textInput,
        maxLength: 100,
        isSearch: true
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.viewClassFilter,
        children: [/*#__PURE__*/_jsxs(View, {
          style: styles.viewTextClass,
          children: [/*#__PURE__*/_jsx(CMText, {
            i18nKey: "text-tab-edu-programer",
            style: styles.textClass
          }), /*#__PURE__*/_jsx(CMText, {
            title: ` (${countEduProgram ?? 0})`,
            style: [styles.textClass, {
              color: Color.color_text_progress_bar
            }]
          })]
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          onPress: onPressFilter,
          children: /*#__PURE__*/_jsx(IconFilter, {
            width: 24,
            height: 24
          })
        })]
      })]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: vertical(15),
    width: screenWidth - horizontal(20 * 2),
    alignSelf: 'center'
  },
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vertical(20),
    width: screenWidth - horizontal(20 * 2),
    alignSelf: 'center'
  },
  viewTextClass: {
    flexDirection: 'row'
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700'
  }
});
export default HeaderEduProgramComponent;
//# sourceMappingURL=HeaderEduProgramComponent.js.map