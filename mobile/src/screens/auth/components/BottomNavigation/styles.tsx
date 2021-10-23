import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.TouchableHighlight`
  position: absolute;
  bottom: 0;
  width: 100%;
  elevation: 0;
`;

export const Content = styled.View`
  background-color: ${colors.white};
  flex-direction: row;
  height: 80px;
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
