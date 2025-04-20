/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
import React, { useLayoutEffect, useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import DialogWarnCustom from '@components/DialogWarnCustom';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import {
  logoutAction,
  updateLoadingAction,
  updateShowDialogWarnAction,
} from '@store/reducers/globalSlice';
import BackHeader from '@components/BackHeader';
import { hasNotch } from 'react-native-device-info';
import { resetUserAction } from '@store/reducers/authSlice';
import { storage } from '@utils/storage';
import {
  deleteMe,
  userChangePassword,
} from '../../services/authentication/authenticationusers.api';

const ProfileChangePasswordScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const refOldPass = useRef(null);
  const refNewPass = useRef(null);
  const refConfirmNewPass = useRef(null);
  const [secureOldPass, setSecureOldPass] = useState(true);
  const [secureNewPass, setSecureNewPass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);
  const onBack = () => {
    navigation.goBack();
  };
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [keyHeader, setKeyHeader] = useState('');
  const [keyMessage, setKeyMessage] = useState('');
  const [keySubmit, setKeySubmit] = useState('text-button-submit');
  const [isSubmitDelete, setIsSubmitDelete] = useState(false);

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
      dispatch(updateLoadingAction(true));
      const model = {
        oldPassword: oldPass,
        newPassword: newPass,
        confirmPassword: confirmPass,
      };
      const response = await userChangePassword(model);
      dispatch(updateLoadingAction(false));
      if (response?.status) {
        setKeyMessage(response?.message);
        setKeyHeader('text-notification');
        setKeySubmit('text-button-submit');
        setIsShowPopup(true);
        setTimeout(async () => {
          storage.delete(Constant.KEY_USER_TOKEN);
          storage.delete(Constant.KEY_REFRESH_TOKEN);
          const language = storage.getString(Constant.LANGUAGE_APP);
          const jsonAppColor = storage.getString(Constant.APP_COLOR);
          const appColor = JSON.parse(jsonAppColor);
          const params = {
            language,
            appColor,
          };
          dispatch(logoutAction(params));
          dispatch(resetUserAction(params));
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
    const response = await deleteMe();
    if (response?.status) {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          keyHeader: 'text-notification',
          keyMessage: response?.code,
          contentMessage: response?.code,
          isShowCancel: false,
          isShowSubmit: false,
        })
      );
      storage.delete(Constant.KEY_USER_TOKEN);
      storage.delete(Constant.KEY_REFRESH_TOKEN);
      const language = storage.getString(Constant.LANGUAGE_APP);
      const jsonAppColor = storage.getString(Constant.APP_COLOR);
      const appColor = JSON.parse(jsonAppColor);
      const params = {
        language,
        appColor,
      };
      dispatch(logoutAction(params));
      dispatch(resetUserAction(params));
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          keyHeader: 'text-notification',
          keyMessage: response?.code,
          contentMessage: response?.code,
          isShowCancel: false,
          isShowSubmit: false,
        })
      );
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
          scrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.contentBox}
        >
          <View style={styles.boxHeader}>
            <CMText
              style={styles.titleHeader}
              i18nKey="text-btn-change-password"
            />
          </View>
          <View style={styles.boxInfomation}>
            <View style={styles.boxItem}>
              <CMText
                i18nKey="text-current-password"
                style={styles.textLabel}
              />
              <CMTextInput
                textInputStyle={styles.textInputUser}
                inputRef={refOldPass}
                isPassWord
                isInputRequied
                blurOnSubmit={false}
                value={oldPass}
                returnKeyType="next"
                onChangeText={(oldPassword) => {
                  setOldPass(oldPassword);
                }}
                onSubmitEditing={() => refNewPass.current.focus()}
                secureTextEntry={secureOldPass}
                onShowPassword={showOldPass}
                textContentType="none"
              />
            </View>
            <View style={styles.boxItem}>
              <CMText i18nKey="text-new-password" style={styles.textLabel} />
              <CMTextInput
                textInputStyle={styles.textInputUser}
                inputRef={refNewPass}
                isPassWord
                isInputRequied
                blurOnSubmit={false}
                value={newPass}
                returnKeyType="next"
                onChangeText={(newPassword) => {
                  setNewPass(newPassword);
                }}
                onSubmitEditing={() => refConfirmNewPass.current.focus()}
                secureTextEntry={secureNewPass}
                onShowPassword={showNewPass}
                textContentType="none"
              />
            </View>
            <View style={styles.boxItem}>
              <CMText
                i18nKey="text-confirm-password"
                style={styles.textLabel}
              />
              <CMTextInput
                textInputStyle={styles.textInputUser}
                inputRef={refConfirmNewPass}
                isPassWord
                isInputRequied
                blurOnSubmit={false}
                value={confirmPass}
                returnKeyType="next"
                onChangeText={(confirmPassword) => {
                  setConfirmPass(confirmPassword);
                }}
                onSubmitEditing={() => {
                  onChangePassword();
                }}
                secureTextEntry={secureConfirmPass}
                onShowPassword={showConfirmPass}
                textContentType="none"
              />
            </View>
            <View style={styles.boxAction}>
              <TouchableDebounce
                onPress={() => {
                  onChangePassword();
                }}
                style={styles.btnEdit}
              >
                <CMText
                  style={[styles.textBtn]}
                  i18nKey="text-btn-change-password"
                />
              </TouchableDebounce>
            </View>
          </View>
          <View style={styles.hr} />
          <View style={styles.boxFooter}>
            <CMText style={styles.titleDelete} i18nKey="text-delete-account" />
            <CMText
              style={styles.confirmDelete}
              i18nKey="text-delete-acount-confirm"
            />
            <TouchableDebounce
              onPress={() => {
                setIsSubmitDelete(true);
                setKeyMessage('text-delete-acount-message');
                setKeyHeader('text-delete-account');
                setKeySubmit('delete_button_sheet');
                setIsShowPopup(true);
              }}
              style={styles.btnEdit}
            >
              <CMText style={[styles.textBtn]} i18nKey="text-delete-account" />
            </TouchableDebounce>
          </View>
        </ScrollView>
        {isShowPopup && (
          <DialogWarnCustom
            isShowModal={isShowPopup}
            keyHeader={keyHeader}
            keyMessage={keyMessage}
            keySubmit={keySubmit}
            contentMessage={keyMessage}
            submitOnPress={(event) => {
              if (isSubmitDelete) {
                onDeleteAccount();
              }
              setIsShowPopup(false);
            }}
            isShowCancel={false}
            isShowSubmit={false}
            cancelOnPress={(event) => {
              setIsShowPopup(false);
            }}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  boxInfomation: {
    marginTop: horizontal(20),
    paddingHorizontal: horizontal(24),
  },
  textLabel: {
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'left',
    marginBottom: vertical(10),
  },
  boxItem: {
    marginBottom: 10,
    textAlign: 'left',
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: vertical(10),
    marginBottom: vertical(16),
  },
  btnEdit: {
    width: screenWidth - horizontal(24) * 2,
    height: 56,
    borderRadius: 100,
    paddingHorizontal: horizontal(16),
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.text_color,
    borderWidth: 1,
    marginBottom: vertical(16),
  },
  textBtn: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    color: Color.text_color,
  },
  btnReturn: {
    marginLeft: horizontal(20),
    marginTop: vertical(10),
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    // marginTop: vertical(5),
    // marginHorizontal: horizontal(10),
    borderColor: Color.color_uncheck_answer,
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
  },
  hr: {
    width: screenWidth,
    height: 10,
    backgroundColor: Color.color_bg_tab_view,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Color.color_bg_progress_bar,
    borderBottomColor: Color.color_bg_progress_bar,
  },
  boxFooter: {
    width: screenWidth,
    paddingHorizontal: horizontal(24),
    marginTop: vertical(20),
  },
  titleDelete: {
    fontFamily: fonts.bold,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 23.8,
    color: Color.text_color,
    marginBottom: vertical(5),
  },
  confirmDelete: {
    fontFamily: fonts.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: Color.text_color_hover,
    marginBottom: vertical(16),
  },
  contentBox: {
    flexGrow: 1,
    paddingTop: vertical(20),
  },
});
export default React.memo(ProfileChangePasswordScreen);
