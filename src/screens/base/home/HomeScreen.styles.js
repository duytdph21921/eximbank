import { StyleSheet } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { screenWidth } from '@utils/platforms';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.color_home_background,
  },
  tabView: {
    paddingTop: 30,
    backgroundColor: Color.color_white_education_program,
  },
  scene1: {
    flex: 1,
    backgroundColor: Color.color_red_education_program,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
  },
  scene2: {
    flex: 1,
    backgroundColor: Color.color_purple_education_program,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBar: {
    height: vertical(1.5),
    backgroundColor: Color.base_color,
    position: 'absolute',
    bottom: 0,
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: screenWidth / 2,
  },
  viewItemHeader: {
    backgroundColor: Color.color_bg_tab_view,
    height: vertical(42),
    justifyContent: 'center',
  },
  textItemHeader: {
    paddingHorizontal: horizontal(20),
    color: Color.color_text_item,
  },
});
