import React from 'react'

import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon from '../../../../../../helpers/gerarIconePelaString'

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
import { Image } from 'react-native'

type PropsCardAccount = {
    item: Conta
}

const CardAccount = ({item}: PropsCardAccount) => {
    if(typeof item.categoryConta == 'string') {
        return <Container />
    }
    return (
        <Container>
            <Upside>
                <SectionLeft>
                {
                    item.categoryConta.iconeCategoryConta.indexOf("https://") != -1 ?
                    <Image source={{uri: item.categoryConta.iconeCategoryConta, width: 25, height: 25}}/> :
                    <Icon size={25} color='gray' stringIcon={typeof item.categoryConta != 'string' && item.categoryConta.iconeCategoryConta != "" ?  item.categoryConta.iconeCategoryConta : 'Ionicons:wallet'}/>
                }
                    <SectionDescription>
                        <LabelDescriptionAccount>{item.descricao}</LabelDescriptionAccount>
                        <LabelCategoryAccount>{typeof item.categoryConta == 'string' ? item.categoryConta: item.categoryConta.descricaoCategoryConta}</LabelCategoryAccount>
                    </SectionDescription>
                </SectionLeft>
                <Icon2 name="arrow-forward-ios" color="gray" size={23}/>
            </Upside>
            <Bottom>
                <LabelBalance>{item.saldoConta.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</LabelBalance>
            </Bottom>
        </Container>
    )
}

export default CardAccount