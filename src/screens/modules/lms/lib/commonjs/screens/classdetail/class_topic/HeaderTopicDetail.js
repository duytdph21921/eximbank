"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNativeFontawesome = require("@fortawesome/react-native-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _scales = require("@utils/scales");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _colors = require("@theme/colors");
var _he = _interopRequireDefault(require("he"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _reactNativeEmojiSelector = _interopRequireWildcard(require("react-native-emoji-selector"));
var _reactRedux = require("react-redux");
var _helpers = require("@utils/helpers");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _reactNativeDocumentPicker = _interopRequireDefault(require("react-native-document-picker"));
var _globalSlice = require("@store/reducers/globalSlice");
var _upload = require("@services/lms/upload.api");
var _messageText = _interopRequireDefault(require("@assets/icons/message-text.svg"));
var _moodSmile = _interopRequireDefault(require("@assets/icons/mood-smile.svg"));
var _imageUpload = _interopRequireDefault(require("@assets/icons/image-upload.svg"));
var _sendMessage = _interopRequireDefault(require("@assets/icons/send-message.svg"));
var _lmsclasstopicApi = require("../../../services/lmsclasstopic.api.js");
var _index = _interopRequireDefault(require("../../../component/BottomAddClassTopic/index.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable global-require */
/* eslint-disable react-hooks/exhaustive-deps */

const PLACEHOLDER = {
  en: {
    comment: 'Comment'
  },
  vn: {
    comment: 'Thảo luận'
  }
};
const HeaderTopicDetail = props => {
  const {
    classTopicInfo,
    contentInfo,
    data,
    onPostComment,
    handleBack,
    type,
    onHandleGetData,
    commentEdit,
    handleCancel
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const [comment, setComment] = (0, _react.useState)('');
  const [isEmojiComment, setIsEmojiComment] = (0, _react.useState)(false);
  const [title, setTitle] = (0, _react.useState)('');
  const [contentTitle, setContentTitle] = (0, _react.useState)('');
  const [listFileUploaded, setListFileUploaded] = (0, _react.useState)();
  const [isShowAction, setIsShowAction] = (0, _react.useState)();
  const [isOpenModal, setIsOpenModal] = (0, _react.useState)(false);
  const [topicInfo, setTopicInfo] = (0, _react.useState)();
  const [isEditComment, setIsEditComment] = (0, _react.useState)();
  const [size, setSize] = (0, _react.useState)(null);
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    let lengthMax = 45;
    if (contentInfo) {
      lengthMax = 20;
      let newTitle = contentInfo?.title ?? '';
      if (newTitle.length > lengthMax) {
        newTitle = `${newTitle.slice(0, lengthMax)}...`;
      }
      setContentTitle(newTitle);
    }
    if (classTopicInfo) {
      let newTitle = classTopicInfo?.title ?? '';
      if (newTitle.length > lengthMax) {
        newTitle = `${newTitle.slice(0, lengthMax)}...`;
      }
      setTitle(newTitle);
    }
    setTopicInfo(classTopicInfo);
    if (commentEdit) {
      setComment(commentEdit);
      setIsEditComment(true);
    }
  }, [commentEdit]);
  const onHandleBack = (index = 0) => {
    handleBack(type, index);
  };
  const postComment = () => {
    const model = {
      comment,
      fileId: listFileUploaded?.fileName
    };
    onPostComment(model);
    setComment('');
    setIsEmojiComment(false);
    setListFileUploaded();
    setIsEditComment(false);
  };
  const updateLikeTopic = async id => {
    if (id) {
      const response = await (0, _lmsclasstopicApi.updateLike)(id);
      if (response?.status) {
        onHandleGetData();
      }
    }
  };
  const handleSetCommentEmoji = emoji => {
    let newComment = comment;
    newComment += ` ${emoji}`;
    setComment(newComment);
  };
  const getFileUpload = async () => {
    try {
      const response = await _reactNativeDocumentPicker.default.pick({
        presentationStyle: _constants.default.presentationStyle
      });
      const lstFile = [];
      if (response && response.length > 0) {
        response.forEach(e => {
          if (e.type === 'image/jpeg') {
            lstFile.push({
              uri: e.uri,
              type: e.type,
              name: e.name
            });
          }
        });
      }
      if (lstFile.length > 0) {
        const formData = new FormData();
        lstFile.forEach(e => {
          formData.append('files', e);
        });
        const responseUpload = await (0, _upload.uploadFile)(formData);
        if (responseUpload?.success) {
          if (responseUpload?.data && responseUpload?.data.length > 0) {
            const model = {
              fileName: responseUpload?.data[0].fileName
            };
            setListFileUploaded(model);
          }
        } else {
          // Sau se thong bao tai day
        }
      } else {
        dispatch((0, _globalSlice.updateShowDialogWarnAction)({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-title-dialog-warn',
          keyMessage: 'text-warning-allow-file-upload',
          contentMessage: '',
          isShowCancel: false,
          isShowSubmit: false
        }));
      }
    } catch {
      // handle error here
    }
  };
  const handleEdit = () => {
    setIsShowAction(false);
    setIsOpenModal(true);
  };
  const handleDelete = async () => {
    setIsShowAction(false);
    const response = await (0, _lmsclasstopicApi.deleteClassTopic)(topicInfo?.id);
    if (response?.status) {
      onHandleBack();
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
    item: topicInfo
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
        const newTopicInfo = {
          ...topicInfo,
          content: response?.data?.content,
          title: response?.data?.title
        };
        setTopicInfo(newTopicInfo);
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
  const RenderAction = (0, _react.useCallback)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.boxActions,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableNativeFeedback, {
      onPress: () => {
        handleEdit();
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
  }));
  const onCancelChange = () => {
    setComment('');
    setIsEditComment(false);
    handleCancel();
  };
  const onLayout = (0, _react.useCallback)(event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    setSize({
      width,
      height
    });
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.header,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        onPress: () => {
          onHandleBack();
        },
        children: contentInfo ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-class-topic-content",
          style: styles.textHeader
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          i18nKey: "text-class-topic-general",
          style: styles.textHeader
        })
      }), contentInfo && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
        style: styles.header,
        onPress: () => {
          onHandleBack(1);
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faAngleRight,
          style: styles.iconFaAngleRight,
          size: 10
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: contentTitle,
          style: styles.textHeader
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faAngleRight,
        style: styles.iconFaAngleRight,
        size: 10
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
        title: title,
        style: styles.textHeader
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.boxTopic,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          marginBottom: (0, _scales.vertical)(8)
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: topicInfo?.title,
          style: styles.title
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.boxItem,
        children: [classTopicInfo?.avatar ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
          source: {
            uri: (0, _helpers.loadFile)(classTopicInfo?.avatar)
          },
          resizeMode: "contain",
          style: styles.avatarProfile
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
          source: require('@assets/img/avatar-detail.png'),
          resizeMode: "contain",
          style: styles.avatarProfile
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
            title: classTopicInfo?.displayName,
            style: styles.displayName
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: [styles.boxItem, {
              marginLeft: (0, _scales.horizontal)(4)
            }],
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              title: classTopicInfo?.createdDateString ?? '',
              style: styles.textTime
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.dot
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              title: (data?.totalComment ?? 0).toString(),
              style: styles.textTime
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-comment",
              style: styles.textTime
            })]
          })]
        }), data?.isCreated && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.actions,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            onPress: () => {
              setIsShowAction(!isShowAction);
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
              icon: _freeSolidSvgIcons.faEllipsisH
            })
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.topicContent,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${_he.default.decode((0, _helpers.replaceHtml)(topicInfo?.content ?? ''))}`,
          style: styles.textContent
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.topicAction,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.boxItemInfo,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItemAction,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              title: (data?.totalLike ?? 0).toString(),
              style: styles.textTime
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-total-like",
              style: styles.textTime
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItemAction,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              title: (data?.totalComment ?? 0).toString(),
              style: styles.textTime
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-comment",
              style: styles.textTime
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.boxItemInfo,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
            style: styles.boxItemAction,
            onPress: () => {
              updateLikeTopic(data?.id);
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
              icon: _freeSolidSvgIcons.faThumbsUp,
              style: [styles.iconAction, data?.isLiked === true && {
                color: _colors.Color.base_color
              }],
              size: 24
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-like",
              style: styles.displayName
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.boxItemAction,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_messageText.default, {
              width: 24,
              height: 24
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
              i18nKey: "text-comments",
              style: styles.displayName
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.boxAllAction,
          children: [listFileUploaded && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFastImage.default, {
              source: {
                uri: (0, _helpers.loadFile)(listFileUploaded?.fileName)
              },
              resizeMode: "contain",
              style: styles.imageFileUpload
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
              onPress: () => {
                setListFileUploaded();
              },
              style: styles.deleteImage,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
                icon: _freeSolidSvgIcons.faTimesCircle,
                size: 24
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
              placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.comment : PLACEHOLDER.en.comment,
              returnKeyType: "next",
              onSubmitEditing: () => {
                postComment();
              },
              blurOnSubmit: false,
              onChangeText: comment => {
                setComment(comment);
              },
              value: comment,
              textInputStyle: [styles.textInputComment, {
                paddingRight: size?.width
              }]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.boxActionInput,
              onLayout: onLayout,
              children: [isEditComment && /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                onPress: () => {
                  onCancelChange();
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
                  size: 20,
                  style: [styles.iconUserAction, {
                    marginTop: (0, _scales.vertical)(3)
                  }],
                  icon: _freeSolidSvgIcons.faTimesCircle
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                onPress: () => {
                  setIsEmojiComment(!isEmojiComment);
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_moodSmile.default, {
                  width: 24,
                  height: 24,
                  style: styles.iconUserAction
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                onPress: () => {
                  getFileUpload();
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_imageUpload.default, {
                  width: 24,
                  height: 24,
                  style: styles.iconUserAction
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                onPress: () => {
                  postComment();
                },
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_sendMessage.default, {
                  width: 24,
                  height: 24,
                  style: styles.iconUserAction
                })
              })]
            })]
          }), isEmojiComment && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
            style: {
              height: _platforms.screenHeight * 0.3
            },
            scrollEnabled: true,
            nestedScrollEnabled: true,
            showsVerticalScrollIndicator: false,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeEmojiSelector.default, {
              onEmojiSelected: emoji => handleSetCommentEmoji(emoji),
              showSearchBar: false,
              showTabs: false,
              category: _reactNativeEmojiSelector.Categories.emotion,
              showSectionTitles: false,
              style: styles.boxEmoji,
              columns: 8
            })
          })]
        })]
      }), isShowAction && /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderAction, {})]
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
    flexDirection: 'row',
    position: 'relative',
    zIndex: 0
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
    marginTop: (0, _scales.vertical)(2),
    backgroundColor: _colors.Color.white,
    marginRight: (0, _scales.vertical)(5)
  },
  contentContainerStyle: {
    backgroundColor: _colors.Color.white
  },
  // style cho binh luan
  comment: {
    marginTop: (0, _scales.vertical)(16),
    marginLeft: (0, _scales.horizontal)(24)
  },
  commentContent: {
    marginTop: (0, _scales.vertical)(4)
  },
  textContent: {
    fontFamily: _fonts.default.medium,
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
  boxActionInput: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 7.5,
    backgroundColor: _colors.Color.white,
    height: 41,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    paddingVertical: (0, _scales.vertical)(5)
  },
  boxAllAction: {
    position: 'relative'
  },
  boxEmoji: {
    // position: "absolute",
    bottom: 0
  },
  imageFileUpload: {
    width: _platforms.screenWidth,
    height: 100
  },
  deleteImage: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  actions: {
    marginLeft: 'auto',
    position: 'relative'
  },
  boxActions: {
    position: 'absolute',
    right: 2,
    top: 60,
    width: _platforms.screenWidth * 0.3,
    borderRadius: 10,
    backgroundColor: _colors.Color.white,
    elevation: 1,
    borderWidth: 1,
    borderColor: _colors.Color.color_bg_tab_view,
    shadowColor: _colors.Color.gray,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    flex: 1,
    zIndex: 1
  },
  textAction: {
    fontFamily: _fonts.default.regular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    color: _colors.Color.text_color_hover,
    marginRight: (0, _scales.vertical)(5),
    padding: 5
  }
});
var _default = exports.default = HeaderTopicDetail;
//# sourceMappingURL=HeaderTopicDetail.js.map