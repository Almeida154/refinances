import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${colors.diffWhite};
  flex: 1;
`;

export const Content = styled.View`
  padding: ${`${metrics.default.boundaries}px`};
  flex: 1;
`;

export const Writting = styled.View`
  margin-top: 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PrefixReaisSymbol = styled.Text`
  font-size: ${`${fonts.size.super}px`};
  font-family: ${fonts.familyType.bold};
  align-self: flex-start;
  color: ${colors.eerieBlack};
  opacity: 0.1;
  margin-right: 2%;
`;

export const Error = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${colors.redCrayola};
  padding: 5px;
  opacity: 0.3;
`;
