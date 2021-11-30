import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../../../styles';

export const CategoryStatsCard = styled.View`
  margin-top: ${`${metrics.default.boundaries / 1.6}`};
  position: relative;
  background-color: ${(props : any) => props.theme.colors.diffWhite};
  border-radius: ${`${widthPixel(24)}px`};
`;

export const CategoryStatsHeader = styled.View`
  flex-direction: row;
  position: absolute;
  align-items: flex-end;
  top: 0;
  width: 100%;
  height: ${`${heightPixel(125)}px`};
  padding: 0 ${`${metrics.default.boundaries / 1.6}px`};
`;

export const CategoryStatsName = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props : any) => props.theme.colors.davysGrey};
  opacity: 0.7;
`;

export const CategoryStatsBody = styled.View`
  margin-top: ${`${heightPixel(125)}px`};
  height: ${`${heightPixel(1000 - 250 - 125)}px`};
  padding: ${`${metrics.default.boundaries / 1.6}px`};
`;

export const CategoriesContainer = styled.View`
  width: 100%;
  background-color: ${(props : any) => props.theme.colors.white};
  border-radius: ${`${widthPixel(24)}px`};
`;

export const Category = styled.View`
  height: ${`${heightPixel(220)}px`};
  background-color: ${(props : any) => props.theme.colors.white};
  flex-direction: row;

  padding: 0 ${`${metrics.default.boundaries / 1.6}px`};
  align-items: center;
`;

export const CategoryIcon = styled.View`
  width: ${`${widthPixel(130)}px`};
  height: ${`${widthPixel(130)}px`};
  border-radius: ${`${widthPixel(130 / 2)}px`};
  justify-content: center;
  align-items: center;
`;

export const CategoryName = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  padding: 0 ${`${metrics.default.boundaries / 2}px`};
`;

export const Name = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props : any) => props.theme.colors.davysGrey};
  opacity: 0.7;
`;

export const CategoryData = styled.View`
  width: ${`${widthPixel(240)}px`};
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const Total = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.black};
  color: ${(props : any) => props.theme.colors.redCrayola};
`;

export const Percent = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props : any) => props.theme.colors.davysGrey};
  opacity: 0.3;
`;
