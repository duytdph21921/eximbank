"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _platforms = require("@utils/platforms");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactRedux = require("react-redux");
var _globalSlice = require("@store/reducers/globalSlice");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _MyTestScreenStyles = require("./MyTestScreen.styles.js");
var _ViewMyTestEmpty = _interopRequireDefault(require("./components/ViewMyTestEmpty.js"));
var _ViewHeader = _interopRequireDefault(require("./components/ViewHeader.js"));
var _RenderHeaderList = _interopRequireDefault(require("./components/RenderHeaderList.js"));
var _RenderItemTest = _interopRequireDefault(require("./components/RenderItemTest.js"));
var _testregistortestformApi = require("../../services/testregistortestform.api.js");
var _index = _interopRequireDefault(require("../../component/BottomSheetFilterMyTestSearch/index.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * V. Bài thi của tôi-data
 * @returns
 */const MyTestScreen = props => {
  const {
    navigation,
    route
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [isRefreshing, setRefreshing] = (0, _react.useState)(false);
  const [isLoadMore, setLoadMore] = (0, _react.useState)(false);
  const [listMyTest, setListMyTest] = (0, _react.useState)([]);
  const [totalRecord, setTotalRecord] = (0, _react.useState)(0);
  const [offset, setOffset] = (0, _react.useState)(0);
  const [search, setSearch] = (0, _react.useState)('');
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [limit] = (0, _react.useState)(10);
  const isMounteRef = (0, _react.useRef)(false);
  const [model, setModel] = (0, _react.useState)({
    offset,
    limit,
    keyword: search,
    statusRegistor: []
  });

  /**
   * Custom header screeen.
   */

  const renderHeaderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {});
  const renderHeaderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-title-my-exam",
      style: _MyTestScreenStyles.styles.titleScreen
    })
  });
  (0, _react.useLayoutEffect)(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
      title: ''
    });
  }, [navigation]);
  const funcGetMyTest = async params => {
    const response = await (0, _testregistortestformApi.getMyTest)(params);
    if (response?.status && isMounteRef.current) {
      setListMyTest(response?.data);
      setTotalRecord(response?.metaData?.totalRecord);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetMyTest(model);
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  /**
   * Get data  bài thi ngoài lớp học.
   */
  const getDataMyTest = async (param, isRefresh = false) => {
    const statusRegistor = param?.statusRegistor?.filter(item => item !== 0);
    const newParams = {
      ...param,
      statusRegistor
    };
    const response = await (0, _testregistortestformApi.getMyTest)(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListMyTest(response?.data);
      } else {
        setOffset(offset + 10);
        setListMyTest([...listMyTest, ...response?.data]);
      }
      setTotalRecord(response?.metaData?.totalRecord);
    }
  };

  /**
   * Làm mới danh sách bài thi ngoài lớp học.
   */
  const onRefresh = () => {
    setOffset(0);
    const newModel = {
      ...model,
      offset: 0
    };
    setModel(newModel);
    getDataMyTest(newModel, true);
  };

  /**
   * Load more: lấy dữ liệu củ của bài thi ngoài lớp học.
   */
  const handleLoadMore = () => {
    if (!isLoadMore && !(void 0).onEndReachedCalledDuringMomentum && listMyTest?.length < totalRecord) {
      setLoadMore(true);
      const newModel = {
        ...model,
        offset: offset + limit
      };
      getDataMyTest(newModel);
      (void 0).onEndReachedCalledDuringMomentum = true;
    }
  };
  const RenderBottomFilter = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    isOpenModal: isOpenModal,
    handleApplyOnPress: event => {
      const newModel = {
        ...event,
        keyword: search,
        offset: 0
      };
      setModel(newModel);
      setOffset(0);
      getDataMyTest(newModel, true);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
    model: model
  }), [isOpenModal]);
  const onPressExplore = () => {
    navigation.navigate(_constants.default.SEARCH_STACK, {
      screen: _constants.default.SEARCH_SCREEN,
      params: {
        tabIndex: 2
      }
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _MyTestScreenStyles.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: _MyTestScreenStyles.styles.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewHeader.default, {
        valueSearch: model?.keyword,
        onSubmitSearch: keyword => {
          const newModel = {
            ...model,
            keyword: keyword.trim(),
            offset: 0
          };
          setSearch(keyword.trim());
          setOffset(0);
          setModel(newModel);
          getDataMyTest(newModel, true);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.VirtualizedList, {
        refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
          refreshing: isRefreshing,
          onRefresh: onRefresh
        }),
        onEndReached: () => {
          handleLoadMore();
        },
        onMomentumScrollBegin: () => {
          (void 0).onEndReachedCalledDuringMomentum = false;
        },
        onEndReachedThreshold: 0.01,
        overScrollMode: "never",
        getItemCount: data => data !== undefined ? data?.length : 0,
        getItem: (data, index) => data[index],
        initialNumToRender: 10,
        removeClippedSubviews: true,
        maxToRenderPerBatch: 10,
        windowSize: 50,
        bounce: false,
        keyExtractor: (_item, index) => index.toString(),
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        data: listMyTest,
        ListHeaderComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderHeaderList.default, {
          onPressFilter: () => {
            setIsOpenModal(true);
          },
          totalRecord: totalRecord
        }),
        renderItem: ({
          item,
          index
        }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderItemTest.default, {
          item: item,
          index: index,
          navigation: navigation
        }),
        contentContainerStyle: _MyTestScreenStyles.styles.contentContainerStyle,
        ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewMyTestEmpty.default, {
          onHandleExplore: () => {
            onPressExplore();
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomFilter, {})]
    })
  });
};
var _default = exports.default = MyTestScreen;
//# sourceMappingURL=MyTestSceen.js.map