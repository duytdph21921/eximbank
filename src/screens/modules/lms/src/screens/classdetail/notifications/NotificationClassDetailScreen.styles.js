import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { screenWidth } from '@utils/platforms';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollView: {
    paddingHorizontal: horizontal(20),
    paddingTop: vertical(70),
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
  },
});
