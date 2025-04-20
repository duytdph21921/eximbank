import React from 'react';
import { StyleSheet, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { isTablet } from '@utils/platforms';

const ViewSeeAll = (props) => {
  const { i18nKey, onPressSeeAll, isSee = true } = props;

  const onHandleSeeAll = () => {
    onPressSeeAll();
  };

  return (
    <View style={styles.viewTitle}>
      <CMText i18nKey={i18nKey} style={styles.textMyClass} />
      {isSee && (
        <TouchableDebounce onPress={onHandleSeeAll}>
          <CMText
            i18nKey="text-title-show-all"
            style={[
              styles.textSeeAll,
              {
                color: Color.base_color,
              },
            ]}
          />
        </TouchableDebounce>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontal(20),
    paddingVertical: vertical(5),
  },
  textMyClass: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: '700',
    color: Color.text_color,
    lineHeight: isTablet ? 22 : 20,
  },
  textSeeAll: {
    fontSize: isTablet ? 12 : 10,
    fontWeight: '400',
    color: Color.base_color,
  },
});

export default ViewSeeAll;
