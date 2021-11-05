import styled from 'styled-components/native'

import {colors, fonts, metrics} from '../../../../../styles/'

export const Container = styled.View`
    margin: 0 30px;

`
export const LabelTitle = styled.Text`
    font-size: ${fonts.size.big};
    font-family: ${fonts.familyType.bold};
`
export const LabelQuantity = styled.Text`

`

export const GroupLabel = styled.View`
    width: 30%;
    margin-top: 15px;
`
export const Label = styled.Text`
    font-family: ${fonts.familyType.semiBold};
    font-size: ${fonts.size.medium};
`

export const Value = styled.Text`
    font-family: ${fonts.familyType.light};
    font-size: ${fonts.size.small};
`

export const SectionDescription = styled.View`
    
`

export const Row = styled.View`
    flex-direction: row;

    justify-content: space-between;
`

export const SectionTitle = styled.View`

`
export const SepareRow  = styled.View`
    flex-direction: row;
`
export const SepareColumn  = styled.View`
    flex-direction: column;
`

export const CircleIcon = styled.View`
    background-color: #c4c4c4;
    width: 40px;
    height: 40px;

    align-items: center;
    justify-content: center;
    border-radius: 40px;
    margin-left: 10px;
`