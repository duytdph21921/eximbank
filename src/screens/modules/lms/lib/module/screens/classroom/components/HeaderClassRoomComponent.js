"use strict";

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Constant from '@utils/constants';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { useSelector } from 'react-redux';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconFilter from '@assets/icons/icon_filter.svg';
import CMTextInput from '@components/CMTextInput';
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
const HeaderClassRoomComponent = props => {
  const {
    countClassRoom,
    onPressFilter,
    onSearch
  } = props;
  const languageLocal = useSelector(state => state.global.language);
  const [search, setSearch] = useState('');
  return /*#__PURE__*/_jsxs(View, {
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
          i18nKey: "text-tab-class-room",
          style: styles.textClass
        }), /*#__PURE__*/_jsx(CMText, {
          title: ` (${countClassRoom ?? 0})`,
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
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    borderRadius: 16,
    width: screenWidth - horizontal(20 * 2),
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: vertical(15)
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
export default HeaderClassRoomComponent;
//# sourceMappingURL=HeaderClassRoomComponent.js.map