/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '@theme/colors';
import NetInfo from '@react-native-community/netinfo';

const CountDownHandle = (props) => {
  /**
   * durationInSeconds: Tổng số thời gian đếm ngược tính theo đơn vị là giây.
   * onPressEndTime: fun trả về khi thời gian kết thúc.
   */
  const { durationInSeconds, onPressEndTime, isStop } = props;
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const onMount = useRef(null);

  const onEndTime = () => {
    onPressEndTime();
  };
  const updateTime = () => {
    if (!isStop && timeLeft > 1) {
      setTimeLeft((prevTime) => Math.floor(prevTime - 1));
    } else {
      if (onMount.current) clearInterval(onMount.current);
      onEndTime();
      // clearInterval(interval);
    }
  };
  useEffect(() => {
    // Lấy trạng thái mạng ban đầu
    const fetchNetworkStatus = async () => {
      const state = await NetInfo.fetch();
    };

    fetchNetworkStatus();
    const unsubscribe = NetInfo.addEventListener((state) => {
      // If the network is back
      if (state?.isConnected) {
        // If the time has run out, end the countdown
        if (timeLeft !== undefined && timeLeft < 1) {
          onEndTime();
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [timeLeft]);
  useEffect(() => {
    onMount.current = setInterval(updateTime, 1000);

    return () => {
      clearInterval(onMount.current);
    };
  }, [timeLeft, isStop]);

  const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);
  const hours = timeLeft > 0 ? Math.floor((timeLeft % (3600 * 24)) / 3600) : 0;
  const minutes = timeLeft > 0 ? Math.floor((timeLeft % 3600) / 60) : 0;
  const seconds = timeLeft > 0 ? Math.floor((timeLeft % 3600) % 60) : 0;
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.text_color,
  },
});
export default CountDownHandle;
