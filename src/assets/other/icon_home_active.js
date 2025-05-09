import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { isTablet } from '@utils/platforms';

/** earning active icon */
const HomeActiveIcon = ({ width = 22, height = 22 }) => {
  const appColor = useSelector((state) => state.global.appColor);
  const sizeIcon = isTablet ? 36 : 24;
  return (
    <Svg
      width={sizeIcon}
      height={sizeIcon}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M19.5003 9.20977L14.1673 5.06177C13.6993 4.69768 13.1232 4.5 12.5303 4.5C11.9373 4.5 11.3613 4.69768 10.8933 5.06177L5.55927 9.20977C5.23872 9.45905 4.97937 9.7783 4.80103 10.1431C4.62269 10.5079 4.53008 10.9087 4.53027 11.3148V18.5148C4.53027 19.0452 4.74099 19.5539 5.11606 19.929C5.49113 20.3041 5.99984 20.5148 6.53027 20.5148H18.5303C19.0607 20.5148 19.5694 20.3041 19.9445 19.929C20.3196 19.5539 20.5303 19.0452 20.5303 18.5148V11.3148C20.5303 10.4918 20.1503 9.71477 19.5003 9.20977Z"
        fill={appColor?.base_color}
        stroke={appColor?.base_color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 15.5C14.29 16.833 10.708 16.833 8.5 15.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HomeActiveIcon;
