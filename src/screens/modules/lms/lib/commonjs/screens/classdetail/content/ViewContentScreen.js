"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _scales = require("@utils/scales");
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _ViewDocument = _interopRequireDefault(require("@components/ViewDocument"));
var _ViewScorm = _interopRequireDefault(require("@components/ViewScorm"));
var _helpers = require("@utils/helpers");
var _ViewPlayAudio = _interopRequireDefault(require("@components/ViewPlayAudio"));
var signalR = _interopRequireWildcard(require("@microsoft/signalr"));
var _enviroment = require("@assets/enviroment/enviroment.default");
var _ViewVideo = _interopRequireDefault(require("@components/ViewVideo"));
var _ViewContent = _interopRequireDefault(require("@components/ViewContent"));
var _ViewTincan = _interopRequireDefault(require("@components/ViewTincan"));
var _colors = require("@theme/colors");
var _storage = require("@utils/storage");
var _lmsclasscontentApi = require("../../../services/lmsclasscontent.api.js");
var _lmsclassuserlearningApi = require("../../../services/lmsclassuserlearning.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const ViewContentScreen = props => {
  const {
    route,
    navigation
  } = props;
  const {
    content,
    learning,
    classInfo
  } = route.params;
  const [classContent, setClassContent] = (0, _react.useState)(content);
  const [showHeader, setShowHeader] = (0, _react.useState)();
  const isMounteRef = (0, _react.useRef)(false);
  const userState = (0, _reactRedux.useSelector)(state => state.auth.userState);
  const currentTimeRef = (0, _react.useRef)(0); // Cho noi dung dang video

  const username = userState?.userData?.name ?? '';
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  /**
   * Back to previous screen
   */
  const onBack = async () => {
    // Ngat ket noi socket
    if (content?.typeId === _helpers.GetTypeContent.video) {
      // call api de cap nhat vi tri video hoc cuoi cung
      const model = {
        eventName: 'VIDEO_TIME_UPDATE',
        learningId: learning?.id,
        id: content?.id,
        data: currentTimeRef?.current ?? 0
      };
      await (0, _lmsclassuserlearningApi.updateLastState)(model);
    }
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      // Neu noi dung la video thi phai luu lai state seek cho video xong moi ngat ket noi socket
      connection.stop();
    }
    navigation.goBack();
  };

  /**
   * Back hander.
   */
  const funcFrGetById = async () => {
    const response = await (0, _lmsclasscontentApi.frGetById)(content?.id);
    if (response?.status && response?.data && isMounteRef.current) {
      setClassContent(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    funcFrGetById();
    if (learning?.id && !classInfo?.isCloseClass && !classInfo?.isNotStartClass) {
      const socketUrl = `${_storage.storage.getString(_constants.default.DOMAIN)}${_enviroment.enviroment.apiDomain.lrsEndpoint}?learningId=${learning?.id}`;
      connection = new signalR.HubConnectionBuilder().withUrl(socketUrl, {
        accessTokenFactory: async () => _storage.storage.getString(_constants.default.KEY_USER_TOKEN),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        logger: signalR.LogLevel.None
      }).build();
      connection.start().then(() => {
        clearTimeout(socketHanderId);
        socketHanderId = setTimeout(() => {
          if (connection.state === signalR.HubConnectionState.Disconnected) {
            connection.start();
          }
        }, 5000);
        connection.on('doViewContineContent', async () => {});
      }).catch(() => {});
    }
    _reactNative.BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      isMounteRef.current = false;
      _reactNative.BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);
  const handleCallBackCurrentTime = async currentTimeVideo => {
    const seekTime = Number.parseInt(currentTimeVideo ?? 0, 10);
    // setLastTime(seekTime);
    currentTimeRef.current = seekTime;
  };
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.viewIconRight
  });
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerShown: content && !showHeader,
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      title: content?.title
    });
  }, [navigation, content && content.typeId, showHeader]);
  const handleRouteScreen = (0, _react.useCallback)(event => {
    setShowHeader(event);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: styles.container,
    children: [classContent && classContent.typeId === _helpers.GetTypeContent.audio && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewPlayAudio.default, {
      fileId: classContent.fileId
    }), classContent && classContent.typeId === _helpers.GetTypeContent.document && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewDocument.default, {
      fileId: classContent.fileId
    }), classContent && classContent.typeId === _helpers.GetTypeContent.video && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.video,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewVideo.default, {
        fileId: classContent.fileId,
        navigation: navigation,
        handleRouteScreen: handleRouteScreen,
        currentTime: learning?.lastState ?? 0,
        onSaveLastTime: handleCallBackCurrentTime
      })
    }), classContent && classContent.typeId === _helpers.GetTypeContent.scorm && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewScorm.default, {
      fileId: classContent.fileId,
      learningId: learning?.id,
      username: username,
      contentId: classContent?.id,
      title: classContent?.title,
      navigation: navigation,
      handleRouteScreen: handleRouteScreen
    }), classContent && classContent.typeId === _helpers.GetTypeContent.tincam && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewTincan.default, {
      fileId: classContent.fileId,
      learningId: learning?.id,
      username: username,
      contentId: classContent?.id,
      title: classContent?.title,
      navigation: navigation,
      handleRouteScreen: handleRouteScreen
    }), classContent && classContent.typeId !== _helpers.GetTypeContent.audio && classContent.typeId !== _helpers.GetTypeContent.document && classContent.typeId !== _helpers.GetTypeContent.video && classContent.typeId !== _helpers.GetTypeContent.scorm && classContent.typeId !== _helpers.GetTypeContent.tincam && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewContent.default, {
      classContent: classContent
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  btnBack: {
    paddingLeft: (0, _scales.horizontal)(20),
    paddingRight: (0, _scales.horizontal)(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  viewIconRight: {
    flexDirection: 'row',
    marginRight: (0, _scales.horizontal)(20)
  },
  btnIcon: {
    paddingHorizontal: (0, _scales.horizontal)(5)
  },
  video: {
    backgroundColor: _colors.Color.black,
    ..._reactNative.StyleSheet.absoluteFill,
    elevation: 1
  }
});
var _default = exports.default = ViewContentScreen;
//# sourceMappingURL=ViewContentScreen.js.map