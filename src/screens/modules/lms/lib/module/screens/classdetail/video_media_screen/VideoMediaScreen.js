"use strict";

import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import { horizontal, vertical } from '@utils/scales';
import useGoBackHandler from '@hooks/useGoBackHandler';
import { isIOS } from '@utils/platforms';
import IconMute from '@assets/icons/icon_mute_audio.svg';
import IconUnMute from '@assets/icons/icon_unmute_audio.svg';
import IconPause from '@assets/other/icon_pause_video.svg';
import IconPlay from '@assets/other/icon_play_video.svg';
import IconPaNext from '@assets/other/icon_refresh_next.svg';
import IconRePrev from '@assets/other/icon_refresh_prev.svg';
import IconZoomIn from '@assets/other/icon_zoom_in.svg';
import { Color } from '@theme/colors';
import { formatTimeSeek, loadFile } from '@utils/helpers';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const VideoMediaScreen = props => {
  const {
    navigation,
    route
  } = props;
  const {
    fileId
  } = route?.params ?? '';
  const [length, setLength] = useState(undefined);
  const [point, setPoint] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setMute] = useState(false);
  const isZoom = true;
  const [fullScreen, setFullScreen] = useState(false);
  const [isPause, setPause] = useState(false);
  const refVideo = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', () => {
      setPause(true);
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => () => {
    Orientation.lockToPortrait();
  }, []);

  /**
   * Back to previous screen
   */
  useGoBackHandler(() => {
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
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    } else {
      Orientation.unlockAllOrientations();
      Orientation.lockToLandscapeLeft();
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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => {
        setIsVisible(false);
        Animated.timing(fadeAnim, {
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
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: styles.container,
    children: /*#__PURE__*/_jsxs(TouchableDebounce, {
      activeOpacity: 1,
      style: styles.viewBtnPause,
      onPress: handlePress,
      children: [/*#__PURE__*/_jsx(Video, {
        source: {
          uri: loadFile(fileId)
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
      }), isVisible && /*#__PURE__*/_jsxs(Animated.View, {
        style: styles.viewHide,
        children: [/*#__PURE__*/_jsx(TouchableDebounce, {
          style: styles.btnRefresh,
          children: /*#__PURE__*/_jsx(IconRePrev, {
            width: 24,
            height: 24,
            onPress: onRefreshPrev
          })
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          style: styles.btnPause,
          children: isPause ? /*#__PURE__*/_jsx(IconPause, {
            width: 40,
            height: 40,
            onPress: onHandlePause
          }) : /*#__PURE__*/_jsx(IconPlay, {
            width: 40,
            height: 40,
            onPress: onHandlePause
          })
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          style: styles.btnRefresh,
          children: /*#__PURE__*/_jsx(IconPaNext, {
            width: 24,
            height: 24,
            onPress: onRefreshNext
          })
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: [styles.viewOption, {
          bottom: fullScreen ? vertical(15) : vertical(30),
          width: '90%'
        }],
        children: [/*#__PURE__*/_jsx(Slider, {
          style: styles.viewSlider,
          value: point,
          minimumValue: 0,
          maximumValue: length !== undefined ? length : 1,
          minimumTrackTintColor: Color.base_color,
          maximumTrackTintColor: Color.color_bg_progress_bar,
          thumbTintColor: Color.base_color,
          onSlidingComplete: onSlidingComplete
        }), /*#__PURE__*/_jsx(CMText, {
          title: `${formatTimeSeek(playTime)}/${formatTimeSeek(duration)}`,
          style: styles.textTimeDuration
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          style: styles.btnMuteVolum,
          onPress: onHandleZoom,
          children: isZoom ? /*#__PURE__*/_jsx(IconZoomIn, {
            width: 20,
            height: 20
          }) : /*#__PURE__*/_jsx(IconZoomIn, {
            width: 20,
            height: 20
          })
        }), /*#__PURE__*/_jsx(TouchableDebounce, {
          style: styles.btnMuteVolum,
          onPress: () => onHandleMute(),
          children: isMute ? /*#__PURE__*/_jsx(IconUnMute, {
            width: 20,
            height: 20
          }) : /*#__PURE__*/_jsx(IconMute, {
            width: 20,
            height: 20
          })
        })]
      }), /*#__PURE__*/_jsx(TouchableDebounce, {
        style: [styles.btnReturn, {
          top: fullScreen ? 25 : 50,
          right: fullScreen ? 25 : 10
        }],
        onPress: () => navigation.goBack(),
        children: /*#__PURE__*/_jsx(CMText, {
          title: '\u2715',
          style: styles.textReturn
        })
      })]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  viewBtnPause: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundVideo: {
    backgroundColor: Color.text_color,
    ...StyleSheet.absoluteFill,
    elevation: 1
  },
  viewOption: {
    flex: 1,
    position: 'absolute',
    backgroundColor: Color.white,
    borderRadius: 16,
    paddingLeft: horizontal(10),
    paddingVertical: isIOS ? vertical(3) : 0,
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
    paddingHorizontal: horizontal(15)
  },
  btnMuteVolum: {
    paddingRight: horizontal(10)
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
    color: Color.white
  }
});
export default VideoMediaScreen;
//# sourceMappingURL=VideoMediaScreen.js.map