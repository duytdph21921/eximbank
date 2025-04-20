"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _CustomTabView = _interopRequireDefault(require("@components/CustomTabView"));
var _ClassTopicDetail = _interopRequireDefault(require("./ClassTopicDetail.js"));
var _ClassTopicGeneral = _interopRequireDefault(require("./ClassTopicGeneral.js"));
var _ClassTopicContent = _interopRequireDefault(require("./ClassTopicContent.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ClassTopicScreen = props => {
  const {
    classInfo,
    index
  } = props;
  const [activeTab, setActiveTab] = (0, _react.useState)(0);
  const isLoadMain = true;
  const renderRoute1 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassTopicGeneral.default, {
    classInfo: classInfo,
    index: index,
    activeTab: activeTab
  });
  const renderRoute2 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassTopicContent.default, {
    classInfo: classInfo,
    index: index,
    activeTab: activeTab
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: isLoadMain ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomTabView.default, {
      style: styles.tabBar,
      activeTab: activeTab,
      onIndexChange: index => setActiveTab(index),
      firstRoute: renderRoute1,
      secondRoute: renderRoute2,
      routes: [{
        key: 'first',
        title: 'text-class-topic-general'
      }, {
        key: 'second',
        title: 'text-class-topic-content'
      }]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassTopicDetail.default, {})
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    paddingBottom: 25
  },
  tabBar: {
    backgroundColor: _colors.Color.white,
    marginTop: (0, _scales.vertical)(10)
  }
});
var _default = exports.default = ClassTopicScreen;
//# sourceMappingURL=ClassTopicScreen.js.map