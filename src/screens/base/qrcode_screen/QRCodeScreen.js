import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IconCancel from '@assets/icons/icon_cancel_white.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import IconRadius from '@assets/icons/icon_radius';
import { enviroment } from '@assets/enviroment/enviroment.default';
import { frUserCheckinQRCode } from '@services/lms/lmsclass.api';
import { useDispatch } from 'react-redux';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { styles } from './QRCodeScreen.styles';

const QRCodeScreen = (props) => {
  const { navigation } = props;
  const [scanned, setScanned] = useState();
  const dispatch = useDispatch();
  const handleBarCodeScanned = async ({ data }) => {
    const domain = enviroment.apiDomain.doMainApp;
    setScanned(true);
    if (data && data.indexOf(domain) !== -1 && data.indexOf('checkin') !== -1) {
      const splitData = data.split('=');
      if (splitData && splitData.length > 1) {
        const code = splitData[1];
        if (code) {
          const response = await frUserCheckinQRCode(code);
          if (response?.status && response?.data) {
            let keyNofify = 'text-warning';
            if (response?.status) {
              keyNofify = 'text-notification';
            }
            dispatch(
              updateShowDialogWarnAction({
                isShowModalWarn: true,
                isSigout: false,
                titleHeader: '',
                keyHeader: keyNofify,
                keyMessage: '',
                contentMessage: response?.data,
                isShowSubmit: false,
                isShowCancel: true,
                keyCancel: 'text-button-submit',
              }),
            );
            navigation.goBack();
          }
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        captureAudio={false}
      >
        <View style={styles.layerTop}>
          <TouchableDebounce
            style={styles.btnCancel}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconCancel width={30} height={30} />
          </TouchableDebounce>
        </View>
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused}>
            <View style={styles.cornerTopLeft}>
              <IconRadius rotation={0} width={40} height={40} />
            </View>
            <View style={styles.cornerTopRight}>
              <IconRadius rotation={90} width={40} height={40} />
            </View>
            <View style={styles.cornerBottomRight}>
              <IconRadius rotation={180} width={40} height={40} />
            </View>
            <View style={styles.cornerBottomLeft}>
              <IconRadius rotation={270} width={40} height={40} />
            </View>
          </View>
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom}>
          <CMText i18nKey="text-title-qr-code" style={styles.textTitle} />
        </View>
      </RNCamera>
    </SafeAreaView>
  );
};

export default QRCodeScreen;
