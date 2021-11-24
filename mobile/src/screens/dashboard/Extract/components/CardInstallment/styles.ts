import styled from 'styled-components/native'

import {colors, fonts, metrics} from '../../../../../styles'
import { heightPixel } from '../../../../../helpers/responsiveness';

export const ContainerItem = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
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

export const EditLabel = styled.Text`
    font-size: ${`${fonts.size.medium}px`};
    color: #525252;
    fontFamily: ${`${fonts.familyType.semiBold}`};
    opacity: 0.7;
    margin-bottom: ${`${heightPixel(26)}px`};
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
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: flex-end;
`
export const SectionCheck = styled.View`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${`${heightPixel(20)}px`};
`

export const LabelAccount = styled.Text`
    fontSize: ${`${fonts.size.small}px`};
    font-family: ${fonts.familyType.regular};
    color: #999
    
`
export const LabelValue = styled.Text`
    fontSize: ${`${fonts.size.medium}px`};
    font-family: ${fonts.familyType.bold};
`
export const LabelIndex = styled.Text`
    font-family: ${fonts.familyType.semiBold};
    fontSize: ${`${fonts.size.medium}px`};
    margin-right: ${`${heightPixel(50)}px`};
    color: #525252
    margin-bottom: ${`${heightPixel(17)}px`};
`