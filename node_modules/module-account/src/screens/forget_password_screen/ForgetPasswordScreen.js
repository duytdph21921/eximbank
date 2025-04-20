import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import ImageLogin from '@assets/icons/img_login.svg';
import CMTextInput from '@components/CMTextInput';
import { Color } from '@theme/colors';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { styles } from './ForgetPasswordScreen.styles';

const PLACEHOLDER = {
  en: {
    gmailplaceholder: 'Enter my gmail',
  },
  vn: {
    gmailplaceholder: 'Nhập gmail của bạn',
  },
};
const ForgetPasswordScreen = (props) => {
  const { navigation } = props;
  const languageLocal = useSelector((state) => state.global.language);

  const [gmail, setGmail] = useState('');
  /**
   * Check empty for field
   */
  function checkEmptyEmail() {
    return gmail !== '';
  }

  const onHandleForgetPassword = () => {
    navigation.goBack();
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
          <View style={styles.viewImage}>
            <ImageLogin width={310} height={187} />
          </View>
          <CMTextInput
            placeholder={
              languageLocal === Constant.LANGUAGE_VN
                ? PLACEHOLDER.vn.gmailplaceholder
                : PLACEHOLDER.en.gmailplaceholder
            }
            returnKeyType="next"
            onSubmitEditing={() => {}}
            blurOnSubmit={false}
            onChangeText={(gmailText) => {
              setGmail(gmailText);
            }}
            value={gmail}
            textInputStyle={styles.textInputUser}
          />
          <TouchableDebounce
            style={[
              styles.btnForgetPass,
              {
                backgroundColor: checkEmptyEmail()
                  ? Color.base_color
                  : Color.color_border,
              },
            ]}
            onPress={onHandleForgetPassword}
          >
            <CMText
              i18nKey="text-btn-forget-password"
              style={[
                styles.textForgetPass,
                {
                  color: checkEmptyEmail()
                    ? Color.white
                    : Color.color_uncheck_answer,
                },
              ]}
            />
          </TouchableDebounce>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default React.memo(ForgetPasswordScreen);
