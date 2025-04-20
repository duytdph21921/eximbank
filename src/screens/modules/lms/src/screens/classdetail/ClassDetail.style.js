import { StyleSheet } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { screenWidth } from '@utils/platforms';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVetical: 5,
  },
  btnContainer: {
    height: 56,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Color.color_bg_tab_view,
    padding: 8,
    width: screenWidth,
    justifyContent: 'space-between',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  btnActive: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color_active_tab_view,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  btnText: {
    color: Color.black,
    fontWeight: '600',
    fontFamily: fonts.semi,
    fontSize: 12,
    lineHeight: 20.4,
  },
  btnTextActive: {
    color: Color.white,
    fontWeight: '600',
    fontFamily: fonts.semi,
    fontSize: 12,
    lineHeight: 20.4,
  },
  btnReturn: {
    marginLeft: horizontal(20),
    marginTop: vertical(10),
  },
  headerBar: {
    backgroundColor: Color.base_color,
    position: 'absolute',
    bottom: 0,
  },
});
