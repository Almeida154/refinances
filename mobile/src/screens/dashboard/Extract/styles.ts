import styled from 'styled-components/native'

import {Dimensions} from 'react-native'

export const Container = styled.View`

`

export const Header = styled.View`
    display: flex;

    flex-direction: row;
    height: 80px;
    justify-content: space-between;
    align-items: center;

    padding-left: 30%;
    padding-right: 30%;
`
export const PeriodoAnterior = styled.TouchableHighlight`

`
export const PeriodoAtual = styled.View`

`

export const PeriodoPosterior = styled.TouchableHighlight`

`
export const LabelPeriodo = styled.Text`
    font-size: 20px;
    font-weight: 500;
`
export const Body = styled.View`
    background-color: #fff;
    
    align-items: center;    

    padding-left: 20px;
    padding-right: 20px;

    

`

export const ScrollBody = styled.ScrollView`
    height: ${`${Dimensions.get('window').height * 0.65}px`};
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
`
export const CardBalance = styled.View`

    width: 100px;
    height: 100px;

    align-items: center;
    padding: 10px;

    background-color: #F6F6F6;
    border-radius: 10px;
`
export const LabelBalance = styled.Text`
    font-weight: bold;
`
export const LabelValueBalance = styled.Text`

`