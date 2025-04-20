/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { vertical } from '@utils/scales';
import BackHeader from '@components/BackHeader';
import CMText from '@components/CMText';
import CustomTabView from '@components/CustomTabView';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';
import { updateLoadingAction, updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import {
  frUserRegisterClass,
  frUserUnRegisterClass,
  getInfoById,
} from '@services/lms/lmsclass.api';
import ClassContentDetail from './ClassContentDetail';
import ClassIntroductionTab from './ClassIntroductionTab';

const ClassSearchDetailScreen = (props) => {
  const { navigation, route } = props;
  const { classDetail } = route?.params;
  const [activeTab, setActiveTab] = useState(0);
  const [classInfo, setClassInfo] = useState();
  const isMounteRef = useRef(false);
  const dispatch = useDispatch();

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  const renderHeaderTitle = () => (
    <CMText title={classDetail?.title ?? ''} style={globalStyles.titleScreen} numberOfLines={1} />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle,
    });
  }, []);
  const funcGetInfoById = async () => {
    const response = await getInfoById(classDetail?.id);
    if (response?.status && isMounteRef.current) {
      setClassInfo(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetInfoById();
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const onBack = () => {
    navigation.goBack();
  };

  const getData = async () => {
    funcGetInfoById();
  };
  const onRegistorClass = async (event) => {
    if (event === 1 || event === 2) {
      const response = await frUserRegisterClass(classInfo?.id);
      if (response?.status) {
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-tab-notification',
            keyMessage: 'text-notify-tb10',
            contentMessage: '',
            isShowCancel: false,
            isShowSubmit: false,
          }),
        );
        if (classInfo?.registerType === 1 && classInfo?.statusClass === 3) {
          setTimeout(() => {
            navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
              id: classInfo?.id,
              indexTab: 1,
            });
          }, 1000);
        } else {
          getData();
        }
      } else {
        let codeError = 'INTERNAL_ERROR';
        if (response?.code) {
          codeError = response?.code;
        }
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-title-dialog-warn',
            keyMessage: codeError,
            contentMessage: '',
            isShowCancel: false,
            isShowSubmit: false,
          }),
        );
      }
    } else if (event === 7) {
      navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
        id: classDetail?.id,
        indexTab: 1,
      });
    } else if (event === 9) {
      const response = await frUserUnRegisterClass(classInfo?.id);
      if (response?.status) {
        getData();
      } else {
        let codeError = 'INTERNAL_ERROR';
        if (response?.code) {
          codeError = response?.code;
        }
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-title-dialog-warn',
            keyMessage: codeError,
            contentMessage: '',
            isShowCancel: false,
            isShowSubmit: false,
          }),
        );
      }
    }
  };
  const onUnRegistorClass = async (event) => {
    if (event === 8) {
      const response = await frUserUnRegisterClass(classInfo?.id);
      if (response?.status) {
        getData();
      } else {
        let codeError = 'INTERNAL_ERROR';
        if (response?.code) {
          codeError = response?.code;
        }
        dispatch(
          updateShowDialogWarnAction({
            isShowModalWarn: true,
            isSigout: false,
            titleHeader: '',
            keyHeader: 'text-tab-notification',
            keyMessage: codeError,
            contentMessage: '',
            isShowCancel: false,
            isShowSubmit: false,
          }),
        );
      }
    }
  };
  const renderRoute1 = () => (
    <ClassIntroductionTab
      classInfo={classInfo}
      handelJoinClass={onRegistorClass}
      handelUnRegisterClass={onUnRegistorClass}
    />
  );
  const renderRoute2 = () => (
    <ClassContentDetail
      classId={classInfo?.id}
      classInfo={classInfo}
      handelJoinClass={onRegistorClass}
      handelUnRegisterClass={onUnRegistorClass}
    />
  );
  return (
    <View style={styles.container}>
      <CustomTabView
        style={styles.tabBar}
        activeTab={activeTab}
        onIndexChange={(index) => setActiveTab(index)}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-introduction-class' },
          { key: 'second', title: 'text-content-class' },
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

export default ClassSearchDetailScreen;
