import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { screenWidth } from '@utils/platforms';
import fonts from '@assets/value/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollView: {
    paddingHorizontal: horizontal(20),
    paddingTop: vertical(70),
    flex: 1,
  },
  scrollStyle: {
    flex: 1,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: vertical(20),
  },
  btnConfim: {
    height: 56,
    width: screenWidth - horizontal(20) * 2,
    borderRadius: 100,
    marginTop: vertical(50),
    marginBottom: vertical(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.base_color,
  },
  textBtnConfim: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.white,
  },
  textContact: {
    fontSize: 12,
    fontWeight: '400',
    paddingHorizontal: horizontal(20),
    fontFamily: fonts.regular,
    textAlign: 'justify',
  },
  btnEnterExam: {
    height: 56,
    width: screenWidth - horizontal(20) * 2,
    borderRadius: 100,
    // marginTop: vertical(50),
    marginBottom: vertical(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDetail: {
    fontSize: 14,
    fontWeight: '400',
    // width: screenWidth - 2 * horizontal(15) - 40 - horizontal(50),
    color: Color.text_color_hover,
    textAlign: 'justify',
  },
});
