import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const SearchActiveIcon = ({ width = 22, height = 22 }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="12.2669" cy="12.2669" r="8.98856" fill={appColor?.base_color} />
      <Path
        d="M18.5186 18.9854L22.0426 22.5002"
        stroke={appColor?.base_color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default SearchActiveIcon;
