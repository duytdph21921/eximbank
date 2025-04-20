"use strict";

import { StyleSheet } from 'react-native';
import { isTablet, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white
  },
  textInput: {
    width: screenWidth - horizontal(24 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 20
  }
});
//# sourceMappingURL=FrequentlyQuestionScreen.styles.js.map