"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _colors = require("@theme/colors");
var _icon_survey = _interopRequireDefault(require("@assets/icons/icon_survey"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var signalR = _interopRequireWildcard(require("@microsoft/signalr"));
var _enviroment = require("@assets/enviroment/enviroment.default");
var _BackHeader = _interopRequireDefault(require("@components/BackHeader"));
var _he = _interopRequireDefault(require("he"));
var _helpers = require("@utils/helpers");
var _storage = require("@utils/storage");
var _lmssurveyApi = require("../../../services/lmssurvey.api.js");
var _SurveyScreenStyles = require("./SurveyScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Màn hình Nội dung khảo sát.
 * @param {*} props
 * @returns
 */const SurveyScreen = props => {
  const {
    navigation,
    route
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    content,
    classId,
    learningId
  } = route?.params || {};
  const isMounteRef = (0, _react.useRef)(false);
  const [dataSurvey, setDataSurvey] = (0, _react.useState)();
  const [sourceContent, setSourceContent] = (0, _react.useState)({
    html: ''
  });
  const [sourceThank, setSourceThank] = (0, _react.useState)({
    html: ''
  });
  const paramsSurveyScreen = (0, _reactRedux.useSelector)(state => state.global.paramsSurveyScreen);
  let socketHanderId = -1;
  let connection = new signalR.HubConnectionBuilder();
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BackHeader.default, {
    handleGoBack: onBack
  });
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-title-survey-result-screen",
    style: _globalStyles.default.titleScreen
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  const onBack = () => {
    if (connection.state === signalR.HubConnectionState.Connected) {
      connection.stop();
    }
    navigation.navigate(_constants.default.CLASS_DETAIL_SCREEN, {
      id: classId,
      indexTab: 1
    });
    return true;
  };
  (0, _react.useEffect)(() => {
    if (learningId) {
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
  }, []);
  const funcGetDetail = async (id, newClassId) => {
    const response = await (0, _lmssurveyApi.getDetail)(id, newClassId);
    if (response?.status && isMounteRef.current) {
      setDataSurvey(response?.data);
      setSourceContent({
        html: response?.data?.introduce ?? ''
      });
      setSourceThank({
        html: response?.data?.thankyou ?? ''
      });
      dispatch((0, _globalSlice.updateParamsSurveyScreenAction)({
        content: route?.params && route?.params?.callBack ? paramsSurveyScreen?.content : content,
        dataSurvey: response?.data
      }));
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    const id = route?.params && route?.params?.callBack ? paramsSurveyScreen?.content?.contentOpenId : content?.contentOpenId;
    const newClassId = route?.params && route?.params?.callBack ? paramsSurveyScreen?.dataSurvey?.classId : classId;
    funcGetDetail(id, newClassId);
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, [route && route.params && route.params.dataBack]);

  /**
   * Đi đến màn hình chi tiết khảo sát.
   */
  const onHandleStart = async () => {
    if (dataSurvey?.isDoneSurvey) {
      navigation.navigate(_constants.default.SURVEY_RESULT_SCREEN, {
        surveyId: route?.params && route?.params?.callBack ? paramsSurveyScreen?.content?.contentOpenId : content?.contentOpenId,
        surveyUserId: dataSurvey?.surveyUserId,
        sourceThank
      });
    } else if (dataSurvey?.statusSurvey !== 2) {
      let keyMessage = 'text-survey-not-start';
      if (dataSurvey?.statusSurvey === 3) {
        keyMessage = 'text-survey-ended';
      }
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-warning',
        keyMessage,
        contentMessage: '',
        isShowSubmit: false,
        keyCancel: 'text-button-submit'
      }));
    } else {
      const params = {
        surveyId: route?.params && route?.params?.callBack ? paramsSurveyScreen?.content?.contentOpenId : content?.contentOpenId,
        classId: dataSurvey?.classId,
        completeStatus: 2
      };
      const response = await (0, _lmssurveyApi.saveUser)(params);
      if (response?.status && response?.data) {
        navigation.navigate(_constants.default.SURVEY_DETAIL_SCREEN, {
          surveyId: response?.data?.surveyId,
          surveyUserId: response?.data?.id,
          classId,
          learningId
        });
      }
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _SurveyScreenStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      contentContainerStyle: _SurveyScreenStyles.styles.scrollView,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_survey.default, {
        width: 67,
        height: 67
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-hello-survey",
        style: _SurveyScreenStyles.styles.textTitle
      }), (sourceContent?.html !== '' || sourceContent?.html != null) &&
      /*#__PURE__*/
      // <RenderHtml
      //   contentWidth={screenWidth - horizontal(2 * 20)}
      //   source={sourceContent}
      //   tagsStyles={mixedStyle}
      // />
      (0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${_he.default.decode((0, _helpers.replaceHtml)(sourceContent?.html ?? ''))} `,
        style: _globalStyles.default.textNomal
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        style: [_SurveyScreenStyles.styles.btnConfim, {
          backgroundColor: _colors.Color.base_color
        }],
        onPress: () => onHandleStart(),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: dataSurvey?.isDoneSurvey ? 'text-button-survey-success' : 'get-start',
          style: [_SurveyScreenStyles.styles.textBtnConfim]
        })
      })]
    })
  });
};
var _default = exports.default = SurveyScreen;
//# sourceMappingURL=SurveyScreen.js.map