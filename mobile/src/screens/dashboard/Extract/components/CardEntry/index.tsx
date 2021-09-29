import React from 'react'

import {Lancamento} from '../../../../../contexts/EntriesContext'

import {
    ContainerItem,
    SectionIcon,
    SectionDescription,
    SectionValues,
    LabelName,
    LabelCategory,
    LabelValue,
    LabelSituation
} from './styles'

type CardEntry = {
    item: Lancamento
}

const CardEntry = ({item}: CardEntry) => {
    let total = 0
    item.parcelasLancamento.map(item => {
        total += item.valorParcela
    })
    return (
        <ContainerItem>
            <SectionIcon>

            </SectionIcon>

            <SectionDescription>
                <LabelName>{item.descricaoLancamento}</LabelName>
                <LabelCategory>{item.categoryLancamento} </LabelCategory>
            </SectionDescription>

            
            <SectionValues>
                <LabelValue>{total}</LabelValue>                
                <LabelSituation>{item.tipoLancamento == 'despesa' ? 'pago' : 'recebido'}</LabelSituation>                
            </SectionValues>
        </ContainerItem>
    )
}

export default CardEntry