import styled from 'styled-components/native'

import fonts from '../../../../../styles/fonts'

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
    background-color: #ccc;
    height: 60px;
    border-radius: 5px;
`

export const TextButton = styled.Text`
    font-weight: 600;
    color: #444;
    font-size: 20px;
`
export const Title = styled.Text`
    color: #292929;
    marginBottom: 2%;
    margin-top: 15%;
    color: #292929;
    fontFamily: ${`${fonts.familyType.black}`};
    font-size: ${`${fonts.size.big}px`};

`

export const Subtitle = styled.Text`
    marginBottom: 2%;
    color: #292929;
    fontFamily: ${`${fonts.familyType.regular}`};
    font-size: ${`${fonts.size.small}px`};
    marginBottom: 10%;
`