"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _platforms = require("@utils/platforms");
var _scales = require("@utils/scales");
var _icon_cancel = _interopRequireDefault(require("@assets/icons/icon_cancel.svg"));
var _CustomTabView = _interopRequireDefault(require("@components/CustomTabView"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _colors = require("@theme/colors");
var _ExercisceContentScreen = _interopRequireDefault(require("../../screens/classdetail/excercise/ExercisceContentScreen.js"));
var _TeacherCommentedScreen = _interopRequireDefault(require("../../screens/classdetail/excercise/TeacherCommentedScreen.js"));
var _lmsclassexerciseApi = require("../../services/lmsclassexercise.api.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const BottomSheetSeeComments = props => {
  const [activeTab, setActiveTab] = (0, _react.useState)(0);
  const {
    isOpenModalComment,
    closeModal,
    idExercise
  } = props;
  const translateY = (0, _reactNativeReanimated.useSharedValue)(_platforms.screenHeight);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const [viewHeight, setViewHeight] = (0, _react.useState)(0);
  const [dataContent, setDataContent] = (0, _react.useState)();
  const [dataArrayUrlExercise, setDataArrayUrlExercise] = (0, _react.useState)([]);
  const [dataArrayUrlTeacherComment, setDataArrayUrlTeacherComment] = (0, _react.useState)([]);
  const [teacherComment, setTeacherComment] = (0, _react.useState)();
  const isMounteRef = (0, _react.useRef)(false);
  const funcViewDetailExercise = async () => {
    const response = await (0, _lmsclassexerciseApi.viewDetailExercise)(idExercise);
    if (response?.status && isMounteRef.current) {
      setDataContent(response?.data);
      const string = response?.data?.fileId;
      if (string) {
        const array = string.split(',');
        setDataArrayUrlExercise(array);
      }
    }
  };
  const funcViewComment = async () => {
    const response = await (0, _lmsclassexerciseApi.viewComment)(idExercise);
    if (response?.status && isMounteRef.current) {
      setTeacherComment(response?.data);
      const string = response?.data?.fileId;
      if (string) {
        const array = string.split(',');
        setDataArrayUrlTeacherComment(array);
      }
    }
  };
  (0, _react.useEffect)(() => {
    isMounteRef.current = true;
    funcViewDetailExercise();
    funcViewComment();
    return () => {
      isMounteRef.current = false;
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (isOpenModalComment) {
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
  }, [isOpenModalComment]);
  const translationStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: translateY.value
    }]
  }));
  const opacityStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }));
  const onViewLayout = event => {
    const {
      height
    } = event.nativeEvent.layout;
    setViewHeight(height);
  };
  const renderRoute1 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExercisceContentScreen.default, {
    dataContent: dataContent,
    dataArrayUrlExercise: dataArrayUrlExercise
  });
  const renderRoute2 = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TeacherCommentedScreen.default, {
    teacherComment: teacherComment,
    dataArrayUrlTeacherComment: dataArrayUrlTeacherComment
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    supportedOrientations: ['portrait', 'landscape'],
    animationType: "fade",
    transparent: true,
    visible: isOpenModalComment,
    propagateSwipe: true,
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
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CustomTabView.default, {
              style: styles.tabBar,
              onIndexChange: index => setActiveTab(index),
              firstRoute: renderRoute1,
              secondRoute: renderRoute2,
              routes: [{
                key: 'first',
                title: 'text-tab-content-of-assignment'
              }, {
                key: 'second',
                title: 'text-tab-teacher-comments'
              }]
            })
          })
        })]
      })]
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
    maxHeight: _platforms.screenHeight / 2,
    height: _platforms.screenHeight / 2
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
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
    marginTop: (0, _scales.vertical)(20),
    bottom: (0, _scales.vertical)(0)
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
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    textAlignVertical: 'top',
    paddingVertical: _platforms.isIOS ? (0, _scales.vertical)(15) : (0, _scales.vertical)(5)
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: _colors.Color.color_bg_tab_view,
    borderRadius: 8,
    borderColor: _colors.Color.color_gray_bm,
    borderWidth: 1,
    elevation: 1,
    marginTop: (0, _scales.vertical)(5),
    paddingVertical: _platforms.isIOS ? (0, _scales.vertical)(15) : (0, _scales.vertical)(5),
    height: 120,
    width: _platforms.screenWidth - (0, _scales.horizontal)(20 * 2),
    marginHorizontal: (0, _scales.horizontal)(18),
    justifyContent: 'center'
  },
  iconUpload: {
    marginHorizontal: 10
  },
  titleFile: {
    paddingVertical: 7,
    fontSize: (0, _scales.textSize)(16),
    color: _colors.Color.base_color,
    marginLeft: 5
  },
  iconFile: {
    marginLeft: 20,
    marginTop: 5
  },
  tabBar: {
    justifyContent: 'flex-start',
    // Start from the beginning
    alignItems: 'flex-start',
    // Start from the beginning
    paddingHorizontal: 2,
    // Adjust as needed
    backgroundColor: 'white',
    marginTop: (0, _scales.vertical)(16)
  }
});
var _default = exports.default = BottomSheetSeeComments;
//# sourceMappingURL=index.js.map