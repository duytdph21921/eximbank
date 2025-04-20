import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconCheckBox from '@assets/icons/icon_checkbox';
import IconUnCheckBox from '@assets/icons/icon_uncheckbox.svg';
import IconCheckResult from '@assets/icons/icon_check_result.svg';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';

/**
 * Render item select.
 * @param {*} props
 * @returns
 */
const ItemCheckbox = (props) => {
  const { selected, titleContent, isDisable, onHandleSelect } = props;
  return (
    <TouchableDebounce
      activeOpacity={1}
      style={styles.container}
      disabled={isDisable}
      onPress={onHandleSelect}
    >
      <View style={styles.viewDots}>
        {selected &&
          (isDisable ? (
            <IconCheckResult width={24} height={24} />
          ) : (
            <IconCheckBox width={24} height={24} />
          ))}
        {!selected && <IconUnCheckBox width={24} height={24} />}
      </View>
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
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color,
    paddingHorizontal: horizontal(15),
  },
  viewDots: {
    width: 24,
    height: 24,
  },
});

export default ItemCheckbox;
