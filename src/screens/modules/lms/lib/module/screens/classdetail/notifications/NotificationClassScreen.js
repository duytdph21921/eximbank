"use strict";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import IconAddCourse from '@assets/icons/icon_add_course';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import IconDost from '@assets/icons/icon_dots.svg';
import { calculatorTime } from '@utils/helpers';
import { styles } from "./NotificationClassScreen.styles.js";
import { getNotification } from "../../../services/lmsclassnotification.api.js";
import BottomSheetNotification from "../../../component/BottomSheetNotification/index.js";
import ViewNotificationClassEmpty from "./components/ViewNotificationClassEmpty.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NotificationClassScreen = props => {
  const {
    classInfo,
    index
  } = props;
  const dispatch = useDispatch();
  const languageLocal = useSelector(state => state.global.language);
  const [listNotification, setListNotification] = useState([]);
  const isRefreshing = false;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isMounteRef = useRef(false);
  const [params, setParams] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    classId: classInfo?.id
  });
  const funcGetNotification = async model => {
    const response = await getNotification(model);
    if (response?.status && isMounteRef.current) {
      setListNotification(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    if (index === 5) {
      dispatch(updateLoadingAction(true));
      funcGetNotification(params);
      dispatch(updateLoadingAction(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  /**
   * handle refresh list notification.
   */
  const onRefresh = () => {
    funcGetNotification(params);
  };
  const itemNotification = item => {
    const source = {
      html: item?.content
    };
    return /*#__PURE__*/_jsx(TouchableDebounce, {
      activeOpacity: 1,
      style: [styles.viewItemNoti, {
        marginVertical: 15
      }],
      children: /*#__PURE__*/_jsxs(View, {
        style: styles.viewContent,
        children: [/*#__PURE__*/_jsxs(View, {
          style: styles.viewTitle,
          children: [/*#__PURE__*/_jsx(CMText, {
            title: item?.title,
            numberOfLines: 1,
            style: styles.textTitle
          }), /*#__PURE__*/_jsx(CMText, {
            title: calculatorTime(item?.createdDate, languageLocal),
            style: styles.textTime
          })]
        }), /*#__PURE__*/_jsxs(View, {
          style: styles.viewTitleDetail,
          children: [/*#__PURE__*/_jsx(IconAddCourse, {
            width: 24,
            height: 24
          }), /*#__PURE__*/_jsx(CMText, {
            title: item?.createdUserDisplayName,
            numberOfLines: 1,
            style: styles.textDetail
          }), item?.isRead !== Constant.IS_READ && /*#__PURE__*/_jsx(IconDost, {
            width: 8,
            height: 8
          })]
        })]
      })
    });
  };
  return /*#__PURE__*/_jsxs(SafeAreaView, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(FlatList, {
      refreshControl: /*#__PURE__*/_jsx(RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      data: listNotification,
      renderItem: ({
        item,
        index
      }) => itemNotification(item, index),
      ListEmptyComponent: /*#__PURE__*/_jsx(ViewNotificationClassEmpty, {}),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false,
      style: {
        paddingTop: 10
      }
    }), /*#__PURE__*/_jsx(BottomSheetNotification, {
      isOpenModal: isOpenModal,
      closeModal: () => {
        setIsOpenModal(false);
      },
      filter: params?.type,
      handleApplyOnPress: select => {
        const params = {
          keyword: '',
          type: select
        };
        setParams(params);
        // getDataNotification(params);
      }
    })]
  });
};
export default NotificationClassScreen;
//# sourceMappingURL=NotificationClassScreen.js.map