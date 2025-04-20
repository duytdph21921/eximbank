"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _icon_calendar = _interopRequireDefault(require("@assets/other/icon_calendar.svg"));
var _icon_subject = _interopRequireDefault(require("@assets/icons/icon_subject.svg"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalSlice = require("@store/reducers/globalSlice");
var _CustomImage = _interopRequireDefault(require("@components/CustomImage"));
var _lmstrainingApi = require("../../services/lmstraining.api.js");
var _EducationProgramStyles = require("./EducationProgram.styles.js");
var _HeaderEduProgramComponent = _interopRequireDefault(require("./components/HeaderEduProgramComponent.js"));
var _index = _interopRequireDefault(require("../../component/BottomSheetFilterEduProgram/index.js"));
var _ViewTrainingRoomEmpty = _interopRequireDefault(require("./components/ViewTrainingRoomEmpty.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

const EducationProgramScreen = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    navigation,
    index
  } = props;
  const isRefreshing = false;
  const [isLoadMore, setLoadMore] = (0, _react.useState)(false);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const isMounteRef = (0, _react.useRef)(null);
  const [offset, setOffset] = (0, _react.useState)(0);
  const [keyword, setKeyword] = (0, _react.useState)('');
  const [params, setParams] = (0, _react.useState)({
    offset,
    limit: 20,
    keyword,
    statusTraining: [],
    // Trạng thái học tập.
    dataRange: []
  });
  const [listEduProgram, setListEduProgram] = (0, _react.useState)([]);
  const [countEduProgram, setCountEduProgram] = (0, _react.useState)(0);

  /**
   * Api chương trình đào tạo.
   */
  const funcSearchTrainingByUser = async () => {
    const response = await (0, _lmstrainingApi.searchTrainingByUser)(params);
    if (response?.status && isMounteRef.current) {
      setListEduProgram(response?.data);
      setCountEduProgram(response?.metaData?.totalRecord);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (index === 1) {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      funcSearchTrainingByUser();
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  /**
   * Api danh sach chương trình đào tạo.
   * @param {*} param
   */
  const getDataEduProgram = async (param, isRefresh = false) => {
    const newStatusTraining = param?.statusTraining?.filter(item => item !== 0);
    const newParams = {
      ...param,
      statusTraining: newStatusTraining
    };
    const response = await (0, _lmstrainingApi.searchTrainingByUser)(newParams);
    setLoadMore(false);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListEduProgram(response?.data);
      } else {
        setOffset(offset + 10);
        setListEduProgram([...listEduProgram, ...(response?.data ?? [])]);
      }
      setCountEduProgram(response?.metaData?.totalRecord);
    }
  };
  const onRefresh = () => {
    const newParams = {
      ...params,
      offset: 0
    };
    setParams(newParams);
    setOffset(0);
    getDataEduProgram(newParams, true);
  };

  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (!isLoadMore && !(void 0).onEndReachedCalledDuringMomentum && listEduProgram.length < countEduProgram) {
      setLoadMore(true);
      const newParams = {
        ...params,
        offset: offset + 10
      };
      getDataEduProgram(newParams);
      (void 0).onEndReachedCalledDuringMomentum = true;
    }
  };

  /**
   * Reder view item edu program.
   * @param {*} param0
   */
  const itemEduProgram = item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    style: _EducationProgramStyles.styles.viewItemClass,
    onPress: () => {
      navigation.navigate(_constants.default.EDU_PROGRAM_DETAIL_SCREEN, item);
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomImage.default, {
      style: _EducationProgramStyles.styles.imageItemClass,
      source: item?.avatar
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: item?.title,
      style: _EducationProgramStyles.styles.textTitleMyClass,
      numberOfLines: 2
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _EducationProgramStyles.styles.viewDateItem,
      children: [(item?.startDate !== '' || item?.endDate !== '') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_calendar.default, {
        width: 16,
        height: 16
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`,
        style: _EducationProgramStyles.styles.textDateMyClass,
        numberOfLines: 1
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _EducationProgramStyles.styles.viewDateItem,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_subject.default, {
        width: 14,
        height: 14
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${item?.numSubject} `,
        style: _EducationProgramStyles.styles.textDateMyClass,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-title-subject",
          style: _EducationProgramStyles.styles.textDateMyClass
        })
      })]
    })]
  });
  const RenderBottomFilter = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    isOpenModal: isOpenModal,
    handleApplyOnPress: event => {
      const newModel = {
        ...event,
        offset: 0,
        keyword
      };
      setOffset(0);
      setParams(newModel);
      getDataEduProgram(newModel, true);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
    model: params
  }), [isOpenModal]);
  const gotoSearchTraining = () => {
    navigation.navigate(_constants.default.SEARCH_STACK, {
      screen: _constants.default.SEARCH_SCREEN,
      params: {
        tabIndex: 1
      }
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _EducationProgramStyles.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: _EducationProgramStyles.styles.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
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
        overScrollMode: "never",
        initialNumToRender: 10,
        removeClippedSubviews: true,
        maxToRenderPerBatch: 10,
        windowSize: 50,
        bounce: false,
        keyExtractor: (_item, index) => index.toString(),
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        data: listEduProgram,
        ListHeaderComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderEduProgramComponent.default, {
          navigation: navigation,
          listEduProgram: listEduProgram,
          countEduProgram: countEduProgram,
          onPressFilter: () => {
            setIsOpenModal(true);
          },
          onSearch: search => {
            const newParams = {
              ...params,
              keyword: search.trim(),
              offset: 0
            };
            setOffset(0);
            setKeyword(search.trim());
            setParams(newParams);
            getDataEduProgram(newParams, true);
          }
        }),
        renderItem: ({
          item
        }) => itemEduProgram(item),
        numColumns: 2,
        contentContainerStyle: _EducationProgramStyles.styles.contentContainerStyle,
        ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewTrainingRoomEmpty.default, {
          onPressExplore: () => {
            gotoSearchTraining();
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomFilter, {})]
    })
  });
};
var _default = exports.default = EducationProgramScreen;
//# sourceMappingURL=EducationProgramScreen.js.map