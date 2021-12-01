import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../styles';

export const Container = styled.View`
  flex: 1;
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background: ${(props: any) => props.theme.colors.back};
`;

// Header

export const Header = styled.View`
  flex-direction: row;
  height: ${`${heightPixel(220)}px`};
  justify-content: center;
  align-items: center;
`;

export const PeriodoAnterior = styled.TouchableOpacity`
  opacity: 0.2;
`;

export const PeriodoAtual = styled.View`
  padding: 0 ${`${widthPixel(60)}px`};
  opacity: 0.7;
`;

export const PeriodoPosterior = styled.TouchableOpacity`
  opacity: 0.2;
`;

export const LabelPeriodo = styled.Text`
  font-family: ${`${fonts.familyType.bold}`};
  background-color: ${(props: any) => props.theme.colors.platinum};
  padding-top: ${`${widthPixel(10)}px`};
  padding-bottom: ${`${widthPixel(10)}px`};
  padding-left: ${`${widthPixel(50)}px`};
  padding-right: ${`${widthPixel(50)}px`};
  border-radius: ${`${widthPixel(80)}px`};
  font-size: ${`${fonts.size.big}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const TopData = styled.View`
  flex-direction: row;
  background-color: ${(props: any) => props.theme.colors.white};
  height: ${`${heightPixel(280)}px`};
  border-radius: ${`${widthPixel(60)}px`};
`;

export const TopDataItem = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const TopDataTitle = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const TopDataBalance = styled.Text`
  font-size: ${`${fonts.size.medium - widthPixel(8)}px`};
  font-family: ${fonts.familyType.black};
  margin-top: ${`${heightPixel(-18)}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const TopDataDescription = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.bold};
  margin-top: ${`${heightPixel(20)}px`};
  opacity: 0.3;
  color: ${(props: any) => props.theme.colors.davysGrey};
  margin-right: ${`${widthPixel(26)}px`};
`;

// Body

export const Content = styled.View`
  padding: ${`${metrics.default.boundaries / 1.6}px`};
`;

export const CountCardsContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const CountCard = styled.View`
  margin-top: ${`${metrics.default.boundaries / 1.6}px`};
  background-color: ${(props: any) => props.theme.colors.white};
  flex: 1;
  height: ${`${heightPixel(280)}px`};
  border-radius: ${`${widthPixel(24)}px`};
  justify-content: center;
  align-items: center;
`;

export const Count = styled.Text`
  font-size: ${`${fonts.size.super + widthPixel(18)}px`};
  font-family: ${fonts.familyType.light};
  opacity: 0.5;
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const CountDescription = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.bold};
  opacity: 0.3;
  color: ${(props: any) => props.theme.colors.davysGrey};
`;
