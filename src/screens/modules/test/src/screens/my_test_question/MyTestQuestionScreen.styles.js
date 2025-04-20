import { StyleSheet } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { screenHeight, screenWidth } from '@utils/platforms';
import fonts from '@assets/value/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  viewScrollView: {
    paddingBottom: vertical(90 + 15),
  },
  viewHeader: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth - horizontal(125),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontal(15),
  },
  btnSubmitHeader: {},
  textSubmitHeader: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    color: Color.base_color,
    fontFamily: fonts.bold,
  },
  btnBack: {
    paddingLeft: horizontal(20),
    paddingRight: horizontal(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
