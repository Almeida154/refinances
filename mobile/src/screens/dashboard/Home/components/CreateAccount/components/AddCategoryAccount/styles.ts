import styled from 'styled-components/native'

import {colors, metrics, fonts} from '../../../../../../../styles'
import hexToRGB from '../../../../../../../helpers/hexToRgba';

export const Container = styled.View`
    display: flex;
    background-color: ${(props : any) => props.theme.colors.culture};
    
`

export const Form = styled.View`
    padding: 10%;
    width: 100%;
    height: 100%;
`
export const InputControl = styled.View`    
    background-color: ${(props : any) => props.theme.colors.white};
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 10px;
`
export const LabelForm = styled.Text`
    color: ${(props : any) => props.theme.colors.paradisePink};
    font-weight: bold;
    font-size: 18px;
`
export const TextInputAdd = styled.TextInput`
    color: ${(props : any) => props.theme.colors.black};
`

export const ButtonAdd = styled.TouchableHighlight`
    background-color: ${(props : any) => props.theme.colors.blackSilver};
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
`

export const TextButton = styled.Text`
    color: ${(props : any) => props.theme.colors.black};
    font-size: 18px;
`

export const ButtonPress = styled.TouchableHighlight`

`

export const Circle = styled.View`
    width: 60px;
    height: 60px;
    margin: 10px;

    border-radius: 50px;
`

export const BodyModalize = styled.View`
    display: flex;
    width: 100%;
    justify-content: center;

    flex-direction: column;
    padding: 50px;

`

export const RowColor = styled.View`
    display: flex;

    flex-direction: row;
`


export const ColorsContainer = styled.ScrollView`
  flex: 1;
  padding: ${`${metrics.default.boundaries}px`};
`;

interface ColorProps {
  bg?: string;
  mr?: boolean;
}

export const Color = styled.TouchableOpacity<ColorProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 5px;
  border-color: ${props => hexToRGB(props.bg, 1)};
  background-color: ${props => hexToRGB(props.bg, 0.7)};
  margin-right: ${props => (props.mr ? '10px' : 0)};
`;

interface IconProps {
  mr?: boolean;
}

export const Icon = styled.TouchableOpacity<IconProps>`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 5px;
  border-color: ${(props : any) => props.theme.colors.platinum};
  background-color: ${(props : any) => props.theme.colors.diffWhite};
  margin-right: ${props => (props.mr ? '10px' : 0)};
`;
