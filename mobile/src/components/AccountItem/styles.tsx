import styled from 'styled-components/native';
import hexToRGB from '../../helpers/hexToRgba';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.View`
  width: 100%;
  height: ${`${heightPixel(340)}px`};
  background-color: ${colors.white};
  border-radius: ${`${widthPixel(16)}px`};
  margin: ${`${heightPixel(22)}px`} 0;
`;

export const Content = styled.TouchableOpacity`
  width: 100%;
  height: ${`${heightPixel(340 - 120)}px`};
  background-color: ${colors.white};
  border-top-right-radius: ${`${widthPixel(20)}px`};
  border-top-left-radius: ${`${widthPixel(20)}px`};
  padding: ${`${metrics.default.boundaries / 2}px`};
  align-items: center;
  flex-direction: row;
`;

export const Data = styled.View`
  position: absolute;
  bottom: 0;
  justify-content: center;
  width: 100%;
  height: ${`${heightPixel(120)}px`};
  background-color: ${colors.diffWhite};
  border-bottom-right-radius: ${`${widthPixel(20)}px`};
  border-bottom-left-radius: ${`${widthPixel(20)}px`};
  padding: 0 ${`${metrics.default.boundaries / 2}px`};
`;

export const Amount = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${hexToRGB(colors.davysGrey, 0.7)};
  font-family: ${fonts.familyType.bold};
`;

export const Image = styled.Image`
  width: ${`${widthPixel(140)}px`};
  height: ${`${widthPixel(140)}px`};
  border-radius: ${`${widthPixel(140 / 2)}px`};
`;

export const Info = styled.View`
  flex: 1;
  height: 100%;
  padding: 0 ${`${metrics.default.boundaries / 3}px`};
  justify-content: center;
`;

export const Description = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${colors.davysGrey};
  font-family: ${fonts.familyType.bold};
`;

export const Category = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${hexToRGB(colors.davysGrey, 0.4)};
  font-family: ${fonts.familyType.light};
`;

export const Icon = styled.View`
  width: ${`${widthPixel(100)}px`};
  height: 100%;
  justify-content: center;
  align-items: center;
`;
