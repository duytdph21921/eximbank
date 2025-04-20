import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS } from '@utils/platforms';
import { setDomainApp, setTagNameApp } from '@assets/enviroment/domain';
import ImageHeader from '@assets/icons/start.svg';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import {
  updateAppColorAction,
  updateLoadingAction,
  updateShowDialogWarnAction,
} from '@store/reducers/globalSlice';
import { getConfigApp } from '@services/authentication/systemsettings.api';
import { Color } from '@theme/colors';
import { setBaseTagName, setBaseUrl } from '@store/reducers/authSlice';
import { storage } from '@utils/storage';
import { styles } from './StartScreen.styles';

const PLACEHOLDER = {
  urlEN: 'Enter your data domain URL',
  urlVN: 'Nhập URL miền dữ liệu của bạn',
};

const StartScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const languageLocal = useSelector((state) => state.global.language);
  const [domain, setDomain] = useState('');

  /**
   * Xử lý click button continute.
   */
  const onHandleOnpress = async () => {
    if (domain && domain.trim()) {
      dispatch(updateLoadingAction(true));
      const url = 'elearning-vna.dttt.vn';
      const urlApi = url.trim().toLowerCase().replace('https://', '').replace('http://', '');
      getConfigApp(urlApi, domain).then(async (response) => {
        setTimeout(() => {
          dispatch(updateLoadingAction(false));
        }, 500);
        if (response?.status && response?.data) {
          const tagName = response?.data?.tagname;
          const newDomain = `${response?.data?.domain}`;
          let appColor = Color;
          if (response?.data?.listColor && response?.data?.listColor.length > 0) {
            appColor = response?.data?.listColor?.reduce((acc, color) => {
              acc[color.id] = color.code;
              return acc;
            }, {});
          }
          setDomainApp(newDomain);
          setTagNameApp(tagName);
          storage.set(Constant.KEY_FIRST, Constant.IS_FIRST);
          storage.set(Constant.DOMAIN, newDomain);
          storage.set(Constant.TAG_NAME, tagName);
          const jsonAppColor = JSON.stringify(appColor);
          storage.set(Constant.APP_COLOR, jsonAppColor);
          dispatch(updateAppColorAction(appColor));
          dispatch(setBaseUrl(newDomain));
          dispatch(setBaseTagName(tagName));
          navigation.replace(Constant.LOGIN);
        } else {
          dispatch(
            updateShowDialogWarnAction({
              isShowModalWarn: true,
              isSigout: false,
              titleHeader: '',
              keyHeader: 'text-warning',
              keyMessage: `text-domain-incorrect`,
              contentMessage: '',
              isShowCancel: false,
              isShowSubmit: false,
            }),
          );
        }
      });
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage: `text-domain-enter`,
          contentMessage: '',
          keyCancel: 'text-close',
          isShowCancel: true,
          isShowSubmit: false,
        }),
      );
    }
  };

  function checkEmptyDomain() {
    return domain !== '';
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={isIOS && hasNotch() ? 0 : 10}
      behavior={isIOS ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <View style={styles.imageHeader}>
            <ImageHeader width={327} height={327} />
          </View>
          <View style={styles.viewContent}>
            <CMText i18nKey="get-start" style={styles.textTitle} />
            <CMText i18nKey="text-URL-title" style={styles.textTitleURL} />
            <CMTextInput
              textInputStyle={styles.textInput}
              isInfor
              placeholder={
                languageLocal === Constant.LANGUAGE_VN ? PLACEHOLDER.urlVN : PLACEHOLDER.urlEN
              }
              onChangeText={(domain) => {
                setDomain(domain);
              }}
              onSubmitEditing={() => {
                onHandleOnpress();
              }}
              isValid={domain !== ''}
              value={domain}
              maxLength={200}
            />
          </View>
          <TouchableDebounce
            style={[
              styles.btnFooter,
              {
                backgroundColor: checkEmptyDomain() ? Color.base_color : Color.color_border,
              },
            ]}
            disabled={!checkEmptyDomain()}
            onPress={onHandleOnpress}
          >
            <CMText
              i18nKey="text-continute"
              style={checkEmptyDomain() ? styles.textFooter : styles.textDisableFooter}
            />
          </TouchableDebounce>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default StartScreen;
