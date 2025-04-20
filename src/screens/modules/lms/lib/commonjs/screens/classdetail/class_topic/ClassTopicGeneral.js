"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _scales = require("@utils/scales");
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _platforms = require("@utils/platforms");
var _colors = require("@theme/colors");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _reactRedux = require("react-redux");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _helpers = require("@utils/helpers");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _reactNativeFontawesome = require("@fortawesome/react-native-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _globalSlice = require("@store/reducers/globalSlice");
var _lmsclasstopicApi = require("../../../services/lmsclasstopic.api.js");
var _index = _interopRequireDefault(require("../../../component/BottomAddClassTopic/index.js"));
var _ViewClassTopicEmpty = _interopRequireDefault(require("./ViewClassTopicEmpty.js"));
var _ClassTopicDetail = _interopRequireDefault(require("./ClassTopicDetail.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable global-require */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */

const ITEM_WIDTH_SLIDE = _platforms.screenWidth - (0, _scales.horizontal)(24 * 2);
const ITEM_HEIGHT_SLIDE = _platforms.isTablet ? ITEM_WIDTH_SLIDE * 140 / 327 : ITEM_WIDTH_SLIDE * 162 / 327;
const PLACEHOLDER = {
  en: {
    placeholder: 'Enter keyword'
  },
  vn: {
    placeholder: 'Nhập từ khoá tìm kiếm'
  }
};
const ClassTopicGeneral = props => {
  const {
    classInfo
  } = props;
  const [search, setSearch] = (0, _react.useState)('');
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [listData, setListData] = (0, _react.useState)([]);
  const [total, setTotal] = (0, _react.useState)(0);
  const offset = 0;
  const [limit] = (0, _react.useState)(20);
  const [isLoadMore, setLoadMore] = (0, _react.useState)(false);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [isViewDetail, setIsViewDetail] = (0, _react.useState)(false);
  const [classTopicInfo, setClassTopicInfo] = (0, _react.useState)();
  const [model, setModel] = (0, _react.useState)({
    offset,
    limit,
    keyword: search,
    classId: classInfo?.id
  });
  const dispatch = (0, _reactRedux.useDispatch)();
  const isMounteRef = (0, _react.useRef)(false);
  const onHandleChangeKeyword = keyword => {
    setSearch(keyword);
    const newMode = {
      ...model,
      keyword
    };
    setModel(newMode);
    getData(newMode);
  };
  const funcSearchFr = async params => {
    const response = await (0, _lmsclasstopicApi.searchFr)(params);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
      setTotal(response?.metaData?.totalRecord ?? 0);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    if (isMounteRef.current) {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      funcSearchFr(model);
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const getData = params => {
    funcSearchFr(params);
  };
  const handleLoadMore = () => {
    if (!isLoadMore && !(void 0).onEndReachedCalledDuringMomentum && listData.length < total) {
      setLoadMore(true);
      // getData(newModel);
      (void 0).onEndReachedCalledDuringMomentum = true;
    }
  };
  const renderItemClassTopic = item => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
    style: styles.boxTopic,
    onPress: () => {
      viewDetailTopic(item);
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        marginBottom: (0, _scales.vertical)(8)
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: item?.title,
        style: styles.title
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.boxItem,
      children: [item?.avatar ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: {
          uri: (0, _helpers.loadFile)(item?.avatar)
        },
        resizeMode: "contain",
        style: styles.avatarProfile
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: require('@assets/img/avatar-detail.png'),
        resizeMode: "contain",
        style: styles.avatarProfile
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: item?.displayName,
        style: styles.displayName
      }), item?.createdDate && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          flexDirection: 'row'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.dot
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: (0, _helpers.calculatorTime)(item?.createdDate, languageLocal),
          style: styles.textTime
        })]
      })]
    })]
  });
  const RenderBottomAddClassTopic = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    isOpenModal: isOpenModal,
    handleSubmitTopic: event => {
      handleSubmitTopic(event);
    },
    closeModal: () => {
      setIsOpenModal(false);
    }
  }), [isOpenModal]);
  const handleSubmitTopic = (0, _react.useCallback)(async item => {
    // Check data truoc khi day len
    if (!item?.title || !item?.content || item?.title === '' || item?.content === '') {
      setTimeout(() => {
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'text-notify-tb21',
          contentMessage: '',
          isShowCancel: true,
          isShowSubmit: false,
          keyCancel: 'text-close'
        }));
      }, 500);
    } else {
      // Call api đẩy dữ liệu lên
      const modelAdd = {
        classId: classInfo?.id,
        content: item?.content,
        title: item?.title,
        itemId: _constants.default.GUIDEMPTY
      };
      const response = await (0, _lmsclasstopicApi.postClassTopic)(modelAdd);
      if (response?.status) {
        setSearch('');
        const newModel = {
          ...model,
          keyword: ''
        };
        setModel(newModel);
        getData(newModel);
      } else {
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'text-internal-error',
          contentMessage: '',
          isShowCancel: true,
          isShowSubmit: false,
          keyCancel: 'text-close'
        }));
      }
    }
  });
  const viewDetailTopic = item => {
    setClassTopicInfo(item);
    setIsViewDetail(true);
  };
  const handleBack = type => {
    if (type === 1) {
      setIsViewDetail(false);
      const newModel = {
        ...model,
        offset: 0,
        limit: 20,
        keyword: '',
        classId: classInfo?.id
      };
      setModel(newModel);
      getData(newModel);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: styles.container,
    children: isViewDetail === false ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
          placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
          returnKeyType: "next",
          blurOnSubmit: false,
          onChangeText: search => {
            setSearch(search?.trim());
          },
          textInputStyle: styles.textInput,
          isSearch: true,
          onSubmitEditing: () => {
            onHandleChangeKeyword(search?.trim());
          },
          onSubmitSearch: () => {
            onHandleChangeKeyword(search?.trim());
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.boxParent,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
          onEndReached: () => {
            handleLoadMore();
          },
          onMomentumScrollBegin: () => {
            (void 0).onEndReachedCalledDuringMomentum = false;
          },
          keyExtractor: (item, index) => index.toString(),
          data: listData,
          showsVerticalScrollIndicator: false,
          renderItem: ({
            item,
            index
          }) => renderItemClassTopic(item, index),
          contentContainerStyle: styles.contentContainerStyle,
          ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewClassTopicEmpty.default, {
            onPressExplore: () => {
              // gotoSearchClass();
            }
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.viewBtnAdd,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: [styles.btnAddTopic, {
            backgroundColor: _colors.Color.base_color
          }],
          onPress: () => {
            setIsOpenModal(true);
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
            icon: _freeSolidSvgIcons.faPlus,
            style: styles.iconPlus
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomAddClassTopic, {})]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClassTopicDetail.default, {
      type: 1,
      classTopicInfo: classTopicInfo,
      classInfo: classInfo,
      handleBack: type => {
        handleBack(type);
      }
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: (0, _scales.horizontal)(20),
    position: 'relative'
  },
  textInput: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: _platforms.isTablet ? ITEM_HEIGHT_SLIDE * 0.2 : 1
  },
  title: {
    fontFamily: _fonts.default.bold,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20.4
  },
  avatarProfile: {
    width: 20,
    height: 20,
    borderRadius: 20
  },
  boxItem: {
    flexDirection: 'row'
  },
  displayName: {
    fontFamily: _fonts.default.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: (0, _scales.horizontal)(4)
  },
  boxTopic: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: _colors.Color.color_width_featured_class,
    paddingHorizontal: (0, _scales.horizontal)(16),
    paddingVertical: (0, _scales.vertical)(16),
    width: _platforms.screenWidth - (0, _scales.horizontal)(20) * 2,
    marginTop: (0, _scales.vertical)(16)
  },
  boxParent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: _platforms.screenHeight * 0.6
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: _colors.Color.text_color_hover,
    marginHorizontal: (0, _scales.horizontal)(8),
    marginVertical: (0, _scales.vertical)(4)
  },
  textTime: {
    fontFamily: _fonts.default.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    color: _colors.Color.text_color_hover
  },
  btnAddTopic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  iconPlus: {
    fontSize: 20,
    color: _colors.Color.white
  },
  viewBtnAdd: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    alignSelf: 'flex-end'
  }
});
var _default = exports.default = ClassTopicGeneral;
//# sourceMappingURL=ClassTopicGeneral.js.map