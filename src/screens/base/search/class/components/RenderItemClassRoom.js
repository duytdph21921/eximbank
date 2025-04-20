import React from 'react';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { View } from 'react-native';
import IconCalenda from '@assets/other/icon_calendar.svg';
import CustomImage from '@components/CustomImage';
import { styles } from '../Class.style';

const RenderItemClassRoom = (props) => {
  const { item, index, goToClassDetail } = props;
  return (
    <TouchableDebounce
      style={styles.viewItemClass}
      onPress={() => goToClassDetail(item)}
      key={index}
    >
      <CustomImage style={styles.imageItemClass} source={item?.avatar} />
      <CMText title={item?.title} style={styles.textTitleMyClass} numberOfLines={2} />
      <View style={styles.viewDateItem}>
        {(item?.startDate !== '' || item?.endDate !== '') && <IconCalenda width={16} height={16} />}
        <CMText
          title={`${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`}
          style={styles.textDateMyClass}
          numberOfLines={1}
        />
      </View>
      <View style={styles.classTypeName}>
        <CMText style={styles.textClassTypeName} title={item?.classTypeName} />
      </View>
    </TouchableDebounce>
  );
};

export default RenderItemClassRoom;
