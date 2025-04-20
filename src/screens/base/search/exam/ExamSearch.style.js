import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { isTablet, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';

const WIDTH_IMAGE = isTablet ? 170 : 120;
const HEIGHT_IMAGE = (WIDTH_IMAGE * 88) / 120;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  boxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItemContent: {
    borderRadius: 16,
    marginBottom: vertical(15),
    backgroundColor: Color.white,
    width: screenWidth - horizontal(24 * 2),
    alignSelf: 'center',
  },
  imageItemContent: {
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  textTitleMyContent: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.bold,
    color: Color.color_text_content,
    lineHeight: 23.8,
    letterSpacing: 0.3,
  },
  contentTypeName: {
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(4),
    backgroundColor: Color.color_bg_item_home,
    marginTop: vertical(8),
    alignSelf: 'flex-start',
  },
  textContentTypeName: {
    fontFamily: fonts.semi,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.2,
    textAlign: 'center',
    color: Color.base_color,
  },
  boxLikeView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textLikeView: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.2,
    marginLeft: 4,
    marginTop: 4,
  },
  boxInfo: {
    flex: 1,
    marginTop: horizontal(-4),
    paddingLeft: vertical(15),
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 16,
    letterSpacing: 0.2,
    fontFamily: fonts.regular,
    marginLeft: 3,
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: vertical(5),
  },
});
