import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const ExtendActiveIcon = ({ width = 22, height = 22 }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/Svg">
      <Path
        d="M9.5 4.39062H5.5C4.94772 4.39062 4.5 4.83834 4.5 5.39062V9.39062C4.5 9.94291 4.94772 10.3906 5.5 10.3906H9.5C10.0523 10.3906 10.5 9.94291 10.5 9.39062V5.39062C10.5 4.83834 10.0523 4.39062 9.5 4.39062Z"
        stroke={appColor?.base_color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.5 4.39062H15.5C14.9477 4.39062 14.5 4.83834 14.5 5.39062V9.39062C14.5 9.94291 14.9477 10.3906 15.5 10.3906H19.5C20.0523 10.3906 20.5 9.94291 20.5 9.39062V5.39062C20.5 4.83834 20.0523 4.39062 19.5 4.39062Z"
        stroke={appColor?.base_color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.5 14.3906H5.5C4.94772 14.3906 4.5 14.8383 4.5 15.3906V19.3906C4.5 19.9429 4.94772 20.3906 5.5 20.3906H9.5C10.0523 20.3906 10.5 19.9429 10.5 19.3906V15.3906C10.5 14.8383 10.0523 14.3906 9.5 14.3906Z"
        stroke={appColor?.base_color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.5 14.3906H15.5C14.9477 14.3906 14.5 14.8383 14.5 15.3906V19.3906C14.5 19.9429 14.9477 20.3906 15.5 20.3906H19.5C20.0523 20.3906 20.5 19.9429 20.5 19.3906V15.3906C20.5 14.8383 20.0523 14.3906 19.5 14.3906Z"
        stroke={appColor?.base_color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ExtendActiveIcon;
