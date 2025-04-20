/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from '@base/home/HomeScreen.styles';
import FooterHomeComponent from '@base/home/components/FooterHomeComponent';
import HeaderHome from '@base/home/components/HeaderHome';
import HeaderHomeComponent from '@base/home/components/HeaderHomeComponent';
import Constant from '@utils/constants';
import {
  myClassInHome,
  newClassInHome,
  outstandingClassInHome,
  topSuggestClassInHome,
} from '@services/lms/lmsclass.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getClassCategoryInHome } from '@services/lms/lmsclasscategory.api';
import { getListModule } from '@services/authentication/systemsettings.api';
import { myTestInHome } from '@services/test/testregistortestform.api';
import { getNotificationUnRead } from '@services/lms/notification.api';
import { getSlideHome } from '@services/lms/lmsslideimages.api';
import notifee from '@notifee/react-native';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation, route } = props;
  const [isRefreshing, setRefreshing] = useState(false);
  const isMounteRef = useRef(false);
  const [listSlideBanner, setListSlideBanner] = useState([]);
  const [listIndexLearning, setlistIndexLearning] = useState([]);
  const [listMyClass, setListMyClass] = useState([]);
  const [listMyTest, setListMyTest] = useState([]);
  const [listFeaturedClassCategory, setListFeaturedClassCategory] = useState([]);
  const [listNewClass, setListNewClass] = useState([]);
  const [listOutstanding, setListOutstanding] = useState([]);
  const [listSuggestions, setListSuggestions] = useState([]);
  const [notificationUnRead, setNotificationUnRead] = useState(0);
  const [reloadNotification, setReloadNotification] = useState();
  const onPressProfile = useCallback(() => {
    navigation.navigate(Constant.PROFILE_STACK, {
      screen: Constant.PROFILE_SCREEN,
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderHome
          onPressProfile={onPressProfile}
          onPressQRCode={() => {
            navigation.navigate(Constant.QRCODE_SCREEN);
          }}
          onPressNotification={() => {
            navigation.navigate(Constant.NOTIFICATION_SCREEN);
          }}
          notificationUnRead={notificationUnRead}
        />
      ),
      title: '',
    });
  }, [reloadNotification]);

  useEffect(() => {
    dispatch(updateLoadingAction(true));
    getAllData();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, [route && route.params && route.params.dataBack]);

  /**
   * Get data banner.
   */
  const getAllData = async () => {
    isMounteRef.current = true;
    const response = await getSlideHome();
    if (response?.status) {
      if (isMounteRef.current) {
        setListSlideBanner(response?.data);
      }
    }

    const response1 = await getListModule();
    if (response1?.status) {
      if (isMounteRef.current) {
        setlistIndexLearning(response1?.data?.listModule);
      }
    }

    const response2 = await myClassInHome();
    if (response2?.status) {
      if (isMounteRef.current) {
        setListMyClass(response2?.data);
      }
    }

    const response3 = await myTestInHome();
    if (response3?.status) {
      if (isMounteRef.current) {
        setListMyTest(response3?.data);
      }
    }

    const response4 = await getClassCategoryInHome();
    if (response4?.status) {
      if (isMounteRef.current) {
        setListFeaturedClassCategory(response4?.data);
        setReloadNotification(Math.random().toString(36).slice(2, 7));
      }
    }

    const response5 = await newClassInHome();
    if (response5?.status) {
      if (isMounteRef.current) {
        setListNewClass(response5?.data);
      }
    }

    const response6 = await outstandingClassInHome();
    if (response6?.status) {
      if (isMounteRef.current) {
        setListOutstanding(response6?.data);
      }
    }

    const response7 = await topSuggestClassInHome();
    if (response7?.status) {
      if (isMounteRef.current) {
        setListSuggestions(response7?.data);
      }
    }

    const response8 = await getNotificationUnRead();
    if (response8?.success) {
      if (isMounteRef.current) {
        setNotificationUnRead(response8?.data ?? 0);
        if (response8?.data > 0) {
          await notifee.setBadgeCount(response8?.data);
        }
        setReloadNotification(Math.random().toString(36).slice(2, 7));
      }
    }

    return () => {
      isMounteRef.current = false;
    };
  };

  const onRefresh = () => {
    getAllData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        overScrollMode="never"
        initialNumToRender={10}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={50}
        bounce={false}
        keyExtractor={(_item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <HeaderHomeComponent
            navigation={navigation}
            listSlideBanner={listSlideBanner}
            listIndexLearning={listIndexLearning}
            listMyClass={listMyClass}
            listMyTest={listMyTest}
            listFeaturedClassCategory={listFeaturedClassCategory}
          />
        }
        ListFooterComponent={
          <FooterHomeComponent
            listNewClass={listNewClass}
            listOutstanding={listOutstanding}
            listSuggestions={listSuggestions}
            navigation={navigation}
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
