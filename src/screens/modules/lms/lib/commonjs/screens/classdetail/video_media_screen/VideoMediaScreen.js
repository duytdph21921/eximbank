"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slider = _interopRequireDefault(require("@react-native-community/slider"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeOrientationLocker = _interopRequireDefault(require("react-native-orientation-locker"));
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
var _scales = require("@utils/scales");
var _useGoBackHandler = _interopRequireDefault(require("@hooks/useGoBackHandler"));
var _platforms = require("@utils/platforms");
var _icon_mute_audio = _interopRequireDefault(require("@assets/icons/icon_mute_audio.svg"));
var _icon_unmute_audio = _interopRequireDefault(require("@assets/icons/icon_unmute_audio.svg"));
var _icon_pause_video = _interopRequireDefault(require("@assets/other/icon_pause_video.svg"));
var _icon_play_video = _interopRequireDefault(require("@assets/other/icon_play_video.svg"));
var _icon_refresh_next = _interopRequireDefault(require("@assets/other/icon_refresh_next.svg"));
var _icon_refresh_prev = _interopRequireDefault(require("@assets/other/icon_refresh_prev.svg"));
var _icon_zoom_in = _interopRequireDefault(require("@assets/other/icon_zoom_in.svg"));
var _colors = require("@theme/colors");
var _helpers = require("@utils/helpers");
var _CMText = _interopRequireDefault(require("@components/CMText"));
var _TouchableDebounce = _interopRequireDefault(require("@components/TouchableDebounce"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VideoMediaScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    fileId
  } = route?.params ?? '';
  const [length, setLength] = (0, _react.useState)(undefined);
  const [point, setPoint] = (0, _react.useState)(0);
  const [playTime, setPlayTime] = (0, _react.useState)(0);
  const [duration, setDuration] = (0, _react.useState)(0);
  const [isMute, setMute] = (0, _react.useState)(false);
  const isZoom = true;
  const [fullScreen, setFullScreen] = (0, _react.useState)(false);
  const [isPause, setPause] = (0, _react.useState)(false);
  const refVideo = (0, _react.useRef)(null);
  const [isVisible, setIsVisible] = (0, _react.useState)(false);
  const fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    const unsubscribe = navigation.addListener('transitionStart', () => {
      setPause(true);
    });
    return unsubscribe;
  }, [navigation]);
  (0, _react.useEffect)(() => () => {
    _reactNativeOrientationLocker.default.lockToPortrait();
  }, []);

  /**
   * Back to previous screen
   */
  (0, _useGoBackHandler.default)(() => {
    navigation.goBack();
    return true;
  }, []);

  /**
   * Xử lý tua video.
   */
  const onSlidingComplete = seek => {
    setPause(false);
    refVideo.current.seek(seek);
  };
  const onHandleMute = () => {
    setMute(!isMute);
  };
  const onHandleZoom = () => {
    if (fullScreen) {
      _reactNativeOrientationLocker.default.unlockAllOrientations();
      _reactNativeOrientationLocker.default.lockToPortrait();
    } else {
      _reactNativeOrientationLocker.default.unlockAllOrientations();
      _reactNativeOrientationLocker.default.lockToLandscapeLeft();
    }
    setFullScreen(!fullScreen);
  };
  const handleSaveSeek = seek => {
    setPlayTime(Math.floor(seek?.currentTime));
    setDuration(Math.floor(seek?.seekableDuration));
    setPoint(seek?.currentTime);
    setLength(seek?.seekableDuration);
  };

  /**
   * Show/ hide view pause.
   */
  const handlePress = () => {
    setIsVisible(true);
    _reactNative.Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => {
        setIsVisible(false);
        _reactNative.Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
      }, 3000);
    });
  };
  const onHandlePause = () => {
    setPause(!isPause);
  };
  const onRefreshPrev = () => {
    const seek = playTime - 5;
    refVideo.current.seek(seek);
    setPause(false);
  };
  const onRefreshNext = () => {
    const seek = playTime + 5;
    refVideo.current.seek(seek);
    setPause(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TouchableDebounce.default, {
      activeOpacity: 1,
      style: styles.viewBtnPause,
      onPress: handlePress,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeVideo.default, {
        source: {
          uri: (0, _helpers.loadFile)(fileId)
        },
        paused: isPause,
        style: styles.backgroundVideo,
        repeat: false,
        muted: isMute,
        ref: ref => {
          refVideo.current = ref;
        },
        onEnd: () => {
          setPause(true);
        },
        resizeMode: "contain",
        controls: false,
        fullscreen: true,
        fullscreenOrientation: "portrait",
        fullscreenAutorotate: true,
        onProgress: handleSaveSeek,
        hideShutterView: false
      }), isVisible && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
        style: styles.viewHide,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: styles.btnRefresh,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_refresh_prev.default, {
            width: 24,
            height: 24,
            onPress: onRefreshPrev
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: styles.btnPause,
          children: isPause ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_pause_video.default, {
            width: 40,
            height: 40,
            onPress: onHandlePause
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_play_video.default, {
            width: 40,
            height: 40,
            onPress: onHandlePause
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: styles.btnRefresh,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_refresh_next.default, {
            width: 24,
            height: 24,
            onPress: onRefreshNext
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.viewOption, {
          bottom: fullScreen ? (0, _scales.vertical)(15) : (0, _scales.vertical)(30),
          width: '90%'
        }],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_slider.default, {
          style: styles.viewSlider,
          value: point,
          minimumValue: 0,
          maximumValue: length !== undefined ? length : 1,
          minimumTrackTintColor: _colors.Color.base_color,
          maximumTrackTintColor: _colors.Color.color_bg_progress_bar,
          thumbTintColor: _colors.Color.base_color,
          onSlidingComplete: onSlidingComplete
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: `${(0, _helpers.formatTimeSeek)(playTime)}/${(0, _helpers.formatTimeSeek)(duration)}`,
          style: styles.textTimeDuration
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: styles.btnMuteVolum,
          onPress: onHandleZoom,
          children: isZoom ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_zoom_in.default, {
            width: 20,
            height: 20
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_zoom_in.default, {
            width: 20,
            height: 20
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
          style: styles.btnMuteVolum,
          onPress: () => onHandleMute(),
          children: isMute ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_unmute_audio.default, {
            width: 20,
            height: 20
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icon_mute_audio.default, {
            width: 20,
            height: 20
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TouchableDebounce.default, {
        style: [styles.btnReturn, {
          top: fullScreen ? 25 : 50,
          right: fullScreen ? 25 : 10
        }],
        onPress: () => navigation.goBack(),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CMText.default, {
          title: '\u2715',
          style: styles.textReturn
        })
      })]
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  viewBtnPause: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundVideo: {
    backgroundColor: _colors.Color.text_color,
    ..._reactNative.StyleSheet.absoluteFill,
    elevation: 1
  },
  viewOption: {
    flex: 1,
    position: 'absolute',
    backgroundColor: _colors.Color.white,
    borderRadius: 16,
    paddingLeft: (0, _scales.horizontal)(10),
    paddingVertical: _platforms.isIOS ? (0, _scales.vertical)(3) : 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewSlider: {
    flex: 1,
    height: 50
  },
  textTimeDuration: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 23.8,
    paddingHorizontal: (0, _scales.horizontal)(15)
  },
  btnMuteVolum: {
    paddingRight: (0, _scales.horizontal)(10)
  },
  viewHide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '70%'
  },
  btnPause: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnRefresh: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnReturn: {
    position: 'absolute'
  },
  textReturn: {
    color: _colors.Color.white
  }
});
var _default = exports.default = VideoMediaScreen;
//# sourceMappingURL=VideoMediaScreen.js.map