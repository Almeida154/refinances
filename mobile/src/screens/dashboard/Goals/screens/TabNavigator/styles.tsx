import styled from "styled-components/native"

import fonts from "../../../../../styles/fonts"

export const Title = styled.Text `
    fontSize: ${fonts.size.small};
    color: #525252;
    fontFamily: ${`${fonts.familyType.bold}`};
    textAlign: center;
    opacity: 0.7;
    marginBottom: 40px;
`;

export const Goal = styled.View`
    position: relative;
    backgroundColor: #fafafa;
    marginBottom: 30px;
    padding: 20px;
    borderRadius: 10px;
`

export const GoalDesc = styled.Text`
    font-size: ${`${fonts.size.medium}px`};
    color: #525252;
    fontFamily: ${`${fonts.familyType.black}`};
`

export const DaysLeft = styled.Text`
    font-size: ${`${fonts.size.smaller}px`};
    color: #525252;
    fontFamily: ${`${fonts.familyType.bold}`};
    opacity: 0.3;
`

export const InvestedMoney = styled.Text`
    font-size: ${`${fonts.size.smaller}px`};
    fontFamily: ${`${fonts.familyType.bold}`};
    color: #525252;
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

export const Loading = styled.View`
    alignSelf: center;
    height: 100%;
    justifyContent: center
`;

export const TextLoading = styled.Text`
    color: #183153;
    font-size: ${`${fonts.size.big}px`};
    fontFamily: ${`${fonts.familyType.regular}`};
    marginTop: 20
`;