/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import useGoBackHandler from '@hooks/useGoBackHandler';
import IconNotificationDetail from '@assets/icons/icon_notification_detail';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { updateNotificationIsRead } from '@services/lms/notification.api';
import he from 'he';
import { replaceHtml } from '@utils/helpers';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { styles } from './NotificationDetailScreen.styles';

const NotificationDetailScreen = (props) => {
  const { navigation, route } = props;
  const params = route?.params;
  const isMounteRef = useRef(false);
  const [notificationInfo, setNotificationInfo] = useState();
  const dispatch = useDispatch();

  const onBack = useCallback(() => {
    navigation.navigate(Constant.NOTIFICATION_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
    });
    return true;
  }, [navigation]);

  const headerRight = () => <View />;

  const headerLeft = () => <BackHeader handleGoBack={onBack} />;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
      headerLeft,
      title: '',
    });
  }, [navigation, onBack]);

  useGoBackHandler(() => {
    navigation.navigate(Constant.NOTIFICATION_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
    });
    return true;
  }, {});

  const funcUpdateNotificationIsRead = async () => {
    const response = await updateNotificationIsRead(params?.id);
    if (response?.status && isMounteRef.current) {
      const message = response?.data?.message;
      const messageJson = JSON.parse(message);
      setNotificationInfo(messageJson);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcUpdateNotificationIsRead();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView
          scrollEnabled
          bounces={false}
          style={styles.scrollStyle}
          showsVerticalScrollIndicator={false}
        >
          <IconNotificationDetail width={67} height={67} />
          <CMText title={notificationInfo?.Title ?? ''} style={styles.textTitle} />
          <CMText
            title={`${he.decode(replaceHtml(notificationInfo?.Content ?? ''))} `}
            style={styles.textDetail}
          />
        </ScrollView>
      </View>

      <TouchableDebounce
        style={[
          styles.btnEnterExam,
          {
            backgroundColor: Color.base_color,
          },
        ]}
      >
        <CMText i18nKey="text-confim" style={[styles.textBtnConfim]} />
      </TouchableDebounce>
      <CMText i18nKey="text-contact" style={styles.textContact} />
    </SafeAreaView>
  );
};

export default NotificationDetailScreen;
