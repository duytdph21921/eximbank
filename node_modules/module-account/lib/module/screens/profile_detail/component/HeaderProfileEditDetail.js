"use strict";

/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '@theme/colors';
import FastImage from 'react-native-fast-image';
import { horizontal } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import DocumentPicker from 'react-native-document-picker';
import Constant from '@utils/constants';
import { useDispatch } from 'react-redux';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { uploadFile } from '@services/lms/upload.api';
import { loadFile } from '@utils/helpers';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const HeaderDetailProfileEdit = props => {
  const {
    avatar,
    type,
    handleChooseAvatar
  } = props;
  const dispatch = useDispatch();
  const getFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: Constant.presentationStyle
      });
      const formData = new FormData();
      formData.append('files', {
        uri: response[0].uri,
        type: response[0].type,
        name: response[0].name
      });
      // call api uploadFile
      const responseUPload = await uploadFile(formData, 'avatar', 'profile');
      if (responseUPload?.success) {
        if (responseUPload?.data && responseUPload?.data.length > 0) {
          handleChooseAvatar(responseUPload?.data[0].fileName);
        }
      } else if (responseUPload?.message) {
        // hien thi thong bao
      }
    } catch (err) {
      dispatch(updateLoadingAction(false));
    }
  };
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.boxInfo,
      children: [avatar ? /*#__PURE__*/_jsx(FastImage, {
        source: {
          uri: loadFile(avatar)
        },
        resizeMode: "contain",
        style: styles.avatarProfile
      }) : /*#__PURE__*/_jsx(FastImage, {
        source: require('@assets/img/avatar.jpeg'),
        resizeMode: "contain",
        style: styles.avatarProfile
      }), /*#__PURE__*/_jsx(TouchableDebounce, {
        onPress: () => {
          getFile();
        },
        style: styles.cameraBtn,
        children: /*#__PURE__*/_jsx(FastImage, {
          source: require('@assets/img/camera.png'),
          resizeMode: "contain",
          style: styles.camera
        })
      })]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginTop: horizontal(10),
    alignItems: 'center'
  },
  boxInfo: {
    marginTop: horizontal(20),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarProfile: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  camera: {
    width: 50,
    height: 50
  },
  textDisplayNameInfo: {
    textAlign: 'center',
    fontFamily: 'manrope-bold',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700'
  },
  textUserNameInfo: {
    textAlign: 'center',
    fontFamily: 'manrope-regular',
    fontSize: 14,
    lineHeight: 23.8,
    fontWeight: '400'
  },
  cameraBtn: {
    position: 'absolute',
    bottom: -20,
    right: 0
  }
});
export default HeaderDetailProfileEdit;
//# sourceMappingURL=HeaderProfileEditDetail.js.map