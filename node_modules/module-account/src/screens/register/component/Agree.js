import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import IconCheckBox from '@assets/icons/icon_checkbox';
import IconUnCheckBox from '@assets/icons/icon_uncheckbox.svg';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';

const Agree = (props) => {
  const { onPressAgree, isAgree, onPolicyDetail } = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(isAgree);

  /**
   * Xử lí button checkbox.
   */
  const onHandleCheckboxAgree = () => {
    onPressAgree(!toggleCheckBox);
    setToggleCheckBox(!toggleCheckBox);
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewCheckbox}>
        <TouchableDebounce
          onPress={() => {
            onHandleCheckboxAgree();
          }}
        >
          {toggleCheckBox ? (
            <IconCheckBox width={22} height={22} />
          ) : (
            <IconUnCheckBox width={22} height={22} />
          )}
        </TouchableDebounce>
        <CMText i18nKey="signup-agree-text" style={styles.textAgree} />
        <TouchableDebounce onPress={onPolicyDetail}>
          <CMText i18nKey="signup-terms-of-use-text" style={styles.textTerms} />
        </TouchableDebounce>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontal(20),
    marginVertical: vertical(15),
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAgree: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.4,
    color: Color.text_color_hover,
    marginLeft: horizontal(5),
  },
  textTerms: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22.4,
    color: Color.text_color_hover,
    marginHorizontal: horizontal(5),
  },
});
export default Agree;
