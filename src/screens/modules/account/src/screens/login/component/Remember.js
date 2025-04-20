import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';
import IconUnCheckBox from '@assets/icons/icon_uncheckbox.svg';
import Constant from '@utils/constants';
import { useSelector } from 'react-redux';
import IconCheckBox from '@assets/icons/icon_checkbox';

const Remember = (props) => {
  const { onPressRemember, diasbleRemember } = props;
  const userState = useSelector((state) => state.auth.userState);
  const [toggleCheckBox, setToggleCheckBox] = useState(userState?.isRemember);

  /**
   * Xử lí button checkbox.
   */
  const onHandleCheckbox = () => {
    setToggleCheckBox(!toggleCheckBox);
    onPressRemember(!toggleCheckBox);
  };
  return (
    <View style={styles.container}>
      <TouchableDebounce
        style={styles.viewCheckbox}
        onPress={onHandleCheckbox}
        disabled={diasbleRemember}
      >
        {toggleCheckBox === Constant.IS_REMEMBER ? (
          <IconCheckBox width={22} height={22} />
        ) : (
          <IconUnCheckBox width={22} height={22} />
        )}
        <CMText
          i18nKey="text-remember-account"
          style={[
            styles.textRememer,
            {
              marginHorizontal: horizontal(5),
            },
          ]}
        />
      </TouchableDebounce>
      {/* <TouchableDebounce onPress={onPressForgetPass}>
        <CMText i18nKey={"text-forgot-password"} style={styles.textRememer} />
      </TouchableDebounce> */}
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
    marginVertical: vertical(10),
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRememer: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: Color.text_color_hover,
  },
});
export default React.memo(Remember);
