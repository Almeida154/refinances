import styled from 'styled-components/native'

export const ContainerItem = styled.View`
    display: flex;

    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 20px;
`
export const SectionIcon = styled.View`
    width: 40px;
    height: 40px;
    border-width: 4px;
    border-radius: 100px;

    justify-content: center;
    align-items: center;
`

export const SectionDescription = styled.View`
    
`

export const SectionLancamento = styled.View`
    display: flex;

    flex-direction: row;
    
`

export const LabelName = styled.Text`
    font-size: 17px;
    font-weight: 500;
`

export const SectionValues = styled.Text`
    display: flex;
    flex-direction: column;

`

export const LabelAccount = styled.Text`
    font-size: 13px;
    font-weight: 300;
    
`
export const LabelValue = styled.Text`
    font-size: 36px;
    font-weight: bold;
`
export const LabelIndex = styled.Text`
    color: #D2D2D2
`