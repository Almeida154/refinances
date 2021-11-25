import styled from "styled-components/native"

import fonts from "../../../../../../styles/fonts"

import {widthPixel, heightPixel} from "../../../../../../helpers/responsiveness"

export const Category = styled.View`
    position: relative;
    paddingTop: 5px;
    paddingBottom: 5px;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
`

export const CategoryTouchable = styled.TouchableOpacity ``

export const SectionDescription = styled.View`
    display: flex;
    flex-direction: row;
`

export const SectionName = styled.View`
    margin-left: 5px;
    width: 80%;
    justify-content: center;
    margin-bottom: 5;
`
export const SectionText = styled.View`
    flex: 1;
    flex-direction: row;
    alignItems: flex-end;
    height: ${heightPixel(80)}
`

export const Progress = styled.View`
`

export const SectionIcon = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border-width: 4px;
    align-items: center;
    justify-content: center;
`

export const CategoryDesc = styled.Text`
    font-size: ${`${fonts.size.medium}px`};
    color: #525252;
    fontFamily: ${`${fonts.familyType.semiBold}`};
    opacity: 0.7;
    bottom: ${heightPixel(35)};
`

export const AddLimite = styled.Text`
    font-size: ${`${fonts.size.small}px`};
    color: #525252;
    fontFamily: ${`${fonts.familyType.semiBold}`};
    opacity: 0.7;
`

export const CategoryAddTetoGasto = styled.TouchableOpacity`
    opacity: 0.7;
    margin-left: auto;
`

export const Percent = styled.View`
    backgroundColor: #fff;
    position: absolute;
    right: -20;
    top: -20;
    width: 60;
    height: 60;
    borderRadius: 30px;
    elevation: 20;
    opacity: 0.8;
    justifyContent: center;
    alignItems: center;
`

export const PercentText = styled.Text`
    color: #525252 
    fontFamily: ${`${fonts.familyType.regular}`};
`