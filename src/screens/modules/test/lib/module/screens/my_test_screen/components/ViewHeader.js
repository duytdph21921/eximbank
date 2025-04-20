"use strict";

/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { horizontal } from '@utils/scales';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import CMTextInput from '@components/CMTextInput';
import { screenWidth } from '@utils/platforms';
import { jsx as _jsx } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    placeholder: 'Enter search keywords'
  },
  vn: {
    placeholder: 'Nhập từ khóa tìm kiếm'
  }
};
const ViewHeader = props => {
  const {
    valueSearch,
    onSubmitSearch
  } = props;
  const languageLocal = useSelector(state => state.global.language);
  const [search, setSearch] = useState(valueSearch);
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(CMTextInput, {
      placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
      textInputStyle: styles.textInput,
      isSearch: true,
      returnKeyType: "next",
      onSubmitEditing: () => {
        onSubmitSearch(search);
      },
      blurOnSubmit: false,
      onChangeText: search => {
        setSearch(search);
      },
      onSubmitSearch: () => {
        onSubmitSearch(search);
      }
    })
  });
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: horizontal(24)
  },
  viewInput: {
    borderRadius: 16,
    borderWidth: 1
  },
  textInput: {
    borderRadius: 16,
    width: screenWidth - horizontal(20 * 2),
    borderWidth: 1
  }
});
export default ViewHeader;
//# sourceMappingURL=ViewHeader.js.map