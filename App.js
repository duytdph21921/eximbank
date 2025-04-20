/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as signalR from '@microsoft/signalr';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppState, DeviceEventEmitter, Linking, LogBox, NativeModules } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import Constant from '@utils/constants';
import { setDomainApp, setTagNameApp } from '@assets/enviroment/domain';
import { enviroment } from '@assets/enviroment/enviroment.default';
import DialogWarnCustom from '@components/DialogWarnCustom';
import Loader from '@components/Loader';
import { AuthContext } from '@store/context';
import {
  logoutAction,
  updateAppColorAction,
  updateLanguageAction,
  updateNetWorkingAction,
} from '@store/reducers/globalSlice';
import { resetUserAction, updateUserAction } from '@store/reducers/authSlice';
import FlashMessage from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';
import { isIOS } from '@utils/platforms';
import { getCurrentVersion } from '@services/authentication/systemversion.api';
import { AuthStack } from '@navigations/AuthStack/AuthStack';
import { UserStack } from '@navigations/UserStack/UserStack';
import { getColor } from '@theme/colors';
import { storage } from '@utils/storage';
import * as RootNavigation from './RootNavigation';
import { isReadyRef, navigationRef } from './RootNavigation';

if (!firebase.apps.length) {
  firebase.initializeApp();
} else {
  firebase.app();
}

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['Require cycle:']);
LogBox.ignoreLogs(['ViewPropTypes will be removed', 'ColorPropType will be removed']);
const RootStack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.userState);
  const languageLocal = useSelector((state) => state.global.language);
  const dialogWarning = useSelector((state) => state.global.dialogWarning);
  const isLoading = useSelector((state) => state.global.isLoading);
  const isConnected = useSelector((state) => state.global.isConnected);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const navigation = RootNavigation.navigationRef;
  const [currentStateConnect, setCurrentStateConnect] = useState();
  const delaySplash = useRef(null);
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  const [isShowModal, setIsShowModal] = useState();
  const [isShowUpdate, setIsShowUpdate] = useState();
  const [linkDownloadApp, setLinkDownloadApp] = useState('');
  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        storage.set(Constant.KEY_USER_TOKEN, data?.userToken);
        storage.set(Constant.KEY_REFRESH_TOKEN, data?.refreshToken);
        dispatch(updateUserAction(data));
      },
      signUp: async (data) => {
        storage.set(Constant.KEY_USER_TOKEN, data.userToken);
      },
      signOut: async () => {
        const language = storage.getString(Constant.LANGUAGE_APP);
        const jsonAppColor = storage.getString(Constant.APP_COLOR);
        const appColor = JSON.parse(jsonAppColor);
        const params = {
          language,
          appColor,
        };
        dispatch(logoutAction(params));
        dispatch(resetUserAction(params));
        try {
          storage.remove(Constant.KEY_USER_TOKEN);
        } catch (e) {
          // handle err
        }
      },
    }),
    [],
  );
  /**
   * Lấy domain của các lần tiếp theo khi vào App.
   */
  useEffect(() => {
    const fetchDomain = async () => {
      try {
        const storedDomain = storage.getString(Constant.DOMAIN);
        if (storedDomain) {
          setDomainApp(storedDomain);
        }
        const storedTagName = storage.getString(Constant.TAG_NAME);
        if (storedTagName) {
          setTagNameApp(storedTagName);
        }

        // Check luôn version app tại đây không sẽ bị lỗi
        if (storedDomain) {
          checkVersionApp();
        }
      } catch (error) {
        console.error('Error fetching domain:', error);
      }
    };
    fetchDomain();
  }, []);
  /**
   * Detect network
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (currentStateConnect !== state?.isConnected) {
        if (state?.isConnected) {
          storage.set(Constant.KEY_NETWORK, Constant.CONNECTED);
        } else {
          storage.set(Constant.KEY_NETWORK, Constant.DIS_CONNECTED);
        }
        setCurrentStateConnect(state?.isConnected);
        dispatch(updateNetWorkingAction(state?.isConnected));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Lock orientations.
   */
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  /**
   * Check change base color.
   */
  const loadBaseColor = async () => {
    try {
      const jsonAppColor = storage.getString(Constant.APP_COLOR);
      const appColor = JSON.parse(jsonAppColor);
      if (appColor !== null) {
        dispatch(updateAppColorAction(appColor));
        await getColor(appColor);
      }
    } catch (error) {
      dispatch(updateAppColorAction({ base_color: '#0056D2' }));
    }
  };
  useEffect(() => {
    loadBaseColor();
  }, []);

  /**
   * Check login device.
   */
  useEffect(() => {
    if (userState?.signIn) {
      const urlWebHook = storage.getString(Constant.DOMAIN) + enviroment.apiDomain.webHook;
      connection = new signalR.HubConnectionBuilder()
        .withUrl(urlWebHook, {
          accessTokenFactory: async () => storage.getString(Constant.KEY_USER_TOKEN),
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
          connection.on('LoginAnotherDevice', () => {
            setIsShowModal(true);
            setTimeout(() => {
              handleClearUserInfo();
            }, 5000);
          });
        })
        .catch((error) => {
          console.log('error_socket', error);
        });
    } else if (connection.state === signalR.HubConnectionState.Connected) {
      connection.stop();
    }

    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, [userState?.signIn]);
  /**
   * Inittial data language for app.
   * Login app lần đầu thì gán bằng type language trong store.
   * Login các lần tiếp theo thì lấy type trong async storage.
   */

  useEffect(() => {
    const initLanguage = async () => {
      const languages = storage.getString(Constant.LANGUAGE_APP);
      if (languages == null || languages === undefined) {
        storage.set(Constant.LANGUAGE_APP, languageLocal);
      } else {
        dispatch(updateLanguageAction(languages));
        // dispatch(updateLanguageAction('vn'));
      }
    };

    initLanguage();
  }, []);

  /**
   * Check hạn token.
   * @param {*} expirationDate
   * @returns
   */
  function isTokenExpired(expirationDate) {
    const date1 = expirationDate * 1000;
    const date2 = new Date().getTime();
    if (date1 > date2) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const getAccessToken = async () => {
      const userToken = storage.getString(Constant.KEY_USER_TOKEN);
      const refreshToken = storage.getString(Constant.KEY_REFRESH_TOKEN);
      const isRemember = storage.getBoolean(Constant.REMEMBER_ACCOUNT);

      /**
       * Check token nếu còn hạn thì decode token lưu data vào redux để tiếp tục phiên đăng nhập.
       */
      if (userToken) {
        const decodedTokenUser = jwtDecode(userToken);
        if (isTokenExpired(decodedTokenUser?.exp)) {
          const daraUser = {
            signIn: true,
            userToken,
            refreshToken,
            isRemember,
            userData: {
              avatar:
                decodedTokenUser?.avatar ??
                'https://lh3.googleusercontent.com/a/ACg8ocKUzY_xk1NdDJkmksEh-NbEQC_Hfen-IFsjKcbIXroU=s96-c',
              email: decodedTokenUser?.email,
              name: decodedTokenUser?.displayname,
              userid: decodedTokenUser?.userid,
              sessionid: decodedTokenUser?.sessionid,
              issuperuser: decodedTokenUser?.issuperuser,
            },
          };
          dispatch(updateUserAction(daraUser));
        }
      } else {
        const daraUser = {
          signIn: false,
          userToken: '',
          refreshToken: '',
          isRemember,
          userData: {
            avatar: '',
            email: '',
            name: '',
            userid: '',
            sessionid: '',
            issuperuser: '',
          },
        };
        dispatch(updateUserAction(daraUser));
      }

      delaySplash.current = setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    };
    getAccessToken();
    requestUserPermission();
    return () => {
      clearTimeout(delaySplash.current);
    };
  }, []);

  const handleClearUserInfo = async () => {
    const isRemember = storage.getBoolean(Constant.REMEMBER_ACCOUNT);
    const dataUser = {
      signIn: false,
      logout: false,
      userToken: '',
      refreshToken: '',
      isRemember,
      userData: {
        avatar: '',
        email: '',
        name: '',
        userid: '',
        sessionid: '',
        issuperuser: '',
      },
    };
    dispatch(updateUserAction(dataUser));
    setIsShowModal(false);
  };

  const requestUserPermission = async () => {
    await messaging().requestPermission();
    await notifee.requestPermission({
      alert: true,
      criticalAlert: true,
      announcement: true,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });

    messaging()
      .hasPermission()
      .then((status) => {
        const enabled =
          status === messaging.AuthorizationStatus.AUTHORIZED ||
          status === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          getFcmToken();
          handleNotification();
        }
      });
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
  };

  /**
   * Notification nhận ở trạng thái mở app. Android
   */
  const handleNotification = () => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      showNotificationLocal(remoteMessage);
    });
    unsubscribe();
    /**
     * Click notification android when app inactive.
     */
    messaging().onNotificationOpenedApp((remoteMessage) => {
      const { data } = remoteMessage;
      handleNotificationClick({ foreground: '', data });
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          handleNotificationClick(remoteMessage);
        }
      });
  };

  useEffect(() => {
    const myListener = AppState.addEventListener('change', handleAppStateChange);
    const subscription = DeviceEventEmitter.addListener(
      'key-notification-clicked',
      handleNotificationClick,
    );
    return () => {
      isReadyRef.current = false;
      subscription.remove();
      // AppState.removeEventListener("change", handleAppStateChange);
      // if (myListener) myListener.removeEventListener();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      // console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(nextAppState);
  };

  /**
   * Tạo notification loacal.
   * @param {*} param0
   */
  const showNotificationLocal = async (notificationLocal) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      badge: true,
    });
    notifee.displayNotification({
      title: notificationLocal?.notification?.title,
      body: notificationLocal?.notification?.body,
      ios: {
        categoryId: 'message',
      },
      android: {
        channelId,
      },
    });
  };

  useEffect(
    () =>
      notifee.onForegroundEvent(async ({ type, detail }) => {
        const { data } = detail.notification;
        switch (type) {
          case EventType.PRESS: // Click noti Foreground Android & IOS!
            handleNotificationClick({ foreground: '', data });
            break;
          case EventType.ACTION_PRESS: // Click notification authen error Android & IOS!.
            break;
          default:
            break;
        }
      }),
    [],
  );

  const handleNotificationClick = async ({ foreground, data }) => {
    navigation.current.dispatch(
      CommonActions.navigate({
        name: Constant.NOTIFICATION_SCREEN,
        // params: {
        //   id: "f142e9dc-8585-4b40-bea1-f2fbccbcd1ed",
        //   message: {
        //     id: "f142e9dc-8585-4b40-bea1-f2fbccbcd1ed",
        //     title: "Thông báo cho tester4",
        //     content:
        //       "<html>\n<head>\n\t<title></title>\n</head>\n<body>\n<p>Tr&ecirc;n tinh thần cởi mở hợp t&aacute;c<em>,</em>&nbsp;&ocirc;ng David Huy Hồ &ndash; Chủ tịch/ Người s&aacute;ng lập C&ocirc;ng ty đ&atilde; vui mừng v&agrave; đề xuất hợp t&aacute;c với Trường. C&ocirc;ng ty Hememics Biotechnologies l&agrave; c&ocirc;ng ty nghi&ecirc;n cứu thiết kế v&agrave; chế tạo cảm biến sinh học, nắm giữ nhiều bằng độc quyền s&aacute;ng chế tại Mỹ. Theo đ&oacute;, &ocirc;ng David Huy Hồ đ&atilde; giới thiệu c&ocirc;ng nghệ của C&ocirc;ng ty v&agrave; mong muốn được mang những c&ocirc;ng nghệ trong lĩnh vực vi mạch, b&aacute;n dẫn về Việt Nam. Qua buổi gặp mặt, ph&iacute;a c&ocirc;ng ty mong muốn hợp t&aacute;c với Nh&agrave; trường trong đ&agrave;o tạo nh&acirc;n lực, nghi&ecirc;n cứu ph&aacute;t triển c&aacute;c cảm biến sinh học g&oacute;p phần ph&aacute;t triển hệ sinh th&aacute;i b&aacute;n dẫn.</p>\n</body>\n</html>\n",
        //   },
        // },
      }),
    );
  };

  /**
   * Check version app
   */
  const checkVersionApp = async () => {
    const currentVersion = DeviceInfo.getVersion(); // Lấy phiên bản hiện tại
    let type = 1;
    if (isIOS) {
      type = 2;
    }
    const response = await getCurrentVersion(type);
    if (response?.status && response?.data) {
      if (response?.data?.name !== currentVersion && response?.data?.linkDownload) {
        setIsShowUpdate(true);
        setLinkDownloadApp(response?.data?.linkDownload);
      }
    }
  };
  const onHandleUpdateApp = async () => {
    const supported = await Linking.canOpenURL(linkDownloadApp);
    if (supported) {
      await Linking.openURL(linkDownloadApp);
    } else if (!isIOS) {
      Linking.openURL(linkDownloadApp).catch(() => {
        NativeModules.IntentLauncher.startActivity({
          action: 'android.intent.action.VIEW',
          data: linkDownloadApp,
        });
      });
    }
    setIsShowUpdate(false);
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <AuthContext.Provider value={authContext}>
        <RootStack.Navigator initialRouteName={Constant.INTRODUCTION}>
          {userState?.signIn ? (
            <RootStack.Screen
              name={Constant.USER_STACK}
              component={UserStack}
              options={{ headerShown: false }}
            />
          ) : (
            <RootStack.Screen
              name={Constant.AUTHOR_STACK}
              component={AuthStack}
              options={{ headerShown: false }}
              initialParams={{ userState }}
            />
          )}
        </RootStack.Navigator>
      </AuthContext.Provider>
      <DialogWarnCustom
        isShowModal={dialogWarning?.isShowModalWarn}
        titleHeader={dialogWarning?.titleHeader}
        keyHeader={dialogWarning?.keyHeader}
        contentMessage={dialogWarning?.contentMessage}
        keyMessage={dialogWarning?.keyMessage}
        isSigout={dialogWarning?.isSigout}
        keyCancel={dialogWarning?.keyCancel}
        keySubmit={dialogWarning?.keySubmit}
        isShowCancel={dialogWarning?.isShowCancel}
        isShowSubmit={dialogWarning?.isShowSubmit}
      />
      {(isShowModal || isShowUpdate) && (
        <DialogWarnCustom
          isShowModal={isShowModal || isShowUpdate}
          isSigout
          keyHeader={isShowModal ? 'text-warning' : 'text-notification'}
          keyMessage={isShowModal ? 'text-login-device-another' : 'text-update-app'}
          keySubmit="text-button-submit"
          submitOnPress={() => (isShowModal ? handleClearUserInfo() : onHandleUpdateApp())}
          isShowCancel={false}
          isShowCancelDialog={false}
        />
      )}
      {/* {isShowUpdate && (
        <DialogWarnCustom
          isShowModal={isShowUpdate}
          isSigout={false}
          keyHeader="text-notification"
          keyMessage="text-update-app"
          keySubmit="text-button-submit"
          submitOnPress={() => onHandleUpdateApp()}
          isShowCancel={false}
          isShowCancelDialog={false}
        />
      )} */}
      {(isLoading || !isConnected) && (
        <Loader isLoading={isLoading || !isConnected} isNotConnect={!isConnected} />
      )}
      <FlashMessage />
    </NavigationContainer>
  );
};

export default App;
