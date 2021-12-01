import styled from 'styled-components/native'
import { widthPixel, heightPixel } from '../../../../../helpers/responsiveness'

import {colors, fonts, metrics} from '../../../../../styles'

export const ContainerCardParcela = styled.SafeAreaView`
    width: ${widthPixel(500)}px;
    height: ${heightPixel(800)}px;
    border-radius: ${heightPixel(50)}px;
    padding: 7%;    
    border-width: 1px;
    margin-right: 20px;
    justify-content: center;
    align-self: center;
`
export const TituloCardParcela = styled.Text`
    font-size: ${fonts.size.big}px;
    font-family: ${fonts.familyType.bold};
<<<<<<< HEAD
    color: ${colors.jet};
    textAlign: center;
=======
    color: ${(props : any) => props.theme.colors.jet};
>>>>>>> 5e2505b146d27647fd0fb4e7093834f30fb3bd91
`
export const LabelCardParcela = styled.Text`
    font-family: ${fonts.familyType.semiBold};
`

export const InputCardParcela = styled.TextInput`
<<<<<<< HEAD
    font-size: ${fonts.size.medium}px;
    font-family: ${fonts.familyType.semiBold};
    color: ${colors.jet};
=======
    font-size: 17px;
    color: ${(props : any) => props.theme.colors.jet};
>>>>>>> 5e2505b146d27647fd0fb4e7093834f30fb3bd91
`

export const InputControlStatus = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const LabelStatus = styled.Text`
    font-size: ${fonts.size.medium}px;
    font-family: ${fonts.familyType.bold};
`