import { StatusBar, Dimensions } from 'react-native';

export default {
  default: {
    boundaries: 32,
    padding: 20,
    statusBarHeight: StatusBar.currentHeight,
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
