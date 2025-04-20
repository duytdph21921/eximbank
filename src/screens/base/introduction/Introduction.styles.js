import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, textSize, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts/index';
import { topIndicator } from './Indicartor';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: textSize(25),
    color: Color.cl_text_app,
    lineHeight: textSize(30),
    fontFamily: fonts.bold,
  },
  desc: {
    textAlign: 'center',
    fontSize: textSize(16),
    marginTop: vertical(21),
    color: Color.text_color,
  },
  body: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: horizontal(15),
    top: topIndicator + 30,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 28,
  },
});
