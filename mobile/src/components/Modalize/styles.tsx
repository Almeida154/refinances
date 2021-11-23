import styled from 'styled-components/native';
import hexToRGB from '../../helpers/hexToRgba';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { metrics, colors, fonts } from '../../styles';

export const Title = styled.Text`
  padding: ${`${metrics.default.boundaries}px`};
  padding-bottom: 0;
  font-size: ${`${fonts.size.big}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
`;

export const Subtitle = styled.Text`
  padding: 0 ${`${metrics.default.boundaries}px`};
  padding-top: ${`${heightPixel(10)}px`};
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.semiBold};
  line-height: ${`${fonts.size.small + widthPixel(8)}px`};
  color: ${hexToRGB(colors.davysGrey, 0.4)};
`;

interface BodyProps {
  hasBodyBoundaries?: boolean;
}

export const Body = styled.View<BodyProps>`
  padding: ${props =>
    props.hasBodyBoundaries ? `${metrics.default.boundaries}px` : 0};
`;
