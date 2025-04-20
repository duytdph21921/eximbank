"use strict";

// import 'core-js/stable/atob';
import { jwtDecode } from 'jwt-decode';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import { AuthContext } from '@store/context';
import { Color, getColor } from '@theme/colors';
import { updateAppColorAction, updateLoadingAction, updateShowDialogWarnAction, updateListMenuApp } from '@store/reducers/globalSlice';
import messaging from '@react-native-firebase/messaging';
import { login } from '@store/reducers/authSlice';
import { storage } from '@utils/storage';
import FooterLogin from "./component/FooterLogin.js";
import Header from "./component/Header.js";
import Remember from "./component/Remember.js";
import { getConfigColor, getConfigImageLogin, getByKey } from "../../services/authentication/systemsettings.api.js";
import { updateDevices } from "../../services/hr/hrprofiledevices.api.js";
import BottomSheetLanguage from "../../component/BottomSheetLanguage/index.js";
import { styles } from "./LoginScreen.style.js";

// LoginScreen.propTypes = {};

// LoginScreen.defaultProps = {};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PLACEHOLDER = {
  en: {
    userplaceholder: 'Enter account name',
    pwplaceholder: 'Enter password',
    touchIdText: 'Use your fingerprint to authenticate your identity',
    faceIdText: 'Use your face to authenticate your identity'
  },
  vn: {
    userplaceholder: 'Nhập tên tài khoản',
    pwplaceholder: 'Nhập mật khẩu',
    touchIdText: 'Sử dụng vân tay để xác thực danh tính của bạn',
    faceIdText: 'Sử dụng khuôn mặt để xác thực danh tính của bạn'
  }
};
const LoginScreen = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const languageLocal = useSelector(state => state.global.language);
  const userState = useSelector(state => state.auth.userState);
  const appColor = useSelector(state => state.global.appColor);
  const {
    signIn
  } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [password, setPassword] = useState('');
  const [usename, setUsername] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isRemember, setIsRemember] = useState(userState?.isRemember);
  const refPassword = useRef(null);
  const refUsename = useRef(null);
  const isMounteRef = useRef(false);
  // Check device isSupported Biomatric
  const [isSupportedFaceID, setIsSupportedFaceID] = useState(false);
  const [isSupportedTouchID, setIsSupportedTouchID] = useState(false);
  const [imageLogin, setImageLogin] = useState('');
  const navigateUserStack = data => {
    signIn(data);
  };

  /**
   * Get username & password được lưu trong Keychain.
   */
  const getRememberAccount = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && userState?.isRemember === Constant.IS_REMEMBER) {
        setUsername(credentials?.username);
        setPassword(credentials?.password);
      }
    } catch (error) {
      // TODO: handle catch
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    getRememberAccount();
    functGetConfigImageLogin();
    functGetConfigColor();
    TouchID.isSupported(optionalConfigObject).then(biometryType => {
      if (biometryType === 'FaceID') {
        setIsSupportedFaceID(true);
      } else if (biometryType === 'TouchID') {
        setIsSupportedTouchID(true);
      } else if (biometryType === true) {
        setIsSupportedTouchID(true);
      }
    }).catch(error => {});
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Lấy ảnh đại diện
   */
  const functGetConfigImageLogin = async () => {
    const response = await getConfigImageLogin();
    if (response?.status && response?.data) {
      setImageLogin(response?.data);
    }
  };
  /**
   * Lấy mã màu
   */
  const functGetConfigColor = async () => {
    const response = await getConfigColor();
    if (response?.status && response?.data) {
      let appColorBase = Color;
      appColorBase = response.data?.listColor?.reduce((acc, color) => {
        acc[color.id] = color.code;
        return acc;
      }, {});
      const jsonAppColor = JSON.stringify(appColorBase);
      storage.set(Constant.APP_COLOR, jsonAppColor);
      dispatch(updateAppColorAction(appColorBase));
      // set luon mau o day cho chac cu
      await getColor(appColorBase);
    }
  };
  /**
   * Check empty for field
   */
  function checkEmptyPassword() {
    return password !== '';
  }
  function checkEmptyUsename() {
    return usename !== '';
  }
  const funcUpdateDeviceUser = async () => {
    try {
      const fcmToken = await messaging().getToken();
      const modelUpdateDevice = {
        imei: '',
        deviceId: fcmToken
      };
      await updateDevices(modelUpdateDevice);
    } catch {
      // TODO: handle catch
    }
  };
  const onHandlerLogin = async params => {
    dispatch(updateLoadingAction(true));
    const response = await dispatch(login(params));
    if (login.fulfilled.match(response)) {
      if (!response?.payload) {
        dispatch(updateLoadingAction(false));
        return;
      }
      const decodedTokenUser = jwtDecode(response?.payload?.access_token);
      const dataUser = {
        signIn: true,
        userToken: response?.payload?.access_token,
        refreshToken: response?.payload?.refresh_token,
        isRemember,
        userData: {
          avatar: decodedTokenUser?.avatar ?? 'https://lh3.googleusercontent.com/a/ACg8ocKUzY_xk1NdDJkmksEh-NbEQC_Hfen-IFsjKcbIXroU=s96-c',
          email: decodedTokenUser?.email,
          name: decodedTokenUser?.displayname,
          userid: decodedTokenUser?.userid,
          sessionid: decodedTokenUser?.sessionid,
          issuperuser: decodedTokenUser?.issuperuser
        }
      };
      if (isRemember === Constant.IS_REMEMBER) {
        storage.set(Constant.REMEMBER_ACCOUNT, Constant.IS_REMEMBER);
        Keychain.setGenericPassword(usename, password).then(() => console.log('Password stored successfully')).catch(error => console.error('Error storing password:', error));
      } else {
        storage.set(Constant.REMEMBER_ACCOUNT, Constant.IS_NOT_REMEMBER);
        Keychain.resetInternetCredentials(usename, password).then(() => console.log('Password reset stored successfully')).catch(error => console.error('Error storing password:', error));
      }
      funcUpdateDeviceUser();
      getMenuApp();
      navigateUserStack(dataUser);
    }
  };
  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);
  const onPressRegister = useCallback(() => {
    navigation.navigate(Constant.REGISTER);
  }, []);
  /**
   * click show/hide pass word.
   */
  const showPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  /**
   * check biomatric
   */
  const optionalConfigObject = {
    unifiedErrors: false
    // passcodeFallback: true,
  };
  const showDialog = keyMess => {
    dispatch(updateShowDialogWarnAction({
      isShowModalWarn: true,
      isSigout: false,
      titleHeader: '',
      keyHeader: 'text-title-dialog-warn',
      keyMessage: keyMess,
      contentMessage: '',
      isShowCancel: false,
      isShowSubmit: false
    }));
  };
  const onHandelLoginBiometry = () => {
    let textNotifi = '';
    if (languageLocal === Constant.LANGUAGE_VN) {
      textNotifi = isSupportedFaceID ? PLACEHOLDER.vn.faceIdText : PLACEHOLDER.vn.touchIdText;
    } else {
      textNotifi = isSupportedFaceID ? PLACEHOLDER.en.faceIdText : PLACEHOLDER.en.touchIdText;
    }
    TouchID.authenticate(textNotifi, optionalConfigObject).then(async success => {
      if (success) {
        const fcmToken = await messaging().getToken();
        const params = {
          deviceId: fcmToken,
          usename: 'usename',
          password: 'password'
        };
        onHandlerLogin(params);
      } else {
        showDialog('text-check-faild-biometry');
      }
    }).catch(error => {
      let isError = false;
      if (error?.name === 'LAErrorTouchIDNotEnrolled' || error?.details?.name === 'LAErrorTouchIDNotEnrolled' || error?.name === 'RCTTouchIDUnknownError' || error?.details?.name === 'RCTTouchIDUnknownError') {
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

  /**
   * Chuyển tới màn quên mật khẩu.
   */
  const onPressForgetPass = () => {
    navigation.navigate(Constant.FORGET_PASSWORD_SCREEN);
  };
  const getMenuApp = async () => {
    const response = await getByKey('SETTINGS_SYSTEMSETTINGS_SERCURITY_CONFIG_MENU_APP');
    if (response?.status && response?.data) {
      // parse json ra
      const lstMenuApp = JSON.parse(response?.data?.value);
      if (lstMenuApp) {
        // Ghi vao redux de lay ra khong goi api nhieu lan
        dispatch(updateListMenuApp(lstMenuApp));
      }
    }
  };
  return /*#__PURE__*/_jsx(KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: isIOS && hasNotch() ? 0 : 10,
    behavior: isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/_jsxs(SafeAreaView, {
      style: styles.container,
      children: [/*#__PURE__*/_jsxs(ScrollView, {
        style: styles.scrollView,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/_jsx(Header, {
          imageLogin: imageLogin,
          onPressLanguage: () => {
            setIsOpenModal(true);
          }
        }), /*#__PURE__*/_jsx(CMTextInput, {
          placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.userplaceholder : PLACEHOLDER.en.userplaceholder,
          inputRef: refUsename,
          returnKeyType: "next",
          onSubmitEditing: () => refPassword.current.focus(),
          blurOnSubmit: false,
          onChangeText: usename => {
            setUsername(usename);
          },
          value: usename,
          textInputStyle: styles.textInputUser,
          containerStyle: styles.viewInput
        }), /*#__PURE__*/_jsx(CMTextInput, {
          isInputRequied: true,
          isPassWord: true,
          placeholder: languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.vn.pwplaceholder : PLACEHOLDER.en.pwplaceholder,
          inputRef: refPassword,
          returnKeyType: "next",
          onSubmitEditing: () => {
            const params = {
              usename,
              password
            };
            onHandlerLogin(params);
          },
          blurOnSubmit: false,
          onChangeText: password => {
            setPassword(password);
          },
          textInputStyle: styles.textInput,
          containerStyle: styles.viewInputPassword,
          value: password,
          secureTextEntry: secureTextEntry,
          onShowPassword: showPassword,
          textContentType: "none"
        }), /*#__PURE__*/_jsx(Remember, {
          onPressRemember: isRemember => {
            setIsRemember(isRemember);
          },
          diasbleRemember: !checkEmptyPassword() || !checkEmptyUsename(),
          onPressForgetPass: onPressForgetPass
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          style: [styles.btnLogin, {
            backgroundColor: checkEmptyPassword() && checkEmptyUsename() ? appColor?.base_color : Color.color_border
          }],
          disabled: !checkEmptyPassword() || !checkEmptyUsename(),
          onPress: () => {
            const params = {
              usename,
              password
            };
            onHandlerLogin(params);
          },
          children: /*#__PURE__*/_jsx(CMText, {
            i18nKey: "login-button",
            style: [styles.textBtnLogin, {
              color: checkEmptyPassword() && checkEmptyUsename() ? Color.white : Color.color_uncheck_answer
            }]
          })
        }), /*#__PURE__*/_jsx(FooterLogin, {
          onPressRegister: onPressRegister,
          isShowFaceID: isSupportedFaceID,
          isShowTouchID: isSupportedTouchID,
          onPressLoginBiometry: onHandelLoginBiometry
        })]
      }), /*#__PURE__*/_jsx(BottomSheetLanguage, {
        isOpenModal: isOpenModal,
        closeModal: handleCloseModal
      })]
    })
  });
};
export default /*#__PURE__*/React.memo(LoginScreen);
//# sourceMappingURL=LoginScreen.js.map