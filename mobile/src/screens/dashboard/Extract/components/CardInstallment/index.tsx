import React from 'react'

import {ReadParcela, Parcela} from '../../../../../contexts/InstallmentContext'

import {View, TouchableOpacity} from 'react-native'

import Icon from '../../../../../helpers/gerarIconePelaString'

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
    LabelIndex,
    EditLabel,
} from './styles'
import {Checkbox} from 'react-native-paper';
import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

type PropsCardInstallment = {
    item: ReadParcela
}

const CardInstallment = ({item}: PropsCardInstallment) => {
    const {modalizeRefDetailEntry, setSelectedItemExtract} = UseDadosTemp()
    const textParcela = item.totalParcelas != 1 && item.totalParcelas ? item.indexOfLancamento + 'ª parcela de ' + item.totalParcelas : ''
    const [checked, setChecked] = React.useState(false);
    
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
                    <LabelName>{item.lancamentoParcela.descricaoLancamento}</LabelName>
                    <LabelAccount>{item.contaParcela == null ? "Conta não identificada" : item.contaParcela.descricao}</LabelAccount>
                </SectionDescription>
            </SectionLancamento>

            
            <SectionValues>
                <LabelValue style={item.lancamentoParcela.tipoLancamento == 'despesa' ? {color: '#EE4266'} : {color: '#75BB6A'}}>{(item.valorParcela).toFixed(2)}</LabelValue>                                                    
                <SectionCheck>     
                    <Checkbox 
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {setChecked(!checked);}}
                        color={'#EE4266'}
                
                    />
                    <EditLabel>Pago?</EditLabel>  
                </SectionCheck>
                <LabelIndex>{textParcela}</LabelIndex> 
            </SectionValues>
        </ContainerItem>
    )
}

export default CardInstallment