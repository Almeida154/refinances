import styled from 'styled-components/native';
import hexToRGB from '../../../../helpers/hexToRgba';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../../styles';

interface DayProps {
  isSelected?: boolean;
  lastDay?: boolean;
}

export const Container = styled.View<DayProps>`
  background-color: ${props =>
    props.isSelected ? colors.diffWhite : hexToRGB(colors.bigDipOruby, 0.15)};
  width: ${props =>
    props.isSelected ? `${widthPixel(140)}px` : `${widthPixel(120)}px`};
  height: ${props =>
    props.isSelected ? `${widthPixel(140)}px` : `${widthPixel(120)}px`};
  border-radius: ${props =>
    props.isSelected ? `${widthPixel(140 / 2)}px` : `${widthPixel(120 / 2)}px`};

  justify-content: center;
  align-items: center;
`;

export const Day = styled.Text<DayProps>`
  color: ${props =>
    props.isSelected ? hexToRGB(colors.redCrayola, 0.8) : colors.bigDipOruby};
  font-size: ${props =>
    props.isSelected ? `${fonts.size.bigger}px` : `${fonts.size.small}px`};
  font-family: ${props =>
    props.isSelected ? fonts.familyType.black : fonts.familyType.bold};
`;
