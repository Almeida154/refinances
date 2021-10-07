import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'

import Icon from 'react-native-vector-icons/AntDesign'



import {
    Container,
    LabelDescriptionBalance,
    LabelBalance,
    Separator,
    LabelDescriptionAccount,
    ButtonManager,
    LabelManager,
    SectionBalance,
    ContainerAccount,

    ContainerCardAccount,
    SectionDescription,
    SectionName,
    LabelName,
    LabelCategory,
    SectionBalanceAccount,
    LabelBalanceAccount,
    SectionIcon
} from './styles'



const CardAccount = () => {
    return(
        <ContainerCardAccount>
            <SectionDescription>
                <SectionIcon>
                    <Icon name="home" size={25} color="gray"/>
                </SectionIcon>
                <SectionName>
                    <LabelName>Carteira</LabelName>
                    <LabelCategory>Conta Corrente</LabelCategory>
                </SectionName>
            </SectionDescription>
            <SectionBalanceAccount>
                <LabelBalanceAccount>997,00</LabelBalanceAccount>                    
            </SectionBalanceAccount>            
        </ContainerCardAccount>
    )
}

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

const SectionAccount = () => {
    const {navigation} = UseDadosTemp()


    return (
        <Container>
            <SectionBalance>
                <LabelDescriptionBalance>Saldo total</LabelDescriptionBalance>
                <LabelBalance>R$ 00,00</LabelBalance>
            </SectionBalance>

            <Separator />

            <ContainerAccount>
                <LabelDescriptionAccount>Minhas contas</LabelDescriptionAccount>

                <CardAccount />

                <ButtonManager onPress={() => navigation.navigate('StackAccount', {screen: 'ManageAccount'})}><LabelManager>Gerenciar</LabelManager></ButtonManager>
            </ContainerAccount>
        </Container>
    )
}

export default SectionAccount