import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.View`
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${`${metrics.inputText.radius}px`};
  padding: ${`${heightPixel(20)}px`} ${`${widthPixel(48)}px`};
  border-width: ${`${widthPixel(4)}px`};
  border-color: ${colors.white};
  margin-bottom: ${`${widthPixel(20)}px`};
`;

export const Label = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.redCrayola};
  line-height: 28px;
`;