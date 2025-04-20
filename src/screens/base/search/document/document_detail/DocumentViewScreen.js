/* eslint-disable react-hooks/exhaustive-deps */
import { View, SafeAreaView, StyleSheet } from 'react-native';
import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import ViewPlayAudio from '@components/ViewPlayAudio';
import ViewDocument from '@components/ViewDocument';
import ViewScorm from '@components/ViewScorm';
import { useDispatch, useSelector } from 'react-redux';
import { GetTypeContent, loadFile } from '@utils/helpers';
import { updateHistory } from '@services/lms/lmscontent.api';
import BackHeader from '@components/BackHeader';
import Constant from '@utils/constants';
import ViewTincan from '@components/ViewTincan';
import ViewVideo from '@components/ViewVideo';
import { Color } from '@theme/colors';
import ViewContent from '@components/ViewContent';

const DocumentViewScreen = (props) => {
  const { navigation, route } = props;
  const { content } = route?.params ?? {};
  const userState = useSelector((state) => state.auth.userState);
  const username = userState?.userData?.name ?? '';
  const isMounteRef = useRef(false);
  const [showHeader, setShowHeader] = useState();
  const dispatch = useDispatch();
  const onBack = () => {
    navigation.navigate(Constant.SEARCH_CONTENT_DETAIL, {
      contentDetail: content,
      callBack: Math.random().toString(36).slice(2, 7),
    });
  };

  const funcUpdateHistory = async () => {
    await updateHistory(content?.id);
  };
  useEffect(() => {
    isMounteRef.current = true;
    funcUpdateHistory();
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;

  const renderHeaderRight = () => <View />;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      title: content?.title,
    });
  }, []);
  const handleRouteScreen = useCallback((event) => {
    setShowHeader(event);
  });
  return (
    <SafeAreaView style={styles.container}>
      {content && content.typeId === GetTypeContent.audio && (
        <ViewPlayAudio fileId={content.fileId} />
      )}
      {content && content.typeId === GetTypeContent.document && (
        <ViewDocument fileId={content.fileId} />
      )}
      {content && content.typeId === GetTypeContent.video && (
        <View style={styles.video}>
          <ViewVideo
            fileId={content.fileId}
            navigation={navigation}
            handleRouteScreen={handleRouteScreen}
            currentTime={0}
          />
        </View>
      )}
      {content && content.typeId === GetTypeContent.scorm && (
        <ViewScorm
          fileId={content?.fileId}
          learningId="00000000-0000-0000-0000-000000000000"
          username={username}
          contentId={content?.id}
          title={content?.title}
          navigation={navigation}
          handleRouteScreen={handleRouteScreen}
        />
      )}
      {content && content.typeId === GetTypeContent.tincam && (
        <ViewTincan
          fileId={content?.fileId}
          learningId="00000000-0000-0000-0000-000000000000"
          username={username}
          contentId={content?.id}
          title={content?.title}
          navigation={navigation}
          handleRouteScreen={handleRouteScreen}
        />
      )}
      {content &&
        content.typeId !== GetTypeContent.audio &&
        content.typeId !== GetTypeContent.document &&
        content.typeId !== GetTypeContent.video &&
        content.typeId !== GetTypeContent.scorm &&
        content.typeId !== GetTypeContent.tincam && <ViewContent classContent={content} />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    backgroundColor: Color.black,
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },
});
export default DocumentViewScreen;
