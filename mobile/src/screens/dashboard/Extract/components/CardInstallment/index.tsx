import React from 'react'

import {ReadParcela, Parcela} from '../../../../../contexts/InstallmentContext'

import {View, TouchableOpacity} from 'react-native'

import Icon from '../../../../../helpers/gerarIconePelaString'

import {colors, fonts, metrics} from '../../../../../styles'

import {
    ContainerItem,
    SectionIcon,
    SectionLancamento,
    SectionDescription,
    SectionValues,
    SectionCheck,
    LabelName,
    LabelAccount,
    LabelValue,
    EditLabel,
} from './styles'
import {Checkbox} from 'react-native-paper';
import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

type PropsCardInstallment = {
    item: ReadParcela
}

const CardInstallment = ({item}: PropsCardInstallment) => {
    const {modalizeRefDetailEntry, setSelectedItemExtract} = UseDadosTemp()
    const textParcela = item.totalParcelas != 1 && item.totalParcelas ? ' ' + item.indexOfLancamento + '/' + item.totalParcelas : ''
    const [checked, setChecked] = React.useState(false);
    const [valor, setValor] = React.useState(((item.valorParcela).toFixed(2)).replace('.',','));
    
    function openModalize(){
        setSelectedItemExtract(item)
        modalizeRefDetailEntry.current?.open()

    }
    return (
        <ContainerItem onPress={openModalize}>
            <SectionLancamento>   
                <SectionIcon style={{borderColor: typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento ? 'yellow' : item.lancamentoParcela.categoryLancamento.corCategoria   }}>
                    <Icon size={24} color={'gray'} stringIcon={typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento? '' : item.lancamentoParcela.categoryLancamento.iconeCategoria}/>
                </SectionIcon>
                <SectionDescription>             
                    <LabelName>{item.lancamentoParcela.descricaoLancamento + textParcela}</LabelName>
                    <LabelAccount>{item.contaParcela == null ? "Conta não identificada" : item.contaParcela.descricao}</LabelAccount>
                </SectionDescription>
            </SectionLancamento>

            <SectionValues>
                <LabelValue style={item.lancamentoParcela.tipoLancamento == 'despesa' ? {color: '#EE4266'} : {color: '#75BB6A'}}>{valor}</LabelValue>                                                    
                
                <SectionCheck>
                    <Checkbox 
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {setChecked(!checked)}}
                        style={{height: 2}}
                        color={item.lancamentoParcela.tipoLancamento == 'despesa' ? colors.paradisePink : colors.slimyGreen}
                    />
                    <EditLabel>{item.lancamentoParcela.tipoLancamento == 'despesa' ? 'pago' : 'recebido'}</EditLabel>  
                </SectionCheck>

            </SectionValues>
        </ContainerItem>
        
    )
}

export default CardInstallment