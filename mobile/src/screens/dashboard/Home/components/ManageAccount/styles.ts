import styled from 'styled-components/native'

import {fonts, colors} from '../../../../../styles'

export const Container = styled.View`
    display: flex;
    padding-top: 30px;
    align-items: center;
    flex: 1;
    padding: 10%;
`

export const ButtonAdd = styled.TouchableHighlight`
    margin-top: 15px;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${colors.blackSilver};
    height: 60px;
    border-radius: 5px;
`

export const TextButton = styled.Text`
    font-weight: 600;
    color: ${colors.darkGray};
    font-size: 20px;
`
export const Title = styled.Text`
    marginBottom: 2%;
    margin-top: 15%;
    color: ${colors.jet};
    fontFamily: ${`${fonts.familyType.black}`};
    font-size: ${`${fonts.size.big}px`};

`

export const Subtitle = styled.Text`
    marginBottom: 2%;
    color: ${colors.jet};
    fontFamily: ${`${fonts.familyType.regular}`};
    font-size: ${`${fonts.size.small}px`};
    marginBottom: 10%;
`