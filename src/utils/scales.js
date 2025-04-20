import { Dimensions } from 'react-native';
import { isIOS, isTablet } from './platforms';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const guidelineBaseWidth = isIOS ? 375 : 360;
const guidelineBaseHeight = isIOS ? 667 : 640;

export const horizontal = (size) => (size / guidelineBaseWidth) * screenWidth;
export const vertical = (size) => (size / guidelineBaseHeight) * screenHeight;
export const moderate = (size) => size;
export const textSize = (size) => (isTablet ? size + 2 : size);
