import styled from 'styled-components/native'

import {colors, fonts, metrics} from '../../../../../styles'

export const Button = styled.Image`
    width: 50px;
    height: 50px;
`

export const Container = styled.View`
    flex: 1px;
    align-items: center;
    background-color: #F5FCFF;

    font-family: ${fonts.familyType.regular};
`

export const Welcome = styled.Text`
    font-size: 20px;
    text-align: center;
    margin: 10px;
`

export const Action = styled.Text`
    text-align: center;
    color: #0000FF;
    margin: 5px 0;
    font-weight: bold;
`

export const Instructions = styled.Text`
    text-align: center;
    color: #333333;
    margin-bottom: 5px;
    margin-top: 45px;

    width: 90%;
`

export const Stat = styled.Text`
    text-align: center;
    color: #B0171F;
    margin-bottom: 1px;
`

export const Header = styled.View`
    background-color: #2F75FD;
    width: 100%;
    height: 90px;


`

export const ButtonRecord = styled.TouchableOpacity`
    margin: 30px auto;
    
`

export const ContainerResults = styled.View`
    margin: 30px auto;
    
`
