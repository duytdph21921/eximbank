import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';

/**
 * Render item select.
 * @param {*} props
 * @returns
 */
const ItemSelect = (props) => {
  const { selected, titleContent, isDisable, onHandleSelect } = props;
  const getBorderColor = () => {
    if (selected) {
      return isDisable ? Color.color_border_answer : Color.base_color;
    }
    return Color.color_uncheck;
  };
  return (
    <TouchableDebounce
      activeOpacity={1}
      style={styles.container}
      onPress={onHandleSelect}
      disabled={isDisable}
    >
      <View
        style={[
          styles.viewDots,
          {
            borderWidth: selected ? 7 : 1,
            borderColor: getBorderColor(),
          },
        ]}
      />
      <CMText title={titleContent} style={styles.textContent} />
    </TouchableDebounce>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: vertical(15),
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    borderRadius: 20,
    padding: horizontal(15),
  },
  viewDots: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    backgroundColor: Color.white,
    alignContent: 'center',
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color,
    paddingHorizontal: horizontal(15),
  },
});

export default ItemSelect;
