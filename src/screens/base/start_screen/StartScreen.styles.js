import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import { screenWidth } from '@utils/platforms';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  imageHeader: {
    alignItems: 'center',
    marginTop: vertical(20),
  },
  viewContent: {
    marginHorizontal: horizontal(15),
  },
  textTitle: {
    fontSize: 32,
    color: Color.text_color,
    lineHeight: 44.8,
    fontWeight: '700',
    alignSelf: 'center',
  },
  textTitleURL: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.text_color_hover,
    lineHeight: 22.4,
    marginTop: vertical(20),
    paddingBottom: vertical(10),
  },
  textInput: {
    height: 56,
    borderRadius: 100,
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color,
  },
  btnStart: {
    height: 56,
    borderRadius: 100,
    marginTop: vertical(150),
    marginBottom: vertical(10),
  },
  btnFooter: {
    height: 56,
    width: screenWidth * 0.9,
    borderRadius: 28,
    paddingHorizontal: 15,
    backgroundColor: Color.base_color,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: vertical(100),
    bottom: 20,
    elevation: 1,
  },
  textFooter: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.white,
  },
  textDisableFooter: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26.4,
    color: Color.color_uncheck_answer,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 28,
  },
});
