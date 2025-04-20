import { StyleSheet } from 'react-native';
import { Color } from '@theme/colors';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';

const WIDTH_ITEM = (screenWidth - horizontal(18 * 2) - horizontal(18 * 2)) / 2;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  contentContainerStyle: {
    backgroundColor: Color.white,
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: 30,
  },
  imageItemClass: {
    height: 106,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  textTitleMyClass: {
    fontSize: 12,
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
  },
  classTypeName: {
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(4),
    backgroundColor: Color.color_width_featured_class,
    marginTop: vertical(8),
    alignSelf: 'flex-start',
  },
  textClassTypeName: {
    fontFamily: fonts.semi,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
  },
});
