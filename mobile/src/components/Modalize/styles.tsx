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
  flex: 1;
`;

export const SearchContainer = styled.View`
  padding: ${`${metrics.default.boundaries}px`};
  padding-top: 0;
`;

export const Search = styled.TextInput`
  background-color: ${colors.white};
  align-self: center;
  width: 100%;
  height: ${`${heightPixel(120)}px`};
  padding-left: ${`${widthPixel(48)}px`};
  padding-right: ${`${heightPixel(120 + 48)}px`};
  color: ${colors.davysGrey};
  font-family: ${fonts.familyType.bold};
  border-bottom-width: ${`${heightPixel(6)}px`};
  border-color: ${hexToRGB(colors.redCrayola, 0.4)};
`;

export const SearchDeleteButton = styled.TouchableOpacity`
  width: ${`${heightPixel(120)}px`};
  height: ${`${heightPixel(120)}px`};
  background-color: ${hexToRGB(colors.diffWhite, 0.9)};
  position: absolute;
  right: 0;
  margin: 0 ${`${metrics.default.boundaries}px`};
  justify-content: center;
  align-items: center;
`;
