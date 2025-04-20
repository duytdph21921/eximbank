"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _colors = require("@theme/colors");
var _icon_mark_a = _interopRequireDefault(require("@assets/icons/icon_mark_a.svg"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _lmsclassuserlearningApi = require("../../../services/lmsclassuserlearning.api.js");
var _AggregateScoreScreenStyles = require("./AggregateScoreScreen.styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Render item aggregate score.
 */const ItemAggregate = ({
  item,
  navigation,
  classId
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
  style: _AggregateScoreScreenStyles.styles.viewItemAggregate,
  onPress: () => {
    navigation.navigate(_constants.default.DETAIL_LEARNING_RESULT_SCREEN, {
      contentDetail: item,
      classId,
      classContentId: item?.id,
      isExercise: item.isExercise
    });
  },
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: _AggregateScoreScreenStyles.styles.viewIcon,
    children: item?.markText != null && item?.markText !== '' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: `${item?.markText}`,
      style: _AggregateScoreScreenStyles.styles.textScoreRequired
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_mark_a.default, {
      width: 24,
      height: 24
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _AggregateScoreScreenStyles.styles.viewContent,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: item?.title ?? '',
      style: _AggregateScoreScreenStyles.styles.textTitle
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _AggregateScoreScreenStyles.styles.viewScore,
      children: [item?.markText != null && item?.markText !== '' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${item?.markText}`,
          style: _AggregateScoreScreenStyles.styles.textScore,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-score",
            style: _AggregateScoreScreenStyles.styles.textScore
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: _AggregateScoreScreenStyles.styles.viewVertical
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-weight",
        style: _AggregateScoreScreenStyles.styles.textScore,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${item?.weightScore}`,
          style: _AggregateScoreScreenStyles.styles.textScore
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      style: [_AggregateScoreScreenStyles.styles.btnState, {
        backgroundColor: item?.status === 1 ? _colors.Color.color_pass : _colors.Color.color_text_progress_bar
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: item?.statusName,
        style: _AggregateScoreScreenStyles.styles.textStatus
      })
    })]
  })]
});
const AggregateScoreScreen = props => {
  const {
    navigation,
    route
  } = props;
  const isRefreshing = false;
  const [listAggregate, setListAggregate] = (0, _react.useState)([]);
  const isMounteRef = (0, _react.useRef)(false);
  const dispatch = (0, _reactRedux.useDispatch)();
  const classId = route?.params?.classId;
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-header-aggegate-score",
    style: _globalStyles.default.titleScreen
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  const funcGetMarkInfomation = async () => {
    const response = await (0, _lmsclassuserlearningApi.getMarkInfomation)(classId);
    if (response?.status && response?.data && isMounteRef.current) {
      setListAggregate(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetMarkInfomation();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  /**
   * handle refresh list notification.
   */
  const onRefresh = () => {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _AggregateScoreScreenStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: onRefresh
      }),
      data: listAggregate,
      renderItem: ({
        item,
        index
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemAggregate, {
        item: item,
        index: index,
        navigation: navigation,
        classId: classId
      }),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false
    })
  });
};
var _default = exports.default = AggregateScoreScreen;
//# sourceMappingURL=AggregateScoreScreen.js.map