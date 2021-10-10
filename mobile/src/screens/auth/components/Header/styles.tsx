import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  font-family: ${fonts.familyType.regular};
`;

export const Boundaries = styled.View`
  padding: ${`${metrics.default.boundaries}px`};
`;

export const Title = styled.Text`
  font-family: ${fonts.familyType.black};
  color: ${colors.davysGrey};
  margin-top: 12%;
  line-height: 34px;
  font-size: ${`${fonts.size.super}px`};
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
  line-height: 34px;
  font-size: ${`${fonts.size.medium}px`};
  opacity: 0.3;
`;
