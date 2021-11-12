import { StatusBar, Dimensions } from 'react-native';
import { widthPixel } from '../helpers/responsiveness';

export default {
  default: {
    boundaries: widthPixel(84),
    statusBarHeight: StatusBar.currentHeight || 20,
  },
  screen: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  inputText: {
    height: 40,
    radius: 10,
  },
};
