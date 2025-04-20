import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';
/** earning active icon */
const IconNotificationDetail = ({ width = 24, height = 24 }) => {
  const appColor = useSelector((state) => state.global.appColor);
  return (
    <Svg width="77" height="83" viewBox="0 0 77 83" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect y="0.390625" width="67" height="67" rx="33.5" fill={appColor?.base_color} />
      <Path
        d="M43.7083 23.6826H23.2917C21.6808 23.6826 20.375 24.9885 20.375 26.5993V41.1826C20.375 42.7934 21.6808 44.0993 23.2917 44.0993H43.7083C45.3192 44.0993 46.625 42.7934 46.625 41.1826V26.5993C46.625 24.9885 45.3192 23.6826 43.7083 23.6826Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.375 26.5996L33.5 35.3496L46.625 26.5996"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <G filter="url(#filter0_d_1532_18743)">
        <Rect
          x="45"
          y="45.3906"
          width="22"
          height="22"
          rx="11"
          fill="white"
          shape-rendering="crispEdges"
        />
        <Path
          d="M51.3333 56.391L54.6666 59.7243L61.3333 53.0576"
          stroke={appColor?.base_color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs />
    </Svg>
  );
};

export default IconNotificationDetail;
