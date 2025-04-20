import React from 'react';
import { StyleSheet, View } from 'react-native';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import IconCalenda from '@assets/other/icon_calendar.svg';
import IconSubject from '@assets/other/icon_subject.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';

const IMAGE_WIDTH = (screenWidth - horizontal(24 * 2) - horizontal(20)) / 2;
const IMAGE_HEIGHT = (IMAGE_WIDTH * 154) / 216;

const RenderItemTraining = (props) => {
  const { item, index, goToTrainingDetail } = props;
  return (
    <TouchableDebounce
      style={styles.viewItemClass}
      onPress={() => goToTrainingDetail(item)}
      key={index}
    >
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
        <IconSubject width={16} height={16} />
        <CMText
          style={[
            styles.textClassTypeName,
            {
              paddingHorizontal: 5,
            },
          ]}
          title={`${item?.numSubject} `}
        >
          <CMText style={styles.textClassTypeName} i18nKey="text-subject" />
        </CMText>
      </View>
    </TouchableDebounce>
  );
};

const styles = StyleSheet.create({
  viewItemClass: {
    width: IMAGE_WIDTH,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: vertical(15),
    marginRight: horizontal(20),
    paddingHorizontal: horizontal(24),
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
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
    width: IMAGE_WIDTH,
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

export default RenderItemTraining;
