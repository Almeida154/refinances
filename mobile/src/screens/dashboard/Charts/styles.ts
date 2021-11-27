import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  flex: 1;
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
  background-color: ${colors.platinum};
  padding-top: ${`${widthPixel(10)}px`};
  padding-bottom: ${`${widthPixel(10)}px`};
  padding-left: ${`${widthPixel(50)}px`};
  padding-right: ${`${widthPixel(50)}px`};
  border-radius: ${`${widthPixel(80)}px`};
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.darkGray};
`;

export const TopData = styled.View`
  flex-direction: row;
  background-color: ${colors.white};
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
  color: ${colors.davysGrey};
`;

export const TopDataBalance = styled.Text`
  font-size: ${`${fonts.size.medium - widthPixel(8)}px`};
  font-family: ${fonts.familyType.black};
  margin-top: ${`${heightPixel(-18)}px`};
`;

export const TopDataDescription = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.bold};
  margin-top: ${`${heightPixel(20)}px`};
  opacity: 0.3;
`;

// Body

export const Content = styled.View`
  padding: ${`${metrics.default.boundaries / 1.6}px`};
`;
