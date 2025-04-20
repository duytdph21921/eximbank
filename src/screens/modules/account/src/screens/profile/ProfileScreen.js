/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import IconArrowRight from '@assets/icons/arrow-right.svg';
import IconCertification from '@assets/icons/certificate.svg';
import IconClass from '@assets/icons/class.svg';
import IconInfo from '@assets/icons/info.svg';
import IconLanguage from '@assets/icons/language.svg';
import IconLogout from '@assets/icons/logout.svg';
import IconNote from '@assets/icons/note.svg';
import IconNotification from '@assets/icons/notification.svg';
import IconSecurity from '@assets/icons/security.svg';
import IconSupport from '@assets/icons/support.svg';
import IconTerms from '@assets/icons/terms.svg';
import IconTest from '@assets/icons/test.svg';
import IconUser from '@assets/icons/user.svg';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { isTablet } from '@utils/platforms';
import { loadFile } from '@utils/helpers';
import { Color } from '@theme/colors';
import { getMyInfo } from '../../services/hr/hrprofile.api';
import { styles } from './ProfileScreen.styles';
import BottomSheetVersionAppInfo from '../../component/BottomSheetVersionAppInfo';

// ProfileScreen.propTypes = {};
// ProfileScreen.defaultProps = {};

let listMenuItem = [
  {
    id: 1,
    isMenu: true,
    title: 'text-profile-info',
    icon: <IconUser width={44} height={44} />,
    navigate: Constant.PROFILE_DETAIL_SCREEN,
    isShowInfo: false,
  },
  {
    id: 2,
    isMenu: true,
    title: 'text-my-note',
    icon: <IconNote width={44} height={44} />,
    navigate: Constant.NOTE_SCREEN,
    isShowInfo: false,
  },
  {
    isMenu: false,
    isShowInfo: false,
  },
  {
    id: 3,
    isMenu: true,
    title: 'text-notification',
    icon: <IconNotification width={44} height={44} />,
    isShowInfo: false,
  },
  {
    id: 4,
    isMenu: true,
    title: 'text-language',
    icon: <IconLanguage width={44} height={44} />,
    isShowInfo: false,
  },
  {
    id: 5,
    isMenu: true,
    title: 'text-security-account',
    icon: <IconSecurity width={44} height={44} />,
    isShowInfo: false,
  },
  {
    isMenu: false,
    isShowInfo: false,
  },
  {
    id: 6,
    isMenu: true,
    title: 'text-support-center',
    icon: <IconSupport width={44} height={44} />,
    isShowInfo: false,
  },
  {
    id: 7,
    isMenu: true,
    title: 'text-terms-condition',
    icon: <IconTerms width={44} height={44} />,
    isShowInfo: false,
    url: 'https://elearning-vna.dttt.vn/website-terms',
  },
  {
    id: 8,
    isMenu: true,
    title: 'text-privacy-policy',
    icon: <IconSecurity width={44} height={44} />,
    isShowInfo: false,
    url: 'https://elearning-vna.dttt.vn/website-policies',
  },
  {
    id: 9,
    isMenu: true,
    title: 'text-application-info',
    icon: <IconInfo width={44} height={44} />,
    isShowInfo: true,
  },
  {
    isMenu: false,
    isShowInfo: false,
  },
  {
    id: 10,
    isMenu: true,
    title: 'log-out',
    icon: <IconLogout width={44} height={44} />,
    isLogout: true,
    isShowInfo: false,
  },
];

const SIZE_ITEM = isTablet ? 30 : 24;
const ProfileScreen = (props) => {
  const { navigation, route } = props;
  const userState = useSelector((state) => state.auth.userState);
  const listMenu = useSelector((state) => state.global.lstMenuApp);
  const dispatch = useDispatch();
  const [isShowViewVersion, setIsShowViewVersion] = useState(false);
  const [data, setData] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const onBack = () => {
    navigation.goBack();
  };

  const handleCloseModal = () => {
    setIsShowViewVersion(false);
  };

  const ItemMenu = ({ item, key }) =>
    item.isMenu ? (
      <View style={styles.boxMenuProfile} key={key}>
        <View style={[styles.boxMenuItem]}>
          <TouchableDebounce
            style={styles.boxMenuItem}
            onPress={() => {
              if (item.isLogout) {
                dispatch(
                  updateShowDialogWarnAction({
                    isShowModalWarn: true,
                    isSigout: true,
                    titleHeader: '',
                    keyHeader: 'text-notification',
                    keyMessage: 'text-want-signout',
                    contentMessage: '',
                    keySubmit: 'log-out',
                  })
                );
              } else if (item.isShowInfo) {
                setIsShowViewVersion(true);
              } else if (item.navigate) {
                navigation.navigate(item.navigate);
              } else if (item?.id === 6) {
                navigation.navigate(Constant.HELP_CENTER_SCREEN);
              } else if (item?.id === 7 || item?.id === 8) {
                navigation.navigate(Constant.TERM_SCREEN, {
                  title: item?.title,
                  url: item?.url,
                });
              } else if (item.id === 5) {
                navigation.navigate(Constant.PROFILE_ACCOUNT_SECURITY_SCREEN);
              }
            }}
          >
            {item.icon}
            <CMText style={styles.textMenu} i18nKey={item.title} />
            <IconArrowRight style={styles.arrowRight} width={18} height={18} />
          </TouchableDebounce>
        </View>
      </View>
    ) : (
      <View style={styles.boxDevider} />
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackHeader handleGoBack={onBack} />,
      headerRight: () => <View />,
      headerTitle: (props) => (
        <CMText i18nKey="text-account" style={globalStyles.titleScreen} />
      ),
    });
  }, []);

  // Lay thong tin cau hinh menu ung dung
  useEffect(() => {
    getMenuApp();
  }, []);

  const getMenuApp = async () => {
    const lstMenuApp = listMenu;
    if (lstMenuApp) {
      // Lay ra danh sach cac menu duoc hien thi theo id
      const lstHienThi = lstMenuApp
        .filter((x) => x.isShow === true)
        .map((x) => x.id);
      listMenuItem = listMenuItem.filter(
        (x) =>
          lstHienThi.indexOf(x.id) !== -1 ||
          x.isMenu !== true ||
          x.isLogout === true
      );
    }
  };
  const funcGetMyInfo = async () => {
    const response = await getMyInfo();
    setData(true);
    if (response?.status) {
      setUserInfo(response?.data);
    }
  };
  useEffect(() => {
    funcGetMyInfo();
  }, [route && route?.params && route?.params?.dataBack]);

  return (
    <SafeAreaView style={styles.container}>
      {data && (
        <>
          <ScrollView
            scrollEnabled
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <LinearGradient
              colors={[
                Color.color_bg_image_profile,
                Color.color_bg_item_profile,
              ]}
              style={styles.boxInfo}
            >
              <View style={styles.boxUserInfo}>
                {userInfo?.avatar ? (
                  <FastImage
                    source={{ uri: loadFile(userInfo?.avatar) }}
                    resizeMode="contain"
                    style={styles.avatarProfile}
                  />
                ) : (
                  <FastImage
                    source={require('@assets/img/avatar-default.png')}
                    resizeMode="contain"
                    style={styles.avatarProfile}
                  />
                )}
                <View style={styles.boxProfileInfoText}>
                  <CMText
                    title={userInfo?.displayName}
                    style={styles.textProfileUsername}
                  />
                  <CMText
                    title={userInfo?.departmentName}
                    style={styles.textProfileDepartment}
                  />
                </View>
              </View>

              <View style={styles.boxViewLearnInfo}>
                <View style={styles.boxViewLearnInfoItem}>
                  <IconClass width={SIZE_ITEM} height={SIZE_ITEM} />
                  <CMText
                    style={styles.textInfoLearn}
                    title={`${userInfo?.totalClass}`}
                  />
                </View>
                <View style={styles.boxViewLearnInfoItem}>
                  <IconTest width={SIZE_ITEM} height={SIZE_ITEM} />
                  <CMText
                    style={styles.textInfoLearn}
                    title={`${userInfo?.totalTest}`}
                  />
                </View>
                <View style={styles.boxViewLearnInfoItem}>
                  <IconCertification width={SIZE_ITEM} height={SIZE_ITEM} />
                  <CMText
                    style={styles.textInfoLearn}
                    title={`${userInfo?.totalCertification}`}
                  />
                </View>
              </View>
            </LinearGradient>
            <View style={styles.boxMenuContent}>
              {listMenuItem.map((item) => (
                <ItemMenu item={item} key={item?.id} />
              ))}
            </View>
          </ScrollView>
          {isShowViewVersion && (
            <BottomSheetVersionAppInfo
              isOpenModal
              closeModal={handleCloseModal}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default React.memo(ProfileScreen);
