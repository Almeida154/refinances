import styled from 'styled-components/native'

import { Dimensions } from 'react-native'
import { fonts, colors } from '../../../styles'

export const Container = styled.View`
    width: 100%;
    height: 100%;
`

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    padding-left: 20%;
    padding-right: 20%;
    margin-top: 10%;
`

export const PeriodoAnterior = styled.TouchableOpacity`

`
export const PeriodoAtual = styled.View`

`

export const PeriodoPosterior = styled.TouchableOpacity`

`
export const LabelPeriodo = styled.Text`
    font-family: ${`${fonts.familyType.semiBold}`};
    font-size: ${`${fonts.size.big}px`};
    color: ${colors.darkGray}
`
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