import styled from "styled-components/native"

import {fonts, colors} from "../../../../../styles"

export const Title = styled.Text `
    fontSize: ${fonts.size.big};
    color: ${colors.davysGrey};
    fontFamily: ${`${fonts.familyType.black}`};
    textAlign: center;
    margin-bottom: 20px
`;

export const Subtitle = styled.Text `
    fontSize: ${fonts.size.small};
    color: ${colors.davysGrey};
    fontFamily: ${`${fonts.familyType.bold}`};
    textAlign: center;
    opacity: 0.7;
    marginBottom: 20px;
`;

export const Goal = styled.View`
    position: relative;
    backgroundColor: ${colors.cultured};
    marginBottom: 10px;
    padding: 20px;
    borderRadius: 10px;
`

export const GoalTouchable = styled.TouchableOpacity ``

export const GoalDesc = styled.Text`
    font-size: ${`${fonts.size.medium}px`};
    color: ${colors.davysGrey};
    fontFamily: ${`${fonts.familyType.black}`};
`

export const DaysLeft = styled.Text`
    font-size: ${`${fonts.size.smaller}px`};
    color: ${colors.davysGrey};
    fontFamily: ${`${fonts.familyType.bold}`};
    opacity: 0.3;
`

export const InvestedMoney = styled.Text`
    font-size: ${`${fonts.size.smaller}px`};
    fontFamily: ${`${fonts.familyType.bold}`};
    color: ${colors.davysGrey};
`

export const Percent = styled.View`
    backgroundColor: ${colors.white};
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
    color: ${colors.davysGrey}; 
    fontFamily: ${`${fonts.familyType.regular}`};
`

export const Loading = styled.View`
    alignSelf: center;
    height: 100%;
    justifyContent: center
`;

export const TextLoading = styled.Text`
    color: ${colors.PrussianBlue};
    font-size: ${`${fonts.size.big}px`};
    fontFamily: ${`${fonts.familyType.regular}`};
    marginTop: 20
`;