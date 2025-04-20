import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import IconUser from '@assets/icons/icon_user.svg';
import IconVN from '@assets/icons/icon_vn.svg';
import IconEN from '@assets/icons/icon_en.svg';
import IconDown from '@assets/icons/icon_down.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import ImageLogin from '@assets/icons/img_login.svg';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isTablet, screenWidth } from '@utils/platforms';
import FastImage from 'react-native-fast-image';
import { loadFile } from '@utils/helpers';

const Header = (props) => {
  const { onPressLanguage, imageLogin } = props;
  const languageLocal = useSelector((state) => state.global.language);
  /**
   * Xử lý click vào btn thay đổi ngôn ngữ.
   */
  const onHandleLanguage = () => {
    onPressLanguage();
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewUser}>
        <View style={styles.viewIconUser}>
          <CMText i18nKey="login-button" style={styles.textLogin} />
          <IconUser width={22} height={22} />
        </View>
        <TouchableDebounce
          style={styles.btnLanguage}
          onPress={onHandleLanguage}
        >
          {languageLocal === Constant.LANGUAGE_VN ? (
            <IconVN width={24} height={24} />
          ) : (
            <IconEN width={24} height={24} />
          )}
          <IconDown width={9.6} height={6.17} />
        </TouchableDebounce>
      </View>
      <CMText i18nKey="text-hello-user" style={styles.textHello} />

      <View>
        {imageLogin ? (
          <FastImage
            source={{ uri: loadFile(imageLogin) }}
            resizeMode="cover"
            style={styles.imageFileUpload}
          />
        ) : (
          <ImageLogin width={310} height={187} style={styles.viewImage} />
        )}
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
  viewUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewIconUser: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    paddingRight: horizontal(5),
  },
  textHello: {
    fontSize: 12,
    fontWeight: '400',
  },
  btnLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    width: isTablet ? horizontal(20) : horizontal(40),
    justifyContent: 'space-between',
  },
  viewImage: {
    alignItems: 'center',
    marginTop: vertical(50),
  },
  imageFileUpload: {
    height: 327,
    width: screenWidth - horizontal(15) * 2,
    marginTop: vertical(25),
  },
});
export default Header;
