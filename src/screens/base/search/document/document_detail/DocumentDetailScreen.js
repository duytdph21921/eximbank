/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { getById } from '@services/lms/lmscontent.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import CustomTabView from '@components/CustomTabView';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import Constant from '@utils/constants';
import DocumentIntroduction from './DocumentIntroduction';

const DocumentDetailScreen = (props) => {
  const { navigation, route } = props;
  const { contentDetail } = route?.params;
  const onBack = () => {
    navigation.navigate(Constant.SEARCH_SCREEN, {
      callBack: true,
      dataBack: Math.random().toString(36).slice(2, 7),
    });
    return true;
  };
  const [contentInfo, setContentInfo] = useState();
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText title={contentDetail?.title} style={globalStyles.titleScreen} numberOfLines={2} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);
  const funcGetContentById = async () => {
    const response = await getById(contentDetail?.id);
    if (response?.status) {
      if (isMounteRef.current) {
        setContentInfo(response?.data);
      }
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetContentById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [route && route?.params && route?.params?.callBack]);
  const renderRoute1 = useCallback(
    () => <DocumentIntroduction contentInfo={contentInfo} navigation={navigation} />,
    [contentInfo, navigation],
  );
  const renderRoute2 = () => (
    <View style={{ marginHorizontal: horizontal(24) }}>
      <CMText i18nKey="text-comming-soon" />
    </View>
  );
  return (
    <View style={styles.container}>
      <CustomTabView
        style={styles.tabBar}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-introduction-class' },
          { key: 'second', title: 'text-tab-related-document' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingBottom: 25,
  },
  tabBar: {
    backgroundColor: Color.color_bg_tab_view,
    marginTop: vertical(10),
  },
});

export default DocumentDetailScreen;
