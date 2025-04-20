/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconFilter from '@assets/icons/icon_filter.svg';
import { Color } from '@theme/colors';
import { styles } from '../MyTestScreen.styles';

const RenderHeaderList = (props) => {
  const { onPressFilter, totalRecord } = props;
  return (
    <View style={styles.viewHeader}>
      <View style={styles.viewTextTitle}>
        <CMText i18nKey="text-title-list-test" style={styles.textCountExam} />
        <CMText
          title={` (${totalRecord})`}
          style={[
            styles.textCountExam,
            {
              color: Color.text_color_hover,
            },
          ]}
        />
      </View>
      <TouchableDebounce onPress={onPressFilter}>
        <IconFilter width={24} height={24} />
      </TouchableDebounce>
    </View>
  );
};

export default RenderHeaderList;
