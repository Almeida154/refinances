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
    align-items: center;    
    width: 100%;
    background-color: #EE4266;
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
