import styled from 'styled-components/native'
import {fonts, colors} from '../../../../../styles'

export const Container = styled.View`
    display: flex;
    align-items: center;
    background-color: ${colors.white};
    width: 90%;
    border-radius: 15px;
    margin-bottom: 20px;
`
export const SectionBalance = styled.View`
    border-left-width: 6px;
    border-color: ${colors.paradisePink};
    border-radius: 5px;
    width: 85%;
    margin-top: 15px;
    padding-left: 14px;
`
export const LabelDescriptionBalance = styled.Text`
    font-weight: 300;
    font-size: 18px;
    fontFamily: ${`${fonts.familyType.regular}`};
    opacity: 0.5
`
export const LabelBalance = styled.Text`
    font-size: ${`${fonts.size.bigger}`};
    fontFamily: ${`${fonts.familyType.bold}`};
`
export const Separator = styled.View`
    height: 2px;
    background-color: ${colors.gainsboro};
    margin-top: 18px;
    width: 85%;
`
export const LabelDescriptionAccount = styled.Text`
    font-size: 20px;
    fontFamily: ${`${fonts.familyType.black}`};
    color: ${colors.darkGray};
`
export const LabelManager = styled.Text`
    font-weight: 600;
    color: ${colors.darkGray};
    font-size: 20px;
`

export const ContainerCardAccount = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 15px;
`
export const SectionDescription = styled.View`
    display: flex;
    flex-direction: row;
`
export const ContainerAccount = styled.View`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 85%;
`

export const SectionName = styled.View`
    margin-left: 10px;
`
export const LabelName = styled.Text`
    fontSize: ${`${fonts.size.medium}px`};
    fontFamily: ${`${fonts.familyType.bold}`};
    color: ${colors.darkGray}
`
export const LabelCategory = styled.Text`
    fontSize: ${`${fonts.size.small}px`};
    fontFamily: ${`${fonts.familyType.semiBold}`};
    color: ${colors.battleGray}
`
export const SectionBalanceAccount = styled.View`

`
export const LabelBalanceAccount = styled.Text`
    fontSize: ${`${fonts.size.medium}px`};
    fontFamily: ${`${fonts.familyType.bold}`};
    color: ${colors.darkGray};
    opacity: 0.7;
`
export const SectionIcon = styled.View`
    width: 45px;
    height: 45px;
    border-radius: 50px;
    border-width: 4px;    
    align-items: center;
    justify-content: center;
`
