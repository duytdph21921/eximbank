import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const IconAddNote = ({ width = 20, height = 20 }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M16.6667 8.74996V5.66663C16.6667 4.26649 16.6667 3.56643 16.3942 3.03165C16.1545 2.56124 15.7721 2.17879 15.3017 1.93911C14.7669 1.66663 14.0668 1.66663 12.6667 1.66663H7.33337C5.93324 1.66663 5.23318 1.66663 4.6984 1.93911C4.22799 2.17879 3.84554 2.56124 3.60586 3.03165C3.33337 3.56643 3.33337 4.26649 3.33337 5.66663V14.3333C3.33337 15.7334 3.33337 16.4335 3.60586 16.9683C3.84554 17.4387 4.22799 17.8211 4.6984 18.0608C5.23318 18.3333 5.93324 18.3333 7.33337 18.3333H10M11.6667 9.16663H6.66671M8.33337 12.5H6.66671M13.3334 5.83329H6.66671M15 17.5V12.5M12.5 15H17.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconAddNote;
