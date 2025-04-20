/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BackHandler, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { horizontal } from '@utils/scales';
import BackHeader from '@components/BackHeader';
import ViewDocument from '@components/ViewDocument';
import ViewScorm from '@components/ViewScorm';
import { GetTypeContent, loadFile } from '@utils/helpers';
import ViewPlayAudio from '@components/ViewPlayAudio';
import * as signalR from '@microsoft/signalr';
import { enviroment } from '@assets/enviroment/enviroment.default';
import ViewVideo from '@components/ViewVideo';
import ViewContent from '@components/ViewContent';
import ViewTincan from '@components/ViewTincan';
import { Color } from '@theme/colors';
import { storage } from '@utils/storage';
import { frGetById } from '../../../services/lmsclasscontent.api';
import { updateLastState } from '../../../services/lmsclassuserlearning.api';

const ViewContentScreen = (props) => {
  const { route, navigation } = props;
  const { content, learning, classInfo } = route.params;
  const [classContent, setClassContent] = useState(content);
  const [showHeader, setShowHeader] = useState();
  const isMounteRef = useRef(false);
  const userState = useSelector((state) => state.auth.userState);
  const currentTimeRef = useRef(0); // Cho noi dung dang video

  const username = userState?.userData?.name ?? '';
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  /**
   * Back to previous screen
   */
  const onBack = async () => {
    // Ngat ket noi socket
    if (content?.typeId === GetTypeContent.video) {
      // call api de cap nhat vi tri video hoc cuoi cung
      const model = {
        eventName: 'VIDEO_TIME_UPDATE',
        learningId: learning?.id,
        id: content?.id,
        data: currentTimeRef?.current ?? 0,
      };
      await updateLastState(model);
    }
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      // Neu noi dung la video thi phai luu lai state seek cho video xong moi ngat ket noi socket
      connection.stop();
    }
    navigation.goBack();
  };

  /**
   * Back hander.
   */
  const funcFrGetById = async () => {
    const response = await frGetById(content?.id);
    if (response?.status && response?.data && isMounteRef.current) {
      setClassContent(response?.data);
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    funcFrGetById();
    if (
      learning?.id &&
      !classInfo?.isCloseClass &&
      !classInfo?.isNotStartClass
    ) {
      const socketUrl = `${storage.getString(
        Constant.DOMAIN
      )}${enviroment.apiDomain.lrsEndpoint}?learningId=${learning?.id}`;
      connection = new signalR.HubConnectionBuilder()
        .withUrl(socketUrl, {
          accessTokenFactory: async () =>
            storage.getString(Constant.KEY_USER_TOKEN),
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
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      isMounteRef.current = false;
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);
  const handleCallBackCurrentTime = async (currentTimeVideo) => {
    const seekTime = Number.parseInt(currentTimeVideo ?? 0, 10);
    // setLastTime(seekTime);
    currentTimeRef.current = seekTime;
  };
  const renderHeaderRight = () => <View style={styles.viewIconRight} />;
  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: content && !showHeader,
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      title: content?.title,
    });
  }, [navigation, content && content.typeId, showHeader]);
  const handleRouteScreen = useCallback((event) => {
    setShowHeader(event);
  });
  return (
    <SafeAreaView style={styles.container}>
      {classContent && classContent.typeId === GetTypeContent.audio && (
        <ViewPlayAudio fileId={classContent.fileId} />
      )}
      {classContent && classContent.typeId === GetTypeContent.document && (
        <ViewDocument fileId={classContent.fileId} />
      )}
      {classContent && classContent.typeId === GetTypeContent.video && (
        <View style={styles.video}>
          <ViewVideo
            fileId={classContent.fileId}
            navigation={navigation}
            handleRouteScreen={handleRouteScreen}
            currentTime={learning?.lastState ?? 0}
            onSaveLastTime={handleCallBackCurrentTime}
          />
        </View>
      )}
      {classContent && classContent.typeId === GetTypeContent.scorm && (
        <ViewScorm
          fileId={classContent.fileId}
          learningId={learning?.id}
          username={username}
          contentId={classContent?.id}
          title={classContent?.title}
          navigation={navigation}
          handleRouteScreen={handleRouteScreen}
        />
      )}
      {classContent && classContent.typeId === GetTypeContent.tincam && (
        <ViewTincan
          fileId={classContent.fileId}
          learningId={learning?.id}
          username={username}
          contentId={classContent?.id}
          title={classContent?.title}
          navigation={navigation}
          handleRouteScreen={handleRouteScreen}
        />
      )}
      {classContent &&
        classContent.typeId !== GetTypeContent.audio &&
        classContent.typeId !== GetTypeContent.document &&
        classContent.typeId !== GetTypeContent.video &&
        classContent.typeId !== GetTypeContent.scorm &&
        classContent.typeId !== GetTypeContent.tincam && (
          <ViewContent classContent={classContent} />
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnBack: {
    paddingLeft: horizontal(20),
    paddingRight: horizontal(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  viewIconRight: {
    flexDirection: 'row',
    marginRight: horizontal(20),
  },
  btnIcon: {
    paddingHorizontal: horizontal(5),
  },
  video: {
    backgroundColor: Color.black,
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },
});
export default ViewContentScreen;
