import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const IconSurvey = ({ width = 22, height = 22 }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width="67" height="67" rx="33.5" fill={appColor?.base_color} />
      <Path
        d="M46.625 26.2087V40.792C46.625 45.167 44.4375 48.0837 39.3333 48.0837H27.6667C22.5625 48.0837 20.375 45.167 20.375 40.792V26.2087C20.375 21.8337 22.5625 18.917 27.6667 18.917H39.3333C44.4375 18.917 46.625 21.8337 46.625 26.2087Z"
        stroke="#F1F5F9"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M37.1458 22.5625V25.4792C37.1458 27.0833 38.4583 28.3958 40.0625 28.3958H42.9791"
        stroke="#F1F5F9"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M27.6667 34.958H33.5"
        stroke="#F1F5F9"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M27.6667 40.792H39.3334"
        stroke="#F1F5F9"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconSurvey;
