import styled from 'styled-components/native'

import {colors, fonts, metrics} from '../../../../../styles'

export const ContainerItem = styled.View`
    display: flex;

    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 20px;
`
export const SectionIcon = styled.View`
    width: 40px;
    height: 40px;
    border-width: 4px;
    border-radius: 100px;

    justify-content: center;
    align-items: center;
`

export const SectionDescription = styled.View`
    
`

export const SectionLancamento = styled.View`
    display: flex;

    flex-direction: row;
    
`

export const LabelName = styled.Text`
    font-size: 25px;    
    font-family: ${fonts.familyType.semiBold};
`

export const SectionValues = styled.View`
    display: flex;
    flex-direction: column;

    align-items: flex-end;

`

export const LabelAccount = styled.Text`
    font-size: 13px;
    font-weight: 300;
    font-family: ${fonts.familyType.light};
    
`
export const LabelValue = styled.Text`
    font-size: 23px;
    font-weight: bold;
`
export const LabelIndex = styled.Text`
    font-family: ${fonts.familyType.regular}
`