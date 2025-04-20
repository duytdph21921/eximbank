/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import IconSurvey from '@assets/icons/icon_survey';
import TouchableDebounce from '@components/TouchableDebounce';
import Constant from '@utils/constants';
import globalStyles from '@theme/globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateLoadingAction,
  updateParamsSurveyScreenAction,
  updateShowDialogWarnAction,
} from '@store/reducers/globalSlice';
import * as signalR from '@microsoft/signalr';
import { enviroment } from '@assets/enviroment/enviroment.default';
import BackHeader from '@components/BackHeader';
import he from 'he';
import { replaceHtml } from '@utils/helpers';
import { storage } from '@utils/storage';
import { getDetail, saveUser } from '../../../services/lmssurvey.api';
import { styles } from './SurveyScreen.styles';
/**
 * Màn hình Nội dung khảo sát.
 * @param {*} props
 * @returns
 */
const SurveyScreen = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const { content, classId, learningId } = route?.params || {};
  const isMounteRef = useRef(false);
  const [dataSurvey, setDataSurvey] = useState();
  const [sourceContent, setSourceContent] = useState({
    html: '',
  });
  const [sourceThank, setSourceThank] = useState({
    html: '',
  });
  const paramsSurveyScreen = useSelector(
    (state) => state.global.paramsSurveyScreen
  );
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  const renderHeaderLeft = () => <BackHeader handleGoBack={onBack} />;
  const renderHeaderTitle = () => (
    <CMText
      i18nKey="text-title-survey-result-screen"
      style={globalStyles.titleScreen}
    />
  );
  const renderHeaderRight = () => <View />;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      headerTitle: renderHeaderTitle,
    });
  }, [navigation]);
  const onBack = () => {
    if (connection.state === signalR.HubConnectionState.Connected) {
      connection.stop();
    }
    navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
      id: classId,
      indexTab: 1,
    });
    return true;
  };
  useEffect(() => {
    if (learningId) {
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
  }, []);

  const funcGetDetail = async (id, newClassId) => {
    const response = await getDetail(id, newClassId);
    if (response?.status && isMounteRef.current) {
      setDataSurvey(response?.data);
      setSourceContent({
        html: response?.data?.introduce ?? '',
      });
      setSourceThank({
        html: response?.data?.thankyou ?? '',
      });
      dispatch(
        updateParamsSurveyScreenAction({
          content:
            route?.params && route?.params?.callBack
              ? paramsSurveyScreen?.content
              : content,
          dataSurvey: response?.data,
        })
      );
    }
  };
  useEffect(() => {
    isMounteRef.current = true;
    dispatch(updateLoadingAction(true));
    const id =
      route?.params && route?.params?.callBack
        ? paramsSurveyScreen?.content?.contentOpenId
        : content?.contentOpenId;
    const newClassId =
      route?.params && route?.params?.callBack
        ? paramsSurveyScreen?.dataSurvey?.classId
        : classId;
    funcGetDetail(id, newClassId);
    dispatch(updateLoadingAction(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [route && route.params && route.params.dataBack]);

  /**
   * Đi đến màn hình chi tiết khảo sát.
   */
  const onHandleStart = async () => {
    if (dataSurvey?.isDoneSurvey) {
      navigation.navigate(Constant.SURVEY_RESULT_SCREEN, {
        surveyId:
          route?.params && route?.params?.callBack
            ? paramsSurveyScreen?.content?.contentOpenId
            : content?.contentOpenId,
        surveyUserId: dataSurvey?.surveyUserId,
        sourceThank,
      });
    } else if (dataSurvey?.statusSurvey !== 2) {
      let keyMessage = 'text-survey-not-start';
      if (dataSurvey?.statusSurvey === 3) {
        keyMessage = 'text-survey-ended';
      }
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage,
          contentMessage: '',
          isShowSubmit: false,
          keyCancel: 'text-button-submit',
        })
      );
    } else {
      const params = {
        surveyId:
          route?.params && route?.params?.callBack
            ? paramsSurveyScreen?.content?.contentOpenId
            : content?.contentOpenId,
        classId: dataSurvey?.classId,
        completeStatus: 2,
      };
      const response = await saveUser(params);
      if (response?.status && response?.data) {
        navigation.navigate(Constant.SURVEY_DETAIL_SCREEN, {
          surveyId: response?.data?.surveyId,
          surveyUserId: response?.data?.id,
          classId,
          learningId,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <IconSurvey width={67} height={67} />
        <CMText i18nKey="text-hello-survey" style={styles.textTitle} />
        {(sourceContent?.html !== '' || sourceContent?.html != null) && (
          // <RenderHtml
          //   contentWidth={screenWidth - horizontal(2 * 20)}
          //   source={sourceContent}
          //   tagsStyles={mixedStyle}
          // />
          <CMText
            title={`${he.decode(replaceHtml(sourceContent?.html ?? ''))} `}
            style={globalStyles.textNomal}
          />
        )}
        {/* {(sourceThank?.html != "" || sourceThank?.html != null) && (
          <RenderHtml
            contentWidth={screenWidth - horizontal(2 * 20)}
            source={sourceThank}
            tagsStyles={mixedStyle}
          />
        )} */}
        <TouchableDebounce
          style={[
            styles.btnConfim,
            {
              backgroundColor: Color.base_color,
            },
          ]}
          onPress={() => onHandleStart()}
        >
          <CMText
            i18nKey={
              dataSurvey?.isDoneSurvey
                ? 'text-button-survey-success'
                : 'get-start'
            }
            style={[styles.textBtnConfim]}
          />
        </TouchableDebounce>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SurveyScreen;
