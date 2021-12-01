import hexToRGB from './hexToRgba';
import { useTheme } from 'styled-components/native';

const shadowBox = (elevation: number = 20, opacity: number = 0.4) => {
  const theme: any = useTheme();

  return {
    shadowColor: hexToRGB(theme.colors.black, opacity),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: elevation,
  };
};

export default shadowBox;
