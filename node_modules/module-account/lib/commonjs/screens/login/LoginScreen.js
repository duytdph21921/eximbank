"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jwtDecode = require("jwt-decode");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var Keychain = _interopRequireWildcard(require("react-native-keychain"));
var _reactNativeTouchId = _interopRequireDefault(require("react-native-touch-id"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _context = require("@store/context");
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _messaging = _interopRequireDefault(require("@react-native-firebase/messaging"));
var _authSlice = require("@store/reducers/authSlice");
var _storage = require("@utils/storage");
var _FooterLogin = _interopRequireDefault(require("./component/FooterLogin.js"));
var _Header = _interopRequireDefault(require("./component/Header.js"));
var _Remember = _interopRequireDefault(require("./component/Remember.js"));
var _systemsettingsApi = require("../../services/authentication/systemsettings.api.js");
var _hrprofiledevicesApi = require("../../services/hr/hrprofiledevices.api.js");
var _index = _interopRequireDefault(require("../../component/BottomSheetLanguage/index.js"));
var _LoginScreenStyle = require("./LoginScreen.style.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import 'core-js/stable/atob';

// LoginScreen.propTypes = {};

// LoginScreen.defaultProps = {};
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
  const dispatch = (0, _reactRedux.useDispatch)();
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const userState = (0, _reactRedux.useSelector)(state => state.auth.userState);
  const appColor = (0, _reactRedux.useSelector)(state => state.global.appColor);
  const {
    signIn
  } = (0, _react.useContext)(_context.AuthContext);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [password, setPassword] = (0, _react.useState)('');
  const [usename, setUsername] = (0, _react.useState)('');
  const [secureTextEntry, setSecureTextEntry] = (0, _react.useState)(true);
  const [isRemember, setIsRemember] = (0, _react.useState)(userState?.isRemember);
  const refPassword = (0, _react.useRef)(null);
  const refUsename = (0, _react.useRef)(null);
  const isMounteRef = (0, _react.useRef)(false);
  // Check device isSupported Biomatric
  const [isSupportedFaceID, setIsSupportedFaceID] = (0, _react.useState)(false);
  const [isSupportedTouchID, setIsSupportedTouchID] = (0, _react.useState)(false);
  const [imageLogin, setImageLogin] = (0, _react.useState)('');
  const navigateUserStack = data => {
    signIn(data);
  };

  /**
   * Get username & password được lưu trong Keychain.
   */
  const getRememberAccount = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && userState?.isRemember === _constants.default.IS_REMEMBER) {
        setUsername(credentials?.username);
        setPassword(credentials?.password);
      }
    } catch (error) {
      // TODO: handle catch
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    getRememberAccount();
    functGetConfigImageLogin();
    functGetConfigColor();
    _reactNativeTouchId.default.isSupported(optionalConfigObject).then(biometryType => {
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
    const response = await (0, _systemsettingsApi.getConfigImageLogin)();
    if (response?.status && response?.data) {
      setImageLogin(response?.data);
    }
  };
  /**
   * Lấy mã màu
   */
  const functGetConfigColor = async () => {
    const response = await (0, _systemsettingsApi.getConfigColor)();
    if (response?.status && response?.data) {
      let appColorBase = _colors.Color;
      appColorBase = response.data?.listColor?.reduce((acc, color) => {
        acc[color.id] = color.code;
        return acc;
      }, {});
      const jsonAppColor = JSON.stringify(appColorBase);
      _storage.storage.set(_constants.default.APP_COLOR, jsonAppColor);
      dispatch((0, _globalSlice.updateAppColorAction)(appColorBase));
      // set luon mau o day cho chac cu
      await (0, _colors.getColor)(appColorBase);
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
      const fcmToken = await (0, _messaging.default)().getToken();
      const modelUpdateDevice = {
        imei: '',
        deviceId: fcmToken
      };
      await (0, _hrprofiledevicesApi.updateDevices)(modelUpdateDevice);
    } catch {
      // TODO: handle catch
    }
  };
  const onHandlerLogin = async params => {
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    const response = await dispatch((0, _authSlice.login)(params));
    if (_authSlice.login.fulfilled.match(response)) {
      if (!response?.payload) {
        dispatch((0, _globalSlice.updateLoadingAction)(false));
        return;
      }
      const decodedTokenUser = (0, _jwtDecode.jwtDecode)(response?.payload?.access_token);
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
      if (isRemember === _constants.default.IS_REMEMBER) {
        _storage.storage.set(_constants.default.REMEMBER_ACCOUNT, _constants.default.IS_REMEMBER);
        Keychain.setGenericPassword(usename, password).then(() => console.log('Password stored successfully')).catch(error => console.error('Error storing password:', error));
      } else {
        _storage.storage.set(_constants.default.REMEMBER_ACCOUNT, _constants.default.IS_NOT_REMEMBER);
        Keychain.resetInternetCredentials(usename, password).then(() => console.log('Password reset stored successfully')).catch(error => console.error('Error storing password:', error));
      }
      funcUpdateDeviceUser();
      getMenuApp();
      navigateUserStack(dataUser);
    }
  };
  const handleCloseModal = (0, _react.useCallback)(() => {
    setIsOpenModal(false);
  }, []);
  const onPressRegister = (0, _react.useCallback)(() => {
    navigation.navigate(_constants.default.REGISTER);
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
    dispatch((0, _globalSlice.updateShowDialogWarnAction)({
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
    if (languageLocal === _constants.default.LANGUAGE_VN) {
      textNotifi = isSupportedFaceID ? PLACEHOLDER.vn.faceIdText : PLACEHOLDER.vn.touchIdText;
    } else {
      textNotifi = isSupportedFaceID ? PLACEHOLDER.en.faceIdText : PLACEHOLDER.en.touchIdText;
    }
    _reactNativeTouchId.default.authenticate(textNotifi, optionalConfigObject).then(async success => {
      if (success) {
        const fcmToken = await (0, _messaging.default)().getToken();
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
        if (_platforms.isIOS) {
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
    navigation.navigate(_constants.default.FORGET_PASSWORD_SCREEN);
  };
  const getMenuApp = async () => {
    const response = await (0, _systemsettingsApi.getByKey)('SETTINGS_SYSTEMSETTINGS_SERCURITY_CONFIG_MENU_APP');
    if (response?.status && response?.data) {
      // parse json ra
      const lstMenuApp = JSON.parse(response?.data?.value);
      if (lstMenuApp) {
        // Ghi vao redux de lay ra khong goi api nhieu lan
        dispatch((0, _globalSlice.updateListMenuApp)(lstMenuApp));
      }
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _LoginScreenStyle.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: _LoginScreenStyle.styles.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        style: _LoginScreenStyle.styles.scrollView,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
          imageLogin: imageLogin,
          onPressLanguage: () => {
            setIsOpenModal(true);
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
          placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.userplaceholder : PLACEHOLDER.en.userplaceholder,
          inputRef: refUsename,
          returnKeyType: "next",
          onSubmitEditing: () => refPassword.current.focus(),
          blurOnSubmit: false,
          onChangeText: usename => {
            setUsername(usename);
          },
          value: usename,
          textInputStyle: _LoginScreenStyle.styles.textInputUser,
          containerStyle: _LoginScreenStyle.styles.viewInput
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
          isInputRequied: true,
          isPassWord: true,
          placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.pwplaceholder : PLACEHOLDER.en.pwplaceholder,
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
          textInputStyle: _LoginScreenStyle.styles.textInput,
          containerStyle: _LoginScreenStyle.styles.viewInputPassword,
          value: password,
          secureTextEntry: secureTextEntry,
          onShowPassword: showPassword,
          textContentType: "none"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Remember.default, {
          onPressRemember: isRemember => {
            setIsRemember(isRemember);
          },
          diasbleRemember: !checkEmptyPassword() || !checkEmptyUsename(),
          onPressForgetPass: onPressForgetPass
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: [_LoginScreenStyle.styles.btnLogin, {
            backgroundColor: checkEmptyPassword() && checkEmptyUsename() ? appColor?.base_color : _colors.Color.color_border
          }],
          disabled: !checkEmptyPassword() || !checkEmptyUsename(),
          onPress: () => {
            const params = {
              usename,
              password
            };
            onHandlerLogin(params);
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "login-button",
            style: [_LoginScreenStyle.styles.textBtnLogin, {
              color: checkEmptyPassword() && checkEmptyUsename() ? _colors.Color.white : _colors.Color.color_uncheck_answer
            }]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FooterLogin.default, {
          onPressRegister: onPressRegister,
          isShowFaceID: isSupportedFaceID,
          isShowTouchID: isSupportedTouchID,
          onPressLoginBiometry: onHandelLoginBiometry
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        isOpenModal: isOpenModal,
        closeModal: handleCloseModal
      })]
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(LoginScreen);
//# sourceMappingURL=LoginScreen.js.map