import styled from 'styled-components/native'

export const Container = styled.View`
    display: flex;
    align-items: center;
    background-color: white;
    width: 90%;
    border-radius: 15px;
    margin-bottom: 20px;
`
export const SectionBalance = styled.View`
    border-left-width: 6px;
    border-color: #EE4266;
    border-radius: 5px;

    width: 85%;
    margin-top: 15px;
    padding-left: 14px;
`
export const LabelDescriptionBalance = styled.Text`
    font-weight: 300;
    font-size: 18px;
`
export const LabelBalance = styled.Text`
    font-size: 25px;
    font-weight: bold;
`
export const Separator = styled.View`
    height: 2px;
    background-color: #ddd;
    margin-top: 18px;
    width: 85%;
`
export const LabelDescriptionAccount = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #555;
    
`
export const ButtonManager = styled.TouchableHighlight`
    margin-top: 15px;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #F5F2F3;
    height: 60px;
    border-radius: 5px;
`
export const LabelManager = styled.Text`
    font-weight: 600;
    color: #444;
    font-size: 20px;
`

export const ContainerCardAccount = styled.View`
    display: flex;

    justify-content: space-between;
    flex-direction: row;

    align-items: center;
    margin-top: 15px;
`
export const SectionDescription = styled.View`
    display: flex;

    flex-direction: row;
`
export const ContainerAccount = styled.View`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 85%;
`

export const SectionName = styled.View`
    margin-left: 10px;
`
export const LabelName = styled.Text`
    font-size: 20px;
`
export const LabelCategory = styled.Text`
    color: #888;
    font-size: 15px;
`
export const SectionBalanceAccount = styled.View`

`
export const LabelBalanceAccount = styled.Text`
    font-size: 18px;
`
export const SectionIcon = styled.View`
    width: 45px;
    height: 45px;
    border-radius: 50px;
    border-width: 4px;
    border-color: #6bb760;
    align-items: center;
    justify-content: center;
`
