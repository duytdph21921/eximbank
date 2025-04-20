"use strict";

import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal } from '@utils/scales';
import { screenWidth } from '@utils/platforms';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  btnFilterHeader: {
    marginHorizontal: horizontal(15)
  },
  viewItemNoti: {
    flexDirection: 'row',
    height: horizontal(80),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  viewTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: screenWidth - 2 * horizontal(15) - 40 - horizontal(10)
  },
  viewTitleDetail: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: screenWidth - 2 * horizontal(15) - 40 - horizontal(10),
    marginTop: 10
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '700',
    width: screenWidth - 2 * horizontal(15) - 40 - horizontal(50)
  },
  textDetail: {
    fontSize: 12,
    fontWeight: '400',
    width: screenWidth - 2 * horizontal(15) - 40 - horizontal(50),
    color: Color.text_color_hover
  },
  textTime: {
    fontSize: 12,
    fontWeight: '400'
  },
  viewContent: {
    backgroundColor: Color.white,
    padding: 20,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 1,
    borderRadius: 15
  }
});
//# sourceMappingURL=NotificationClassScreen.styles.js.map