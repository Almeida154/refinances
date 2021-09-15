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

export const ContainerForm = styled.View`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 95%;
    padding: 5px;
`

export const SectionButtons = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;    
    justify-content: center;
`

export const ButtonDespesa = styled.TouchableHighlight`
    width: 34%;
    background-color: #EE4266;
    padding: 10px;
    align-items: center;
    justify-content: center;    
`

export const ButtonReceita = styled.TouchableHighlight`
    width: 34%;
    background-color: #EE4266;
    padding: 10px;
    align-items: center;
    justify-content: center;    
    color: #EE4266;   
`


export const ButtonTransferencia = styled.TouchableHighlight`
    width: 34%;
    background-color: #EE4266;
    padding: 10px;
    align-items: center;
    justify-content: center;    
    color: #EE4266;       
`

export const InputControl = styled.View`
    display: flex;
    width: 90%;
    margin-top: 10px;
`

export const TextInput = styled.TextInput`
    border-bottom-width: 2px;
    width: 100%;
    color: #858c87;
    height: 40px;
    border-color: #858c87;
    opacity: 0.7;
`

export const Label = styled.Text`
    font-size: 17px;
    font-weight: bold;
`

export const TextButton = styled.Text`
    color: #fff;
    font-weight: bold
`

export const Header = styled.View`
    display: flex;
    align-items: center;    
    width: 100%;
    background-color: #EE4266;
`