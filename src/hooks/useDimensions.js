import { useState } from 'react';
import { screenHeight, screenWidth } from '@utils/platforms';

function useDimensions() {
  const [dimension, setDimension] = useState({
    scrWidth: screenWidth,
    scrHeight: screenHeight,
  });
  return dimension;
}

export default useDimensions;
