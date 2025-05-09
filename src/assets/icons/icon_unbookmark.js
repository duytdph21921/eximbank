import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

/** earning active icon */
const IconUnBookmark = ({ width = 24, height = 24 }) => {
  const appColor = useSelector((state) => state.global.appColor);

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G id="Bookmark">
        <G id="Bookmark_2">
          <Path
            id="Stroke 1"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.7388 6.15362C19.7388 3.40274 17.8581 2.29999 15.1503 2.29999H8.79143C6.16687 2.29999 4.19995 3.32756 4.19995 5.97016V20.694C4.19995 21.4198 4.9809 21.8769 5.61348 21.522L11.9954 17.9421L18.3223 21.516C18.9558 21.8729 19.7388 21.4158 19.7388 20.689V6.15362Z"
            stroke={appColor?.base_color}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </G>
    </Svg>
  );
};

export default IconUnBookmark;
