import { StyleSheet } from 'react-native';
import { horizontal, textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { isTablet, screenWidth } from '@utils/platforms';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTabView: {
    paddingVetical: 5,
  },
  btnContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: Color.white,
    width: screenWidth,
    justifyContent: 'space-between',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: isTablet ? 4 : 2,
  },
  btnActive: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontal(15),
    borderBottomWidth: isTablet ? 4 : 2,
  },
  btnText: {
    color: Color.color_text_item,
    fontWeight: '400',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 23.8,
  },
  textActive: {
    fontFamily: fonts.semi,
    fontSize: textSize(14),
    lineHeight: textSize(20.4),
  },
  btnReturn: {
    marginLeft: horizontal(20),
    marginTop: vertical(10),
  },
  textTitleScreen: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginLeft: horizontal(15),
  },
});
