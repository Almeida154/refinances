import styled from 'styled-components/native'

import {colors, fonts, metrics} from '../../../../../styles/'

export const Container = styled.View`
    padding: 0 10% 10% 10%;

`
export const LabelTitle = styled.Text`
    font-size: ${fonts.size.big};
    font-family: ${fonts.familyType.bold};
    color: ${(props: any) => props.theme.colors.black};
`
export const LabelQuantity = styled.Text`
    font-size: ${fonts.size.small};
    font-family: ${fonts.familyType.regular};
    color: ${(props: any) => props.theme.colors.battleGray};
`

export const GroupLabel = styled.View`
    width: 30%;
    margin-top: 15px;
`
export const Label = styled.Text`
    font-family: ${fonts.familyType.semiBold};
    font-size: ${fonts.size.medium};
    color: ${(props: any) => props.theme.colors.black};
`

export const Value = styled.Text`
    font-family: ${fonts.familyType.light};
    font-size: ${fonts.size.small};
    color: ${colors.battleGray};
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

export const CircleIcon = styled.TouchableOpacity`
    background-color: ${colors.silver};
    width: 40px;
    height: 40px;

    align-items: center;
    justify-content: center;
    border-radius: 40px;
    margin-left: 10px;
`