import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const TestActiveIcon = ({ width = 22, height = 22 }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill={appColor?.base_color}
        d="m9 10.677 1.037 2.073H7.963L9 10.677ZM21.75 5.25v15a.75.75 0 0 1-1.086.671L18 19.588l-2.664 1.333a.75.75 0 0 1-.672 0L12 19.588l-2.664 1.333a.75.75 0 0 1-.672 0L6 19.588l-2.664 1.333a.75.75 0 0 1-1.086-.671v-15a1.5 1.5 0 0 1 1.5-1.5h16.5a1.5 1.5 0 0 1 1.5 1.5Zm-9.079 9.414-3-6a.75.75 0 0 0-1.342 0l-3 6a.75.75 0 1 0 1.342.672l.542-1.086h3.574l.542 1.086a.75.75 0 1 0 1.342-.672ZM19.5 12a.75.75 0 0 0-.75-.75h-1.5v-1.5a.75.75 0 1 0-1.5 0v1.5h-1.5a.75.75 0 1 0 0 1.5h1.5v1.5a.75.75 0 1 0 1.5 0v-1.5h1.5a.75.75 0 0 0 .75-.75Z"
      />
    </Svg>
  );
};

export default TestActiveIcon;
