"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ProfileScreenPlaceholder = () => {
  const renderFade = props => /*#__PURE__*/_jsx(Fade, {
    ...props,
    style: styles.animationPlaceholder
  });
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(Placeholder, {
      Animation: renderFade,
      children: /*#__PURE__*/_jsxs(View, {
        style: styles.viewInfor,
        children: [/*#__PURE__*/_jsx(PlaceholderLine, {
          style: styles.imageProfile
        }), /*#__PURE__*/_jsx(PlaceholderLine, {
          style: styles.linePlaceholder,
          width: 50
        }), /*#__PURE__*/_jsx(PlaceholderLine, {
          style: styles.linePlaceholder,
          width: 50
        })]
      })
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  viewInfor: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vertical(30)
  },
  imagePlaceholder: {
    backgroundColor: Color.gray,
    width: horizontal(100),
    height: horizontal(100),
    borderRadius: 50
  },
  animationPlaceholder: {
    backgroundColor: '#d1d1cd'
  },
  linePlaceholder: {
    backgroundColor: Color.gray
  },
  imageProfile: {
    backgroundColor: Color.gray,
    width: horizontal(100),
    height: horizontal(100),
    borderRadius: horizontal(50)
  }
});
export default ProfileScreenPlaceholder;
//# sourceMappingURL=Profile.Placeholder.js.map