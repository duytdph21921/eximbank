import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { textSize, vertical } from '@utils/scales';
import { Color } from '@theme/colors';

/**
 *
 * @param {*} i18keyContext : key của text content.
 * @param {*} i18KeyDelete : key của button delete.
 * @param {*} type : check fontSize của text title.
 * @returns
 */
const RenderViewTitle = (props) => {
  const { i18keyContext, i18KeyDelete, type, onDeleteAction } = props;

  const onHandleDelete = () => {
    onDeleteAction(i18keyContext);
  };

  return (
    <View style={styles.viewHeader}>
      <CMText
        i18nKey={i18keyContext}
        style={[
          styles.textTitle,
          {
            fontSize: type === 1 ? textSize(20) : textSize(18),
          },
        ]}
      />
      <TouchableDebounce onPress={onHandleDelete}>
        <CMText
          i18nKey={i18KeyDelete}
          style={[
            styles.textDelete,
            {
              color: Color.base_color,
            },
          ]}
        />
      </TouchableDebounce>
    </View>
  );
};

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vertical(14),
    paddingHorizontal: vertical(14),
  },
  textTitle: {
    fontSize: 20,
    color: Color.text_color,
    fontWeight: '700',
    lineHeight: 28,
  },
  textDelete: {
    fontWeight: '400',
    color: Color.base_color,
    fontSize: textSize(12),
  },
});
export default RenderViewTitle;
