import styled from 'styled-components/native'

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
    flex-direction: column
`