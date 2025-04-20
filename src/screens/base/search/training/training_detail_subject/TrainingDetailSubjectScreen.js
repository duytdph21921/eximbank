/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import BackHeader from '@components/BackHeader';
import globalStyles from '@theme/globalStyles';
import { useDispatch } from 'react-redux';
import { Color } from '@theme/colors';
import { vertical } from '@utils/scales';
import CustomTabView from '@components/CustomTabView';
import { getById } from '@services/lms/lmssubject.api';
import { updateLoadingAction } from '@store/reducers/globalSlice';
import SubjectIntroductTab from './components/SubjectIntroductTab';
import SubjectListClassTab from './components/SubjectListClassTab';

const TrainingDetailSubjectScreen = (props) => {
  const { navigation, route } = props;
  const { itemSubject, trainingInfo } = route?.params || {};
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [dataIntroduct, setDataIntroduct] = useState();
  const isMounteRef = useRef(false);

  const onBack = () => {
    navigation.goBack();
  };

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText title={itemSubject?.title} style={globalStyles.titleScreen} numberOfLines={1} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);

  const funcGetById = async () => {
    const response = await getById(itemSubject?.id);
    if (response?.status && isMounteRef.current) {
      setDataIntroduct(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetById();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const renderRoute1 = () => (
    <SubjectIntroductTab subjectData={dataIntroduct} navigation={navigation} index={index} />
  );
  const renderRoute2 = () => (
    <SubjectListClassTab
      subjectData={itemSubject}
      trainingInfo={trainingInfo}
      navigation={navigation}
      index={index}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <CustomTabView
        style={styles.tabBar}
        onIndexChange={(index) => setIndex(index)}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-introduction-class' },
          { key: 'second', title: 'text-list-class' },
        ]}
      />
    </SafeAreaView>
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
export default TrainingDetailSubjectScreen;
