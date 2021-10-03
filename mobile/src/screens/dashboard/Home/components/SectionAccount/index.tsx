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
                    <Icon name="home" size={30} color="gray"/>
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

const SectionAccount = () => {
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

                <ButtonManager><LabelManager>Gerenciar</LabelManager></ButtonManager>
            </ContainerAccount>
        </Container>
    )
}

export default SectionAccount