import { StyleSheet } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { screenWidth } from '@utils/platforms';
import fonts from '@assets/value/fonts';

const WIDTH_ITEM = (screenWidth - horizontal(20 * 2) - horizontal(20)) / 2;
const IMAGE_HEIGHT = (WIDTH_ITEM * 154) / 216;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
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
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: horizontal(20),
    paddingHorizontal: horizontal(20),
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  textTitleMyClass: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: Color.text_color,
    marginTop: vertical(10),
    height: vertical(30),
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: vertical(5),
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 16,
    paddingHorizontal: horizontal(5),
    fontFamily: fonts.regular,
    width: WIDTH_ITEM - 16,
  },
  viewProgress: {
    marginTop: vertical(10),
    backgroundColor: Color.color_bg_progress_bar,
  },
  textProgress: {
    fontSize: 10,
    fontWeight: '600',
    color: Color.color_text_progress_bar,
    marginTop: vertical(5),
  },
  viewRmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vertical(20),
    // width: screenWidth - horizontal(30),
  },
  textEmptyClass: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: vertical(15),
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});
