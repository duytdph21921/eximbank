/* eslint-disable global-require */
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { loadFile } from '@utils/helpers';

const CustomImage = (props) => {
  const { style, source, resizeMode } = props;
  return !source ? (
    <FastImage
      style={[styles.image, style]}
      source={require('@assets/other/img_default.jpg')}
      resizeMode={resizeMode || 'stretch'}
    />
  ) : (
    <FastImage
      style={[styles.image, style]}
      source={{ uri: loadFile(source) }}
      resizeMode={resizeMode || 'stretch'}
    />
  );
};

const styles = StyleSheet.create({
  image: {},
});

export default CustomImage;
