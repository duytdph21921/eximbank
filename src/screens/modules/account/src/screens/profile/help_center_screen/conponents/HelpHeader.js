/* eslint-disable global-require */
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';

const RATE_IMAGE = 168.55 / (327 - 20 * 2);
const WIDTH_IMAGE = screenWidth;
const HEIGHT_IMAGE = WIDTH_IMAGE * RATE_IMAGE;
const HelpHeader = (props) => (
  <View style={styles.container}>
    <FastImage
      source={require('@assets/img/icon_background_help.png')}
      resizeMode={FastImage.resizeMode.stretch}
      style={styles.bgHeader}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    ...Platform.select({
      ios: {
        shadowColor: Color.cl_text_app,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 1,
        shadowOffset: { width: 0, height: 10 },
        backgroundColor: Color.transparents,
      },
      android: {
        elevation: 1,
        backgroundColor: Color.transparents,
      },
    }),
    marginTop: vertical(20),
    alignSelf: 'center',
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontal(20),
    position: 'absolute',
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
  },
  bgHeader: {
    padding: 24,
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    alignSelf: 'center',
  },
});

export default HelpHeader;
