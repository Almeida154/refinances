import React from 'react'

import {ReadParcela, Parcela} from '../../../../../contexts/InstallmentContext'

import {View, TouchableOpacity} from 'react-native'
import { useTheme } from 'styled-components/native'; 
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

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'
import { colors } from '../../../../../styles'

type PropsCardInstallment = {
    item: ReadParcela
}

const CardInstallment = ({item}: PropsCardInstallment) => {
    const {modalizeRefDetailEntry, setSelectedItemExtract} = UseDadosTemp()
    const textParcela = item.totalParcelas != 1 && item.totalParcelas ? item.indexOfLancamento + 'ª parcela de ' + item.totalParcelas : ''
    
    function openModalize(){
        setSelectedItemExtract(item)
        modalizeRefDetailEntry.current?.open()

    }
    const theme: any = useTheme()
    return (
        <ContainerItem onPress={openModalize}>
            <SectionLancamento>   
                <SectionIcon style={{borderColor: typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento ? 'yellow' : item.lancamentoParcela.categoryLancamento.corCategoria   }}>
                    <Icon size={24} color={theme.colors.davysGrey} stringIcon={typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento? '' : item.lancamentoParcela.categoryLancamento.iconeCategoria}/>
                </SectionIcon>
                <SectionDescription>             
                    <LabelName>{item.lancamentoParcela.descricaoLancamento}</LabelName>
                    <LabelAccount>{item.contaParcela == null ? "Conta não identificada" : item.contaParcela.descricao}</LabelAccount>
                </SectionDescription>
            </SectionLancamento>

            
            <SectionValues >
                <LabelValue style={item.lancamentoParcela.tipoLancamento == 'despesa' ? {color: theme.colors.paradisePink} : {color: theme.colors.budGreen}}>{(item.valorParcela).toFixed(2)}</LabelValue>                                                    
                <LabelIndex>{textParcela}</LabelIndex>                
            </SectionValues>
        </ContainerItem>
    )
}

export default CardInstallment