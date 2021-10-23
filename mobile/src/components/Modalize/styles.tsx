import styled from 'styled-components/native';
import { metrics, colors, fonts } from '../../styles';

export const Title = styled.Text`
  padding: ${`${metrics.default.boundaries}px`};
  padding-bottom: 0;
  font-size: ${`${fonts.size.big}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
`;

interface BodyProps {
  hasBodyBoundaries?: boolean;
}

export const Body = styled.View<BodyProps>`
  padding: ${props =>
    props.hasBodyBoundaries ? `${metrics.default.boundaries}px` : 0};
`;
