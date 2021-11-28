import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../../../styles';

export const Container = styled.View`
  width: 100%;
  padding: ${`${metrics.default.boundaries / 1.4}px`};
  background-color: ${colors.white};
  border-radius: ${widthPixel(40)};
  margin-bottom: ${`${metrics.default.boundaries / 1.4}px`};
`;

export const TopSection = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const Detail = styled.View`
  width: ${`${widthPixel(15)}px`};
  border-radius: ${`${widthPixel(15)}px`};
  height: 100%;
  background-color: ${colors.redCrayola};
  margin-right: ${`${widthPixel(30)}px`};
`;

export const Description = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${`${fonts.familyType.bold}`};
  line-height: ${`${fonts.size.small + widthPixel(8)}px`};
  color: ${colors.blackSilver};
  opacity: 1;
`;

export const Separator = styled.View`
  border-radius: ${`${widthPixel(30)}px`};
  height: ${`${heightPixel(10)}px`};
  background-color: ${colors.cultured};
  margin: ${`${metrics.default.boundaries / 2}px`} 0;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.black}`};
  color: ${colors.davysGrey};
  margin-bottom: ${`${metrics.default.boundaries / 2}px`};
`;

export const GoalsContainer = styled.View`
  width: 100%;
`;
