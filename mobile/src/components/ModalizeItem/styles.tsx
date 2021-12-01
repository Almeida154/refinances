import styled from 'styled-components/native';
import hexToRGB from '../../helpers/hexToRgba';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props : any) => props.theme.colors.white};
  height: ${`${heightPixel(180)}px`};
  margin-bottom: ${`${heightPixel(20)}px`};
  padding: 0 ${`${metrics.default.boundaries}px`};
  align-items: center;
`;

export const Icon = styled.View`
  width: ${`${widthPixel(130)}px`};
  height: ${`${widthPixel(130)}px`};
  border-radius: ${`${widthPixel(130 / 2)}px`}; ;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${`${widthPixel(130 / 2)}px`};
`;

export const Description = styled.Text`
  font-size: ${`${fonts.size.medium - widthPixel(8)}px`};
  color: ${(props : any) => props.theme.colors.davysGrey};
  font-family: ${fonts.familyType.bold};
  margin-left: ${`${widthPixel(40)}px`};
`;
