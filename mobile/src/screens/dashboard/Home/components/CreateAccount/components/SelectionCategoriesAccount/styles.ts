import styled from 'styled-components/native'

import { fonts, colors } from '../../../../../../../styles'

export const Container = styled.View`
    width: 100%;
`

export const Header = styled.View`
    
`

export const Body = styled.View`

`
export const ListaCategorias = styled.FlatList`

`

export const ContainerItem = styled.View`
    display: flex;
    flex-direction: row;


    
    border-top-width: 1px;
    align-items: center;
    height: 40px;
`
export const NomeItem = styled.Text`
    margin-left: 10px;
`

export const Separator = styled.View`

`

export const BotaoAdicionarCategoria = styled.View`
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    background-color: #EE4266;
    Color: #fff;
    fontFamily: ${`${fonts.familyType.semiBold}`};
`

export const LabelAdicionarCategoria = styled.Text`

`

export const ButtonText = styled.TouchableOpacity`
    
    
`