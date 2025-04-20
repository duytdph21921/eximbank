"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _globalStyles = _interopRequireDefault(require("@theme/globalStyles"));
var _icon_right = _interopRequireDefault(require("@assets/icons/icon_right.svg"));
var _icon_left = _interopRequireDefault(require("@assets/icons/icon_left.svg"));
var _colors = require("@theme/colors");
var _moment = _interopRequireDefault(require("moment"));
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _HistoryAccessScreenStyles = require("./HistoryAccessScreen.styles.js");
var _logsApi = require("../../../services/logs.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const HistoryAccessScreen = props => {
  const {
    navigation,
    route
  } = props;
  const isRefreshing = false;
  const [listHistoryAccess, setListHistoryAccess] = (0, _react.useState)([]);
  const isMounteRef = (0, _react.useRef)(false);
  const isLoading = (0, _react.useRef)(false);
  const [offset, setOffset] = (0, _react.useState)(0);
  const [total, setTotal] = (0, _react.useState)(0);
  const dispatch = (0, _reactRedux.useDispatch)();
  const classUserId = route?.params?.classUser?.id;
  const params = {
    classUserId,
    offset,
    limit: 10
  };
  const renderHeaderTitle = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
    i18nKey: "text-header-history-access-screen",
    style: _globalStyles.default.titleScreen
  });
  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerTitle: renderHeaderTitle
    });
  }, [navigation]);
  const funcGetLearningHistory = async model => {
    const response = await (0, _logsApi.getLearningHistory)(model);
    if (response?.status && isMounteRef.current) {
      setListHistoryAccess(response?.data);
      setTotal(response?.metaData?.totalRecord);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetLearningHistory(params);
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Render item history.
   */
  const itemHistory = item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _HistoryAccessScreenStyles.styles.viewItemHistory,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [_HistoryAccessScreenStyles.styles.viewIcon, {
        backgroundColor: item?.actionCode === 'END_VIEW' ? _colors.Color.color_text_progress_bar : _colors.Color.text_color_hover
      }],
      children: item?.actionCode === 'END_VIEW' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_left.default, {
        width: 20,
        height: 20
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_right.default, {
        width: 20,
        height: 20
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _HistoryAccessScreenStyles.styles.viewContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: item?.title ?? '',
        style: _HistoryAccessScreenStyles.styles.textTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        style: _HistoryAccessScreenStyles.styles.textDate,
        title: (0, _moment.default)(item?.logTime).format('HH:mm - DD/MM/YYYY') ?? ''
      })]
    })]
  });

  /**
   * handle refresh list notification.
   */
  const getData = async type => {
    if (isLoading.current === true) return;
    let newOffset = offset;
    if (type === 'refresh') {
      newOffset = 0;
    } else if (listHistoryAccess && listHistoryAccess.length < total) {
      newOffset = offset + 10;
    } else {
      return;
    }
    isLoading.current = false;
    const newModel = {
      ...params,
      offset: newOffset
    };
    const response = await (0, _logsApi.getLearningHistory)(newModel);
    if (response?.status) {
      if (type === 'refresh') {
        setListHistoryAccess(response?.data);
      } else {
        setListHistoryAccess([...listHistoryAccess, ...(response?.data ?? [])]);
      }
      setOffset(newOffset);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: _HistoryAccessScreenStyles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
        refreshing: isRefreshing,
        onRefresh: () => getData('refresh')
      }),
      onEndReachedThreshold: 0.3,
      onEndReached: () => getData('loadMore'),
      data: listHistoryAccess,
      renderItem: ({
        item,
        index
      }) => itemHistory(item, index),
      keyExtractor: (item, index) => index.toString(),
      showsVerticalScrollIndicator: false
    })
  });
};
var _default = exports.default = HistoryAccessScreen;
//# sourceMappingURL=HistoryAccessScreen.js.map