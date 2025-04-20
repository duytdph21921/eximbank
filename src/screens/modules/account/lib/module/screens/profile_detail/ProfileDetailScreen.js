"use strict";

/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Constant from '@utils/constants';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import { getUserInfoDetail } from "../../services/hr/hrprofile.api.js";
import { styles } from "./ProfileDetailScreen.style.js";
import HeaderDetailProfile from "./component/HeaderProfileDetail.js";

// ProfileDetailScreen.propTypes = {};

// ProfileDetailScreen.defaultProps = {};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const ProfileDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const [data, setData] = useState(false);
  const [dataUser, setDataUser] = useState();
  const onBack = () => {
    navigation.navigate(Constant.PROFILE_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7)
    });
  };
  const renderHeaderLeft = () => /*#__PURE__*/_jsx(BackHeader, {
    handleGoBack: onBack
  });
  const renderHeaderRight = () => /*#__PURE__*/_jsx(View, {});
  const renderHeaderTitle = () => /*#__PURE__*/_jsx(CMText, {
    i18nKey: "text-profile-info",
    style: globalStyles.titleScreen
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
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
  const renderViewInfor = (i18nTitle, value) => /*#__PURE__*/_jsxs(View, {
    style: styles.boxItem,
    children: [/*#__PURE__*/_jsx(CMText, {
      i18nKey: i18nTitle,
      style: styles.textLabel
    }), /*#__PURE__*/_jsx(CMText, {
      title: value,
      style: styles.textNomal
    })]
  });
  const onEditProfile = () => {
    navigation.navigate(Constant.PROFILE_DETAIL_EDIT_SCREEN);
  };
  const onChangePassword = () => {
    navigation.navigate(Constant.PROFILE_CHANGE_PASSWORD_SCREEN);
  };
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: data ? /*#__PURE__*/_jsxs(ScrollView, {
      scrollEnabled: true,
      bounces: false,
      showsVerticalScrollIndicator: false,
      style: styles.contentBox,
      children: [/*#__PURE__*/_jsx(HeaderDetailProfile, {
        avatar: dataUser?.avatar,
        displayName: dataUser?.displayName,
        email: dataUser?.email
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.boxInfomation,
        children: [renderViewInfor('text-displayname', dataUser?.displayName), renderViewInfor('text-email', dataUser?.email), renderViewInfor('text-position-name', dataUser?.positionName), renderViewInfor('text-department-name', dataUser?.departmentName), renderViewInfor('ext-mobile-phone', dataUser?.mobile)]
      }), /*#__PURE__*/_jsxs(View, {
        style: styles.boxAction,
        children: [/*#__PURE__*/_jsx(TouchableDebounce, {
          onPress: onEditProfile,
          style: [styles.btnEdit, {
            backgroundColor: Color.base_color,
            borderColor: Color.base_color
          }],
          children: /*#__PURE__*/_jsx(CMText, {
            style: [styles.whiteColor, styles.textBtn],
            i18nKey: "text-btn-edit-infomation"
          })
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          onPress: onChangePassword,
          style: styles.btnDefault,
          children: /*#__PURE__*/_jsx(CMText, {
            style: styles.textBtn,
            i18nKey: "text-btn-change-password"
          })
        })]
      })]
    }) : /*#__PURE__*/_jsx(_Fragment, {})
    // <ProfileScreenPlaceholder />
  });
};
export default /*#__PURE__*/React.memo(ProfileDetailScreen);
//# sourceMappingURL=ProfileDetailScreen.js.map