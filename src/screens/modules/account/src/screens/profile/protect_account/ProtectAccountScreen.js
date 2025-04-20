import React, {
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import globalStyles from '@theme/globalStyles';
import CMText from '@components/CMText';
import fonts from '@assets/value/fonts';
import { horizontal, vertical } from '@utils/scales';
import BackHeader from '@components/BackHeader';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import TouchID from 'react-native-touch-id';
import { Color } from '@theme/colors';
import { isIOS, screenHeight } from '@utils/platforms';
import messaging from '@react-native-firebase/messaging';
import { Switch } from 'react-native-switch';
import {
  getSettingBiometric,
  updateBiometricUser,
} from '../../../services/authentication/authenticationusers.api';

const ProtectAccountScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const [dataFingerPrint, setDataFingerPrint] = useState();
  const onBack = () => {
    navigation.goBack();
  };

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText i18nKey="text-security-account" style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const funcGetSettingBiometric = async (deviceId) => {
    const fcmToken = await messaging().getToken();
    const response = await getSettingBiometric(fcmToken);
    if (response?.status && isMounteRef.current) {
      setDataFingerPrint(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    funcGetSettingBiometric();
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const showDialog = (keyMess) => {
    dispatch(
      updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-title-dialog-warn',
        keyMessage: keyMess,
        contentMessage: '',
        isShowCancel: false,
        isShowSubmit: false,
      })
    );
  };

  const onPressSwitch = () => {
    const textNotifi = '';
    TouchID.authenticate(textNotifi, optionalConfigObject)
      .then((success) => {
        if (success) {
          updateBiometric(!dataFingerPrint);
        }
      })
      .catch((error) => {
        let isError = false;
        if (
          error?.name === 'LAErrorTouchIDNotEnrolled' ||
          error?.details?.name === 'LAErrorTouchIDNotEnrolled' ||
          error?.name === 'RCTTouchIDUnknownError' ||
          error?.details?.name === 'RCTTouchIDUnknownError'
        ) {
          isError = true;
        }
        if (isError) {
          if (isIOS) {
            showDialog('RCTTouchIDUnknownError');
          } else {
            showDialog('LAErrorTouchIDNotEnrolled');
          }
        } else {
          showDialog('text-check-faild-biometry');
        }
      });
  };

  const optionalConfigObject = {
    unifiedErrors: false,
    passcodeFallback: false,
  };
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return true;
    }
    return false;
  };
  const updateBiometric = async (isBiometric) => {
    const hasPermission = await requestUserPermission();
    if (hasPermission) {
      // Dang ky ung dung truoc khi goij
      const fcmToken = await messaging().getToken();
      const response = await updateBiometricUser(isBiometric, fcmToken);
      if (response?.status) {
        setDataFingerPrint(isBiometric);
      } else {
        setDataFingerPrint(!isBiometric);
      }
    }
  };

  return (
    <SafeAreaView style={styles.containerAll}>
      <View style={styles.boxInfomation}>
        <View style={styles.boxItem}>
          <View style={styles.container}>
            <CMText
              style={styles.textContext}
              i18nKey="text-authentication-biometric"
            />
            <Switch
              value={dataFingerPrint}
              onValueChange={onPressSwitch}
              disabled={false}
              // activeText={'On'}
              // inActiveText={'Off'}
              circleSize={28}
              barHeight={28}
              circleBorderWidth={1}
              backgroundActive={Color.base_color}
              backgroundInactive={Color.color_width_featured_class}
              circleActiveColor={Color.white}
              circleInActiveColor={Color.white}
              // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
              // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={styles.circleStyle} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={styles.containerStyle} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={1.8} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={28} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ProtectAccountScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: vertical(10),
  },
  containerStyle: {
    width: 44,
    height: 28,
    borderRadius: 22,
    padding: 2,
  },
  circleStyle: {
    borderColor: Color.color_width_featured_class,
  },
  boxHeader: {
    marginTop: vertical(24),
    marginBottom: vertical(5),
    paddingHorizontal: horizontal(24),
  },
  titleHeader: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 25.2,
    textTransform: 'uppercase',
  },
  boxItem: {
    paddingHorizontal: horizontal(24),
    marginTop: vertical(24),
  },
  textContext: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 25.2,
  },
  containerAll: {
    backgroundColor: Color.white,
    height: screenHeight,
  },
});
