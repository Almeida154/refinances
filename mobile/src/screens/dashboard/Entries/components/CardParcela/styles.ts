import styled from 'styled-components/native'

import {colors, fonts, metrics} from '../../../../../styles'

export const ContainerCardParcela = styled.SafeAreaView`
    width: 200px;
    height: 230px;
    border-radius: 20px;
    padding: 15px;    
    border-width: 1px;
    margin-right: 20px;    
`
export const TituloCardParcela = styled.Text`
    font-size: 17px;
    font-family: ${fonts.familyType.bold};
    color: ${colors.jet};
`
export const LabelCardParcela = styled.Text`

`

export const InputCardParcela = styled.TextInput`
    font-size: 17px;
    color: ${colors.jet};
`

export const InputControlStatus = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const LabelStatus = styled.Text`
    font-size: 17px;
    font-family: ${fonts.familyType.bold};
`