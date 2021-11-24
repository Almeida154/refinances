import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import {colors, fonts, metrics} from '../../../styles'
import { heightPixel, widthPixel } from '../../../helpers/responsiveness'

export const Container = styled.View`
    display: flex;
    align-items: center;
    flex: 1;
    background-color: white;
`

export const Title = styled.Text`
    margin-top: 25px;
    margin-left: 15px;
    font-size: 40px;
    color: #fff;
    padding: 20px;
    font-family: ${fonts.familyType.semiBold};
`

export const TextButton = styled.Text`
    color: #fff;
    font-family: ${fonts.familyType.bold};
`

export const Header = styled.View`
    width: 100%;    
    padding-top: 100px;
`

export const SectionButtons = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;    
    justify-content: center;
`

export const Buttons = styled.TouchableOpacity`
    width: 34%;
    padding: 10px;
    align-items: center;
    justify-content: center;    
`

export const InputControlValue = styled.View`
    display: flex;
    flex-direction: row;
    width: auto;
    height: ${heightPixel(250)}px;
`

export const AlinhaParaDireita = styled.View`
    justify-content: space-between; 
    flex-direction: row;
    align-items: flex-end;
    margin-right: 30px;
`

export const LabelCifrao = styled.Text`
    font-size: 20px;
    color: #fff;
    font-family: ${fonts.familyType.semiBold};
`
export const TextInputValue = styled.TextInput`
    opacity: 0.7;
    font-size: ${fonts.size.super + 20};
    font-family: ${fonts.familyType.semiBold};
    color: #fff;
    width: auto;
`