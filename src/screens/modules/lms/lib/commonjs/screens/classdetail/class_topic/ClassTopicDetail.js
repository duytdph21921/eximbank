"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactNativeFontawesome = require("@fortawesome/react-native-fontawesome");
var _scales = require("@utils/scales");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _helpers = require("@utils/helpers");
var _reactRedux = require("react-redux");
var _colors = require("@theme/colors");
var _he = _interopRequireDefault(require("he"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _globalSlice = require("@store/reducers/globalSlice");
var _HeaderTopicDetail = _interopRequireDefault(require("./HeaderTopicDetail.js"));
var _lmsclasstopicApi = require("../../../services/lmsclasstopic.api.js");
var _index = _interopRequireDefault(require("../../../component/BottomAddClassTopic/index.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable global-require */
/* eslint-disable react-hooks/exhaustive-deps */

const RenderAction = ({
  item,
  handleEdit,
  handleDelete
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: styles.boxActions,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableNativeFeedback, {
    onPress: () => {
      handleEdit(item);
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-edit",
      style: styles.textAction
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableNativeFeedback, {
    onPress: () => {
      handleDelete();
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      i18nKey: "text-delete",
      style: styles.textAction
    })
  })]
});
const ClassTopicDetail = props => {
  const {
    classInfo,
    type,
    contentInfo,
    classTopicInfo,
    handleBack
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [listData, setListData] = (0, _react.useState)([]);
  const [data, setData] = (0, _react.useState)([]);
  const [comment, setComment] = (0, _react.useState)('');
  const dispatch = (0, _reactRedux.useDispatch)();
  const isMounteRef = (0, _react.useRef)(false);
  const [isShowAction, setIsShowAction] = (0, _react.useState)();
  const [itemEdit, setItemEdit] = (0, _react.useState)();
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const onHandleBack = (type = 0, index = 0) => {
    handleBack(type, index);
  };
  const funcGetTopicInfo = async () => {
    const response = await (0, _lmsclasstopicApi.getTopicInfo)(classTopicInfo?.id);
    if (response?.status && isMounteRef.current) {
      setListData(response?.data?.childs);
      setData(response?.data);
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    dispatch((0, _globalSlice.updateLoadingAction)(true));
    funcGetTopicInfo();
    dispatch((0, _globalSlice.updateLoadingAction)(false));
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  const updateLikeTopic = async id => {
    if (id) {
      const response = await (0, _lmsclasstopicApi.updateLike)(id);
      if (response?.status) {
        funcGetTopicInfo();
      }
    }
  };
  const postComment = async event => {
    if (!event?.comment) {
      return;
    }
    const model = {
      parentId: data?.id,
      classId: classInfo?.id,
      itemId: type === 1 ? _constants.default.GUIDEMPTY : contentInfo?.id,
      content: event?.comment,
      fileId: event?.fileId,
      id: itemEdit ? itemEdit?.id : _constants.default.GUIDEMPTY
    };
    const response = await (0, _lmsclasstopicApi.postClassTopic)(model);
    if (response?.status) {
      funcGetTopicInfo();
      setComment('');
      setItemEdit();
    }
  };
  const renderComment = (item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.comment,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.boxItem,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: item?.displayName,
          style: styles.displayName
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: (0, _helpers.calculatorTime)(item?.createdDate, languageLocal),
          style: [styles.textTimeComment, {
            marginLeft: (0, _scales.horizontal)(10)
          }]
        })]
      }), item?.isCreated && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.actions,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          onPress: () => {
            setItemEdit(item);
            setIsShowAction(!isShowAction);
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
            icon: _freeSolidSvgIcons.faEllipsisH
          })
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.commentContent,
      children: [item?.fileId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
        source: {
          uri: (0, _helpers.loadFile)(item?.fileId)
        },
        resizeMode: "cover",
        style: styles.imageFileUpload
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: `${_he.default.decode((0, _helpers.replaceHtml)(item?.content ?? ''))}`,
        style: styles.textContent
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.boxAction, {
        marginTop: (0, _scales.vertical)(6)
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.boxItem,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: (item?.totalLike ?? 0).toString(),
          style: styles.textComment
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-like",
          style: styles.textComment
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        style: styles.boxItem,
        onPress: () => {
          updateLikeTopic(item?.id);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faThumbsUp,
          size: 20,
          style: [styles.iconComment, item?.isLiked === true && {
            color: _colors.Color.base_color
          }]
        })
      })]
    }), isShowAction && itemEdit?.id === item?.id && /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderAction, {
      item: item,
      handleDelete: handleDelete,
      handleEdit: handleEdit
    })]
  });
  const handleEdit = () => {
    setIsShowAction(false);
    // setIsOpenModal(true);
    // fill lai text vao o checkbox
    setComment(itemEdit?.content);
  };
  const handleDelete = async () => {
    setIsShowAction(false);
    const response = await (0, _lmsclasstopicApi.deleteClassTopic)(itemEdit?.id);
    if (response?.status) {
      funcGetTopicInfo();
      setItemEdit();
    } else {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'text-notification',
        keyMessage: 'ext-action-false',
        contentMessage: '',
        isShowSubmit: false,
        isShowCancel: true,
        keyCancel: 'text-close'
      }));
    }
  };
  const RenderBottomAddClassTopic = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    isOpenModal: isOpenModal,
    handleSubmitTopic: event => {
      handleSubmitTopic(event);
    },
    closeModal: () => {
      setIsOpenModal(false);
    },
    item: itemEdit
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
        id: item?.id,
        content: item?.content,
        title: item?.title
      };
      const response = await (0, _lmsclasstopicApi.updateClassTopic)(modelAdd);
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
        funcGetTopicInfo();
      } else {
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'text-internal-error',
          contentMessage: '',
          isShowCancel: false,
          isShowSubmit: false
        }));
      }
    }
  });
  const onCancelChange = () => {
    setItemEdit();
    setComment();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
      style: styles.container,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
        keyExtractor: (item, index) => index.toString(),
        data: listData,
        showsVerticalScrollIndicator: false,
        ListHeaderComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderTopicDetail.default, {
          onPostComment: event => {
            postComment(event);
          },
          classTopicInfo: classTopicInfo,
          contentInfo: contentInfo,
          handleBack: (type, index) => {
            onHandleBack(type, index);
          },
          data: data,
          type: type,
          onHandleGetData: () => {
            funcGetTopicInfo();
          },
          commentEdit: comment,
          handleCancel: () => {
            onCancelChange();
          }
        }),
        renderItem: ({
          item,
          index
        }) => renderComment(item, index),
        contentContainerStyle: styles.contentContainerStyle
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderBottomAddClassTopic, {})]
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
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
  },
  boxTopic: {
    marginTop: (0, _scales.vertical)(10)
  },
  title: {
    fontFamily: _fonts.default.bold,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28
  },
  avatarProfile: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  displayName: {
    fontFamily: _fonts.default.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8,
    marginLeft: (0, _scales.horizontal)(4)
  },
  textTime: {
    fontFamily: _fonts.default.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: _colors.Color.text_color_hover
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: _colors.Color.text_color_hover,
    marginHorizontal: (0, _scales.horizontal)(8),
    marginVertical: (0, _scales.vertical)(6)
  },
  boxItem: {
    flexDirection: 'row'
  },
  boxItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: (0, _scales.vertical)(7.5),
    borderTopColor: _colors.Color.color_width_featured_class,
    borderTopWidth: 1
  },
  topicContent: {
    marginTop: (0, _scales.vertical)(16)
  },
  topicAction: {
    marginTop: (0, _scales.vertical)(24)
  },
  boxItemAction: {
    flexDirection: 'row',
    marginHorizontal: (0, _scales.horizontal)(15)
  },
  iconAction: {
    marginRight: (0, _scales.horizontal)(5)
  },
  textInputComment: {
    borderRadius: 100,
    height: 44,
    borderWidth: 1,
    marginTop: (0, _scales.vertical)(5),
    marginBottom: (0, _scales.vertical)(10),
    borderColor: _colors.Color.color_uncheck_answer
  },
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconUserAction: {
    margin: 5,
    backgroundColor: _colors.Color.white
  },
  contentContainerStyle: {
    backgroundColor: _colors.Color.white
  },
  // style cho binh luan
  comment: {
    marginTop: (0, _scales.vertical)(16),
    marginLeft: (0, _scales.horizontal)(24),
    position: 'relative',
    zIndex: 0
  },
  commentContent: {
    marginTop: (0, _scales.vertical)(4)
  },
  textContent: {
    fontFamily: _fonts.default.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23.8
  },
  textComment: {
    fontFamily: _fonts.default.regular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: _colors.Color.text_color_hover,
    marginRight: (0, _scales.vertical)(5)
  },
  textTimeComment: {
    fontFamily: _fonts.default.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20.4,
    color: _colors.Color.text_color_hover,
    marginTop: (0, _scales.vertical)(2)
  },
  iconComment: {
    marginTop: (0, _scales.vertical)(-1)
  },
  imageFileUpload: {
    height: _platforms.screenHeight * 0.2,
    justifyContent: 'flex-start'
  },
  actions: {
    marginLeft: 'auto'
  },
  boxActions: {
    position: 'absolute',
    right: 2,
    top: 20,
    width: _platforms.screenWidth * 0.3,
    borderRadius: 10,
    backgroundColor: _colors.Color.color_bg_tab_view,
    elevation: _platforms.isIOS ? 0 : 1,
    borderWidth: 1,
    borderColor: _colors.Color.color_bg_tab_view,
    shadowColor: _colors.Color.gray,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    zIndex: 1
  },
  textAction: {
    fontFamily: _fonts.default.regular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: _colors.Color.text_color_hover,
    marginRight: (0, _scales.vertical)(5),
    paddingHorizontal: (0, _scales.horizontal)(5),
    paddingVertical: (0, _scales.vertical)(5)
  }
});
var _default = exports.default = ClassTopicDetail;
//# sourceMappingURL=ClassTopicDetail.js.map