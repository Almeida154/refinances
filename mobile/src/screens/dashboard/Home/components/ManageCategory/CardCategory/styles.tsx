import styled from "styled-components/native"

import fonts from "../../../../../../styles/fonts"

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
`

export const Progress = styled.View`
`

export const SectionIcon = styled.View`
    width: 45px;
    height: 45px;
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