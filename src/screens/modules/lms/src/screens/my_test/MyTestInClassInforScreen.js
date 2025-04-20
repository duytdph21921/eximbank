/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomTabView from '@components/CustomTabView';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import {
  updateLoadingAction,
  updateParamTestInClassInforScreen,
} from '@store/reducers/globalSlice';
import Constant from '@utils/constants';
import BackHeader from '@components/BackHeader';
import * as signalR from '@microsoft/signalr';
import { enviroment } from '@assets/enviroment/enviroment.default';
import { frGetById } from '../../services/lmsclasscontent.api';
import { styles } from './MyTestInClassInforScreen.styles';
import { getTestFormInfo } from '../../services/testclassusertest.api';
import TabExamResult from './components/TabExamResult';
import TabInformation from './components/TabInformation';
import { storage } from '@utils/storage';

const MyTestInClassInforScreen = (props) => {
  const { navigation, route } = props;
  const { content, classUserId, classId, learningId, classInfo } =
    route?.params;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [dataInformation, setDataInformation] = useState();
  const [dataResult, setDataResult] = useState();
  const [isPassWord, setIsPassword] = useState();
  const isMounteRef = useRef(false);
  const paramsTestInClassInforScreen = useSelector(
    (state) => state.global.paramsTestInClassInforScreen
  );
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  /**
   * Custom header screeen.
   */
  const renderHeaderRight = () => <View />;
  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderTitle = () => (
    <CMText title={content?.title} style={globalStyles.titleScreen} />
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      headerTitle: renderHeaderTitle,
    });
  }, [navigation]);
  const onBack = () => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection.stop();
    }
    navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
      id: classId,
      indexTab: 1,
    });
    return true;
  };
  /**
   * Check call api lúc vào lần đầu và goBack();
   */
  useEffect(() => {
    if (learningId && !classInfo?.isCloseClass) {
      const socketUrl = `${storage.getString(
        Constant.DOMAIN
      )}${enviroment.apiDomain.lrsEndpoint}?learningId=${learningId}`;
      connection = new signalR.HubConnectionBuilder()
        .withUrl(socketUrl, {
          accessTokenFactory: async () =>
            storage.getItemString(Constant.KEY_USER_TOKEN),
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          logger: signalR.LogLevel.None,
        })
        .build();
      connection
        .start()
        .then(() => {
          clearTimeout(socketHanderId);
          socketHanderId = setTimeout(() => {
            if (connection.state === signalR.HubConnectionState.Disconnected) {
              connection.start();
            }
          }, 5000);
          connection.on('doViewContineContent', async () => {});
        })
        .catch(() => {});
    }
    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, []);

  const funcFrGetById = async () => {
    const response = await frGetById(content?.id);
    if (response?.status && response?.data && isMounteRef.current) {
      setIsPassword(response?.data?.isPassWord);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    funcFrGetById();

    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const funcGetTestFormInfo = async () => {
    const params = {
      testFormId:
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.testFormId
          : content?.contentOpenId,
      classContentId:
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classContentId
          : content?.id,
      classUserId:
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classUserId
          : classUserId,
    };
    const response = await getTestFormInfo(params);
    if (response?.status && isMounteRef.current) {
      dispatch(
        updateParamTestInClassInforScreen({
          testFormId:
            route?.params && route?.params?.callBack
              ? paramsTestInClassInforScreen?.testFormId
              : content?.contentOpenId,
          classContentId:
            route?.params && route?.params?.callBack
              ? paramsTestInClassInforScreen?.classContentId
              : content?.id,
          classUserId:
            route?.params && route?.params?.callBack
              ? paramsTestInClassInforScreen?.classUserId
              : classUserId,
          classId:
            route?.params && route?.params?.callBack
              ? paramsTestInClassInforScreen?.classId
              : classId,
          dataInformation: response?.data,
          dataResult: response?.data?.listResult,
        })
      );
      setDataInformation(response?.data);
      setDataResult(response?.data?.listResult);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    funcGetTestFormInfo();
    dispatch(updateLoadingAction(false));

    return () => {
      isMounteRef.current = false;
    };
  }, [route && route.params && route.params.dataBack]);

  const renderRoute1 = () => (
    <TabInformation
      navigation={navigation}
      type={activeTab}
      data={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.dataInformation
          : dataInformation
      }
      isCurrentTestStatus={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.dataInformation?.currentTestStatus
          : dataInformation?.currentTestStatus
      }
      classId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classId
          : classId
      }
      classContentId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classContentId
          : content?.id
      }
      classUserId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classUserId
          : classUserId
      }
      testFormId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.testFormId
          : content?.contentOpenId
      }
      content={content}
      isPassWord={isPassWord}
    />
  );

  const renderRoute2 = () => (
    <TabExamResult
      navigation={navigation}
      type={activeTab}
      data={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.dataResult
          : dataResult
      }
      dataInformation={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.dataInformation
          : dataInformation
      }
      isCurrentTestStatus={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.dataInformation?.currentTestStatus
          : dataInformation?.currentTestStatus
      }
      classId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classId
          : classId
      }
      classContentId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classContentId
          : content?.id
      }
      classUserId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.classUserId
          : classUserId
      }
      testFormId={
        route?.params && route?.params?.callBack
          ? paramsTestInClassInforScreen?.testFormId
          : content?.contentOpenId
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomTabView
        style={styles.tabBar}
        onIndexChange={(index) => setActiveTab(index)}
        firstRoute={renderRoute1}
        secondRoute={renderRoute2}
        routes={[
          { key: 'first', title: 'text-tab-general-information' },
          { key: 'second', title: 'text-tab-result-exam' },
        ]}
      />
    </SafeAreaView>
  );
};

export default MyTestInClassInforScreen;
