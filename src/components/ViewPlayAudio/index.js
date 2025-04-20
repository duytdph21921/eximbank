import React, { useEffect, useRef, useState, useImperativeHandle, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableDebounce from '@components/TouchableDebounce';
import IconPause from '@assets/icons/icon_pause_audio.svg';
import IconPlay from '@assets/icons/icon_play.svg';
import IconMute from '@assets/icons/icon_mute_audio.svg';
import IconUnMute from '@assets/icons/icon_unmute_audio.svg';
import { horizontal, vertical } from '@utils/scales';
import Slider from '@react-native-community/slider';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { loadFile } from '@utils/helpers';

const defaultTime = '00:00';
const audioRecorderPlayer = new AudioRecorderPlayer();

const ViewPlayAudio = (props) => {
  const { fileId, refPlay } = props;
  const [isPlaying, setIsPlaying] = useState(null);
  const [playTime, setPlayTime] = useState(defaultTime);
  const [duration, setDuration] = useState(defaultTime);
  const [point, setPoint] = useState(0);
  const [length, setLength] = useState(undefined);
  const [isMute, setMute] = useState(true);
  const mediaUrl = loadFile(fileId);
  useImperativeHandle(refPlay, () => ({
    hidde() {
      removeAudio();
    },
  }));

  useEffect(
    () => () => {
      setDuration(defaultTime);
      setPlayTime(defaultTime);
      setPoint(0);
      audioRecorderPlayer.removePlayBackListener();
      removeAudio();
    },
    [mediaUrl],
  );

  const removeAudio = async () => {
    setIsPlaying(null);
    await audioRecorderPlayer.stopPlayer();
    await audioRecorderPlayer.removePlayBackListener();
  };

  /**
   * Hàm xử lí khi click play/pause.
   */
  const onHandlePressAudio = () => {
    if (isPlaying == null) {
      onHandlePlay(mediaUrl);
    } else if (isPlaying === true) {
      setIsPlaying(false);
      onHandlePause();
    } else {
      setIsPlaying(true);
      onHandleResume();
    }
  };

  /**
   * onHandle play audio.
   */
  const onHandlePlay = useCallback(async (mediaLink) => {
    try {
      setIsPlaying(true);
      await audioRecorderPlayer.startPlayer(mediaLink);
      audioRecorderPlayer.addPlayBackListener(({ currentPosition, duration }) => {
        setLength(duration);
        setPoint(currentPosition);
        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(currentPosition)));
        setDuration(audioRecorderPlayer.mmssss(Math.floor(duration)));
        // Xử lý sự kiện khi phát xong audio.
        if (currentPosition >= duration) {
          audioRecorderPlayer.stopPlayer(); // Dừng phát audio sau khi tua đến thời gian mong muốn
          setIsPlaying(false);
        }
      });
    } catch (error) {
      setIsPlaying(false);
    }
  }, []);

  /**
   * onHandle pause audio.
   */
  const onHandlePause = useCallback(async () => {
    await audioRecorderPlayer.pausePlayer();
  }, []);

  /**
   * onHandle resume audio.
   */
  const onHandleResume = useCallback(async () => {
    await audioRecorderPlayer.resumePlayer();
  }, []);

  /**
   * Xử lý tua audio.
   */
  const onSlidingComplete = async (seek) => {
    await audioRecorderPlayer.seekToPlayer(seek);
  };

  const onHandleMute = async () => {
    setMute(!isMute);
    await audioRecorderPlayer.setVolume(isMute ? 0 : 1);
  };

  return (
    <View style={styles.container}>
      <TouchableDebounce style={styles.btnPlay} onPress={onHandlePressAudio}>
        {isPlaying ? <IconPlay width={20} height={20} /> : <IconPause width={20} height={20} />}
      </TouchableDebounce>
      <Slider
        style={styles.viewSlider}
        value={point}
        minimumValue={0}
        maximumValue={length !== undefined ? length : 1}
        minimumTrackTintColor={Color.base_color}
        maximumTrackTintColor={Color.white}
        thumbTintColor={Color.base_color}
        onSlidingComplete={onSlidingComplete}
      />
      <CMText title={`${playTime}/${duration}`} style={styles.textTimeDuration} />
      <TouchableDebounce style={styles.btnMuteVolum} onPress={onHandleMute}>
        {isMute ? <IconMute width={20} height={20} /> : <IconUnMute width={20} height={20} />}
      </TouchableDebounce>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    backgroundColor: Color.color_bg_progress_bar,
    borderRadius: 16,
    flexDirection: 'row',
    marginTop: vertical(20),
    alignItems: 'center',
  },
  btnPlay: {
    paddingLeft: horizontal(15),
    paddingRight: horizontal(5),
  },
  textTimeDuration: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 23.8,
    paddingHorizontal: horizontal(15),
  },
  viewSlider: {
    flex: 1,
    height: 50,
  },
  btnMuteVolum: {
    paddingRight: horizontal(15),
  },
});
export default ViewPlayAudio;
