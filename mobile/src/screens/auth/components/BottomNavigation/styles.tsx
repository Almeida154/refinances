import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.TouchableHighlight`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${colors.white};
  height: 80px;
  flex-direction: row;
  padding: 0 ${`${metrics.default.boundaries}px`};
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Description = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.davysGrey};
  opacity: 0.25;
  flex: 1;
`;
