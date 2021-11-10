import styled from 'styled-components/native'

import {colors, fonts, metrics} from '../../../../../styles'

export const ContainerItem = styled.TouchableOpacity`
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
    margin-right: 10px;
`

export const SectionDescription = styled.View`
    
`

export const SectionLancamento = styled.View`
    display: flex;
    flex-direction: row;
`

export const LabelName = styled.Text`
    fontSize: ${`${fonts.size.medium}px`};   
    font-family: ${fonts.familyType.semiBold};
    color: #444;
`

export const SectionValues = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const LabelAccount = styled.Text`
    fontSize: ${`${fonts.size.smaller}px`};
    font-family: ${fonts.familyType.regular};
    color: #999
    
`
export const LabelValue = styled.Text`
    fontSize: ${`${fonts.size.medium}px`};
    font-family: ${fonts.familyType.bold};
`
export const LabelIndex = styled.Text`
    font-family: ${fonts.familyType.regular};
`