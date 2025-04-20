/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Color } from '@theme/colors';
import { formatTimeSeek, loadFile } from '@utils/helpers';
import Video from 'react-native-video';
import { horizontal, vertical } from '@utils/scales';
import { isIOS } from '@utils/platforms';
import TouchableDebounce from '@components/TouchableDebounce';
import IconMute from '@assets/icons/icon_mute_audio.svg';
import IconUnMute from '@assets/icons/icon_unmute_audio.svg';
import IconPause from '@assets/other/icon_pause_video.svg';
import IconPlay from '@assets/other/icon_play_video.svg';
import IconPaNext from '@assets/other/icon_refresh_next.svg';
import IconRePrev from '@assets/other/icon_refresh_prev.svg';
import IconZoomIn from '@assets/other/icon_zoom_in.svg';
import useGoBackHandler from '@hooks/useGoBackHandler';
import Slider from '@react-native-community/slider';
import CMText from '../CMText';

const ViewVideo = (props) => {
  const { navigation, fileId, handleRouteScreen, currentTime, onSaveLastTime } = props;
  const [length, setLength] = useState(undefined);
  const [point, setPoint] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setMute] = useState(false);
  const [isZoom, setZoom] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [isPause, setPause] = useState(true);
  const videoRef = useRef(null);
  const currentTimeRef = useRef(currentTime);
  const [isVisible, setIsVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', () => {
      setPause(false);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
    return () => {
      Orientation.lockToPortrait();
    };
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
  const onSlidingComplete = (seek) => {
    setPause(false);
    videoRef.current.seek(seek);
  };

  const onHandleMute = () => {
    setMute(!isMute);
  };

  const handleLoad = (data) => {
    if (!Number.isNaN(currentTime) && currentTime >= 0 && currentTime <= data.duration) {
      const seekTime = Number.parseInt(currentTime, 10);
      videoRef.current.seek(seekTime);
    } else {
      videoRef.current.seek(0);
    }
    onHandlePause();
  };

  const onHandleZoom = () => {
    if (fullScreen) {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
      handleRoute(false);
    } else {
      Orientation.unlockAllOrientations();
      Orientation.lockToLandscapeLeft();
      handleRoute(true);
    }
    setFullScreen(!fullScreen);
  };
  const handleRoute = (isLandscape) => {
    if (isLandscape) {
      handleRouteScreen(true);
    } else {
      handleRouteScreen(false);
    }
  };
  const handleSaveSeek = (seek) => {
    setPlayTime(Math.floor(seek?.currentTime));
    setDuration(Math.floor(seek?.seekableDuration));
    setPoint(seek?.currentTime);
    setLength(seek?.seekableDuration);
    currentTimeRef.current = seek?.currentTime;
  };
  useEffect(
    () => () => {
      if (onSaveLastTime && currentTimeRef) {
        onSaveLastTime(currentTimeRef.current); // Truyền lastTime cho cha
      }
    },
    [currentTimeRef?.current],
  );
  /**
   * Show/ hide view pause.
   */
  const handlePress = () => {
    setIsVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setIsVisible(false);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  };

  const onHandlePause = () => {
    setPause(!isPause);
  };

  const onRefreshPrev = () => {
    const seek = playTime - 5;
    videoRef.current.seek(seek);
    setPause(false);
  };
  const onRefreshNext = () => {
    const seek = playTime + 5;
    videoRef.current.seek(seek);
    setPause(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableDebounce activeOpacity={1} style={styles.viewBtnPause} onPress={handlePress}>
        <Video
          // ref={(ref) => {
          //   videoRef.current = ref;
          // }}
          ref={videoRef}
          source={{ uri: loadFile(fileId) }}
          onLoad={handleLoad}
          paused={isPause}
          style={styles.backgroundVideo}
          repeat={false}
          muted={isMute}
          onEnd={() => {
            setPause(true);
          }}
          resizeMode="contain"
          controls={false}
          fullscreenOrientation="portrait"
          fullscreenAutorotate
          onProgress={handleSaveSeek}
          hideShutterView={false}
        />
        {isVisible && (
          <Animated.View style={styles.viewHide}>
            <TouchableDebounce style={styles.btnRefresh}>
              <IconRePrev width={24} height={24} onPress={onRefreshPrev} />
            </TouchableDebounce>
            <TouchableDebounce style={styles.btnPause}>
              {isPause ? (
                <IconPause width={40} height={40} onPress={onHandlePause} />
              ) : (
                <IconPlay width={40} height={40} onPress={onHandlePause} />
              )}
            </TouchableDebounce>
            <TouchableDebounce style={styles.btnRefresh}>
              <IconPaNext width={24} height={24} onPress={onRefreshNext} />
            </TouchableDebounce>
          </Animated.View>
        )}
        {isVisible && (
          <Animated.View
            style={[
              styles.viewOption,
              {
                bottom: fullScreen ? vertical(15) : vertical(30),
                width: '90%',
              },
            ]}
          >
            <Slider
              style={styles.viewSlider}
              value={point}
              minimumValue={0}
              maximumValue={length !== undefined ? length : 1}
              minimumTrackTintColor={Color.base_color}
              maximumTrackTintColor={Color.color_bg_progress_bar}
              thumbTintColor={Color.base_color}
              onSlidingComplete={onSlidingComplete}
            />
            <CMText
              title={`${formatTimeSeek(playTime)}/${formatTimeSeek(duration)}`}
              style={styles.textTimeDuration}
            />
            <TouchableDebounce style={styles.btnMuteVolum} onPress={onHandleZoom}>
              {isZoom ? (
                <IconZoomIn width={20} height={20} />
              ) : (
                <IconZoomIn width={20} height={20} />
              )}
            </TouchableDebounce>
            <TouchableDebounce style={styles.btnMuteVolum} onPress={() => onHandleMute()}>
              {isMute ? <IconUnMute width={20} height={20} /> : <IconMute width={20} height={20} />}
            </TouchableDebounce>
          </Animated.View>
        )}
      </TouchableDebounce>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  viewBtnPause: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVideo: {
    backgroundColor: Color.text_color,
    ...StyleSheet.absoluteFill,
  },
  viewOption: {
    flex: 1,
    position: 'absolute',
    backgroundColor: Color.white,
    borderRadius: 16,
    paddingLeft: horizontal(10),
    paddingVertical: isIOS ? vertical(3) : 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewSlider: {
    flex: 1,
    height: 50,
  },
  textTimeDuration: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 23.8,
    paddingHorizontal: horizontal(15),
  },
  btnMuteVolum: {
    paddingRight: horizontal(10),
  },
  viewHide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    backgroundColor: Color.black,
    opacity: 0.5,
  },
  btnPause: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.white,
  },
  btnRefresh: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },
});
export default ViewVideo;
