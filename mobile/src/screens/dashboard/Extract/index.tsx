import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons'

import {Transferencia, UseTransferencias} from '../../../contexts/TransferContext'
import {Parcela, UseParcelas} from '../../../contexts/InstallmentContext'

import { ScrollView } from 'react-native-gesture-handler';

import {converterNumeroParaData} from '../../../helpers/converterDataParaManuscrito'
import {addMonths, toDate} from '../../../helpers/manipularDatas'

import SectionByDate from './components/SectionByDate'

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
    ScrollBody
} from './styles'

const Extrato = () => {
    const {parcelas, loadingParcela, handleInstallmentGroupByDate} = UseParcelas()
    const {transferencias, loadingTransferencia, handleTransferGroupByDate} = UseTransferencias()        
    const [dateCurrent, setDateCurrent] = useState(new Date(Date.now()).toLocaleDateString())
    
    const [allDatas, setAllDatas] = useState<any>([])

    const [gasto, setGasto] = useState('00,00')
    const [ganho, setGanho] = useState('00,00')
    const [saldo, setSaldo] = useState('00,00')

    let carregandoParcelas = false, carregandoTransferencias = false

    function calcBalance(alldata: any[]) {
        let gastos = 0, ganhos = 0, balance = 0

        alldata.map((item, index) => {
            item[0].map((parcela: Parcela) => {
                if(parcela.lancamentoParcela.tipoLancamento == 'despesa') {
                    gastos += parcela.valorParcela
                } else if(parcela.lancamentoParcela.tipoLancamento == 'receita') {
                    ganhos += parcela.valorParcela
                }
            })
        })

        setGasto(gastos.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))
        setGanho(ganhos.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))
        setSaldo((ganhos - gastos).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))
    }

    function loadInAllDatas() {
        var i=0, j=0
        console.log("Foi aqui no load")                

        console.log(parcelas)
       if(parcelas[i] && !parcelas[i][0]){
            loadParcelas()
            return
        }

        if(transferencias[i] && !transferencias[i][0]){
            loadTransferencias()
            return
        }

        let aux = []
        
            while(i < parcelas.length) {
                // console.log(i)

                // console.log(transferencias[j])

                const dateOfInstallment = new Date(parcelas[i][0].dataParcela).toLocaleDateString()
                let dateOfTransfer

                if(transferencias[j])
                    dateOfTransfer = new Date(transferencias[j][0].dataTransferencia).toLocaleDateString()                


                    // console.log(toDate(dateOfInstallment), toDate(dateOfTransfer))

                    if(!dateOfTransfer || toDate(dateOfInstallment) < toDate(dateOfTransfer)) {
                        aux.push([parcelas[i], []])
                        i++
                    }
                    else if(toDate(dateOfInstallment) > toDate(dateOfTransfer)) {
                        aux.push([[], transferencias[j]])
                        j++
                    }
                    else {
                        aux.push([parcelas[i], transferencias[j]])
                        j++;
                        i++
                    }
                
                }

            
            while(j < transferencias.length) {
                aux.push([[], transferencias[j]])
                j++
            }

            //  console.log(j, transferencias.length)
            //  console.log(aux)

            setAllDatas(aux)
            calcBalance(aux)

            console.log("Mudou o alldatas")
    }

    function updateDate(action: number) {
        const newDate = addMonths(toDate(dateCurrent), action)
        setDateCurrent(newDate.toLocaleDateString())
        console.log(newDate.toLocaleDateString())
    }

    async function loadTransferencias() {
           carregandoTransferencias = true
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
                        
            handleTransferGroupByDate(idUser, toDate(dateCurrent).toISOString())
        }

        async function loadParcelas() {
            console.log("Veio aqui")
            carregandoTransferencias = false
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
                        
            handleInstallmentGroupByDate(idUser, toDate(dateCurrent).toISOString())
        }

    useEffect(() => {            
        loadParcelas()
        loadTransferencias()
        
    }, [])
    
   
    useEffect(() => {
        carregandoTransferencias = false

        if(!carregandoParcelas)
            loadInAllDatas()
        
    }, [transferencias])

    useEffect(() => {
        carregandoParcelas = false

        if(!carregandoTransferencias)
            loadInAllDatas()
    }, [parcelas])        
    

    useEffect(() => {
        loadParcelas()
        loadTransferencias()
    }, [dateCurrent])

    function GetMonth(date: string) {
        const [dia, mes, ano] = dateCurrent.split('/')
        return mes
    }

    return (
        <Container >
                <ScrollBody>
                    <Header>
                        <PeriodoAnterior onPress={() => updateDate(-1)}>
                            <Icon size={24} name={"arrow-back-ios"}/>
                        </PeriodoAnterior>
                        
                        <PeriodoAtual>
                            <LabelPeriodo>{converterNumeroParaData(GetMonth(dateCurrent))}</LabelPeriodo>
                        </PeriodoAtual>

                        <PeriodoPosterior onPress={() => updateDate(1)}>
                            <Icon size={24} name={"arrow-forward-ios"}/>
                        </PeriodoPosterior>
                    </Header>
                    <Body>      

                    {
                        allDatas.length != 0 && allDatas.map(((item, index) => {
                            const date: Date = !item[0][0] ? new Date(item[1][0].dataTransferencia) : new Date(item[0][0].dataParcela)

                            // console.log(date.toLocaleDateString())
                            // console.log('parcelas', item[0])
                            // console.log('transferencias', item[1])

                        return(
                            <SectionByDate date={date.toLocaleDateString()} parcelas={item[0]} transferencias={item[1]}/>
                        )
                        }))
                    }

                    </Body>
                </ScrollBody>
                <Footer>
                    <CardBalance>
                        <LabelBalance >Ganhos</LabelBalance>
                        <LabelValueBalance style={{color: '#6CB760'}}>{ganho}</LabelValueBalance>
                    </CardBalance>

                    <CardBalance>
                        <LabelBalance >Gastos</LabelBalance>
                        <LabelValueBalance style={{color: '#EE4266'}}>{gasto}</LabelValueBalance>
                    </CardBalance>

                    <CardBalance>
                        <LabelBalance >Saldo Atual</LabelBalance>
                        <LabelValueBalance style={{color: '#999'}}>{saldo}</LabelValueBalance>
                    </CardBalance>
                </Footer>
            </Container>
    );
};

const styles = StyleSheet.create({       
    title: {
        fontSize: 20,
        color: '#fff',
    },
});
export default Extrato;