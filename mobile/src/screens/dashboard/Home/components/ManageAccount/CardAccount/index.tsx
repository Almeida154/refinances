import React from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'

import IconCategory from '../../../../../../components/IconCategory'

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

const CardAccount = () => {
    return (
        <Container>
            <Upside>
                <SectionLeft>
                    <IconCategory stringIcon="Entypo:wallet" color="gray"/>
                    <SectionDescription>
                        <LabelDescriptionAccount>Carteira</LabelDescriptionAccount>
                        <LabelCategoryAccount>Conta Corrente</LabelCategoryAccount>
                    </SectionDescription>
                </SectionLeft>
                <Icon name="arrow-forward-ios" color="gray" size={23}/>
            </Upside>
            <Bottom>
                <LabelBalance>R$ 129,00</LabelBalance>
            </Bottom>
        </Container>
    )
}

export default CardAccount