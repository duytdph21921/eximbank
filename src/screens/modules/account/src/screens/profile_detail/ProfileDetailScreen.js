/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Constant from '@utils/constants';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import { getUserInfoDetail } from '../../services/hr/hrprofile.api';
import { styles } from './ProfileDetailScreen.style';
import HeaderDetailProfile from './component/HeaderProfileDetail';

// ProfileDetailScreen.propTypes = {};

// ProfileDetailScreen.defaultProps = {};

const ProfileDetailScreen = (props) => {
  const { navigation, route } = props;
  const [data, setData] = useState(false);
  const [dataUser, setDataUser] = useState();
  const onBack = () => {
    navigation.navigate(Constant.PROFILE_SCREEN, {
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

  const getData = async () => {
    const response = await getUserInfoDetail();
    setData(true);
    if (response?.status) {
      setDataUser(response?.data);
    }
  };
  useEffect(() => {
    getData();
  }, [route && route?.params && route?.params?.dataBack]);

  const renderViewInfor = (i18nTitle, value) => (
    <View style={styles.boxItem}>
      <CMText i18nKey={i18nTitle} style={styles.textLabel} />
      <CMText title={value} style={styles.textNomal} />
    </View>
  );

  const onEditProfile = () => {
    navigation.navigate(Constant.PROFILE_DETAIL_EDIT_SCREEN);
  };

  const onChangePassword = () => {
    navigation.navigate(Constant.PROFILE_CHANGE_PASSWORD_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <ScrollView
          scrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.contentBox}
        >
          <HeaderDetailProfile
            avatar={dataUser?.avatar}
            displayName={dataUser?.displayName}
            email={dataUser?.email}
          />
          <View style={styles.boxInfomation}>
            {renderViewInfor('text-displayname', dataUser?.displayName)}
            {renderViewInfor('text-email', dataUser?.email)}
            {renderViewInfor('text-position-name', dataUser?.positionName)}
            {renderViewInfor('text-department-name', dataUser?.departmentName)}
            {renderViewInfor('ext-mobile-phone', dataUser?.mobile)}
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
                i18nKey="text-btn-edit-infomation"
              />
            </TouchableDebounce>
            <TouchableDebounce
              onPress={onChangePassword}
              style={styles.btnDefault}
            >
              <CMText
                style={styles.textBtn}
                i18nKey="text-btn-change-password"
              />
            </TouchableDebounce>
          </View>
        </ScrollView>
      ) : (
        <></>
        // <ProfileScreenPlaceholder />
      )}
    </SafeAreaView>
  );
};

export default React.memo(ProfileDetailScreen);
