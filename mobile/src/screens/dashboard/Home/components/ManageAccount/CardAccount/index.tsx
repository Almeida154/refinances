import React from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'

import IconCategory from '../../../../../../components/IconCategory'
import {Conta} from '../../../../../../contexts/AccountContext'

import {
    Container,
    Upside,
    SectionLeft,
    SectionDescription,
    LabelDescriptionAccount,
    LabelCategoryAccount,
    Arrow,
    Bottom,
    LabelBalance
} from './styles'

type PropsCardAccount = {
    item: Conta
}

const CardAccount = ({item}: PropsCardAccount) => {
    return (
        <Container>
            <Upside>
                <SectionLeft>
                    <IconCategory stringIcon={typeof item.categoryConta == 'string' ? "Entypo:wallet" : item.categoryConta.iconeCategoryConta} color="gray"/>
                    <SectionDescription>
                        <LabelDescriptionAccount>{item.descricao}</LabelDescriptionAccount>
                        <LabelCategoryAccount>{typeof item.categoryConta == 'string' ? item.categoryConta: item.categoryConta.descricaoCategoryConta}</LabelCategoryAccount>
                    </SectionDescription>
                </SectionLeft>
                <Icon name="arrow-forward-ios" color="gray" size={23}/>
            </Upside>
            <Bottom>
                <LabelBalance>{item.saldoConta.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</LabelBalance>
            </Bottom>
        </Container>
    )
}

export default CardAccount