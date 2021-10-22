import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding: 0 ${`${metrics.default.boundaries}px`};
`;

export const Content = styled.View`
  border-radius: ${`${metrics.inputText.radius}px`};
  background-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

export const Name = styled.Text`
  color: #aca7a7;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  margin-left: 10px;
`;
