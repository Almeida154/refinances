import styled from "styled-components/native"

import fonts from "../../../../../styles/fonts"

export const Title = styled.Text`
    fontFamily: ${`${fonts.familyType.semiBold}`};
    textAlign: center; 
    fontSize: ${`${fonts.size.medium}px`}
    color: #525252;
    margin-top: 10
    margin-bottom: 10
`

export const TextGoals = styled.Text`
    fontSize: ${`${fonts.size.medium}px`}
    color: #292929;
    fontFamily: ${`${fonts.familyType.bold}`};
`

export const Container = styled.View`
    padding: 10%;
    backgroundColor: #fff;
    height: 100%;
`