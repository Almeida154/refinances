import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'

import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import PropsNavigationApp from '../../../../../@types/RootStackParamApp'
import {HomeAccountStack} from '../../../../../@types/RootStackParamApp'

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
    LabelDescriptionCreate,
    SectionCreate

} from './styles'

const CreateCategory = () => {
    return(
        <ContainerCreate>
            <LabelDescriptionCreate>Criar categoria</LabelDescriptionCreate>

            <ContainerCardCreate>
                <SectionDescription>
                    <SectionIcon>
                        <Icon name="addfolder" size={20} color="gray"/>
                    </SectionIcon>
                    <SectionName>
                        <LabelCategory>Você pode criar categorias e definir limites para se organizar.</LabelCategory>
                    </SectionName>
                </SectionDescription>
                        
            </ContainerCardCreate>

        </ContainerCreate>

    )
}

const CreateGoal = () => {
    return(
        <ContainerCreate>
            <LabelDescriptionCreate>Criar meta</LabelDescriptionCreate>

            <ContainerCardCreate>
                <SectionDescription>
                    <SectionIcon>
                        <Ionicons name="medal-outline" size={25} color="gray"/>
                    </SectionIcon>
                    <SectionName>
                        <LabelCategory>Metas financeiras são importantes para o seu avanço pessoal.</LabelCategory>
                    </SectionName>
                </SectionDescription>
                        
            </ContainerCardCreate>

        </ContainerCreate>

    )
}

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

const CreateCategoryGoals = () => {

    const {navigation} = UseDadosTemp()

    return (
        <SectionCreate>
            <Container>
                <CreateCategory />
                
                <SectionButton>
                    <Plus>+</Plus>                    
                </SectionButton>
                
            </Container>

            <Container>
                <CreateGoal />
                
                <SectionButton onPress={() => {
                                    navigation.navigate('GoalsStack', {screen: 'CreateGoals'});
                                }}>
                    <Plus>+</Plus>                    
                </SectionButton>
                
            </Container>
        </SectionCreate>

    )
}

export default CreateCategoryGoals