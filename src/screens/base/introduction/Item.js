import React from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Color } from '@theme/colors';

const Item = ({ position, index }) => {
  const styles = useAnimatedStyle(() => ({
    width: interpolate(
      position.value,
      [index - 2, index - 1, index, index + 1, index + 2],
      [5, 5, 20, 5, 5],
    ),
    opacity: interpolate(
      position.value,
      [index - 2, index - 1, index, index + 1, index + 2],
      [0.3, 0.3, 1, 0.3, 0.3],
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          backgroundColor: Color.base_color,
          height: 5,
          marginRight: 3,
          borderRadius: 2.5,
        },
        styles,
      ]}
    />
  );
};

export default Item;
