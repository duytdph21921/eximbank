import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconFaceID from '@assets/icons/icon_faceid.svg';
import IconFinger from '@assets/icons/icon_finger.svg';
import IconOffWifi from '@assets/icons/icon_wifi_off.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';

const FooterLogin = (props) => {
  const { isShowFaceID, isShowTouchID, onPressLoginBiometry, onPressRegister } =
    props;
  const listFooter = [
    {
      id: 1,
      title: 'text-face-id',
      icon: <IconFaceID width={24} height={24} />,
      isShow: isShowFaceID,
    },
    {
      id: 2,
      title: 'text-finger',
      icon: <IconFinger width={24} height={24} />,
      isShow: isShowTouchID,
    },
    {
      id: 3,
      title: 'text-wifi-off',
      icon: <IconOffWifi width={24} height={24} />,
      isShow: true,
    },
  ];
  const itemFooter = (item) => (
    <View key={item.id}>
      {item?.isShow && item?.id !== 3 && (
        <TouchableDebounce
          style={styles.btnFooter}
          onPress={onPressLoginBiometry}
        >
          {item.icon}
          <CMText i18nKey={item?.title} style={styles.textFooter} />
        </TouchableDebounce>
      )}
      {item?.isShow && item?.id === 3 && (
        <TouchableDebounce style={styles.btnFooter}>
          {item.icon}
          <CMText i18nKey={item?.title} style={styles.textFooter} />
        </TouchableDebounce>
      )}
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        {listFooter.map((item) => itemFooter(item))}
      </View>
      <View style={styles.viewNotAcount}>
        <CMText i18nKey="text-do-not-account" style={styles.textNotAccount} />
        <TouchableDebounce onPress={onPressRegister}>
          <CMText
            i18nKey="sigup-button"
            style={[
              styles.textRegister,
              {
                color: Color.base_color,
              },
            ]}
          />
        </TouchableDebounce>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: horizontal(15),
    marginTop: vertical(15),
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
    marginTop: vertical(10),
  },
  viewNotAcount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vertical(20),
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

export default FooterLogin;
