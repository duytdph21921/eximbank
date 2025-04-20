/* eslint-disable react-hooks/exhaustive-deps */
import he from 'he';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import IconAddCourse from '@assets/icons/icon_add_course';
import IconDost from '@assets/icons/icon_dots.svg';
import IconFilter from '@assets/icons/icon_filter.svg';
import BackHeader from '@components/BackHeader';
import BottomSheetNotification from '@/screens/base/components/BottomSheetNotification';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import globalStyles from '@theme/globalStyles';
import { calculatorTime, replaceHtml } from '@utils/helpers';
import { feGetNotification, updateNotificationIsRead } from '@services/lms/notification.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { styles } from './NotificationScreen.styles';
import ViewNotificationEmpty from './components/ViewNotificationEmpty';

const NotificationScreen = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const languageLocal = useSelector((state) => state.global.language);
  const [listNotification, setListNotification] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [isLoadMore, setLoadMore] = useState(false);
  const [countNoti, setCountNoti] = useState(0);

  const [params, setParams] = useState({
    keyword: '',
    type: -1,
    pageIndex: offset,
    pageSize: limit,
  });
  const isMounteRef = useRef(false);

  /**
   * Back to previous screen
   */
  const onBack = useCallback(() => {
    navigation.navigate(Constant.HOME_SCREEN, {
      dataBack: Math.random().toString(36).slice(2, 7),
    });
    return true;
  }, []);

  const renderHeaderRight = () => (
    <TouchableDebounce
      style={styles.btnFilterHeader}
      onPress={() => {
        setIsOpenModal(true);
      }}
    >
      <IconFilter width={24} height={24} />
    </TouchableDebounce>
  );

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderTitle = () => (
    <CMText i18nKey="text-tab-notification" style={globalStyles.titleScreen} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const funcFeGetNotification = async () => {
    const response = await feGetNotification(params);
    if (response?.status && isMounteRef.current) {
      setListNotification(response?.data);
      setCountNoti(response?.metaData?.totalRecord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcFeGetNotification();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, [route && route.params && route.params.dataBack]);

  /**
   * Get data notification.
   */
  const getDataNotification = async (params, isRefresh = false) => {
    const response = await feGetNotification(params);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListNotification(response?.data);
      } else {
        setOffset(offset + 10);
        setListNotification([...listNotification, ...response?.data]);
      }
      setCountNoti(response?.metaData?.totalRecord);
    }
  };

  /**
   * handle refresh list notification.
   */
  const onRefresh = () => {
    const newParams = { ...params, pageIndex: 0 };
    setParams(newParams);
    setOffset(0);
    getDataNotification(newParams, true);
  };

  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (
      !isLoadMore &&
      !this.onEndReachedCalledDuringMomentum &&
      listNotification?.length < countNoti
    ) {
      setLoadMore(true);
      const newParams = { ...params, pageIndex: offset + 10 };
      getDataNotification(newParams);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  /**
   * On handle click item notification.
   */
  const onPressNotification = async (item) => {
    await updateNotificationIsRead(item.id);
    navigation.navigate(Constant.NOTIFICATION_DETAIL_SCREEN, item);
  };

  /**
   * Render item notification.
   */
  const itemNotification = (item) => (
    <TouchableDebounce style={styles.viewItemNoti} onPress={() => onPressNotification(item)}>
      <IconAddCourse width={40} height={40} />
      <View>
        <View style={styles.viewTitle}>
          <CMText title={item?.message} numberOfLines={1} style={styles.textTitle} />
          <CMText
            title={calculatorTime(item?.thietLapNgayGui, languageLocal)}
            style={styles.textTime}
          />
        </View>
        <View style={styles.viewTitleDetail}>
          <CMText
            title={`${he.decode(replaceHtml(item?.message?.content ?? ''))} `}
            style={styles.textDetail}
            numberOfLines={1}
          />
          {item?.isRead !== Constant.IS_READ && <IconDost width={8} height={8} />}
        </View>
      </View>
    </TouchableDebounce>
  );

  const RenderBottomFilter = useCallback(
    () => (
      <BottomSheetNotification
        isOpenModal={isOpenModal}
        closeModal={() => {
          setIsOpenModal(false);
        }}
        filter={params?.type}
        handleApplyOnPress={(type) => {
          const newParams = {
            ...params,
            type,
            pageIndex: 0,
          };
          setOffset(0);
          setParams(newParams);
          setIsOpenModal(false);
          getDataNotification(newParams, true);
        }}
      />
    ),
    [isOpenModal],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        onEndReached={() => {
          handleLoadMore();
        }}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
        data={listNotification}
        renderItem={({ item, index }) => itemNotification(item, index)}
        ListEmptyComponent={<ViewNotificationEmpty />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <RenderBottomFilter />
    </SafeAreaView>
  );
};

export default NotificationScreen;
