import styled from "styled-components/native"

import {fonts, colors} from "../../../../../styles"

export const Title = styled.Text`
    fontFamily: ${`${fonts.familyType.semiBold}`};
    textAlign: center; 
    fontSize: ${`${fonts.size.medium}px`}
    color: ${colors.davysGrey};
    margin-top: 10
    margin-bottom: 10
`

export const TextGoals = styled.Text`
    fontSize: ${`${fonts.size.medium}px`}
    color: ${colors.jet};
    fontFamily: ${`${fonts.familyType.bold}`};
`

export const Container = styled.View`
    padding: 10%;
    padding-top: 15%;
    backgroundColor: ${colors.white};
    height: 100%;
`