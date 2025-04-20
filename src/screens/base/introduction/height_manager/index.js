import { screenHeight, screenWidth } from '@utils/platforms';
import { horizontal } from '@utils/scales';

const ratioMain1 = 332 / 215;
const ratioMain2 = 329 / 231;
const ratioMain3 = 329 / 246;
const isSmallDevice = screenWidth <= 320;
const width = isSmallDevice ? screenWidth - horizontal(170) : screenWidth - horizontal(60);

const dimensionsImage = [
  {
    widthImageMain: width,
    heightImageHeader: screenHeight * 0.1,
    heightImageMain: width / ratioMain1,
  },
  {
    widthImageMain: width,
    heightImageHeader: screenHeight * 0.1,
    heightImageMain: width / ratioMain2,
  },
  {
    widthImageMain: width,
    heightImageHeader: screenHeight * 0.1,
    heightImageMain: width / ratioMain3,
  },
];
export default dimensionsImage;
