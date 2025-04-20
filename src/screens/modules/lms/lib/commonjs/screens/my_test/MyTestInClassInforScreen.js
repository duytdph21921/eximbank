"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _CustomTabView = _interopRequireDefault(require("@components/CustomTabView"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _globalSlice = require("@store/reducers/globalSlice");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var signalR = _interopRequireWildcard(require("@microsoft/signalr"));
var _enviroment = require("@assets/enviroment/enviroment.default");
var _lmsclasscontentApi = require("../../services/lmsclasscontent.api.js");
var _MyTestInClassInforScreenStyles = require("./MyTestInClassInforScreen.styles.js");
var _testclassusertestApi = require("../../services/testclassusertest.api.js");
var _TabExamResult = _interopRequireDefault(require("./components/TabExamResult.js"));
var _TabInformation = _interopRequireDefault(require("./components/TabInformation.js"));
var _storage = require("@utils/storage");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */

const MyTestInClassInforScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    content,
    classUserId,
    classId,
    learningId,
    classInfo
  } = route?.params;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [activeTab, setActiveTab] = (0, _react.useState)(0);
  const [dataInformation, setDataInformation] = (0, _react.useState)();
  const [dataResult, setDataResult] = (0, _react.useState)();
  const [isPassWord, setIsPassword] = (0, _react.useState)();
  const isMounteRef = (0, _react.useRef)(false);
  const paramsTestInClassInforScreen = (0, _reactRedux.useSelector)(state => state.global.paramsTestInClassInforScreen);
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  /**
   * Custom header screeen.
   */
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    title: content?.title,
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  const onBack = () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      connection.stop();
    }
    navigation.navigate(_constants.default.CLASS_DETAIL_SCREEN, {
      id: classId,
      indexTab: 1
    });
    return true;
  };
  /**
   * Check call api lúc vào lần đầu và goBack();
   */
  (0, _react.useEffect)(() => {
    if (learningId && !classInfo?.isCloseClass) {
      const socketUrl = `${_storage.storage.getString(_constants.default.DOMAIN)}${_enviroment.enviroment.apiDomain.lrsEndpoint}?learningId=${learningId}`;
      connection = new signalR.HubConnectionBuilder().withUrl(socketUrl, {
        accessTokenFactory: async () => _storage.storage.getItemString(_constants.default.KEY_USER_TOKEN),
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
    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, []);
  const funcFrGetById = async () => {
    const response = await (0, _lmsclasscontentApi.frGetById)(content?.id);
    if (response?.status && response?.data && isMounteRef.current) {
      setIsPassword(response?.data?.isPassWord);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    funcFrGetById();
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const funcGetTestFormInfo = async () => {
    const params = {
      testFormId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.testFormId : content?.contentOpenId,
      classContentId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classContentId : content?.id,
      classUserId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classUserId : classUserId
    };
    const response = await (0, _testclassusertestApi.getTestFormInfo)(params);
    if (response?.status && isMounteRef.current) {
      dispatch((0, _globalSlice.updateParamTestInClassInforScreen)({
        testFormId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.testFormId : content?.contentOpenId,
        classContentId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classContentId : content?.id,
        classUserId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classUserId : classUserId,
        classId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classId : classId,
        dataInformation: response?.data,
        dataResult: response?.data?.listResult
      }));
      setDataInformation(response?.data);
      setDataResult(response?.data?.listResult);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetTestFormInfo();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [route && route.params && route.params.dataBack]);
  const renderRoute1 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabInformation.default, {
    navigation: navigation,
    type: activeTab,
    data: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.dataInformation : dataInformation,
    isCurrentTestStatus: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.dataInformation?.currentTestStatus : dataInformation?.currentTestStatus,
    classId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classId : classId,
    classContentId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classContentId : content?.id,
    classUserId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classUserId : classUserId,
    testFormId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.testFormId : content?.contentOpenId,
    content: content,
    isPassWord: isPassWord
  });
  const renderRoute2 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabExamResult.default, {
    navigation: navigation,
    type: activeTab,
    data: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.dataResult : dataResult,
    dataInformation: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.dataInformation : dataInformation,
    isCurrentTestStatus: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.dataInformation?.currentTestStatus : dataInformation?.currentTestStatus,
    classId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classId : classId,
    classContentId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classContentId : content?.id,
    classUserId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.classUserId : classUserId,
    testFormId: route?.params && route?.params?.callBack ? paramsTestInClassInforScreen?.testFormId : content?.contentOpenId
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _MyTestInClassInforScreenStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomTabView.default, {
      style: _MyTestInClassInforScreenStyles.styles.tabBar,
      onIndexChange: index => setActiveTab(index),
      firstRoute: renderRoute1,
      secondRoute: renderRoute2,
      routes: [{
        key: 'first',
        title: 'text-tab-general-information'
      }, {
        key: 'second',
        title: 'text-tab-result-exam'
      }]
    })
  });
};
var _default = exports.default = MyTestInClassInforScreen;
//# sourceMappingURL=MyTestInClassInforScreen.js.map