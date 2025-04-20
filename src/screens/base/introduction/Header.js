import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { screenHeight, screenWidth } from '@utils/platforms';
import { vertical } from '@utils/scales';
import dimensionsImage from './height_manager';

const ratioGuy = 102 / 178;

const Header = ({ imageHeader, imageMain, index }) => (
  <View
    style={[
      styles.header,
      {
        height:
          dimensionsImage[index].heightImageHeader +
          dimensionsImage[index].heightImageMain +
          (index === 0 ? vertical(20) : 0),
      },
    ]}
  >
    <View
      style={{
        width: (screenHeight * 0.1) / ratioGuy,
        height: dimensionsImage[index].heightImageHeader,
      }}
    />
    <FastImage
      source={imageMain}
      style={{
        marginTop: 20,
        width: dimensionsImage[index].widthImageMain,
        height: dimensionsImage[index].heightImageMain,
      }}
      resizeMode="cover"
    />
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
