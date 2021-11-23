import styled from "styled-components/native"

import fonts from "../../../../../styles/fonts"

export const Title = styled.Text `
    marginBottom: 2%;
    marginTop: 15%;
    fontSize: ${`${fonts.size.super}px`};
    color: #525252;
    fontFamily: ${`${fonts.familyType.black}`};
    textAlign: center;
`

export const Subtitle = styled.Text`
    fontFamily: ${`${fonts.familyType.semiBold}`};
    fontSize: ${`${fonts.size.medium}px`};
    textAlign: center;
    color: #444;
    padding-bottom: 7%;
    margin-left: 3%;
    margin-right: 3%;
`

export const SubtitleT = styled.Text`
    fontFamily: ${`${fonts.familyType.bold}`};
    fontSize: ${`${fonts.size.medium}px`};
    textAlign: center;
    color: #444;
    padding-bottom: 7%;
    margin-left: 3%;
    margin-right: 3%;
`
