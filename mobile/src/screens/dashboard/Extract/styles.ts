import styled from 'styled-components/native'

import {Dimensions} from 'react-native'
import { fonts } from '../../../styles'

export const Container = styled.View`

`

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    padding-left: 20%;
    padding-right: 20%;
`
export const PeriodoAnterior = styled.TouchableOpacity`

`
export const PeriodoAtual = styled.View`

`

export const PeriodoPosterior = styled.TouchableOpacity`

`
export const LabelPeriodo = styled.Text`
    fontFamily: ${`${fonts.familyType.semiBold}`};
    fontSize: ${`${fonts.size.big}px`};
    color: #444
`
export const Body = styled.View`
    background-color: #fff;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 10px;
`

export const ScrollBody = styled.ScrollView`
    height: ${`${Dimensions.get('window').height * 0.65}px`};
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
    background-color: #fff;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    top: 30;
`
export const CardBalance = styled.View`

    width: 30%;
    height: 100%;
    align-items: center;
    padding: 10px;
    background-color: #F6F6F6;
    border-radius: 10px;
`
export const LabelBalance = styled.Text`
    fontFamily: ${`${fonts.familyType.bold}`};
    fontSize: ${`${fonts.size.small}px`};
    color: #444;
`
export const LabelValueBalance = styled.Text`
    fontFamily: ${`${fonts.familyType.semiBold}`};
    fontSize: ${`${fonts.size.small}px`};
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
    background-color: #F5FCFF;
`

export const WrapperHorizontal = styled.View`
    height: 100;
    justify-content: center;
    align-items: center;
    margin: auto;
    color: black;
`

export const OptionWrapper = styled.View`
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