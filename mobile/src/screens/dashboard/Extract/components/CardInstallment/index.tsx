import React from 'react'

import {Parcela} from '../../../../../contexts/InstallmentContext'

import {View} from 'react-native'

import Icon from '../../../../../helpers/gerarIconePelaString'

import {
    ContainerItem,
    SectionIcon,
    SectionLancamento,
    SectionDescription,
    SectionValues,
    LabelName,
    LabelAccount,
    LabelValue,
    LabelIndex
} from './styles'

type PropsCardInstallment = {
    item: Parcela
}

const CardInstallment = ({item}: PropsCardInstallment) => {
    // let total = 0
    // item.parcelasLancamento.map(item => {
    //     total += item.valorParcela
    // })
    // console.log(item)
    return (
        <ContainerItem>
            <SectionLancamento>
                <SectionIcon style={{borderColor: 'yellow'   }}>
                    <Icon size={24} color={'gray'} stringIcon={item.lancamentoParcela.categoryLancamento.iconeCategoria}/>
                </SectionIcon>
                <SectionDescription>
                    <LabelName>{item.lancamentoParcela.descricaoLancamento}</LabelName>
                    <LabelAccount>{item.contaParcela.descricao}</LabelAccount>
                </SectionDescription>
            </SectionLancamento>

            
            <SectionValues>
                <LabelValue style={item.lancamentoParcela.tipoLancamento == 'despesa' ? {color: '#EE4266'} : {color: '#75BB6A'}}>{item.valorParcela}</LabelValue>                
                <LabelIndex>{item.indexOfLancamento} parcela de</LabelIndex>                
            </SectionValues>
        </ContainerItem>
    )
}

export default CardInstallment