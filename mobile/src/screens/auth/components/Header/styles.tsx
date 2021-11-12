import styled from 'styled-components/native';
import { heightPixel } from '../../../../helpers/responsiveness';
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
  margin-top: 10%;
  line-height: ${`${fonts.size.super + heightPixel(8)}px`};
  font-size: ${`${fonts.size.super}px`};
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
  margin-top: 2%;
  line-height: 18px;
  font-size: ${`${fonts.size.small}px`};
  opacity: 0.3;
`;

export const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Step = styled.Text`
  font-family: ${fonts.familyType.black};
  color: ${colors.paradisePink};
  font-size: ${`${fonts.size.medium}px`};
  opacity: 0.7;
`;

export const LastWordAccent = styled.Text`
  color: ${colors.paradisePink};
`;
