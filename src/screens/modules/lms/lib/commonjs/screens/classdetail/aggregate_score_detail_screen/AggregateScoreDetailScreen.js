"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _lmsclassuserlearningApi = require("../../../services/lmsclassuserlearning.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const AggregateScoreDetailScreen = props => {
  const {
    navigation,
    route
  } = props;
  const contentDetailData = route?.params?.contentDetail;
  const classContentId = route?.params?.classContentId;
  const classId = route?.params?.classId;
  const isExercise = route?.params?.isExercise;
  const [contentDetail, setContentDetail] = (0, _react.useState)(contentDetailData);
  const isMounteRef = (0, _react.useRef)(false);
  const dispatch = (0, _reactRedux.useDispatch)();
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-header-result-study-detail",
    style: _globalStyles.default.titleScreen
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  const funcGetMatkDetail = async () => {
    const response = await (0, _lmsclassuserlearningApi.getMarkDetail)(classId, classContentId);
    if (response?.status && isMounteRef.current && response?.data) {
      setContentDetail(response?.data);
    }
  };
  const funcGetMarkExerciseDetail = async () => {
    const response = await (0, _lmsclassuserlearningApi.getMarkExerciseDetail)(classId, classContentId);
    if (response?.status && response?.data && isMounteRef.current) {
      setContentDetail(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    isMounteRef.current = true;
    if (!isExercise) {
      funcGetMatkDetail();
    } else {
      funcGetMarkExerciseDetail();
    }
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      scrollEnabled: true,
      bounces: false,
      showsVerticalScrollIndicator: false,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.flexInfoDetail,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-min-score",
          style: styles.textTitle
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.flexRow,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: `${contentDetail?.minScoreText ?? ''} `,
            style: styles.textDetail
          }), contentDetail?.minScoreType ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: contentDetail?.minScoreType,
            style: styles.textDetail
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-time-minute",
            style: styles.textDetail
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.flexInfoDetail,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-study-state-required",
          style: styles.textTitle
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: contentDetail?.requiredText,
          style: styles.textDetail
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.flexInfoDetail,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-mark-weight-score",
          style: styles.textTitle
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${contentDetail?.markText}/${contentDetail?.weightScore}`,
          style: styles.textDetail
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.flexInfoDetail,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-total-learn-time",
          style: styles.textTitle
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.flexRow,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: `${contentDetail?.totalLearnTime.toString()} `,
            style: styles.textDetail
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-time-minute",
            style: styles.textDetail
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.flexInfoDetail,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-total-view",
          style: styles.textTitle
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: contentDetail?.totalView.toString(),
          style: styles.textDetail
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.flexInfoDetail,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-status-finish",
          style: styles.textTitleStatus
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.textDetailStatus, {
            backgroundColor: contentDetail?.status === 1 ? _colors.Color.color_pass : _colors.Color.color_text_progress_bar
          }],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: contentDetail?.statusName,
            style: styles.textDetailWhite
          })
        })]
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white
  },
  flexInfoDetail: {
    flexDirection: 'row',
    paddingVertical: (0, _scales.vertical)(12),
    paddingHorizontal: (0, _scales.horizontal)(24),
    justifyContent: 'space-between'
  },
  flexRow: {
    flexDirection: 'row'
  },
  textTitle: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8
  },
  textTitleStatus: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    marginTop: 8
  },
  textDetail: {
    fontFamily: _fonts.default.bold,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20.4,
    color: _colors.Color.text_color
  },
  textDetailWhite: {
    fontFamily: _fonts.default.bold,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    color: _colors.Color.white
  },
  textDetailStatus: {
    fontFamily: _fonts.default.bold,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20.4,
    paddingHorizontal: (0, _scales.horizontal)(12),
    paddingVertical: (0, _scales.vertical)(8),
    borderRadius: 100
  }
});
var _default = exports.default = AggregateScoreDetailScreen;
//# sourceMappingURL=AggregateScoreDetailScreen.js.map