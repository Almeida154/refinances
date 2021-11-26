import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { colors, metrics } from '../../../../../styles';
import fonts from '../../../../../styles/fonts';

export const Container = styled.View`
  align-items: center;
  width: 100%;
  padding: ${`${metrics.default.boundaries / 1.6}px`};
  background-color: ${colors.white};
  border-radius: ${widthPixel(60)};
  margin-bottom: ${`${heightPixel(30)}px`};
`;

export const SectionBalance = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const BalanceDetail = styled.View`
  width: ${`${widthPixel(15)}px`};
  border-radius: ${`${widthPixel(15)}px`};
  height: 100%;
  background-color: ${colors.redCrayola};
  margin-right: ${`${widthPixel(25)}px`};
`;

export const TotalBalance = styled.Text`
  font-size: ${`${fonts.size.big}`};
  font-family: ${`${fonts.familyType.black}`};
`;

export const Description = styled.Text`
  font-weight: 300;
  font-size: ${`${fonts.size.small}px`};
  font-family: ${`${fonts.familyType.bold}`};
  opacity: 0.5;
`;

export const Separator = styled.View`
  border-radius: ${`${widthPixel(30)}px`};
  height: ${`${heightPixel(10)}px`};
  background-color: ${colors.cultured};
  margin: ${`${metrics.default.boundaries / 2}px`} 0;
  width: 100%;
`;

export const AccountsTitle = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.black}`};
  color: ${colors.davysGrey};
  margin-bottom: ${`${metrics.default.boundaries / 2}px`};
`;

export const AccountsContainer = styled.View`
  width: 100%;
`;

export const CardContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${`${heightPixel(60)}px`};
`;

export const Icon = styled.Image`
  width: ${`${widthPixel(120)}px`};
  height: ${`${widthPixel(120)}px`};
  border-radius: ${`${widthPixel(120 / 2)}px`};
  background-color: brown;
`;

export const AccountData = styled.View`
  flex: 1;
  padding: 0 ${`${metrics.default.boundaries / 3}px`};
`;

export const Name = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.medium}px`};
  color: ${colors.davysGrey};
`;

export const Type = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  color: ${colors.davysGrey};
  opacity: 0.7;
`;

export const AccountBalance = styled.View`
  height: 100%;
  width: ${`${widthPixel(280)}px`};
  align-items: flex-end;
`;

export const Balance = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  color: ${colors.davysGrey};
  border-radius: ${`${widthPixel(20)}px`};
  opacity: 0.7;
  background-color: ${colors.cultured};
  padding: ${`${widthPixel(20)}px`};
`;
