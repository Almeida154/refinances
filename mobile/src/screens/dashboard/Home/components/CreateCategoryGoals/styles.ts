import styled from 'styled-components/native'
import fonts from '../../../../../styles/fonts'


export const Container = styled.View`
    display: flex;
    align-items: center;
    background-color: white;
    width: 90%;
    height: 120px;
    border-radius: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

`
export const SectionButton = styled.TouchableOpacity`
    background: #EE4266;
    height: 100%;
    width: 15%;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    justifyContent: center;
    alignItems: center;
    flex: 1;
    padding: 0
`

export const Plus = styled.Text`
    font-size: 50px;
    color: #9D3147;
    
`
export const LabelDescriptionCreate = styled.Text`
    font-size: ${`${fonts.size.medium}`};
    fontFamily: ${`${fonts.familyType.black}`};
    color: #555;
    
`

export const ContainerCardCreate = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    padding: 1%
`
export const SectionDescription = styled.View`
    display: flex;
    width: 85%;
    flex-direction: row;
`
export const ContainerCreate = styled.View`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 85%;
    padding: 5%
`

export const SectionName = styled.View`
    margin-left: 10px;
`

export const LabelCategory = styled.Text`
    opacity: 0.5
    font-size: 14px;
    fontFamily: ${`${fonts.familyType.regular}`};
`
export const SectionCreate = styled.View`
    width: 100%;
    display: flex;
    align-items: center;;
`
export const LabelCreate = styled.Text`
    font-size: 18px;
`
export const SectionIcon = styled.View`
    width: 45px;
    height: 45px;
    border-radius: 50px;
    border-width: 4px;
    border-color: #444;
    align-items: center;
    justify-content: center;
`
