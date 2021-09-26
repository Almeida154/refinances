import styled from 'styled-components/native'

export const ContainerForm = styled.View`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 95%;
    padding: 5px;
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

export const TextInputValor = styled.TextInput`
    border-bottom-width: 2px;
    width: 100%;
    color: #858c87;
    height: 60px;
    border-color: #858c87;
    opacity: 0.7;    

    font-size: 30px;
`

export const Label = styled.Text`
    font-size: 17px;
    font-weight: bold;
`

export const SectionDetalhes = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 90%;

    align-items: center;
`

export const TextDetalhes = styled.Text`

`


export const ButtonDetalhes = styled.TouchableHighlight`

`

export const SectionCardsParcelas = styled.View`
    margin-top: 20px;
    height: 500px;
`

export const ContainerCardParcela = styled.SafeAreaView`
    width: 200px;
    height: 150px;
    border-radius: 20px;
    padding: 10px;    

    border-width: 2px;
    margin-right: 20px;
    border-color: #EE4266;
`
export const TituloCardParcela = styled.Text`
    font-family: "Nunito";
    font-weight: bold;
`
export const LabelCardParcela = styled.Text`

`

export const InputCardParcela = styled.TextInput`
    font-size: 20px;
    color: black
`