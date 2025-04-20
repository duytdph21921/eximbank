import { StyleSheet } from 'react-native';
import { horizontal, textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color_home_background,
  },
  titleScreen: {
    fontSize: textSize(20),
    fontWeight: '700',
    lineHeight: 36,
    marginHorizontal: horizontal(15),
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTextTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCountExam: {
    fontSize: textSize(18),
    fontWeight: '700',
    lineHeight: textSize(25.2),
  },
  contentContainerStyle: {
    paddingHorizontal: horizontal(24),
  },
});
