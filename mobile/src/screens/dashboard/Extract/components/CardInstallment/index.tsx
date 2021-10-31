import React from 'react'

import {ReadParcela} from '../../../../../contexts/InstallmentContext'

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
    item: ReadParcela
}

const CardInstallment = ({item}: PropsCardInstallment) => {
        
    const textParcela = item.totalParcelas != 1 && item.totalParcelas ? item.indexOfLancamento + 'ª parcela de ' + item.totalParcelas : ''
    
    return (
        <ContainerItem>
            <SectionLancamento>   
                <SectionIcon style={{borderColor: typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento ? 'yellow' : item.lancamentoParcela.categoryLancamento.corCategoria   }}>
                    <Icon size={24} color={'gray'} stringIcon={typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento? '' : item.lancamentoParcela.categoryLancamento.iconeCategoria}/>
                </SectionIcon>
                <SectionDescription>             
                    <LabelName>{item.lancamentoParcela.descricaoLancamento}</LabelName>
                    <LabelAccount>{item.contaParcela == null ? "Conta não identificada" : item.contaParcela.descricao}</LabelAccount>
                </SectionDescription>
            </SectionLancamento>

            
            <SectionValues >
                <LabelValue style={item.lancamentoParcela.tipoLancamento == 'despesa' ? {color: '#EE4266'} : {color: '#75BB6A'}}>{(item.valorParcela).toFixed(2)}</LabelValue>                                                    
                <LabelIndex>{textParcela}</LabelIndex>                
            </SectionValues>
        </ContainerItem>
    )
}

export default CardInstallment