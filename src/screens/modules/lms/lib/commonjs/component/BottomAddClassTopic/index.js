"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _platforms = require("@utils/platforms");
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _icon_cancel = _interopRequireDefault(require("@assets/icons/icon_cancel.svg"));
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _scales = require("@utils/scales");
var _colors = require("@theme/colors");
var _fonts = _interopRequireDefault(require("@assets/value/fonts"));
var _constants = _interopRequireDefault(require("@utils/constants"));
var _CMTextInput = _interopRequireDefault(require("@components/CMTextInput"));
var _reactNativeDeviceInfo = require("react-native-device-info");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const PLACEHOLDER = {
  en: {
    placeholderTitle: 'Enter title',
    placeholder: 'Enter content'
  },
  vn: {
    placeholderTitle: 'Nhập tiêu đề',
    placeholder: 'Nhập nội dung'
  }
};
const BottomAddClassTopic = props => {
  const {
    isOpenModal,
    closeModal,
    handleSubmitTopic,
    item
  } = props;
  const languageLocal = (0, _reactRedux.useSelector)(state => state.global.language);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const [viewHeight, setViewHeight] = (0, _react.useState)(0);
  const [enterContent, setEnterContent] = (0, _react.useState)('');
  const [enterTitle, setEnterTitle] = (0, _react.useState)('');
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
    // filter noi dung vao neu co
    if (item) {
      setEnterContent(item?.content);
      setEnterTitle(item?.title);
    }
  }, []);
  /**
   * Get height view bottomsheet.
   * @param {} event
   */
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
  };
  const onHandleSubmitTopic = () => {
    if (item) {
      const newItem = {
        ...item,
        title: enterTitle,
        content: enterContent
      };
      handleSubmitTopic(newItem);
    } else {
      const model = {
        title: enterTitle,
        content: enterContent
      };
      handleSubmitTopic(model);
    }
    closeModal();
  };
  const translationStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
    style: styles.container,
    keyboardVerticalOffset: _platforms.isIOS && (0, _reactNativeDeviceInfo.hasNotch)() ? 0 : 10,
    behavior: _platforms.isIOS ? 'padding' : 'height',
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
      supportedOrientations: ['portrait', 'landscape'],
      animationType: "fade",
      transparent: true,
      visible: isOpenModal,
      propagateSwipe: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
        style: [styles.viewButtonSheet, translationStyles],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          style: [{
            ..._reactNative.StyleSheet.absoluteFillObject,
            backgroundColor: '#0000004D'
          }, opacityStyles]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
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
            onPress: _reactNative.Keyboard.dismiss,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: [styles.buttonSheet],
              onLayout: onViewLayout,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                i18nKey: "text-topic-class",
                style: styles.textHeader
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
                textInputStyle: styles.textInputTitle,
                multiline: false,
                placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.placeholderTitle : PLACEHOLDER.en.placeholderTitle,
                onChangeText: enterTitle => setEnterTitle(enterTitle),
                value: enterTitle,
                maxLength: 500
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMTextInput.default, {
                textInputStyle: styles.textInput,
                multiline: true,
                placeholder: languageLocal === _constants.default.LANGUAGE_VN ? PLACEHOLDER.vn.placeholder : PLACEHOLDER.en.placeholder,
                onChangeText: enterContent => setEnterContent(enterContent),
                value: enterContent,
                maxLength: 4000
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
                style: [styles.btnShare, {
                  backgroundColor: _colors.Color.base_color
                }],
                onPress: onHandleSubmitTopic,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
                  i18nKey: "text-share",
                  style: styles.textShare
                })
              })]
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
    maxHeight: _platforms.screenHeight * 0.7,
    paddingHorizontal: (0, _scales.horizontal)(30),
    paddingVertical: (0, _scales.vertical)(15)
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
    paddingVertical: _platforms.isIOS ? (0, _scales.vertical)(15) : (0, _scales.vertical)(5),
    width: '100%',
    marginBottom: (0, _scales.vertical)(16)
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
  boxView: {
    flexDirection: 'row',
    marginHorizontal: (0, _scales.horizontal)(20),
    marginTop: (0, _scales.vertical)(20)
  },
  label: {
    fontFamily: _fonts.default.bold,
    fontSize: (0, _scales.textSize)(16),
    fontWeight: '700'
  },
  title: {
    fontFamily: _fonts.default.regular,
    fontSize: (0, _scales.textSize)(16),
    fontWeight: '400'
  },
  textHeader: {
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: (0, _scales.textSize)(20),
    lineHeight: 28,
    marginBottom: (0, _scales.vertical)(15)
  },
  btnShare: {
    width: _platforms.screenWidth - (0, _scales.horizontal)(24 * 2),
    height: _platforms.isTablet ? 65 : 56,
    paddingHorizontal: (0, _scales.horizontal)(16),
    paddingVertical: (0, _scales.vertical)(10),
    borderRadius: 100,
    marginTop: 8
  },
  textShare: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: _colors.Color.white,
    fontFamily: _fonts.default.bold,
    fontWeight: '700',
    fontSize: (0, _scales.textSize)(16),
    lineHeight: 26.4
  },
  textInputTitle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: _colors.Color.color_uncheck_answer,
    height: 56,
    textAlignVertical: 'top',
    width: '100%',
    marginBottom: (0, _scales.vertical)(16)
  }
});
var _default = exports.default = BottomAddClassTopic;
//# sourceMappingURL=index.js.map