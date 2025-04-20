import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vertical } from '@utils/scales';
import dimensionsImage from './height_manager';
import Item from './Item';

export const topIndicator =
  dimensionsImage[0].heightImageHeader + dimensionsImage[0].heightImageMain + vertical(85);

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Indicator = ({ position }) => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.indicator,
        {
          top: top + topIndicator,
        },
      ]}
    >
      {Array(3)
        .fill(3)
        .map((item, index) => (
          <Item key={`${index + 1}`} position={position} index={index} />
        ))}
    </View>
  );
};
export default Indicator;
