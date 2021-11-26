import styled from 'styled-components/native'
import {fonts, colors} from '../../../../../styles'

export const Container = styled.View`
    display: flex;
    align-items: center;
    background-color: ${colors.white};
    width: 90%;
    border-radius: 15px;
    margin-top: 15px;
`
export const SectionTop = styled.View`
    border-left-width: 6px;
    border-color: ${colors.paradisePink};
    border-radius: 5px;
    width: 85%;
    margin-top: 15px;
    padding-left: 14px;
`
export const LabelDescription = styled.Text`
    opacity: 0.5;
    font-size: 18px;
    fontFamily: ${`${fonts.familyType.semiBold}`};
`

export const Separator = styled.View`
    height: 2px;
    background-color: ${colors.cultured};
    margin-top: 18px;
    width: 85%;
`
export const LabelDescriptionGoals = styled.Text`
    font-size: 20px;
    color: ${colors.davysGray};
    fontFamily: ${`${fonts.familyType.black}`};
    margin-bottom: 10px
`

export const ContainerCard = styled.View`
    display: flex;

    justify-content: space-between;
    flex-direction: row;

    align-items: center;
    margin-top: 15px;
    width: 100%;
`

export const Goal = styled.View`
    position: relative;
    background-color: ${colors.snow};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
`

export const GoalDesc = styled.Text`
    font-size: 22px;
    color: ${colors.davysGrey};
    font-weight: bold;
`

export const GoalDaysLeft = styled.Text`
    font-size: 14px;
    color: ${colors.davysGrey};
    font-weight: bold;
    opacity: 0.3;
`
export const VwPercent = styled.View`
    backgroundColor: ${colors.white};
    position: absolute;
    right: -20;
    top: -20;
    width: 60;
    height: 60;
    borderRadius: 30;
    elevation: 20;
    opacity: 0.8;
    justifyContent: center;
    alignItems: center;
`

export const GoalPercent = styled.Text`
    color: ${colors.davysGrey}

`

export const SectionDescription = styled.View`
    display: flex;

    flex-direction: row;
`
export const ContainerGoals = styled.View`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 85%;
`