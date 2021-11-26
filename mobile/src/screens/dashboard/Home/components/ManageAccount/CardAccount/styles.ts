import styled from 'styled-components/native'
import { fonts, colors } from '../../../../../../styles'

export const Container = styled.View`
    width: 100%;
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
`

export const Upside = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`
export const SectionLeft = styled.View`
    display: flex;
    flex-direction: row;
`
export const SectionDescription = styled.View`
    display: flex;

    margin-left: 10px;
`
export const LabelDescriptionAccount = styled.Text`
    fontFamily: ${`${fonts.familyType.bold}`};
    fontSize: ${`${fonts.size.medium}px`};
    color: ${colors.jet}
`
export const LabelCategoryAccount = styled.Text`
    fontFamily: ${`${fonts.familyType.regular}`};
`
export const Arrow = styled.View`

`
export const Bottom = styled.View`

`
export const LabelBalance = styled.Text`
    margin-top: 5px;
    fontFamily: ${`${fonts.familyType.semiBold}`};
    fontSize: ${`${fonts.size.medium}px`};
    color: ${colors.darkGray};
`