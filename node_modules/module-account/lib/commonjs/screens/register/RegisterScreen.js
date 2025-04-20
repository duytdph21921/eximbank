"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _RegexPassword = _interopRequireDefault(require("@components/RegexPassword"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _hrprofileApi = require("../../services/hr/hrprofile.api.js");
var _authenticationusersModel = require("../profile/model/authenticationusers.model.js");
var _RegisterScreenStyle = require("./RegisterScreen.style.js");
var _Agree = _interopRequireDefault(require("./component/Agree.js"));
var _Footer = _interopRequireDefault(require("./component/Footer.js"));
var _Header = _interopRequireDefault(require("./component/Header.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable new-cap */

const PLACEHOLDER = {
  en: {
    userplaceholder: 'Account name',
    pwplaceholder: 'Password',
    emailplaceholder: 'Email',
    mobileplaceholder: 'Mobile phone'
  },
  vn: {
    userplaceholder: 'Tài khoản',
    pwplaceholder: 'Mật khẩu',
    emailplaceholder: 'Email',
    mobileplaceholder: 'Số điện thoại'
  }
};
const RegisterScreen = ({
  navigation
}) => {
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const dispatch = (0, _reactRedux.useDispatch)();
  const [registerUser, setRegiserUser] = (0, _react.useState)(new _authenticationusersModel.authenticationUsers());
  const [secureTextEntry, setSecureTextEntry] = (0, _react.useState)(true);
  const [regexPass, setRegexPass] = (0, _react.useState)(0);
  const [isAgree, setIsAgree] = (0, _react.useState)(false);
  const refPassword = (0, _react.useRef)(null);
  const refUsename = (0, _react.useRef)(null);
  const refEmail = (0, _react.useRef)(null);
  const refMobile = (0, _react.useRef)(null);

  /**
   * Check empty for field
   */
  function checkEmptyRequired() {
    const hasWhiteSpace = /\s/g.test(registerUser?.password) || /\s/g.test(registerUser?.username) || /\s/g.test(registerUser?.email);
    return registerUser && registerUser?.password && registerUser?.username && registerUser?.email &&
    // registerUser?.mobile &&
    regexPass > 3 && isAgree && !hasWhiteSpace;
  }
  const validatRregisterUser = () => registerUser.username && registerUser.email &&
  // registerUser.mobile &&
  registerUser.password;

  /**
   * Validate usernamr of user
   * @param {*} email
   */
  function validateUsername() {
    return _constants.default.regexUsername.test(registerUser.username);
  }

  /**
   * Validate email of user
   * @param {*} email
   */
  function validateEmail() {
    return _constants.default.registerGmailRegex.test(registerUser.email);
  }

  /**
   * Validate email of user
   * @param {*} params
   */
  function checkValidatePhone() {
    return _constants.default.regexPhone.test(registerUser.mobile);
  }
  const validatePassword = password => {
    let conditionsMet = 0;
    if (password.length >= 8) conditionsMet += 1;
    if (/[A-Za-z]/.test(password)) conditionsMet += 1;
    if (/\d/.test(password)) conditionsMet += 1;
    if (/[@#$%^&*(),.?":{}|<>]/.test(password)) conditionsMet += 1;
    setRegexPass(conditionsMet);
  };
  const onPressReturnLogin = () => {
    navigation.goBack();
  };
  const onPressLogIn = (0, _react.useCallback)(() => navigation.goBack(), []);

  /**
   * click show/hide pass word.
   */
  const showPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const showDialog = keyMessage => {
    dispatch((0, _globalSlice.updateShowDialogWarnAction)({
      isShowModalWarn: true,
      isSigout: false,
      keyHeader: 'text-tab-notification',
      keyMessage,
      // "text-check-empty-register",
      isShowCancel: false,
      isShowSubmit: false
    }));
  };
  const onRegisterUser = async () => {
    if (!validateUsername()) {
      showDialog('text-invalid-uesrname');
    } else if (!validatRregisterUser()) {
      showDialog('text-check-empty-register');
    } else if (!validateEmail()) {
      showDialog('text-invalid-email');
      // } else if (!checkValidatePhone()) {
      //   showDialog("text-invalid-number-phone");
    } else if (!isAgree) {
      showDialog('text-check-is-agree');
    } else {
      const response = await (0, _hrprofileApi.register)(registerUser);
      if (response?.status) {
        showDialog('text-register-user-success');
        setRegiserUser(new _authenticationusersModel.authenticationUsers());
        setRegexPass(0);
      } else if (response?.code) {
        showDialog(response?.code);
      }
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _RegisterScreenStyle.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
      style: _RegisterScreenStyle.styles.container,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        style: _RegisterScreenStyle.styles.scrollView,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
          onPressReturnLogin: onPressReturnLogin
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
          placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.userplaceholder : PLACEHOLDER.en.userplaceholder,
          inputRef: refUsename,
          returnKeyType: "next",
          value: registerUser.username,
          onChangeText: username => {
            setRegiserUser(preValue => ({
              ...preValue,
              username
            }));
          },
          textInputStyle: _RegisterScreenStyle.styles.textInput,
          onSubmitEditing: () => refEmail.current.focus()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
          placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.emailplaceholder : PLACEHOLDER.en.emailplaceholder,
          inputRef: refEmail,
          returnKeyType: "next",
          value: registerUser.email,
          onChangeText: email => {
            setRegiserUser(preValue => ({
              ...preValue,
              email
            }));
          },
          textInputStyle: _RegisterScreenStyle.styles.textInput,
          onSubmitEditing: () => refPassword.current.focus()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
          isPassWord: true,
          placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.pwplaceholder : PLACEHOLDER.en.pwplaceholder,
          inputRef: refPassword,
          returnKeyType: "next",
          value: registerUser.password,
          onChangeText: password => {
            setRegiserUser(preValue => ({
              ...preValue,
              password
            }));
            validatePassword(password);
          },
          textInputStyle: _RegisterScreenStyle.styles.textInput,
          onShowPassword: showPassword,
          secureTextEntry: secureTextEntry,
          onSubmitEditing: () => {},
          textContentType: "none"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RegexPassword.default, {
          lenghtMax: 4,
          passRegex: regexPass
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Agree.default, {
          isAgree: isAgree,
          onPressAgree: agree => {
            setIsAgree(agree);
          },
          onPolicyDetail: () => {}
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: [_RegisterScreenStyle.styles.btnLogin, {
            backgroundColor: checkEmptyRequired() ? _colors.Color.base_color : _colors.Color.color_border
          }],
          onPress: onRegisterUser,
          disabled: !checkEmptyRequired(),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "sigup-button",
            style: [_RegisterScreenStyle.styles.textBtnLogin, {
              color: checkEmptyRequired() ? _colors.Color.white : _colors.Color.color_unactive
            }]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footer.default, {
          onPressLogIn: onPressLogIn
        })]
      })
    })
  });
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(RegisterScreen);
//# sourceMappingURL=RegisterScreen.js.map