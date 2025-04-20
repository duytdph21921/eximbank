import React from 'react';
import { StyleSheet, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';

const FooterRegister = (props) => {
  const { onPressLogIn } = props;

  return (
    <View style={styles.viewNotAcount}>
      <CMText i18nKey="text-do-have-account" style={styles.textNotAccount} />
      <TouchableDebounce onPress={onPressLogIn}>
        <CMText
          i18nKey="login-button"
          style={[
            styles.textRegister,
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
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontal(15),
  },
  btnFooter: {
    borderWidth: 1,
    borderColor: Color.color_border,
    borderRadius: 8,
    height: vertical(72),
    width: horizontal(98),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFooter: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.black,
    marginTop: vertical(5),
  },
  viewNotAcount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vertical(40),
    marginTop: vertical(15),
  },
  textNotAccount: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color_hover,
  },
  textRegister: {
    color: Color.base_color,
    fontSize: 14,
    fontWeight: '700',
  },
});
export default FooterRegister;
