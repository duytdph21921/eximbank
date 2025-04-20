"use strict";

import { StyleSheet } from 'react-native';
import { isTablet, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
const WIDTH_IMAGE = screenWidth - horizontal(24) * 2;
const HEIGHT_IMAGE = WIDTH_IMAGE * 172 / 327;
const SIZE_ITEM = isTablet ? 100 : 50;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white
  },
  boxInfo: {
    marginTop: horizontal(30),
    borderRadius: horizontal(24),
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    backgroundColor: Color.color_bg_image_profile,
    padding: horizontal(16),
    marginHorizontal: 24,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  boxUserInfo: {
    flexDirection: 'row',
    width: '100%'
  },
  avatarProfile: {
    width: SIZE_ITEM,
    height: SIZE_ITEM,
    borderRadius: SIZE_ITEM
  },
  boxProfileInfoText: {
    marginLeft: vertical(15),
    justifyContent: 'space-evenly'
  },
  textProfileUsername: {
    fontSize: textSize(18),
    fontWeight: '700',
    lineHeight: 25.2,
    color: Color.white,
    fontFamily: fonts.medium
  },
  textProfileDepartment: {
    fontSize: textSize(12),
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.white,
    fontFamily: fonts.regular
  },
  boxViewLearnInfoItem: {
    width: horizontal(90),
    height: vertical(65),
    borderRadius: 16,
    padding: 10,
    backgroundColor: Color.color_bg_item_profile,
    color: Color.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxViewLearnInfo: {
    flexDirection: 'row',
    marginTop: horizontal(20),
    justifyContent: 'space-between',
    width: '100%'
  },
  textInfoLearn: {
    color: Color.white,
    fontWeight: '700',
    fontSize: textSize(10),
    lineHeight: textSize(16),
    fontFamily: fonts.bold,
    marginTop: vertical(3)
  },
  boxMenuContent: {
    width: screenWidth
  },
  boxMenuProfile: {
    paddingHorizontal: horizontal(24),
    marginBottom: horizontal(10),
    marginTop: horizontal(20)
  },
  boxMenuItem: {
    height: 44,
    flexDirection: 'row',
    width: screenWidth - horizontal(24) * 2,
    alignItems: 'center'
  },
  textMenu: {
    marginHorizontal: 5,
    fontWeight: '700',
    fontSize: textSize(14),
    lineHeight: 23.8
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    marginVertical: 12
  },
  boxDevider: {
    width: screenWidth,
    height: 10,
    backgroundColor: Color.color_bg_tab_view
  },
  btnReturn: {
    marginLeft: horizontal(20),
    marginTop: vertical(10)
  }
});
//# sourceMappingURL=ProfileScreen.styles.js.map