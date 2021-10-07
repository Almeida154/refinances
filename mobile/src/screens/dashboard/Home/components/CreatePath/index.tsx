import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'

import Icon from 'react-native-vector-icons/AntDesign'

import {
    Container,

    ContainerCardCreate,
    SectionDescription,
    SectionName,
    LabelName,
    LabelCategory,
    SectionButton,
    Plus,
    SectionIcon,
    ContainerCreate,
    LabelDescriptionCreate

} from './styles'



const CardAccount = () => {
    return(
        <ContainerCardCreate>
            <SectionDescription>
                <SectionIcon>
                    <Icon name="home" size={25} color="gray"/>
                </SectionIcon>
                <SectionName>
                    <LabelCategory>Você pode criar categorias para se organizar melhor.</LabelCategory>
                </SectionName>
            </SectionDescription>
                        
        </ContainerCardCreate>

        
    )
}

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

const SectionAccount = () => {
    const {navigation} = UseDadosTemp()

    return (
        <Container>

            <ContainerCreate>
                <LabelDescriptionCreate>Criar categoria</LabelDescriptionCreate>

                <CardAccount />

            </ContainerCreate>

            <SectionButton>
                <Plus>+</Plus>                    
            </SectionButton>
        </Container>
    )
}

export default SectionAccount