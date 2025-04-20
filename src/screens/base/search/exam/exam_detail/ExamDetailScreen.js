/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { getDetailById } from '@services/test/testregistor.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import CustomTabView from '@components/CustomTabView';
import { vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import ListExamScreen from './ListExamScreen';
import ExamIntroduction from './ExamIntroduction';

const ExamDetailScreen = (props) => {
  const { navigation, route } = props;
  const { contentDetail } = route?.params ?? {};
  const onBack = () => {
    navigation.goBack();
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

  const funcGetDetailById = async () => {
    const response = await getDetailById(contentDetail?.id);
    if (response?.status && isMounteRef.current) {
      setContentInfo(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetDetailById();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, [route && route.params && route.params.callBack]);
  const renderRoute1 = () => <ExamIntroduction contentInfo={contentInfo} navigation={navigation} />;
  const renderRoute2 = () => <ListExamScreen contentInfo={contentInfo} navigation={navigation} />;
  return (
    <View style={styles.container}>
      <CustomTabView
        style={styles.tabBar}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-introduction-class' },
          { key: 'second', title: 'text-title-list-test' },
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

export default ExamDetailScreen;
