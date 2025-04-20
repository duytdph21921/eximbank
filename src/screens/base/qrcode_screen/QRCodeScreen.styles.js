import { StyleSheet } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { screenHeight, screenWidth } from '@utils/platforms';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  layerCenter: {
    flex: 1.5,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 0.6,
    backgroundColor: Color.transparent_camera,
  },
  layerRight: {
    flex: 0.6,
    backgroundColor: Color.transparent_camera,
  },
  focused: {
    flex: 3,
  },
  layerTop: {
    flex: 1,
    backgroundColor: Color.transparent_camera,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: Color.transparent_camera,
    paddingTop: vertical(10),
    alignItems: 'center',
  },
  btnCancel: {
    top: horizontal(15),
    left: horizontal(10),
  },
  textTitle: {
    color: Color.white,
    fontSize: 14,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
