import styled from 'styled-components/native'
import { widthPixel, heightPixel } from '../../../helpers/responsiveness';

import { Dimensions } from 'react-native'
import { fonts, colors, metrics } from '../../../styles'

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  flex: 1;
  background: ${colors.back};
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

export const Body = styled.View`
    background-color: ${colors.white};
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 10px;
`

export const ScrollBody = styled.ScrollView`
    height: ${`${Dimensions.get('window').height * 0.97}px`};
    width: 100%;
`

export const CardItem = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: gray;
    margin-bottom: 40px;
`

export const Section = styled.View`
    display: flex;    
    flex-direction: column;
`

export const Footer = styled.View`
    display: flex;
    background-color: ${colors.white};
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    bottom: 0;
    width: 100%;
    height: auto;
`
export const CardBalance = styled.View`
    width: 30%;
    height: auto;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    background-color: ${colors.cultured};
    border-radius: 10px;
`
export const LabelBalance = styled.Text`
    font-family: ${`${fonts.familyType.bold}`};
    font-size: ${`${fonts.size.small}px`};
    color: ${colors.darkGray};
`
export const LabelValueBalance = styled.Text`
    font-family: ${`${fonts.familyType.bold}`};
    font-size: ${`${fonts.size.small}px`};
`
export const TextPicker = styled.Text`

`

export const ContainerPicker = styled.View`
    padding-top: 60;
    padding-bottom: 30;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${colors.aliceBlue};
`

export const WrapperHorizontal = styled.View`
    height: 100;
    justify-content: center;
    align-items: center;
    margin: auto;
    color: black;
`

export const ButtonAccessDetail = styled.TouchableHighlight`
    justify-content: center;
    align-items: center;
    margin-top: 10;
    margin-bottom: 10;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 30;
    padding-right: 30;
    height: 50;
    border-width: 3;
    border-radius: 10;
`