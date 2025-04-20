import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const IconCheckBox = ({ width = 22, height = 22 }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="18" height="18" rx="6" fill={appColor?.base_color} />
      <Path
        d="M5.5 9L8 11.5L13 6.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconCheckBox;
