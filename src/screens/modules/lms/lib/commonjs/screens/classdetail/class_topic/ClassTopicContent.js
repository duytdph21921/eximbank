"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _colors = require("@theme/colors");
var _scales = require("@utils/scales");
var _globalSlice = require("@store/reducers/globalSlice");
var _ClassTopicContentList = _interopRequireDefault(require("./ClassTopicContentList.js"));
var _ClassTopicDetail = _interopRequireDefault(require("./ClassTopicDetail.js"));
var _lmsclasstopicApi = require("../../../services/lmsclasstopic.api.js");
var _index = _interopRequireDefault(require("../../../component/TreeViewTopicCustom/index.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const ClassTopicContent = props => {
  const {
    classInfo,
    index,
    activeTab
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const isMounteRef = (0, _react.useRef)(false);
  const [listData, setListData] = (0, _react.useState)([]);
  const [indexView, setIndexView] = (0, _react.useState)(0);
  const [contentInfo, setContentInfo] = (0, _react.useState)();
  const [classTopicInfo, setClassTopicInfo] = (0, _react.useState)();
  const funcGetClassContentTopic = async () => {
    const response = await (0, _lmsclasstopicApi.getClassContentTopic)(classInfo?.id);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (index === 4 && activeTab === 1) {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      funcGetClassContentTopic();
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onViewClassContent = content => {
    setContentInfo(content);
    setIndexView(1);
  };
  const handleGotoIndex = index => {
    setIndexView(index);
    getData();
  };
  const handleGotoDetail = (index, item) => {
    setClassTopicInfo(item);
    setIndexView(index);
  };
  const getData = async () => {
    const response = await (0, _lmsclasstopicApi.getClassContentTopic)(classInfo?.id);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [indexView === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      data: listData,
      childrenKey: "childs",
      onViewClassContent: onViewClassContent
    }), indexView === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassTopicContentList.default, {
      contentInfo: contentInfo,
      classInfo: classInfo,
      handleBack: index => {
        handleGotoIndex(index);
      },
      index: 4,
      handleTopicInfo: (index, item) => {
        handleGotoDetail(index, item);
      }
    }), indexView !== 0 && indexView !== 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.container,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassTopicDetail.default, {
        type: 2,
        contentInfo: contentInfo,
        classTopicInfo: classTopicInfo,
        classInfo: classInfo,
        handleBack: (type, index) => {
          handleGotoIndex(index);
        }
      })
    })]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    marginHorizontal: (0, _scales.horizontal)(20),
    position: 'relative'
  }
});
var _default = exports.default = ClassTopicContent;
//# sourceMappingURL=ClassTopicContent.js.map