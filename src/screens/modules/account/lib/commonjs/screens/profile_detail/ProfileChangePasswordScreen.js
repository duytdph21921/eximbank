"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _DialogWarnCustom = _interopRequireDefault(require("@components/DialogWarnCustom"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _reactNativeDeviceInfo = require("react-native-device-info");
var _authSlice = require("@store/reducers/authSlice");
var _storage = require("@utils/storage");
var _authenticationusersApi = require("../../services/authentication/authenticationusers.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */

const ProfileChangePasswordScreen = props => {
  const {
    navigation
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [oldPass, setOldPass] = (0, _react.useState)('');
  const [newPass, setNewPass] = (0, _react.useState)('');
  const [confirmPass, setConfirmPass] = (0, _react.useState)('');
  const refOldPass = (0, _react.useRef)(null);
  const refNewPass = (0, _react.useRef)(null);
  const refConfirmNewPass = (0, _react.useRef)(null);
  const [secureOldPass, setSecureOldPass] = (0, _react.useState)(true);
  const [secureNewPass, setSecureNewPass] = (0, _react.useState)(true);
  const [secureConfirmPass, setSecureConfirmPass] = (0, _react.useState)(true);
  const onBack = () => {
    navigation.goBack();
  };
  const [isShowPopup, setIsShowPopup] = (0, _react.useState)(false);
  const [keyHeader, setKeyHeader] = (0, _react.useState)('');
  const [keyMessage, setKeyMessage] = (0, _react.useState)('');
  const [keySubmit, setKeySubmit] = (0, _react.useState)('text-button-submit');
  const [isSubmitDelete, setIsSubmitDelete] = (0, _react.useState)(false);
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-security-account",
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, []);
  const showOldPass = () => {
    setSecureOldPass(!secureOldPass);
  };
  const showNewPass = () => {
    setSecureNewPass(!secureNewPass);
  };
  const showConfirmPass = () => {
    setSecureConfirmPass(!secureConfirmPass);
  };
  const onChangePassword = async () => {
    // Check du lieu truoc khi day len server
    if (!oldPass || !newPass || !confirmPass) {
      setKeyMessage('text-notify-tb21');
      setKeyHeader('text-title-dialog-warn');
      setKeySubmit('text-button-submit');
      setTimeout(() => {
        setIsShowPopup(true);
      }, 500);
    } else {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      const model = {
        oldPassword: oldPass,
        newPassword: newPass,
        confirmPassword: confirmPass
      };
      const response = await (0, _authenticationusersApi.userChangePassword)(model);
      dispatch((0, _globalSlice.updateLoadingAction)(false));
      if (response?.status) {
        setKeyMessage(response?.message);
        setKeyHeader('text-notification');
        setKeySubmit('text-button-submit');
        setIsShowPopup(true);
        setTimeout(async () => {
          _storage.storage.delete(_constants.default.KEY_USER_TOKEN);
          _storage.storage.delete(_constants.default.KEY_REFRESH_TOKEN);
          const language = _storage.storage.getString(_constants.default.LANGUAGE_APP);
          const jsonAppColor = _storage.storage.getString(_constants.default.APP_COLOR);
          const appColor = JSON.parse(jsonAppColor);
          const params = {
            language,
            appColor
          };
          dispatch((0, _globalSlice.logoutAction)(params));
          dispatch((0, _authSlice.resetUserAction)(params));
          setIsShowPopup(false);
        }, 2000);
      } else {
        if (response?.message) {
          setKeyMessage(response?.message);
          setKeyHeader('text-warning');
          setKeySubmit('text-button-submit');
        } else if (response?.code) {
          setKeyMessage(response?.code);
          setKeyHeader('text-warning');
          setKeySubmit('text-button-submit');
        }
        setTimeout(() => {
          setIsShowPopup(true);
        }, 500);
      }
    }
  };
  const onDeleteAccount = async () => {
    setIsSubmitDelete(false);
    const response = await (0, _authenticationusersApi.deleteMe)();
    if (response?.status) {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        keyHeader: 'text-notification',
        keyMessage: response?.code,
        contentMessage: response?.code,
        isShowCancel: false,
        isShowSubmit: false
      }));
      _storage.storage.delete(_constants.default.KEY_USER_TOKEN);
      _storage.storage.delete(_constants.default.KEY_REFRESH_TOKEN);
      const language = _storage.storage.getString(_constants.default.LANGUAGE_APP);
      const jsonAppColor = _storage.storage.getString(_constants.default.APP_COLOR);
      const appColor = JSON.parse(jsonAppColor);
      const params = {
        language,
        appColor
      };
      dispatch((0, _globalSlice.logoutAction)(params));
      dispatch((0, _authSlice.resetUserAction)(params));
    } else {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        keyHeader: 'text-notification',
        keyMessage: response?.code,
        contentMessage: response?.code,
        isShowCancel: false,
        isShowSubmit: false
      }));
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: styles.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        scrollEnabled: true,
        bounces: false,
        showsVerticalScrollIndicator: false,
        style: styles.contentBox,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.boxHeader,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.titleHeader,
            i18nKey: "text-btn-change-password"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.boxInfomation,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-current-password",
              style: styles.textLabel
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              textInputStyle: styles.textInputUser,
              inputRef: refOldPass,
              isPassWord: true,
              isInputRequied: true,
              blurOnSubmit: false,
              value: oldPass,
              returnKeyType: "next",
              onChangeText: oldPassword => {
                setOldPass(oldPassword);
              },
              onSubmitEditing: () => refNewPass.current.focus(),
              secureTextEntry: secureOldPass,
              onShowPassword: showOldPass,
              textContentType: "none"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-new-password",
              style: styles.textLabel
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              textInputStyle: styles.textInputUser,
              inputRef: refNewPass,
              isPassWord: true,
              isInputRequied: true,
              blurOnSubmit: false,
              value: newPass,
              returnKeyType: "next",
              onChangeText: newPassword => {
                setNewPass(newPassword);
              },
              onSubmitEditing: () => refConfirmNewPass.current.focus(),
              secureTextEntry: secureNewPass,
              onShowPassword: showNewPass,
              textContentType: "none"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItem,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-confirm-password",
              style: styles.textLabel
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              textInputStyle: styles.textInputUser,
              inputRef: refConfirmNewPass,
              isPassWord: true,
              isInputRequied: true,
              blurOnSubmit: false,
              value: confirmPass,
              returnKeyType: "next",
              onChangeText: confirmPassword => {
                setConfirmPass(confirmPassword);
              },
              onSubmitEditing: () => {
                onChangePassword();
              },
              secureTextEntry: secureConfirmPass,
              onShowPassword: showConfirmPass,
              textContentType: "none"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.boxAction,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
              onPress: () => {
                onChangePassword();
              },
              style: styles.btnEdit,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                style: [styles.textBtn],
                i18nKey: "text-btn-change-password"
              })
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.hr
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.boxFooter,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.titleDelete,
            i18nKey: "text-delete-account"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            style: styles.confirmDelete,
            i18nKey: "text-delete-acount-confirm"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            onPress: () => {
              setIsSubmitDelete(true);
              setKeyMessage('text-delete-acount-message');
              setKeyHeader('text-delete-account');
              setKeySubmit('delete_button_sheet');
              setIsShowPopup(true);
            },
            style: styles.btnEdit,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              style: [styles.textBtn],
              i18nKey: "text-delete-account"
            })
          })]
        })]
      }), isShowPopup && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogWarnCustom.default, {
        isShowModal: isShowPopup,
        keyHeader: keyHeader,
        keyMessage: keyMessage,
        keySubmit: keySubmit,
        contentMessage: keyMessage,
        submitOnPress: event => {
          if (isSubmitDelete) {
            onDeleteAccount();
          }
          setIsShowPopup(false);
        },
        isShowCancel: false,
        isShowSubmit: false,
        cancelOnPress: event => {
          setIsShowPopup(false);
        }
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  boxInfomation: {
    marginTop: (0, _scales.horizontal)(20),
    paddingHorizontal: (0, _scales.horizontal)(24)
  },
  textLabel: {
    fontFamily: _fonts.default.medium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'left',
    marginBottom: (0, _scales.vertical)(10)
  },
  boxItem: {
    marginBottom: 10,
    textAlign: 'left'
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: (0, _scales.vertical)(10),
    marginBottom: (0, _scales.vertical)(16)
  },
  btnEdit: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(24) * 2,
    height: 56,
    borderRadius: 100,
    paddingHorizontal: (0, _scales.horizontal)(16),
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: _colors.Color.text_color,
    borderWidth: 1,
    marginBottom: (0, _scales.vertical)(16)
  },
  textBtn: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    color: _colors.Color.text_color
  },
  btnReturn: {
    marginLeft: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(10)
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    // marginTop: vertical(5),
    // marginHorizontal: horizontal(10),
    borderColor: _colors.Color.color_uncheck_answer
  },
  boxHeader: {
    marginTop: (0, _scales.vertical)(24),
    marginBottom: (0, _scales.vertical)(5),
    paddingHorizontal: (0, _scales.horizontal)(24)
  },
  titleHeader: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 25.2
  },
  hr: {
    width: _platforms.screenWidth,
    height: 10,
    backgroundColor: _colors.Color.color_bg_tab_view,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: _colors.Color.color_bg_progress_bar,
    borderBottomColor: _colors.Color.color_bg_progress_bar
  },
  boxFooter: {
    width: _platforms.screenWidth,
    paddingHorizontal: (0, _scales.horizontal)(24),
    marginTop: (0, _scales.vertical)(20)
  },
  titleDelete: {
    fontFamily: _fonts.default.bold,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 23.8,
    color: _colors.Color.text_color,
    marginBottom: (0, _scales.vertical)(5)
  },
  confirmDelete: {
    fontFamily: _fonts.default.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: _colors.Color.text_color_hover,
    marginBottom: (0, _scales.vertical)(16)
  },
  contentBox: {
    flexGrow: 1,
    paddingTop: (0, _scales.vertical)(20)
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(ProfileChangePasswordScreen);
//# sourceMappingURL=ProfileChangePasswordScreen.js.map