import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../../../styles';

export const Container = styled.View`
  width: 100%;
  padding: ${`${metrics.default.boundaries / 1.4}px`};
  background-color: ${(props: any) => props.theme.colors.white};
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
  background-color: ${(props: any) => props.theme.colors.redCrayola};
  margin-right: ${`${widthPixel(30)}px`};
`;

export const Description = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${`${fonts.familyType.bold}`};
  line-height: ${`${fonts.size.small + widthPixel(8)}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.3;
`;

export const Separator = styled.View`
  border-radius: ${`${widthPixel(30)}px`};
  height: ${`${heightPixel(10)}px`};
  background-color: ${(props: any) => props.theme.colors.cultured};
  margin: ${`${metrics.default.boundaries / 2}px`} 0;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.black}`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  margin-bottom: ${`${metrics.default.boundaries / 2}px`};
`;

export const CategoriesContainer = styled.View`
  width: 100%;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${`${heightPixel(60)}px`};
  align-items: center;
`;

export const CategoryIcon = styled.View`
  width: ${`${widthPixel(120)}px`};
  height: ${`${widthPixel(120)}px`};
  border-radius: ${`${widthPixel(120 / 2)}px`};
  border-width: ${`${widthPixel(10)}px`};
  justify-content: center;
  align-items: center;
`;

export const NameContainer = styled.View`
  flex: 1;
  padding: 0 ${`${metrics.default.boundaries / 3}px`};
  margin-right: ${`${16}px`};
`;

export const Name = styled.Text`
  font-size: ${`${fonts.size.medium}`};
  font-family: ${`${fonts.familyType.bold}`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.7;
`;

export const CategoryAction = styled.View``;

export const Limit = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  border-radius: ${`${widthPixel(20)}px`};
  opacity: 0.7;
  background-color: ${(props: any) => props.theme.colors.cultured};
  padding: ${`${widthPixel(20)}px`};
`;
