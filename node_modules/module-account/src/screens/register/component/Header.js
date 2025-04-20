import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconBackLogIn from '@assets/icons/icon_back_login.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import CMText from '@components/CMText';

const Header = (props) => {
  const { onPressReturnLogin } = props;
  /**
   * Xử lý click vào btn quay lại trang đăng nhập.
   */
  const onHandleReturnLogin = () => {
    onPressReturnLogin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnReturn}>
        <TouchableDebounce
          style={styles.btnLanguage}
          onPress={onPressReturnLogin}
        >
          <IconBackLogIn width={44} height={44} />
        </TouchableDebounce>
      </View>
      <View style={styles.textHeaderRegister}>
        <CMText i18nKey="sigup-text-header" style={styles.textLogin} />
        <CMText i18nKey="sigup-text-header-info" style={styles.textHello} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginHorizontal: horizontal(15),
  },
  textLogin: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    paddingRight: horizontal(5),
  },
  textHello: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    color: Color.text_color_hover,
    marginTop: vertical(5),
  },
  btnReturn: {
    marginBottom: horizontal(24),
  },
  textHeaderRegister: {
    marginBottom: horizontal(24),
  },
});
export default Header;
