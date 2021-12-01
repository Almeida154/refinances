import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import { colors, metrics } from '../../../../../styles';
import fonts from '../../../../../styles/fonts';

export const Container = styled.View`
  align-items: center;
  width: 100%;
  padding: ${`${metrics.default.boundaries / 1.4}px`};
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: ${`${widthPixel(40)}px`};
  margin-bottom: ${`${metrics.default.boundaries / 1.4}px`};
`;

export const SectionBalance = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${`${metrics.default.boundaries / 1.4}px`};
`;

export const BalanceDetail = styled.View`
  width: ${`${widthPixel(15)}px`};
  border-radius: ${`${widthPixel(15)}px`};
  height: 100%;
  background-color: ${(props: any) => props.theme.colors.redCrayola};
  margin-right: ${`${widthPixel(30)}px`};
`;

export const TotalBalance = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.black}`};
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const Description = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${`${fonts.familyType.bold}`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.5;
`;
