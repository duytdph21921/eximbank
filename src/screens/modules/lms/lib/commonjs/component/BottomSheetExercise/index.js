"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDocumentPicker = _interopRequireDefault(require("react-native-document-picker"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactRedux = require("react-redux");
var _constants = _interopRequireDefault(require("@utils/constants"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_cancel = _interopRequireDefault(require("@assets/icons/icon_cancel.svg"));
var _icon_file = _interopRequireDefault(require("@assets/icons/icon_file.svg"));
var _icon_upload = _interopRequireDefault(require("@assets/icons/icon_upload.svg"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _colors = require("@theme/colors");
var _helpers = require("@utils/helpers");
var _globalSlice = require("@store/reducers/globalSlice");
var _upload = require("@services/lms/upload.api");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _RenderViewTitle = _interopRequireDefault(require("@components/RenderViewTitle"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _reactNativeDeviceInfo = require("react-native-device-info");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactNativeFontawesome = require("@fortawesome/react-native-fontawesome");
var _lmsclassuserexerciseApi = require("../../services/lmsclassuserexercise.api.js");
var _lmsclassexerciseApi = require("../../services/lmsclassexercise.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const PLACEHOLDER = {
  en: {
    placeholder: 'Enter content'
  },
  vn: {
    placeholder: 'Nhập nội dung'
  }
};
const RenderItemFile = ({
  item,
  index,
  onHandleRemoveFile
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: styles.viewItem,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.viewContent,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_file.default, {
      width: 20,
      height: 20
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
      style: styles.titleFile,
      title: item?.fileName
    })]
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
    onPress: () => {
      onHandleRemoveFile(index);
    },
    style: styles.buttonRemoveFile,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faXmark
    })
  })]
});
const BottomSheetExercise = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    isOpenModal,
    closeModal,
    handleApplyOnPress,
    idExercise
  } = props;
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const appColor = (0, _reactRedux.useSelector)(state => state.global.appColor);
  const [enterContent, setEnterContent] = (0, _react.useState)('');
  const [dataUpload, setDataUpload] = (0, _react.useState)([]);
  const [viewHeight, setViewHeight] = (0, _react.useState)(0);
  const [messageError, setMessageError] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (isOpenModal) {
      translateY.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 500
      }, () => {
        opacity.value = (0, _reactNativeReanimated.withTiming)(1, {
          duration: 300
        });
      });
    } else {
      opacity.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 300
      }, () => {
        translateY.value = (0, _reactNativeReanimated.withTiming)(_platforms.screenHeight, {
          duration: 500
        });
      });
    }
  }, []);
  const translationStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const funcViewDetailExercise = async () => {
    const response = await (0, _lmsclassexerciseApi.viewDetailExercise)(idExercise);
    if (response?.status && response?.data) {
      setEnterContent(response?.data?.content);
      if (response?.data?.fileId != null) {
        const lstFileId = response?.data?.fileId?.split(',');
        let dataFiles = dataUpload;
        lstFileId.forEach(e => {
          if (e) {
            const typeFile = (0, _helpers.fileType)(e);
            const model = {
              fileName: e,
              fileType: typeFile
            };
            dataFiles = [model, ...dataFiles];
          }
        });
        setDataUpload(dataFiles);
      }
    }
  };
  (0, _react.useEffect)(() => {
    funcViewDetailExercise();
  }, []);
  const opacityStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  const onHandleApply = async () => {
    // id bài tập
    // content nội dung nhập
    let newFileId = '';
    if (dataUpload.length > 0) {
      newFileId = dataUpload.map(item => item.fileName).join(',');
    }
    const params = {
      classExerciseId: idExercise,
      content: enterContent,
      fileId: newFileId
    };
    const response = await (0, _lmsclassuserexerciseApi.submitContent)(params);
    const dialogParams = {
      isShowModalWarn: true,
      isSigout: false,
      titleHeader: '',
      isShowCancel: false,
      isShowSubmit: false,
      keyCancel: 'text-button-submit'
    };
    if (response?.status) {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        ...dialogParams,
        keyHeader: 'text-tab-notification',
        keyMessage: 'text-submit-success-exercise',
        isShowCancel: true
      }));
    } else {
      dispatch((0, _globalSlice.updateShowDialogWarnAction)({
        ...dialogParams,
        keyHeader: 'text-title-dialog-warn',
        keyMessage: response?.message || 'text-action-false'
      }));
    }
    // if (response?.status) {
    //   dispatch(
    //     updateShowDialogWarnAction({
    //       isShowModalWarn: true,
    //       isSigout: false,
    //       titleHeader: '',
    //       keyHeader: 'text-tab-notification',
    //       keyMessage: 'text-submit-success-exercise',
    //       isShowCancel: true,
    //       isShowSubmit: false,
    //       keyCancel: 'text-button-submit',
    //     }),
    //   );
    // } else {
    //   if (response?.message) {
    //     dispatch(
    //       updateShowDialogWarnAction({
    //         isShowModalWarn: true,
    //         isSigout: false,
    //         titleHeader: '',
    //         keyHeader: 'text-title-dialog-warn',
    //         contentMessage: response?.message,
    //         isShowCancel: false,
    //         isShowSubmit: false,
    //         keyCancel: 'text-button-submit',
    //       }),
    //     );
    //   } else {
    //     dispatch(
    //       updateShowDialogWarnAction({
    //         isShowModalWarn: true,
    //         isSigout: false,
    //         titleHeader: '',
    //         keyHeader: 'text-title-dialog-warn',
    //         keyMessage: 'text-action-false',
    //         isShowCancel: false,
    //         isShowSubmit: false,
    //         keyCancel: 'text-button-submit',
    //       }),
    //     );
    //   }
    // }
    // callback reload data
    // checkDataCallBack();
  };
  const checkDataCallBack = () => {
    handleApplyOnPress();
    closeModal();
  };
  const getFile = async () => {
    try {
      const response = await _reactNativeDocumentPicker.default.pick({
        presentationStyle: _constants.default.presentationStyle
      });
      const formData = new FormData();
      formData.append('files', {
        uri: response[0].uri,
        type: response[0].type,
        name: response[0].name
      });
      // Xu ly cho loading tai day
      // call api uploadFile
      const responseUpload = await (0, _upload.uploadFile)(formData);
      if (responseUpload?.success) {
        let dataUploadNew = [...dataUpload];
        if (responseUpload?.data && responseUpload?.data.length > 0) {
          responseUpload?.data.forEach(e => {
            const typeFile = (0, _helpers.fileType)(e.fileName);
            const model = {
              fileName: e.fileName,
              fileType: typeFile
            };
            dataUploadNew = [model, ...dataUploadNew];
          });
          setDataUpload(dataUploadNew);
        }
      } else if (responseUpload?.message) {
        setMessageError(responseUpload?.message);
        setTimeout(() => {
          setMessageError(null);
        }, 2000);
      }
    } catch (err) {
      // handle code here
    }
  };
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  /**
   * Xoá item file trong mảng.
   * @param {*} index
   */
  const onHandleRemoveFile = index => {
    const dataUploadNew = [...dataUpload];
    if (index >= 0) {
      dataUploadNew.splice(index, 1);
      setDataUpload(dataUploadNew);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
      supportedOrientations: ['portrait', 'landscape'],
      animationType: "fade",
      transparent: true,
      visible: isOpenModal,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
        style: [styles.viewButtonSheet, translationStyles],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          style: [{
            ..._reactNative.StyleSheet.absoluteFillObject,
            backgroundColor: '#0000004D'
          }, opacityStyles]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
          style: {
            ..._reactNative.StyleSheet.absoluteFillObject
          },
          activeOpacity: 1,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
            style: [styles.btnCancel, {
              bottom: viewHeight + (0, _scales.vertical)(10)
            }],
            onPress: closeModal,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_cancel.default, {
              width: 24,
              height: 24
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.buttonSheet],
              onLayout: onViewLayout,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
                scrollEnabled: true,
                bounces: false,
                showsVerticalScrollIndicator: false,
                style: styles.scrollView,
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
                  activeOpacity: 1,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RenderViewTitle.default, {
                    i18keyContext: "submit",
                    type: 1
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
                    textInputStyle: styles.textInput,
                    maxLength: 1000,
                    multiline: true,
                    placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
                    onChangeText: enterContent => setEnterContent(enterContent),
                    value: enterContent
                  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
                    onPress: getFile,
                    style: styles.block,
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.viewIcon,
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_upload.default, {
                        width: 20,
                        height: 20
                      })
                    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                      style: styles.textUpfile,
                      i18nKey: "text-button-click-here-upload-file"
                    })]
                  }), (0, _helpers.checkListEmpty)(dataUpload) && dataUpload.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderItemFile, {
                    item: item,
                    index: index,
                    onHandleRemoveFile: onHandleRemoveFile
                  }, item.fileName)), messageError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                    style: styles.textErrorMessage,
                    title: messageError ?? ''
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                    style: [styles.btnApply, {
                      backgroundColor: appColor?.base_color
                    }],
                    onPress: () => {
                      checkDataCallBack();
                      onHandleApply();
                    },
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                      i18nKey: "submit",
                      style: styles.textBtnApply
                    })
                  })]
                })
              })
            })
          })]
        })]
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  viewButtonSheet: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: _colors.Color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: (0, _scales.vertical)(14),
    maxHeight: _platforms.screenHeight * 0.7
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: _colors.Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: (0, _scales.vertical)(14),
    paddingHorizontal: (0, _scales.vertical)(14)
  },
  textTitle: {
    fontSize: (0, _scales.textSize)(20),
    color: _colors.Color.text_color,
    fontWeight: '700',
    lineHeight: 28
  },
  textDelete: {
    fontWeight: '400',
    color: _colors.Color.base_color,
    fontSize: (0, _scales.textSize)(12)
  },
  viewDots: {
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  btnApply: {
    backgroundColor: _colors.Color.base_color,
    height: 56,
    marginHorizontal: (0, _scales.horizontal)(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (0, _scales.vertical)(16),
    marginBottom: (0, _scales.vertical)(5)
  },
  textBtnApply: {
    fontSize: (0, _scales.textSize)(16),
    fontWeight: '700',
    color: _colors.Color.white
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: _colors.Color.color_uncheck_answer,
    height: 240,
    textAlignVertical: 'top',
    paddingVertical: _platforms.isIOS ? (0, _scales.vertical)(15) : (0, _scales.vertical)(5)
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: _colors.Color.color_bg_tab_view,
    borderWidth: 1,
    borderColor: _colors.Color.color_gray_bm,
    marginTop: (0, _scales.vertical)(16),
    marginHorizontal: (0, _scales.horizontal)(18),
    height: (0, _scales.vertical)(100)
  },
  viewIcon: {
    alignItems: 'center',
    padding: (0, _scales.vertical)(10)
  },
  titleFile: {
    fontFamily: _fonts.default.regular,
    fontWeight: '400',
    fontSize: (0, _scales.textSize)(12),
    color: _colors.Color.color_check_answer,
    paddingHorizontal: (0, _scales.horizontal)(5),
    flexWrap: 'wrap'
  },
  iconFile: {
    marginLeft: 20,
    marginTop: 5
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: (0, _scales.horizontal)(18),
    flex: 1
  },
  textUpfile: {
    fontSize: (0, _scales.textSize)(14),
    fontWeight: '400',
    fontFamily: _fonts.default.medium
  },
  viewContent: {
    flexDirection: 'row',
    width: _platforms.screenWidth - 100
  },
  textErrorMessage: {
    fontSize: (0, _scales.textSize)(14),
    fontWeight: '400',
    fontFamily: _fonts.default.medium,
    color: _colors.Color.red,
    marginTop: (0, _scales.vertical)(16),
    marginHorizontal: (0, _scales.horizontal)(18)
  },
  buttonRemoveFile: {
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1
  }
});
var _default = exports.default = BottomSheetExercise;
//# sourceMappingURL=index.js.map