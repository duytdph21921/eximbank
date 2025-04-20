import { Platform, StyleSheet } from 'react-native';
import { isTablet, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import { Color } from '@theme/colors';

const WIDTH_IMAGE = isTablet ? 122 : 92;
const HEIGHT_IMAGE = (WIDTH_IMAGE * 57.1) / 92;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  contentContainerStyle: {
    backgroundColor: Color.color_bg_tab_view,
  },
  boxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItemContent: {
    borderRadius: 16,
    marginBottom: vertical(15),
    alignSelf: 'center',
    backgroundColor: Color.white,
    padding: 16,
    width: screenWidth - horizontal(24 * 2),
    elevation: 1,
    ...Platform.select({
      ios: {
        shadowColor: Color.color_shadow,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1,
        shadowOffset: { width: 0, height: 10 },
        backgroundColor: Color.white,
      },
      android: {
        elevation: 1,
        backgroundColor: Color.white,
      },
    }),
  },
  imageItemContent: {
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    alignSelf: 'flex-start',
  },
  textTitleMyContent: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.bold,
    color: Color.color_text_content,
    lineHeight: 23.8,
    width: '85%',
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
    marginLeft: 4,
    marginTop: 4,
  },
  boxInfo: {
    flex: 1,
  },
});
