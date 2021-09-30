import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Transferencia, UseTransferencias} from '../../../contexts/TransferContext'
import {Parcela, UseParcelas} from '../../../contexts/InstallmentContext'

import { ScrollView } from 'react-native-gesture-handler';

import SectionByDate from './components/SectionByDate'

import {
    Header,
    PeriodoAnterior,
    PeriodoAtual,
    PeriodoPosterior,
    LabelPeriodo,
    Body,
    CardItem,
    LabelDescricao,
    LabelCategoria,
    LabelLancamento,
    LabelTotal,
    Section
} from './styles'

const Extrato = () => {
    const {parcelas, loadingParcela, handleInstallmentGroupByDate} = UseParcelas()
    const {transferencias, loadingTransferencia, handleTransferGroupByDate} = UseTransferencias()        
    
    let indexOfTransfer = 0

    useEffect(() => {
        async function loadTransferencias() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
                        
            handleTransferGroupByDate(idUser)
        }

        async function loadParcelas() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
                        
            handleInstallmentGroupByDate(idUser)
        }
        
        loadParcelas()
        loadTransferencias()
        
    }, [])

    // useEffect(() => {
    //     console.log(!parcelas ? "Nao foi" : parcelas)
    //     console.log(!transferencias ? "Nao foi" : transferencias)
    // }, [parcelas, transferencias])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Header>
                    <PeriodoAnterior>
                        <LabelPeriodo>Agosto</LabelPeriodo>
                    </PeriodoAnterior>
                    
                    <PeriodoAtual>
                        <LabelPeriodo>Setembro</LabelPeriodo>
                    </PeriodoAtual>

                    <PeriodoPosterior>
                        <LabelPeriodo>Outubro</LabelPeriodo>
                    </PeriodoPosterior>
                </Header>
                <Body style={styles.contentContainer}>      
                            
                {
                    !loadingParcela && parcelas.map((item: any, index) => {
                        if(index == 0)
                            indexOfTransfer = 0

                        if(!item[0]) return

                        const dateOfInstallment  = new Date(item[0].dataParcela)

                        let aux: any  = []

                        for(var i = indexOfTransfer;i < transferencias.length;i++) {
                            if(transferencias[i][0] && dateOfInstallment > new Date(transferencias[i][0].dataTransferencia)) {
                                indexOfTransfer = i
                                break
                            }

                            aux = transferencias[i]
                        }

                       return(
                           <SectionByDate date={dateOfInstallment.toLocaleDateString()} parcelas={item} transferencias={aux}/>
                       )
                    })
                }

                </Body>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    contentContainer: {
        marginTop: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
});
export default Extrato;