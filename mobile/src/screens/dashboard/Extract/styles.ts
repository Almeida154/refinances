import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  flex: 1;
  background: ${(props: any) => props.theme.colors.back};
`;

// Header

export const Header = styled.View`
  flex-direction: row;
  height: ${`${heightPixel(220)}px`};
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.colors.back};
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

export const Body = styled.View`
  padding: ${`${metrics.default.boundaries / 1.6}px`};
`;

export const Footer = styled.View`
  background-color: ${(props: any) => props.theme.colors.diffWhite};
  flex-direction: row;
  justify-content: space-between;
  padding: ${`${metrics.default.boundaries / 1.6}px`};
  padding-bottom: ${`${metrics.default.boundaries * 1.2}px`};
  bottom: 0;
  width: 100%;
  height: auto;
`;

export const CardBalance = styled.View`
  width: 32%;
  height: auto;
  min-height: ${`${heightPixel(202)}px`};
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: 10px;
`;

export const LabelBalance = styled.Text`
  font-family: ${`${fonts.familyType.bold}`};
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.darkGray};
`;

export const LabelValueBalance = styled.Text`
  font-family: ${`${fonts.familyType.bold}`};
  font-size: ${`${fonts.size.small}px`};
`;

export const ScrollBody = styled.ScrollView`
  width: 100%;
`;
