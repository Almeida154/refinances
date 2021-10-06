import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.TouchableHighlight`
  width: 100%;
  padding: 18px;
  font-family: ${fonts.familyType.bold};
  background-color: ${colors.paradisePink};
  border-radius: ${`${metrics.inputText.radius}px`};
`;

export const Text = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.white};
  font-family: ${fonts.familyType.bold};
  text-align: center;
`;
