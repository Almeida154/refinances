import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.TouchableHighlight`
  background-color: ${colors.white};
  height: 80px;
  elevation: 100;
  flex-direction: row;
  padding: 0 ${`${metrics.default.boundaries}px`};
  justify-content: center;
  align-items: center;
`;

export const Description = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.davysGrey};
  opacity: 0.25;
  flex: 1;
`;
