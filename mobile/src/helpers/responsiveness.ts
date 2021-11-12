import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Based on figma prototype
const widthBaseScale = width / 996;
const heightBaseScale = height / 2020;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Platform.select({
    android: Math.round(PixelRatio.roundToNearestPixel(newSize)),
    ios: Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2,
  });
}

// For width pixel
export const widthPixel = (size: number) => normalize(size, 'width') || 0;

// For height pixel
export const heightPixel = (size: number) => normalize(size, 'height') || 0;

// For font pixel
export const fontPixel = (size: number) => heightPixel(size) || 0;

// For Margin and Padding vertical pixel
export const pixelSizeVertical = (size: number) => heightPixel(size) || 0;

// For Margin and Padding horizontal pixel
export const pixelSizeHorizontal = (size: number) => widthPixel(size) || 0;
