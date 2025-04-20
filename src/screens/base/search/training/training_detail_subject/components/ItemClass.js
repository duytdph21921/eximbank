import React from 'react';
import { StyleSheet, View } from 'react-native';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconCalenda from '@assets/other/icon_calendar.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';

const WIDTH_ITEM = (screenWidth - horizontal(18 * 2) - horizontal(18 * 2)) / 2;

const ItemClass = (props) => {
  const { item, onHandleItemClick } = props;

  return (
    <TouchableDebounce style={styles.viewItemClass} onPress={() => onHandleItemClick(item)}>
      <CustomImage style={styles.imageItemClass} source={item?.avatar} />
      <CMText title={item?.title} style={styles.textTitleMyClass} numberOfLines={2} />
      <View style={styles.viewDateItem}>
        {(item?.startDate !== '' || item?.endDate !== '') && <IconCalenda width={16} height={16} />}
        <CMText
          title={`${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`}
          style={styles.textDateMyClass}
        />
      </View>
      <View style={styles.classTypeName}>
        <CMText style={styles.textClassTypeName} title={item?.classTypeName} />
      </View>
    </TouchableDebounce>
  );
};

const styles = StyleSheet.create({
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: 30,
    paddingHorizontal: 24,
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
    width: WIDTH_ITEM,
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

export default ItemClass;
