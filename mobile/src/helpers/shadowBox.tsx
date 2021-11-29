import hexToRGB from "./hexToRgba";
import {colors} from '../styles'

const shadowBox = (elevation: number = 20, opacity: number = 0.4) => {
  return {
    shadowColor: hexToRGB(colors.black, opacity),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: elevation,
  };
};

export default shadowBox;
