"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _icon_note = _interopRequireDefault(require("@assets/other/icon_note.svg"));
var _CustomTabView = _interopRequireDefault(require("@components/CustomTabView"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _EducationProgramDetailStyles = require("../EducationProgramDetail.styles.js");
var _IntroduceEdu = _interopRequireDefault(require("./IntroduceEdu.js"));
var _ListClass = _interopRequireDefault(require("./ListClass.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const EducationProgramClassDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    params
  } = route;
  const [activeTab, setActiveTab] = (0, _react.useState)(0);
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    title: route?.params?.title,
    style: _globalStyles.default.titleScreen,
    numberOfLines: 1
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
    style: _EducationProgramDetailStyles.styles.viewBtnBack,
    onPress: () => {},
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_note.default, {
      width: 44,
      height: 44
    })
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerRight: renderHeaderRight
    });
  }, []);
  const renderRoute1 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_IntroduceEdu.default, {
    navigation: navigation,
    params: params
  });
  const renderRoute2 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListClass.default, {
    navigation: navigation,
    params: params
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _EducationProgramDetailStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomTabView.default, {
      style: _EducationProgramDetailStyles.styles.tabBar,
      onIndexChange: index => setActiveTab(index),
      firstRoute: renderRoute1,
      secondRoute: renderRoute2,
      routes: [{
        key: 'first',
        title: 'text-introduction-class'
      }, {
        key: 'second',
        title: 'text-list-class'
      }]
    })
  });
};
var _default = exports.default = EducationProgramClassDetailScreen;
//# sourceMappingURL=EducationProgramClassDetailScreen.js.map