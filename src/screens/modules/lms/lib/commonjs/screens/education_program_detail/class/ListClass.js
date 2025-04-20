"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_field = _interopRequireDefault(require("@assets/icons/icon_field.svg"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _CustomImage = _interopRequireDefault(require("@components/CustomImage"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _globalSlice = require("@store/reducers/globalSlice");
var _BottomSheetListSubjectClass = _interopRequireDefault(require("@components/BottomSheetListSubjectClass"));
var _icon_filter = _interopRequireDefault(require("@assets/icons/icon_filter.svg"));
var _lmsclassApi = require("../../../services/lmsclass.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */

const WIDTH_ITEM = (_platforms.screenWidth - (0, _scales.horizontal)(20 * 2) - (0, _scales.horizontal)(20)) / 2;
const IMAGE_HEIGHT = WIDTH_ITEM * 154 / 216;
const ListClass = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    navigation,
    params
  } = props;
  const isMounteRef = (0, _react.useRef)(false);
  const isRefreshing = false;
  const [listClass, setListClass] = (0, _react.useState)([]);
  const [totalClass, setTotalClass] = (0, _react.useState)(0);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [offset, setOffset] = (0, _react.useState)(0);
  const [limit] = (0, _react.useState)(20);
  const search = '';
  const [isLoadMore, setLoadMore] = (0, _react.useState)(false);
  const [paramsListClass, setParamsListClass] = (0, _react.useState)({
    offset,
    limit,
    keyword: search,
    subjectId: params?.id,
    orderBy: 1,
    statusLearn: [],
    statusRelation: [],
    statusClass: []
  });
  const funcGetBySubjectIdAndUser = async () => {
    const response = await (0, _lmsclassApi.getBySubjectIdAndUser)(paramsListClass);
    if (response?.status && isMounteRef.current) {
      setListClass(response?.data);
      setTotalClass(response?.metaData?.totalRecord);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetBySubjectIdAndUser();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const onRefresh = () => {};
  /**
   * Reder view item class.
   * @param {*} param0
   */
  const gotoClassDetail = item => {
    navigation.navigate(_constants.default.SEARCH_CLASS_DETAIL, {
      classDetail: item
    });
  };
  const renderItemClass = (item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
    style: [styles.viewItemClass, {
      marginLeft: index % 2 !== 0 ? _platforms.screenWidth - (0, _scales.horizontal)(30 * 2) - WIDTH_ITEM * 2 : 0
    }],
    onPress: () => gotoClassDetail(item),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomImage.default, {
      style: styles.imageItemClass,
      source: item?.avatar
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      title: item?.title,
      style: styles.textTitleMyClass,
      numberOfLines: 2
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewDateItem,
      children: [(item?.startDate !== '' || item?.endDate !== '') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_field.default, {
        width: 18,
        height: 18
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`,
        style: styles.textDateMyClass
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.viewClassType,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${item?.classTypeName}`,
        style: styles.textTypeClass
      })
    })]
  });
  const onPressFilter = () => {
    setIsOpenModal(true);
  };
  const getDataClass = async (param, isRefresh = false) => {
    const statusLearn = param?.statusLearn?.filter(item => item !== 0);
    const statusClass = param?.statusClass?.filter(item => item !== 0);
    const newParams = {
      ...param,
      statusLearn,
      statusClass
    };
    const response = await (0, _lmsclassApi.getBySubjectIdAndUser)(newParams);
    if (response?.status && isMounteRef.current) {
      if (isRefresh) {
        setListClass(response?.data);
      } else {
        setOffset(offset + 10);
        setListClass([...listClass, ...(response?.data ?? [])]);
      }
      setTotalClass(response?.metaData?.totalRecord);
    }
  };
  const renderHeader = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.viewClassFilter,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.viewTextClass,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        i18nKey: "text-list-class",
        style: styles.textClass
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: ` (${totalClass ?? 0})`,
        style: [styles.textClass, {
          color: _colors.Color.color_text_progress_bar
        }]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
      onPress: onPressFilter,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_filter.default, {
        width: 24,
        height: 24
      })
    })]
  });
  const handleLoadMore = () => {
    if (!isLoadMore && !(void 0).onEndReachedCalledDuringMomentum && listClass.length < totalClass) {
      setLoadMore(true);
      const newModel = {
        ...paramsListClass,
        offset: offset + limit
      };
      getDataClass(newModel);
      (void 0).onEndReachedCalledDuringMomentum = true;
    }
  };
  const RenderBottomFilter = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetListSubjectClass.default, {
    isOpenModal: isOpenModal,
    handleApplyOnPress: event => {
      const newModel = {
        ...event,
        keyword: search,
        offset: 0
      };
      setParamsListClass(newModel);
      setOffset(0);
      getDataClass(newModel, true);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
    model: paramsListClass,
    type: 2,
    showStatusLearn: true,
    showStatusClass: true
  }), [isOpenModal]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
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
      data: listClass,
      ListHeaderComponent: renderHeader,
      renderItem: ({
        item,
        index
      }) => renderItemClass(item, index),
      keyExtractor: (item, index) => index.toString(),
      numColumns: 2,
      contentContainerStyle: styles.contentContainerStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomFilter, {})]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {
    backgroundColor: _colors.Color.white
  },
  viewItemClass: {
    width: WIDTH_ITEM,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: (0, _scales.vertical)(15),
    marginRight: (0, _scales.horizontal)(20),
    paddingHorizontal: (0, _scales.horizontal)(20)
  },
  imageItemClass: {
    height: IMAGE_HEIGHT,
    width: WIDTH_ITEM,
    alignSelf: 'flex-start',
    borderRadius: 8
  },
  textTitleMyClass: {
    fontSize: 12,
    fontWeight: '700',
    color: _colors.Color.text_color,
    marginTop: (0, _scales.vertical)(10),
    height: (0, _scales.vertical)(20),
    fontFamily: _fonts.default.bold,
    lineHeight: 20.4
  },
  viewDateItem: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(5)
  },
  viewClassType: {
    flexDirection: 'row',
    marginTop: (0, _scales.vertical)(5),
    borderRadius: 50,
    width: 100,
    paddingVertical: 3,
    backgroundColor: _colors.Color.color_width_featured_class,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDateMyClass: {
    fontSize: 10,
    fontWeight: '400',
    color: _colors.Color.text_color,
    lineHeight: 16,
    paddingHorizontal: (0, _scales.horizontal)(5),
    fontFamily: _fonts.default.regular
  },
  textTypeClass: {
    fontSize: 10,
    fontWeight: '600',
    color: _colors.Color.text_color,
    lineHeight: 16,
    paddingHorizontal: (0, _scales.horizontal)(10),
    fontFamily: _fonts.default.regular,
    paddingVertical: (0, _scales.vertical)(5)
  },
  viewProgress: {
    marginTop: (0, _scales.vertical)(10),
    backgroundColor: _colors.Color.color_bg_progress_bar
  },
  textProgress: {
    fontSize: 10,
    fontWeight: '600',
    color: _colors.Color.color_text_progress_bar,
    marginTop: (0, _scales.vertical)(5)
  },
  viewClassFilter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: (0, _scales.vertical)(20),
    marginHorizontal: (0, _scales.horizontal)(20)
  },
  viewTextClass: {
    flexDirection: 'row'
  },
  textClass: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25.2
  }
});
var _default = exports.default = ListClass;
//# sourceMappingURL=ListClass.js.map