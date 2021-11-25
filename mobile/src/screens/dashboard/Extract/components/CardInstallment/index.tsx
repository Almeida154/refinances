import React from 'react'

import {ReadParcela, Parcela} from '../../../../../contexts/InstallmentContext'
import {UseContas} from '../../../../../contexts/AccountContext'

import {View, TouchableOpacity} from 'react-native'
import api from '../../../../../services/api'

import Icon from '../../../../../helpers/gerarIconePelaString'
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

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
    const {modalizeRefDetailEntry, setSelectedItemExtract, showNiceToast} = UseDadosTemp()
    const textParcela = item.totalParcelas != 1 && item.totalParcelas ? ' ' + item.indexOfLancamento + '/' + item.totalParcelas : ''
    const [checked, setChecked] = React.useState(item.statusParcela);    
    const [valor, setValor] = React.useState(((item.valorParcela).toFixed(2)).replace('.',','));
    const {handleReadByUserContas} = UseContas()
    
    function openModalize(){
        setSelectedItemExtract(item)
        modalizeRefDetailEntry.current?.open()

    }

    async function mudarOStatusRapidao() {
        const response = await api.put(`/installment/changestatus/${item.id}`)

        if(response.data.error) {
            showNiceToast("error", response.data.error)
        }

        await handleReadByUserContas(await retornarIdDoUsuario())
    }

    return (
        <ContainerItem onPress={openModalize}>
            <SectionLancamento>   
                <SectionIcon style={{borderColor: typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento ? 'yellow' : item.lancamentoParcela.categoryLancamento.corCategoria   }}>
                    <Icon size={24} color={'gray'} stringIcon={typeof item.lancamentoParcela.categoryLancamento == 'string' || !item.lancamentoParcela.categoryLancamento? '' : item.lancamentoParcela.categoryLancamento.iconeCategoria}/>
                </SectionIcon>
                <SectionDescription>             
                    <LabelName>{item.lancamentoParcela.descricaoLancamento + (item.lancamentoParcela.parcelaBaseada == -1 ? textParcela : '')}</LabelName>
                    <LabelAccount>{item.contaParcela == null ? "Conta não identificada" : item.contaParcela.descricao}</LabelAccount>
                </SectionDescription>
            </SectionLancamento>

            <SectionValues>
                <LabelValue style={item.lancamentoParcela.tipoLancamento == 'despesa' ? {color: '#EE4266'} : {color: '#75BB6A'}}>{valor}</LabelValue>                                                    
                
                <SectionCheck>
                    
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked)
                            mudarOStatusRapidao()
<<<<<<< HEAD
                        }}                        
=======
                        }}
>>>>>>> 4c60691214008d86b2e67e91ed629689ced28544
                        color={item.lancamentoParcela.tipoLancamento == 'despesa' ? colors.paradisePink : colors.slimyGreen}
                    />
                    <EditLabel>{item.lancamentoParcela.tipoLancamento == 'despesa' ? 'pago' : 'recebido'}</EditLabel>

                    <EditLabel></EditLabel>  
                </SectionCheck>

            </SectionValues>
        </ContainerItem>
        
    )
}

export default CardInstallment