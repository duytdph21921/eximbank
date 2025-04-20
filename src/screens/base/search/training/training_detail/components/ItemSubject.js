import React from 'react';
import TouchableDebounce from '@components/TouchableDebounce';
import { StyleSheet, View } from 'react-native';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import IconCalenda from '@assets/other/icon_calendar.svg';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import IconClock from '@assets/icons/icon_clock.svg';
import CustomImage from '@components/CustomImage';

const WIDTH_ITEM = (screenWidth - horizontal(18 * 2) - horizontal(18 * 2)) / 2;

const ItemSubject = (props) => {
  const { item, onHandleItemClick } = props;
  return (
    <TouchableDebounce style={styles.viewItemClass} onPress={() => onHandleItemClick(item)}>
      <CustomImage style={styles.imageItemClass} source={item?.avatar} />
      <CMText title={item?.title} style={styles.textTitleMyClass} numberOfLines={2} />
      <View style={styles.viewDateItem}>
        <IconCalenda width={16} height={16} />
        <CMText i18nKey="text-title-type-subject" style={styles.textDateMyClass}>
          <CMText title={` ${item.fieldName ?? ''}`} style={styles.textDateMyClass} />
        </CMText>
      </View>
      <View style={styles.classTypeName}>
        <IconClock width={16} height={16} />
        <CMText
          style={[
            styles.textClassTypeName,
            {
              paddingHorizontal: 5,
            },
          ]}
          title={`${item?.duration} `}
        >
          <CMText style={styles.textClassTypeName} i18nKey="text-time-subject" />
        </CMText>
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
    paddingVertical: vertical(4),
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  textClassTypeName: {
    fontFamily: fonts.semi,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default ItemSubject;
