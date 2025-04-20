import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconFilter from '@assets/icons/icon_filter.svg';
import { Color } from '@theme/colors';
import { horizontal } from '@utils/scales';

const RenderHeaderList = (props) => {
  const { onPressFilter, totalRecord } = props;
  return (
    <View style={styles.viewHeader}>
      <View style={styles.viewTextTitle}>
        <CMText i18nKey="text-title-list-test" style={styles.textCountExam} />
        <CMText
          title={` (${totalRecord ?? 0})`}
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

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTextTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCountExam: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2,
  },
  contentContainerStyle: {
    paddingHorizontal: horizontal(20),
  },
});
export default RenderHeaderList;
