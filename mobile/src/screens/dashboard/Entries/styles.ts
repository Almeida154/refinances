import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import {colors, fonts, metrics} from '../../../styles'
import { heightPixel, widthPixel } from '../../../helpers/responsiveness'

export const Container = styled.View`
    display: flex;
    align-items: center;
    flex: 1;
    background-color: ${colors.white};
`

export const TextButton = styled.Text`
    color: ${colors.white};
    font-family: ${fonts.familyType.bold};
`

export const Header = styled.View`
    width: 100%;    
    padding-top: ${heightPixel(500)};
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

export const AlinhaParaDireita = styled.View`
    justify-content: flex-end; 
    flex-direction: row-reverse;
    align-items: flex-end;
    flex: 1;
    width: auto;
    position: absolute;
    bottom: ${heightPixel(150)};
    left: ${widthPixel(100)}
`

export const LabelCifrao = styled.Text`
    font-size: ${fonts.size.big};
    color: ${colors.white};
    bottom: ${heightPixel(150)};
    left: ${widthPixel(30)}
    font-family: ${fonts.familyType.semiBold};
`