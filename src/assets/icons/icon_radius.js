import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, Line } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const IconRadius = ({ width = 22, height = 22, rotation }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <Line x1="0" y1="40" x2="0" y2="0" stroke={appColor?.base_color} strokeWidth="4" />
      <Line x1="0" y1="0" x2="40" y2="0" stroke={appColor?.base_color} strokeWidth="4" />
    </Svg>
  );
};

export default IconRadius;
