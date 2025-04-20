"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CustomTabView = _interopRequireDefault(require("@components/CustomTabView"));
var _colors = require("@theme/colors");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _ResultStudyScreenStyles = require("./ResultStudyScreen.styles.js");
var _HeaderResult = _interopRequireDefault(require("./components/HeaderResult.js"));
var _TabOverViewResult = _interopRequireDefault(require("./components/TabOverViewResult.js"));
var _TabDetailResult = _interopRequireDefault(require("./components/TabDetailResult.js"));
var _lmsclasscontentApi = require("../../../services/lmsclasscontent.api.js");
var _lmsclassuserlearningApi = require("../../../services/lmsclassuserlearning.api.js");
var _lmsclassApi = require("../../../services/lmsclass.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const ResultStudyScreen = props => {
  const {
    navigation,
    classInfo,
    classUser,
    index
  } = props;
  const [activeTab, setActiveTab] = (0, _react.useState)(0);
  const isMounteRef = (0, _react.useRef)(false);
  const [dataResultOverView, setDataResultOverView] = (0, _react.useState)([]);
  const [dataDetailResult, setDataDetailResult] = (0, _react.useState)([]);
  const [dataChart, setDataChart] = (0, _react.useState)();
  const [classUserInfo, setClassUser] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (index === 3) {
      getAllData();
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);
  const funcFrUserJoinClassNew = async () => {
    const response = await (0, _lmsclassApi.frUserJoinClassNew)(classInfo?.id);
    if (response?.status && response?.data && isMounteRef.current) {
      setClassUser(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (index === 3 && classInfo?.id && !classInfo?.isCloseClass) {
      funcFrUserJoinClassNew();
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const getAllData = async () => {
    const model = {
      classId: classInfo.id
    };
    /**
     * Api kết quả chi tiết.
     */
    const response = await (0, _lmsclasscontentApi.frGetByClassId)(model);
    if (response?.status && response?.data && isMounteRef.current) {
      setDataDetailResult(response?.data);
    }
    /**
     * Api kết quả tổng quan.
     */
    const response2 = await (0, _lmsclassuserlearningApi.getClassUserInfo)(model.classId);
    if (response2?.status && response2?.data && isMounteRef.current) {
      setDataResultOverView(response2?.data);
    }
    /**
     * Api chart header.
     */
    const response3 = await (0, _lmsclassuserlearningApi.getClassResultDashboard)(model.classId);
    if (response3?.status && response3?.data && isMounteRef.current) {
      setDataChart(response3?.data);
    }
  };
  const renderRoute1 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabOverViewResult.default, {
    dataResultOverView: dataResultOverView,
    onPressHistory: () => {
      navigation.navigate(_constants.default.HISTORY_ACCESS_SCREEN, {
        classUser: classUserInfo
      });
    }
  });
  const renderRoute2 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabDetailResult.default, {
    dataDetailResult: dataDetailResult,
    navigation: navigation,
    classInfo: classInfo,
    classUser: classUser
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
    style: _ResultStudyScreenStyles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderResult.default, {
      dataChart: dataChart,
      onHandleAggregate: () => {
        navigation.navigate(_constants.default.AGGREGATE_SCORE_SCREEN, {
          classId: classInfo?.id
        });
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomTabView.default, {
      style: _ResultStudyScreenStyles.styles.tabBar,
      onIndexChange: index => setActiveTab(index),
      firstRoute: renderRoute1,
      secondRoute: renderRoute2,
      routes: [{
        key: 'first',
        title: 'text-tab-overall-results'
      }, {
        key: 'second',
        title: 'text-tab-result-detail'
      }],
      colorButtonTabActive: [_colors.Color.color_border_answer, _colors.Color.color_border_answer, _colors.Color.color_border_answer]
    })]
  });
};
var _default = exports.default = ResultStudyScreen;
//# sourceMappingURL=ResultStudyScreen.js.map