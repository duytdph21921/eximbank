"use strict";

/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { horizontal } from '@utils/scales';
import { Color } from '@theme/colors';
import FastImage from 'react-native-fast-image';
import CMText from '@components/CMText';
import { loadFile } from '@utils/helpers';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const HeaderDetailProfile = props => {
  const {
    avatar,
    displayName,
    email
  } = props;
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
      }), /*#__PURE__*/_jsx(FastImage, {
        source: require('@assets/img/camera.png'),
        resizeMode: "contain",
        style: styles.camera
      }), /*#__PURE__*/_jsx(CMText, {
        style: styles.textDisplayNameInfo,
        title: displayName
      }), /*#__PURE__*/_jsx(CMText, {
        style: styles.textUserNameInfo,
        title: email
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
    position: 'absolute',
    bottom: 0,
    right: 0
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
  }
});
export default HeaderDetailProfile;
//# sourceMappingURL=HeaderProfileDetail.js.map