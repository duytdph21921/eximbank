"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _helpers = require("@utils/helpers");
var _TreeViewCustom = _interopRequireDefault(require("@components/TreeViewCustom"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _lmsclassApi = require("../../../services/lmsclass.api.js");
var _lmsclasscontentApi = require("../../../services/lmsclasscontent.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const ContentScreen = props => {
  const {
    classInfo,
    navigation,
    index,
    setIndex
  } = props;
  const [classContents, setClassContent] = (0, _react.useState)([]);
  const [classUserInfo, setClassUser] = (0, _react.useState)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const isMounteRef = (0, _react.useRef)(false);
  const getData = async () => {
    const model = {
      classId: classInfo?.id
    };
    if (index === 1) {
      const response = await (0, _lmsclasscontentApi.frGetByClassId)(model);
      if (response?.status) {
        setClassContent(response?.data);
      }
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    getData();
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
    if (index === 1 && classInfo?.id) {
      funcFrUserJoinClassNew();
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onViewClassContent = async content => {
    if (classInfo?.isNotStartClass) {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-title-dialog-warn',
        keyMessage: 'text-warning-class-not-start',
        contentMessage: '',
        keyCancel: 'text-close',
        isShowCancel: true,
        isShowSubmit: false
      }));
      return;
    }
    const response = await (0, _lmsclasscontentApi.frUserCanViewNew)(classUserInfo?.id, content?.id);
    if (response?.status && response?.data) {
      if (content?.typeId === _helpers.GetTypeContent.survey) {
        navigation.navigate(_constants.default.SURVEY_SCREEN, {
          content,
          classId: classInfo.id,
          learningId: response?.data?.userLearning?.id,
          classInfo
        });
      } else if (content?.typeId === _helpers.GetTypeContent.test) {
        navigation.navigate(_constants.default.MY_TEST_IN_CLASS_INFORMATION_SCREEN, {
          content,
          classUserId: classUserInfo?.id,
          classId: classInfo.id,
          learningId: response?.data?.userLearning?.id,
          classInfo
        });
      } else if (content?.typeId === _helpers.GetTypeContent.exercise) {
        // navigation.navigate(Constant.CLASS_DETAIL_SCREEN, {
        //   id: classInfo.id,
        //   indexTab: 2,
        // });
        setIndex(2);
      } else {
        navigation.navigate(_constants.default.CLASS_CONTENT_VIEW_SCREEN, {
          classId: classInfo.id,
          content,
          classUser: classUserInfo,
          learning: response?.data?.userLearning,
          classInfo
        });
      }
    } else {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-title-dialog-warn',
        keyMessage: 'text-class-content-not-learn',
        contentMessage: '',
        keyCancel: 'text-close',
        isShowCancel: true,
        isShowSubmit: false
      }));
    }
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     getData();
  //   }, [])
  // );
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TreeViewCustom.default, {
      data: classContents,
      childrenKey: "childs",
      onViewClassContent: onViewClassContent
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _colors.Color.red,
    flex: 1
  }
});
var _default = exports.default = ContentScreen;
//# sourceMappingURL=ContentScreen.js.map