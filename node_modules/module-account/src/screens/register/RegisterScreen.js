/* eslint-disable new-cap */
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import RegexPassword from '@components/RegexPassword';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { register } from '../../services/hr/hrprofile.api';
import { authenticationUsers } from '../profile/model/authenticationusers.model';
import { styles } from './RegisterScreen.style';
import Agree from './component/Agree';
import FooterRegister from './component/Footer';
import Header from './component/Header';

const PLACEHOLDER = {
  en: {
    userplaceholder: 'Account name',
    pwplaceholder: 'Password',
    emailplaceholder: 'Email',
    mobileplaceholder: 'Mobile phone',
  },
  vn: {
    userplaceholder: 'Tài khoản',
    pwplaceholder: 'Mật khẩu',
    emailplaceholder: 'Email',
    mobileplaceholder: 'Số điện thoại',
  },
};

const RegisterScreen = ({ navigation }) => {
  const languageLocal = useSelector((state) => state.global.language);
  const dispatch = useDispatch();
  const [registerUser, setRegiserUser] = useState(new authenticationUsers());
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [regexPass, setRegexPass] = useState(0);
  const [isAgree, setIsAgree] = useState(false);

  const refPassword = useRef(null);
  const refUsename = useRef(null);

  const refEmail = useRef(null);
  const refMobile = useRef(null);

  /**
   * Check empty for field
   */
  function checkEmptyRequired() {
    const hasWhiteSpace =
      /\s/g.test(registerUser?.password) ||
      /\s/g.test(registerUser?.username) ||
      /\s/g.test(registerUser?.email);
    return (
      registerUser &&
      registerUser?.password &&
      registerUser?.username &&
      registerUser?.email &&
      // registerUser?.mobile &&
      regexPass > 3 &&
      isAgree &&
      !hasWhiteSpace
    );
  }

  const validatRregisterUser = () =>
    registerUser.username &&
    registerUser.email &&
    // registerUser.mobile &&
    registerUser.password;

  /**
   * Validate usernamr of user
   * @param {*} email
   */
  function validateUsername() {
    return Constant.regexUsername.test(registerUser.username);
  }

  /**
   * Validate email of user
   * @param {*} email
   */
  function validateEmail() {
    return Constant.registerGmailRegex.test(registerUser.email);
  }

  /**
   * Validate email of user
   * @param {*} params
   */
  function checkValidatePhone() {
    return Constant.regexPhone.test(registerUser.mobile);
  }

  const validatePassword = (password) => {
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

  const onPressLogIn = useCallback(() => navigation.goBack(), []);

  /**
   * click show/hide pass word.
   */
  const showPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const showDialog = (keyMessage) => {
    dispatch(
      updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        keyHeader: 'text-tab-notification',
        keyMessage, // "text-check-empty-register",
        isShowCancel: false,
        isShowSubmit: false,
      })
    );
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
      const response = await register(registerUser);
      if (response?.status) {
        showDialog('text-register-user-success');
        setRegiserUser(new authenticationUsers());
        setRegexPass(0);
      } else if (response?.code) {
        showDialog(response?.code);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={isIOS && hasNotch() ? 0 : 10}
      behavior={isIOS ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Header onPressReturnLogin={onPressReturnLogin} />
          <CMTextInput
            placeholder={
              languageLocal === Constant.LANGUAGE_VN
                ? PLACEHOLDER.vn.userplaceholder
                : PLACEHOLDER.en.userplaceholder
            }
            inputRef={refUsename}
            returnKeyType="next"
            value={registerUser.username}
            onChangeText={(username) => {
              setRegiserUser((preValue) => ({
                ...preValue,
                username,
              }));
            }}
            textInputStyle={styles.textInput}
            onSubmitEditing={() => refEmail.current.focus()}
          />
          <CMTextInput
            placeholder={
              languageLocal === Constant.LANGUAGE_VN
                ? PLACEHOLDER.vn.emailplaceholder
                : PLACEHOLDER.en.emailplaceholder
            }
            inputRef={refEmail}
            returnKeyType="next"
            value={registerUser.email}
            onChangeText={(email) => {
              setRegiserUser((preValue) => ({
                ...preValue,
                email,
              }));
            }}
            textInputStyle={styles.textInput}
            onSubmitEditing={() => refPassword.current.focus()}
          />
          {/* <CMTextInput
            placeholder={
              languageLocal == Constant.LANGUAGE_VN
                ? PLACEHOLDER.vn.mobileplaceholder
                : PLACEHOLDER.en.mobileplaceholder
            }
            inputRef={refMobile}
            returnKeyType={"next"}
            keyboardType={"numeric"}
            value={registerUser.mobile}
            onChangeText={(mobile) => {
              setRegiserUser((preValue) => ({
                ...preValue,
                mobile: mobile,
              }));
            }}
            textInputStyle={styles.textInput}
            onSubmitEditing={() => refPassword.current.focus()}
          /> */}
          <CMTextInput
            isPassWord
            placeholder={
              languageLocal === Constant.LANGUAGE_VN
                ? PLACEHOLDER.vn.pwplaceholder
                : PLACEHOLDER.en.pwplaceholder
            }
            inputRef={refPassword}
            returnKeyType="next"
            value={registerUser.password}
            onChangeText={(password) => {
              setRegiserUser((preValue) => ({
                ...preValue,
                password,
              }));
              validatePassword(password);
            }}
            textInputStyle={styles.textInput}
            onShowPassword={showPassword}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={() => {}}
            textContentType="none"
          />
          <RegexPassword lenghtMax={4} passRegex={regexPass} />
          <Agree
            isAgree={isAgree}
            onPressAgree={(agree) => {
              setIsAgree(agree);
            }}
            onPolicyDetail={() => {}}
          />
          <TouchableDebounce
            style={[
              styles.btnLogin,
              {
                backgroundColor: checkEmptyRequired()
                  ? Color.base_color
                  : Color.color_border,
              },
            ]}
            onPress={onRegisterUser}
            disabled={!checkEmptyRequired()}
          >
            <CMText
              i18nKey="sigup-button"
              style={[
                styles.textBtnLogin,
                {
                  color: checkEmptyRequired()
                    ? Color.white
                    : Color.color_unactive,
                },
              ]}
            />
          </TouchableDebounce>
          <FooterRegister onPressLogIn={onPressLogIn} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default React.memo(RegisterScreen);
