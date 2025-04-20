import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  viewItemAggregate: {
    flexDirection: 'row',
    paddingHorizontal: horizontal(20),
    marginTop: vertical(20),
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.color_text_progress_bar,
  },
  viewContent: {
    paddingHorizontal: horizontal(15),
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.bold,
  },
  viewScore: {
    flexDirection: 'row',
    paddingVertical: vertical(10),
  },
  textScore: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fonts.regular,
  },
  viewVertical: {
    backgroundColor: Color.color_text_progress_bar,
    width: 1,
    height: 20,
    marginHorizontal: horizontal(5),
  },
  btnState: {
    borderRadius: 100,
    width: horizontal(120),
    alignItems: 'center',
  },
  textStatus: {
    color: Color.white,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: fonts.bold,
    paddingVertical: vertical(5),
  },
  textScoreRequired: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: Color.white,
    fontWeight: '700',
  },
});
