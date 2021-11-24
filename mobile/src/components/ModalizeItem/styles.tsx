import styled from 'styled-components/native';
import hexToRGB from '../../helpers/hexToRgba';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.View`
  flex-direction: row;
  background-color: ${colors.white};
  height: ${`${heightPixel(200)}px`};
  margin-bottom: ${`${heightPixel(20)}px`};
  padding: 0 ${`${metrics.default.boundaries}px`};
  align-items: center;
`;

export const Icon = styled.View`
  width: ${`${widthPixel(150)}px`};
  height: ${`${widthPixel(150)}px`};
  border-radius: ${`${widthPixel(150 / 2)}px`}; ;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${`${widthPixel(150 / 2)}px`};
`;

export const Description = styled.Text`
  font-size: ${`${fonts.size.medium - widthPixel(8)}px`};
  color: ${hexToRGB(colors.davysGrey, 0.5)};
  font-family: ${fonts.familyType.bold};
  margin-left: ${`${widthPixel(40)}px`};
`;
