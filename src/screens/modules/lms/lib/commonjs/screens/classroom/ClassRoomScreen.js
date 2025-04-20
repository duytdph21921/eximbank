"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var Progress = _interopRequireWildcard(require("react-native-progress"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_calendar = _interopRequireDefault(require("@assets/other/icon_calendar.svg"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CustomImage = _interopRequireDefault(require("@components/CustomImage"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _index = _interopRequireDefault(require("../../component/BottomSheetFilterClassRoom/index.js"));
var _lmsclassApi = require("../../services/lmsclass.api.js");
var _ClassRoomStyles = require("./ClassRoom.styles.js");
var _HeaderClassRoomComponent = _interopRequireDefault(require("./components/HeaderClassRoomComponent.js"));
var _ViewClassRoomEmpty = _interopRequireDefault(require("./components/ViewClassRoomEmpty.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */

const WIDTH_ITEM = (_platforms.screenWidth - (0, _scales.horizontal)(15 * 2) - (0, _scales.horizontal)(15 * 2)) / 2;
const ClassRoomScreen = props => {
  const {
    navigation,
    index
  } = props;
  const dispatch = (0, _reactRedux.useDispatch)();
  const isRefreshing = false;
  const [isLoadMore, setLoadMore] = (0, _react.useState)(false);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [listClassRoom, setListClassRoom] = (0, _react.useState)([]);
  const [countContent, setCountContent] = (0, _react.useState)(0);
  const [offset, setOffset] = (0, _react.useState)(0);
  const [keyword, setKeyword] = (0, _react.useState)('');
  const [limit] = (0, _react.useState)(20);
  const isMounteRef = (0, _react.useRef)(false);
  const [model, setModel] = (0, _react.useState)({
    offset,
    limit: 20,
    keyword,
    orderBy: 1,
    // Ko dùng
    statusLearn: [],
    // trạng thái học tập
    statusRelation: [],
    // trạng thái  bắt buộc
    statusClass: [],
    // tiến trình thời gian
    classOrganizationType: [],
    // Loại tổ chức
    classCategoryId: '00000000-0000-0000-0000-000000000000',
    dataRange: [] // Phạm vi dữ liệu,  Ko dùng
  });

  /**
   * Lấy danh sách lớp học.
   */
  const funcGetClassJoined = async () => {
    const response = await (0, _lmsclassApi.getClassJoined)(model);
    if (response?.status) {
      setListClassRoom(response?.data);
      setCountContent(response?.metaData?.totalRecord);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (index === 0) {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      funcGetClassJoined();
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, [index]);

  /**
   * Load refresh.
   */
  const onRefresh = () => {
    setOffset(0);
    const newModel = {
      ...model,
      offset: 0
    };
    setModel(newModel);
    getData(newModel, true);
  };

  /**
   * Load more.
   */
  const handleLoadMore = () => {
    if (!isLoadMore && !(void 0).onEndReachedCalledDuringMomentum && listClassRoom.length < countContent) {
      setLoadMore(true);
      const newModel = {
        ...model,
        offset: offset + limit
      };
      getData(newModel);
      (void 0).onEndReachedCalledDuringMomentum = true;
    }
  };

  /**
   * Get data load more, search, filter...
   */
  const getData = async (newModel, isRefresh = false) => {
    const statusLearn = newModel?.statusLearn?.filter(item => item !== 0);
    const statusRelation = newModel?.statusRelation?.filter(item => item !== 0);
    const statusClass = newModel?.statusClass?.filter(item => item !== 0);
    const classOrganizationType = newModel?.classOrganizationType?.filter(item => item !== 0);
    const newParams = {
      ...newModel,
      statusLearn,
      statusRelation,
      statusClass,
      classOrganizationType
    };
    const response = await (0, _lmsclassApi.getClassJoined)(newParams);
    if (response?.status) {
      if (isRefresh) {
        setListClassRoom(response?.data);
      } else {
        setOffset(offset + 10);
        setListClassRoom([...listClassRoom, ...(response?.data ?? [])]);
      }
      setCountContent(response?.metaData?.totalRecord);
    }
  };
  const gotoClassDetail = item => {
    navigation.navigate(_constants.default.CLASS_DETAIL_SCREEN, {
      id: item?.id,
      indexTab: 1
    });
  };
  /**
   * Reder view item class room.
   * @param {*} param0
   */
  const renderItemClassRoom = item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    style: _ClassRoomStyles.styles.viewItemClass,
    onPress: () => gotoClassDetail(item),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomImage.default, {
      style: _ClassRoomStyles.styles.imageItemClass,
      source: item?.avatar
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: item?.title,
      style: _ClassRoomStyles.styles.textTitleMyClass,
      numberOfLines: 2
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _ClassRoomStyles.styles.viewDateItem,
      children: [(item?.startDate !== '' || item?.endDate !== '') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_calendar.default, {
        width: 16,
        height: 16
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`,
        style: _ClassRoomStyles.styles.textDateMyClass,
        numberOfLines: 1
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Progress.Bar, {
      progress: (item?.percent ?? 0) / 100,
      width: WIDTH_ITEM,
      style: _ClassRoomStyles.styles.viewProgress,
      color: _colors.Color.color_progress_bar,
      borderWidth: 0
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-complete-survey",
      style: _ClassRoomStyles.styles.textProgress,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: ` ${item?.percent}%`,
        style: _ClassRoomStyles.styles.textProgress
      })
    })]
  });
  const RenderBottomFilter = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    isOpenModal: isOpenModal,
    handleApplyOnPress: event => {
      const newModel = {
        ...event,
        keyword
      };
      setModel(newModel);
      getData(newModel, true);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
    model: model
  }), [isOpenModal]);
  const gotoSearchClass = () => {
    navigation.navigate(_constants.default.SEARCH_STACK, {
      screen: _constants.default.SEARCH_SCREEN,
      params: {
        tabIndex: 0
      }
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: _ClassRoomStyles.styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.SafeAreaView, {
      style: _ClassRoomStyles.styles.container,
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
        keyExtractor: (item, index) => index.toString(),
        data: listClassRoom,
        showsVerticalScrollIndicator: false,
        ListHeaderComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderClassRoomComponent.default, {
          navigation: navigation,
          listClassRoom: listClassRoom,
          countClassRoom: countContent,
          onPressFilter: () => {
            setIsOpenModal(true);
          },
          onSearch: search => {
            const newModel = {
              ...model,
              keyword: search.trim(),
              offset: 0
            };
            setOffset(0);
            setKeyword(search.trim());
            setModel(newModel);
            getData(newModel, true);
          }
        }),
        renderItem: ({
          item,
          index
        }) => renderItemClassRoom(item, index),
        numColumns: 2,
        contentContainerStyle: _ClassRoomStyles.styles.contentContainerStyle,
        ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewClassRoomEmpty.default, {
          onPressExplore: () => {
            gotoSearchClass();
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomFilter, {})]
    })
  });
};
var _default = exports.default = ClassRoomScreen;
//# sourceMappingURL=ClassRoomScreen.js.map