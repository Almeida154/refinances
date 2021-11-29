import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { colors, metrics } from '../../../../../styles';
import fonts from '../../../../../styles/fonts';

export const Container = styled.View`
  width: 100%;
  padding: ${`${metrics.default.boundaries / 1.6}px`};
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: ${widthPixel(40)};
  margin-bottom: ${`${metrics.default.boundaries / 1.4}px`};
`;

export const AccountsTitle = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.black}`};
  color: ${(props: any) => props.theme.colors.davysGrey};
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
`;

export const AccountData = styled.View`
  flex: 1;
  padding: 0 ${`${metrics.default.boundaries / 3}px`};
`;

export const Name = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const Type = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
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
  color: ${(props: any) => props.theme.colors.davysGrey};
  border-radius: ${`${widthPixel(20)}px`};
  opacity: 0.7;
  background-color: ${(props: any) => props.theme.colors.cultured};
  padding: ${`${widthPixel(20)}px`};
`;
