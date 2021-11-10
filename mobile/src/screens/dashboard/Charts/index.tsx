import React, {useEffect, useRef, useState} from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons'

import {Transferencia, UseTransferencias} from '../../../contexts/TransferContext'
import {ReadParcela, UseParcelas} from '../../../contexts/InstallmentContext'

import {Modalize as Modal} from 'react-native-modalize'

import {ConvertToParcela, ConvertToTransferencia} from './typecast'

import {converterNumeroParaData} from '../../../helpers/converterDataParaManuscrito'
import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario'
import generateDates from '../../../helpers/generateDates'

import DetailEntry from './components/DetailEntry'

import Modalize from '../../../components/Modalize'

import {addMonths, toDate} from '../../../helpers/manipularDatas'

import SectionByDate from './components/SectionByDate'

import {UseDadosTemp} from '../../../contexts/TemporaryDataContext'

import {
    Header,
    PeriodoAnterior,
    PeriodoAtual,
    PeriodoPosterior,
    LabelPeriodo,
    Body,
    Container,
    Footer,
    CardBalance,
    LabelBalance,
    LabelValueBalance,
    ScrollBody,
    ButtonAccessDetail   
    
} from './styles'
import { colors } from '../../../styles';

interface PropsRenderSection {
    item: (ReadParcela[] | Transferencia[])[];
}
const RenderSection: React.FC<PropsRenderSection> = ({item}) => {
    let readByParcelas: ReadParcela[] = ConvertToParcela(item[0])
    let readByTransferencias: Transferencia[] = ConvertToTransferencia(item[1])                    

    const date: Date = !readByParcelas[0] ? new Date(readByTransferencias[0].dataTransferencia) : new Date(readByParcelas[0].dataParcela)

    return(
        <SectionByDate date={date.toLocaleDateString()} parcelas={readByParcelas} transferencias={readByTransferencias}/>
    )
}

const Graficos = () => {
    const {readParcelas, handleInstallmentGroupByDate} = UseParcelas()
    const {readTransferencias, handleTransferGroupByDate} = UseTransferencias()                        
    const {modalizeRefDetailEntry, selectedItemExtract} = UseDadosTemp()

    const yearCurrent = String(new Date(Date.now()).getFullYear())

    const [dateCurrent, setDateCurrent] = useState(new Date(Date.now()).toLocaleDateString())

    useEffect(() => {  
        const getDate = toDate(dateCurrent)          
        
    }, [])   
   
    useEffect(() => {        
             
    }, [])
      
    
    function updateDate(action: number) {
        const newDate = addMonths(toDate(dateCurrent), action)
        setDateCurrent(newDate.toLocaleDateString())
    }
    
    return (
        <Container >
            <Header>                        
                <PeriodoAnterior onPress={() => updateDate(-1)}>
                    <Icon size={24} name={"arrow-back-ios"} color="#444"/>
                </PeriodoAnterior>
                        
                <PeriodoAtual>
                    <LabelPeriodo>{converterNumeroParaData(dateCurrent, !(yearCurrent == dateCurrent.split('/')[2]))}</LabelPeriodo>
                </PeriodoAtual>

                <PeriodoPosterior onPress={() => updateDate(1)}>
                    <Icon size={24} name={"arrow-forward-ios"} color="#444"/>
                </PeriodoPosterior>
            </Header>


        </Container>
    );
};

const styles = StyleSheet.create({       
    title: {
        fontSize: 20,
        color: '#fff',
    },
});
export default Graficos;