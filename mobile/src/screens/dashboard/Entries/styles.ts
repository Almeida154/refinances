import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

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
    font-weight: bold;    
`

export const TextButton = styled.Text`
    color: #fff;
    font-weight: bold;    
`

export const Header = styled.View`
    display: flex;
    width: 100%;    
    padding-top: 250px;
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
      

    
`

export const AlinhaParaDireita = styled.View`
    justify-content: space-between; 
    flex-direction: row;

    padding-left: 20px;
    padding-right: 20px;
`

export const LabelCifrao = styled.Text`
    font-size: 20px;
    color: #fff;
`
export const TextInputValue = styled.TextInput`
    
    height: 80px;    
    opacity: 0.7;
    font-size: 50px; 
    color: #fff;
`