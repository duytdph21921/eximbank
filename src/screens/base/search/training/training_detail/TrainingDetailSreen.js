/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import CustomTabView from '@components/CustomTabView';
import { vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import { useDispatch } from 'react-redux';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import { getById } from '@services/lms/lmstraining.api';
import TrainingIntroductTab from './components/TrainingIntroductTab';
import ListSubjectTab from './components/ListSubjectTab';

const TrainingDetailSreen = (props) => {
  const { navigation, route } = props;
  const { trainingDetail } = route?.params ?? {};

  const onBack = () => {
    navigation.goBack();
  };
  const [index, setIndex] = useState(0);
  const [trainingInfo, setTrainingInfo] = useState();
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText title={trainingDetail?.title} style={globalStyles.titleScreen} numberOfLines={1} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);
  const funcGetTrainingById = async () => {
    const response = await getById(trainingDetail?.id);
    if (response?.status) {
      setTrainingInfo(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetTrainingById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const renderRoute1 = () => (
    <TrainingIntroductTab trainingInfo={trainingInfo} navigation={navigation} index={index} />
  );
  const renderRoute2 = () => (
    <ListSubjectTab trainingInfo={trainingInfo} navigation={navigation} index={index} />
  );
  return (
    <View style={styles.container}>
      <CustomTabView
        style={styles.tabBar}
        onIndexChange={(index) => setIndex(index)}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-introduction-class' },
          { key: 'second', title: 'text-list-subject' },
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

export default TrainingDetailSreen;
