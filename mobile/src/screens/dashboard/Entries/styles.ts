import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import {colors, fonts, metrics} from '../../../styles'
import { heightPixel, widthPixel } from '../../../helpers/responsiveness'

export const Container = styled.View`
    display: flex;
    align-items: center;
    flex: 1;
    background-color: ${(props : any) => props.theme.colors.white};
`

<<<<<<< HEAD
=======
export const Title = styled.Text`
    margin-top: 25px;
    margin-left: 15px;
    font-size: 40px;
    color: ${(props : any) => props.theme.colors.white};
    padding: 20px;
    font-family: ${fonts.familyType.semiBold};
`

>>>>>>> 5e2505b146d27647fd0fb4e7093834f30fb3bd91
export const TextButton = styled.Text`
    color: ${(props : any) => props.theme.colors.silver};
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
<<<<<<< HEAD
    font-size: ${fonts.size.big};
    color: ${colors.white};
    bottom: ${heightPixel(150)};
    left: ${widthPixel(30)}
    font-family: ${fonts.familyType.semiBold};
=======
    font-size: 20px;
    color: ${(props : any) => props.theme.colors.silver};
    top: 0;
    position: absolute;
    right: ${heightPixel(250)}px;
    font-family: ${fonts.familyType.semiBold};
`
export const TextInputValue = styled.TextInput`
    opacity: 0.7;
    font-size: ${fonts.size.super + 20};
    font-family: ${fonts.familyType.semiBold};
    color: ${(props : any) => props.theme.colors.white};
    width: auto;
>>>>>>> 5e2505b146d27647fd0fb4e7093834f30fb3bd91
`