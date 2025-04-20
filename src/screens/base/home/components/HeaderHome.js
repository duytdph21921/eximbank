import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconMenu from '@assets/icons/icon_menu.svg';
import IconScanQR from '@assets/icons/icon_scan_qr.svg';
import IconNoti from '@assets/icons/icon_notifi.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { screenWidth } from '@utils/platforms';
import { horizontal } from '@utils/scales';
import { Color } from '@theme/colors';
import { useSelector } from 'react-redux';
import fonts from '@assets/value/fonts';

const HeaderHome = (props) => {
  const { onPressProfile, onPressQRCode, onPressNotification, notificationUnRead } = props;
  const { userData } = useSelector((state) => state.auth.userState);

  return (
    <View style={styles.container}>
      <View style={styles.viewMenu}>
        <TouchableDebounce onPress={onPressProfile}>
          <IconMenu width={24} height={24} />
        </TouchableDebounce>
        <CMText i18nKey="text-hello" style={styles.textHello} />
        <CMText title={userData?.name} style={styles.textUser} />
      </View>
      <View style={styles.viewScan}>
        <TouchableDebounce style={styles.btnScanQR} onPress={onPressQRCode}>
          <IconScanQR width={24} height={24} />
        </TouchableDebounce>
        <TouchableDebounce onPress={onPressNotification} style={styles.btnNoti}>
          <IconNoti width={24} height={24} />
          {notificationUnRead > 0 && (
            // <IconHasNotification
            //   width={8}
            //   height={8}
            //   style={{ position: "absolute", top: 0, right: 2 }}
            // />
            <View style={styles.unReadNoti}>
              <CMText
                style={styles.textNumNotificationNotRead}
                title={notificationUnRead < 9 ? notificationUnRead.toString() : '9+'}
              />
            </View>
          )}
        </TouchableDebounce>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingHorizontal: horizontal(15),
  },
  viewMenu: {
    flexDirection: 'row',
  },
  viewScan: {
    flexDirection: 'row',
  },
  textHello: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 23.8,
    marginLeft: horizontal(5),
  },
  textUser: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.text_color,
    lineHeight: 23.8,
  },
  btnScanQR: {
    marginHorizontal: horizontal(10),
  },
  btnNoti: {
    position: 'relative',
  },
  unReadNoti: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Color.red,
    borderRadius: 16,
    width: 20,
  },
  textNumNotificationNotRead: {
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 12,
    verticalAlign: 'middle',
  },
});

export default HeaderHome;
