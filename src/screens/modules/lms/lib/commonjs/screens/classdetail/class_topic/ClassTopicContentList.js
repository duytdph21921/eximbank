"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _scales = require("@utils/scales");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _platforms = require("@utils/platforms");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactNativeFontawesome = require("@fortawesome/react-native-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _globalSlice = require("@store/reducers/globalSlice");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _helpers = require("@utils/helpers");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _ViewClassTopicEmpty = _interopRequireDefault(require("./ViewClassTopicEmpty.js"));
var _lmsclasstopicApi = require("../../../services/lmsclasstopic.api.js");
var _index = _interopRequireDefault(require("../../../component/BottomAddClassTopic/index.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable global-require */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */

const ITEM_WIDTH_SLIDE = _platforms.screenWidth - (0, _scales.horizontal)(24 * 2);
const ITEM_HEIGHT_SLIDE = _reactNativeDeviceInfo.isTablet ? ITEM_WIDTH_SLIDE * 140 / 327 : ITEM_WIDTH_SLIDE * 162 / 327;
const RenderItemClassTopic = ({
  item,
  languageLocal,
  viewDetailTopic
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
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
const ClassTopicContentList = props => {
  const {
    contentInfo,
    classInfo,
    index,
    handleTopicInfo,
    handleBack
  } = props;
  const [listData, setListData] = (0, _react.useState)([]);
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [title, setTitle] = (0, _react.useState)('');
  const dispatch = (0, _reactRedux.useDispatch)();
  const isMounteRef = (0, _react.useRef)(false);
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  (0, _react.useEffect)(() => {
    if (contentInfo) {
      let newTitle = contentInfo?.title ?? '';
      if (newTitle.length > 45) {
        newTitle = `${newTitle.slice(0, 45)}...`;
      }
      setTitle(newTitle);
    }
  }, []);
  const funcSearchFr = async params => {
    const response = await (0, _lmsclasstopicApi.searchFr)(params);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    const model = {
      offset: 0,
      limit: 9999,
      keyword: '',
      classId: classInfo?.id,
      classContentId: contentInfo?.id
    };
    if (index === 4) {
      dispatch((0, _globalSlice.updateLoadingAction)(true));
      funcSearchFr(model);
      dispatch((0, _globalSlice.updateLoadingAction)(false));
    }
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const getData = () => {
    const model = {
      offset: 0,
      limit: 9999,
      keyword: '',
      classId: classInfo?.id,
      classContentId: contentInfo?.id
    };
    if (index === 4) {
      funcSearchFr(model);
    }
  };
  const RenderBottomAddClassTopic = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    isOpenModal: isOpenModal,
    handleSubmitTopic: event => {
      handleSubmitTopic(event);
    },
    closeModal: () => {
      setIsOpenModal(false);
    }
  }), [isOpenModal]);
  const handleSubmitTopic = async item => {
    // Check data truoc khi day len
    if (!item?.title || !item?.content) {
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
      return;
    }
    // Call api đẩy dữ liệu lên
    const model = {
      classId: classInfo?.id,
      content: item?.content,
      title: item?.title,
      itemId: contentInfo?.id
    };
    const response = await (0, _lmsclasstopicApi.postClassTopic)(model);
    if (response?.status) {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-tab-notification',
        keyMessage: 'text-success-action',
        contentMessage: '',
        isShowCancel: true,
        isShowSubmit: false,
        keyCancel: 'text-close'
      }));
      getData();
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
  };
  const viewDetailTopic = item => {
    handleTopicInfo(2, item);
  };
  const onHandleBack = () => {
    handleBack(0);
  };
  const handleLoadMore = () => {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.header,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          onPress: () => {
            onHandleBack();
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            i18nKey: "text-class-topic-content",
            style: styles.textHeader
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faAngleRight,
          style: styles.iconFaAngleRight,
          size: 10
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: title,
          style: styles.textHeader
        })]
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
          }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderItemClassTopic, {
            item: item,
            index: index,
            viewDetailTopic: viewDetailTopic,
            languageLocal: languageLocal
          }),
          contentContainerStyle: styles.contentContainerStyle,
          ListEmptyComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewClassTopicEmpty.default, {})
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
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.Color.white,
    marginHorizontal: (0, _scales.horizontal)(20),
    position: 'relative'
  },
  textInput: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: _reactNativeDeviceInfo.isTablet ? ITEM_HEIGHT_SLIDE * 0.2 : 1
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
    alignItems: 'center'
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
  },
  header: {
    flexDirection: 'row'
  },
  iconFaAngleRight: {
    marginHorizontal: (0, _scales.horizontal)(5),
    marginVertical: (0, _scales.vertical)(2.5)
  },
  textHeader: {
    fontFamily: _fonts.default.regular,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16
  }
});
var _default = exports.default = ClassTopicContentList;
//# sourceMappingURL=ClassTopicContentList.js.map