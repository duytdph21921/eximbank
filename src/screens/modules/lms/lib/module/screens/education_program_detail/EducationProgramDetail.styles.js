"use strict";

import { StyleSheet } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  viewBtnBack: {
    right: horizontal(15)
  },
  tabBar: {
    backgroundColor: Color.color_bg_tab_view,
    marginHorizontal: horizontal(15),
    marginTop: vertical(20)
  }
});
//# sourceMappingURL=EducationProgramDetail.styles.js.map