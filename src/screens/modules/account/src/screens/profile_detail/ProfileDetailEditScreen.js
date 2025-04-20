/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable new-cap */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import CMTextInput from '@components/CMTextInput';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import {
  updateLoadingAction,
  updateShowDialogWarnAction,
} from '@store/reducers/globalSlice';
import {
  getUserInfoDetail,
  updateUserInfoDetail,
} from '../../services/hr/hrprofile.api';
import { userInfo } from '../profile/model/hrprofile.model';
import HeaderDetailProfileEdit from './component/HeaderProfileEditDetail';

// ProfileDetailEditScreen.propTypes = {};

// ProfileDetailEditScreen.defaultProps = {};

const ProfileDetailEditScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(false);
  const dispatch = useDispatch();
  const [modelEdit, setDataUser] = useState(new userInfo());
  const isMounteRef = useRef(false);

  const onBack = () => {
    navigation.navigate(Constant.PROFILE_DETAIL_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
    });
  };

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText i18nKey="text-profile-info" style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const funcGetUserInfoDetail = async () => {
    const response = await getUserInfoDetail();
    if (response?.status && isMounteRef.current) {
      setData(true);
      setDataUser(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetUserInfoDetail();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const onEditProfile = async () => {
    // Call api cập nhật thông tin
    const response = await updateUserInfoDetail(modelEdit);
    if (response?.status) {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          keyHeader: 'text-notification',
          keyMessage: 'text-success-save-change-user-info',
          isShowCancel: true,
          isShowSubmit: false,
          keyCancel: 'text-close',
        })
      );
    }
  };
  const onChangeAvatar = (avatarPath) => {
    const newModel = { ...modelEdit, avatar: avatarPath };
    setDataUser(newModel);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={isIOS && hasNotch() ? 0 : 10}
      behavior={isIOS ? 'padding' : 'height'}
      enabled
    >
      <SafeAreaView style={styles.container}>
        {data ? (
          <ScrollView
            scrollEnabled
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.contentBox}
          >
            <HeaderDetailProfileEdit
              avatar={modelEdit.avatar}
              type={modelEdit.type}
              handleChooseAvatar={(avatarPath) => {
                onChangeAvatar(avatarPath);
              }}
            />
            <View style={styles.boxInfomation}>
              <View style={styles.boxItem}>
                <CMText
                  i18nKey="text-displayname"
                  style={styles.textLabelNotEdit}
                />
                <CMTextInput
                  value={modelEdit.displayName}
                  textInputStyle={styles.textInputUserNotEdit}
                  editable={false}
                />
              </View>
              <View style={styles.boxItem}>
                <CMText
                  i18nKey="text-email"
                  style={
                    modelEdit.type !== 'System'
                      ? styles.textLabel
                      : styles.textLabelNotEdit
                  }
                />
                <CMTextInput
                  value={modelEdit.email}
                  textInputStyle={
                    modelEdit.type !== 'System'
                      ? styles.textInputUser
                      : styles.textInputUserNotEdit
                  }
                  onChangeText={(email) => {
                    if (modelEdit.type !== 'System')
                      setDataUser((prevUser) => ({
                        ...prevUser,
                        email,
                      }));
                  }}
                />
              </View>
              <View style={styles.boxItem}>
                <CMText
                  i18nKey="text-position-name"
                  style={styles.textLabelNotEdit}
                />
                <CMTextInput
                  value={modelEdit.positionName}
                  textInputStyle={styles.textInputUserNotEdit}
                  editable={false}
                />
              </View>
              <View style={styles.boxItem}>
                <CMText
                  i18nKey="text-department-name"
                  style={styles.textLabelNotEdit}
                />
                <CMTextInput
                  value={modelEdit.departmentName}
                  textInputStyle={styles.textInputUserNotEdit}
                  editable={false}
                />
              </View>
              <View style={styles.boxItem}>
                <CMText
                  i18nKey="text-mobile-phone"
                  style={
                    modelEdit.type !== 'System'
                      ? styles.textLabel
                      : styles.textLabelNotEdit
                  }
                />
                <CMTextInput
                  value={modelEdit.mobile}
                  textInputStyle={
                    modelEdit.type !== 'System'
                      ? styles.textInputUser
                      : styles.textInputUserNotEdit
                  }
                  onChangeText={(mobile) => {
                    if (modelEdit.type !== 'System')
                      setDataUser((prevUser) => ({
                        ...prevUser,
                        mobile,
                      }));
                  }}
                />
              </View>
            </View>
            <View style={styles.boxAction}>
              <TouchableDebounce
                onPress={onEditProfile}
                style={[
                  styles.btnEdit,
                  {
                    backgroundColor: Color.base_color,
                    borderColor: Color.base_color,
                  },
                ]}
              >
                <CMText
                  style={[styles.whiteColor, styles.textBtn]}
                  i18nKey="text-btn-save-infomation"
                />
              </TouchableDebounce>
            </View>
          </ScrollView>
        ) : (
          <></>
          // <ProfileScreenPlaceholder />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    fontFamily: 'manrope-light',
  },
  contentBox: {
    marginHorizontal: horizontal(24),
  },
  boxInfomation: {
    marginTop: horizontal(30),
  },
  textLabel: {
    fontFamily: 'manrope-medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'left',
    marginBottom: vertical(10),
  },
  textNomal: {
    fontFamily: 'manrope-regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left',
  },
  boxItem: {
    marginBottom: 10,
    textAlign: 'left',
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: vertical(20),
    marginBottom: vertical(16),
  },
  btnEdit: {
    width: screenWidth - horizontal(24) * 2,
    height: 56,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Color.base_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.base_color,
    borderWidth: 1,
  },
  whiteColor: {
    color: Color.white,
  },
  textBtn: {
    fontFamily: 'manrope-bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
  },
  textInputUserNotEdit: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    color: Color.color_uncheck_answer,
    width: screenWidth - horizontal(24) * 2,
    borderColor: Color.color_uncheck_answer,
  },
  btnReturn: {
    marginLeft: horizontal(20),
    marginTop: vertical(10),
  },
  textLabelNotEdit: {
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'left',
    color: Color.color_uncheck_answer,
    marginBottom: vertical(10),
  },
  textInputUser: {
    borderRadius: 100,
    height: 56,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    color: Color.text_color,
    width: screenWidth - horizontal(24) * 2,
    borderColor: Color.color_uncheck_answer,
  },
});
export default React.memo(ProfileDetailEditScreen);
