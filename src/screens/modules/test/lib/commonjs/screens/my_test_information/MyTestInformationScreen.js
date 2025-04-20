"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CustomTabView = _interopRequireDefault(require("@components/CustomTabView"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _globalSlice = require("@store/reducers/globalSlice");
var _testregistortestformApi = require("../../services/testregistortestform.api.js");
var _MyTestInformationScreenStyles = require("./MyTestInformationScreen.styles.js");
var _TabExamResult = _interopRequireDefault(require("./components/TabExamResult.js"));
var _TabInformation = _interopRequireDefault(require("./components/TabInformation.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * V.1. Màn hình thông tin bài thi-thông tin chung.
 * @returns
 */const MyTestInformationScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    id
  } = route?.params;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [activeTab, setActiveTab] = (0, _react.useState)(0);
  const [dataInformation, setDataInformation] = (0, _react.useState)();
  const [dataResult, setDataResult] = (0, _react.useState)();
  const isMounteRef = (0, _react.useRef)(false);
  const paramsTestInforScreen = (0, _reactRedux.useSelector)(state => state.global.paramsTestInforScreen);

  /**
   * Check call api lúc vào lần đầu và goBack();
   */
  const funcGetByIdAndUserId = async () => {
    const idMyTest = route?.params && route?.params?.callBack ? paramsTestInforScreen?.id : id;
    const response = await (0, _testregistortestformApi.getByIdAndUserId)(idMyTest);
    if (response?.status && isMounteRef.current) {
      dispatch((0, _globalSlice.updateParamTestInforScreen)({
        id: idMyTest,
        dataInformation: response?.data,
        dataResult: response?.data?.listResult
      }));
      setDataInformation(response?.data);
      setDataResult(response?.data?.listResult);
    }
  };
  (0, _react.useEffect)(() => {
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    isMounteRef.current = true;
    funcGetByIdAndUserId();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  (0, _react.useEffect)(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none'
      }
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined
      });
    };
  }, []);
  const renderRoute1 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabInformation.default, {
    navigation: navigation,
    type: activeTab,
    data: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation : dataInformation,
    isCurrentTestStatus: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation?.currentTestStatus : dataInformation?.currentTestStatus
  });
  const renderRoute2 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabExamResult.default, {
    navigation: navigation,
    type: activeTab,
    data: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataResult : dataResult,
    dataInformation: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation : dataInformation,
    isCurrentTestStatus: route?.params && route?.params?.callBack ? paramsTestInforScreen?.dataInformation?.currentTestStatus : dataInformation?.currentTestStatus
  });
  /**
   * Custom header screeen.
   */

  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default
  // i18nKey={"text-header-test-information-screen"}
  , {
    style: _globalStyles.default.titleScreen,
    title: route?.params?.title ?? ''
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _MyTestInformationScreenStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomTabView.default, {
      style: _MyTestInformationScreenStyles.styles.tabBar,
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
var _default = exports.default = MyTestInformationScreen;
//# sourceMappingURL=MyTestInformationScreen.js.map