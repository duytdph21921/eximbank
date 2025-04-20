/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, View, BackHandler } from 'react-native';
import CMText from '@components/CMText';
import IconMessage from '@assets/icons/icon_notification_detail.svg';
import { horizontal } from '@utils/scales';
import TouchableDebounce from '@components/TouchableDebounce';
import RenderHtml from 'react-native-render-html';
import { screenWidth } from '@utils/platforms';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import Constant from '@utils/constants';
import BackHeader from '@components/BackHeader';
import { styles } from './NotificationClassDetailScreen.styles';

const NotificationClassDetailScreen = (props) => {
  const { navigation, route } = props;
  const params = route?.params;
  const source = {
    html: params?.message?.content,
  };
  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;
  const renderHeaderRight = () => <View />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: '',
    });
  }, [navigation]);

  /**
   * Back to previous screen
   */
  const onBack = useCallback(() => {
    navigation.navigate(Constant.NOTIFICATION_SCREEN, { callBack: true });
    return true;
  }, []);

  /**
   * Back hander.
   */
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <IconMessage width={67} height={67} />
        <CMText title={params?.message?.title} style={styles.textTitle} />
        <RenderHtml
          contentWidth={screenWidth - horizontal(2 * 20)}
          source={source}
          tagsStyles={mixedStyle}
        />
      </ScrollView>
      <TouchableDebounce style={[styles.btnConfim]}>
        <CMText i18nKey="text-confim" style={[styles.textBtnConfim]} />
      </TouchableDebounce>
      <CMText i18nKey="text-contact" style={styles.textContact} />
    </SafeAreaView>
  );
};

const mixedStyle = {
  p: {
    color: Color.text_color,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.medium,
  },
};
export default NotificationClassDetailScreen;
