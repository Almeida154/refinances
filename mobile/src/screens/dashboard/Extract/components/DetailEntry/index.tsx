import React from 'react'
import { ToastAndroid } from 'react-native'

import { ReadParcela, Parcela } from '../../../../../contexts/InstallmentContext'
import { UseLancamentos, Lancamento } from '../../../../../contexts/EntriesContext'
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext'
import { toDate } from '../../../../../helpers/manipularDatas'

import { StackActions } from '@react-navigation/native';
import {colors, fonts, metrics} from '../../../../../styles'
import Icon from '../../../../../helpers/gerarIconePelaString'

import {
    Container,
    LabelTitle,
    LabelQuantity,

    GroupLabel,
    Label,
    Value,
    SectionDescription,
    Row,
    SepareRow,
    SepareColumn,
    CircleIcon
} from './styles'

interface PropsDetail {
    item: ReadParcela | null;
}

const DetailEntry: React.FC<PropsDetail> = ({item}) => {
    const {navigation, showNiceToast} = UseDadosTemp()
    const {handleLoadOneLancamentos} = UseLancamentos()

    if(!item) {
        return <></>
    }

    if(typeof item.lancamentoParcela == 'number') {
        showNiceToast("error", "O lançamento não foi reconhecido")
        return <></>
    }
    if(typeof item.lancamentoParcela.categoryLancamento == 'string') {
        showNiceToast("A categoria do lançamento não foi reconhecida")
        return <></>
    }
    if(!item.contaParcela) {
        showNiceToast("A Conta não foi reconhecida")
        return <></>
    }

    async function navigateEdit() {        
        if(item) {
            const receiveEntry = await handleLoadOneLancamentos(item?.lancamentoParcela.id)
            
            if(typeof receiveEntry == 'string')
                return showNiceToast("error", "Ocorreu um erro ao carregar esse lançamento")                        

            if(receiveEntry.parcelaBaseada != -1) {
                const parcelaUpdate = {
                    id: item.id,
                    contaParcela: item.contaParcela,
                    dataParcela: new Date(item.dataParcela),
                    indexOfLancamento: 0,
                    statusParcela: item.statusParcela,
                    valorParcela: item.valorParcela,
                    lancamentoParcela: -1
                } as Parcela
    
                receiveEntry.parcelasLancamento = [parcelaUpdate]
                receiveEntry.totalParcelas = item.valorParcela
            }
            navigation.dispatch(StackActions.replace('Lancamentos', {screen: 'Main', params: {receiveEntry: typeof receiveEntry == 'string' ? undefined : receiveEntry}}))
        }
    }

    async function navigateDelete() {        
        if(item) {
            const response = await handleLoadOneLancamentos(item?.lancamentoParcela.id)
            
            navigation.dispatch(StackActions.replace('Lancamentos', {screen: 'Main', params: {receiveEntry: typeof response == 'string' ? undefined : response}}))
        }
    }

    console.log(item.lancamentoParcela)

    return (
        <Container>
            <SepareRow style={{justifyContent: 'space-between', marginBottom: 10}}>
                <SepareColumn>
                    <LabelTitle>{item.lancamentoParcela.descricaoLancamento}</LabelTitle>
                    <LabelQuantity>{item.valorParcela.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'})}</LabelQuantity>
                </SepareColumn>
                <SepareRow>
                    <CircleIcon onPress={navigateEdit}>
                        <Icon stringIcon="MaterialCommunityIcons:pencil" size={25} color={colors.black}/>
                        
                    </CircleIcon>
                    <CircleIcon onPress={navigateDelete}>
                        <Icon stringIcon="Ionicons:trash-bin-sharp" size={25} color={colors.black}/>
                    </CircleIcon>
                </SepareRow>
            </SepareRow> 
            <SectionDescription>
                <Row>
                    <GroupLabel>
                        <Label>Data</Label>
                        <Value>{new Date(item.dataParcela).toLocaleDateString()}</Value>
                    </GroupLabel>

                    <GroupLabel>
                        <Label>Categoria</Label>
                        <Value>{item.lancamentoParcela.categoryLancamento.nomeCategoria}</Value>
                    </GroupLabel>

                    <GroupLabel>
                        <Label>Sitaução</Label>
                        <Value>{item.statusParcela ? item.lancamentoParcela.tipoLancamento == 'despesa' ? "Pago" : "Recebido" : item.lancamentoParcela.tipoLancamento == 'despesa' ? "Não pago" : "Não recebido"}</Value>
                    </GroupLabel>
                </Row>
                <Row>
                    <GroupLabel>
                        <Label>Conta</Label>
                        <Value>{item.contaParcela.descricao}</Value>
                    </GroupLabel>

                    <GroupLabel>
                        <Label>{item.lancamentoParcela.parcelaBaseada == -1 ? "Total" : "Incidência"}</Label>
                        <Value>{item.lancamentoParcela.parcelaBaseada == -1 ? item.lancamentoParcela.valueLancamento.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'}) : item.valorParcela}</Value>
                    </GroupLabel>

                    
                </Row>
            </SectionDescription>
        </Container>
    )
}

export default DetailEntry