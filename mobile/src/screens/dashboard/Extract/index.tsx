import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons'

import {Transferencia, UseTransferencias} from '../../../contexts/TransferContext'
import {Parcela, UseParcelas} from '../../../contexts/InstallmentContext'

import {ConvertToParcela, ConvertToTransferencia} from './typecast'

import {converterNumeroParaData} from '../../../helpers/converterDataParaManuscrito'
import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario'

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
    const {readParcelas, loadingParcela, handleInstallmentGroupByDate} = UseParcelas()
    const {readTransferencias, loadingTransferencia, handleTransferGroupByDate} = UseTransferencias()        

    const [dateCurrent, setDateCurrent] = useState(new Date(Date.now()).toLocaleDateString())
    
    const [allDatas, setAllDatas] = useState<(Parcela | Transferencia)[][][] | null>(null)

    const [gasto, setGasto] = useState('00,00')
    const [ganho, setGanho] = useState('00,00')
    const [saldo, setSaldo] = useState('00,00')

    function calcBalance(alldata: any[]) {
        let gastos = 0, ganhos = 0, balance = 0

        alldata.map((item, index) => {
            item[0].map((parcela: Parcela) => {
                if(typeof parcela.lancamentoParcela != 'number' ? parcela.lancamentoParcela.tipoLancamento == 'despesa' : false) {
                    gastos += parcela.valorParcela
                }
                else if(typeof parcela.lancamentoParcela != 'number' ? parcela.lancamentoParcela.tipoLancamento == 'receita' : false) {
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

       if(!readTransferencias || !readParcelas){            
            return
        }       

        let aux = []
        
            while(i < readParcelas.length) {
                // console.log(i)

                // console.log(transferencias[j])

                const dateOfInstallment = new Date(readParcelas[i][0].dateParcela).toLocaleDateString()
                let dateOfTransfer

                if(readTransferencias[j])
                    dateOfTransfer = new Date(readTransferencias[j][0].dataTransferencia).toLocaleDateString()                


                    // console.log(toDate(dateOfInstallment), toDate(dateOfTransfer))

                    if(!dateOfTransfer || toDate(dateOfInstallment) < toDate(dateOfTransfer)) {
                        aux.push([readParcelas[i], []])
                        i++
                    }
                    else if(toDate(dateOfInstallment) > toDate(dateOfTransfer)) {
                        aux.push([[], readTransferencias[j]])
                        j++
                    }
                    else {
                        aux.push([readParcelas[i], readTransferencias[j]])
                        j++;
                        i++
                    }
                
                }

            
            while(j < readTransferencias.length) {
                aux.push([[], readTransferencias[j]])
                j++
            }

            //  console.log(j, transferencias.length)
            //  console.log(aux)

            setAllDatas(aux)
            calcBalance(aux)
    }

    function updateDate(action: number) {
        const newDate = addMonths(toDate(dateCurrent), action)
        setDateCurrent(newDate.toLocaleDateString())
    }

    async function loadTransferencias() {                        
        handleTransferGroupByDate(await retornarIdDoUsuario(), toDate(dateCurrent).toISOString())
    }

    async function loadParcelas() {                                    
        handleInstallmentGroupByDate(await retornarIdDoUsuario(), toDate(dateCurrent).toISOString())
    }

    useEffect(() => {            
        loadParcelas()
        loadTransferencias()
        
    }, [])
    
   
    useEffect(() => {
            loadInAllDatas()        
    }, [readTransferencias, readParcelas])
    

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
                        allDatas && allDatas.map(((item, index) => {
                            
                            console.debug("allDatas", allDatas)
                            let readByParcelas: Parcela[] = []
                            let readByTransferencias: Transferencia[] = []
                            
                            ConvertToParcela(item[0], readByParcelas)
                            ConvertToTransferencia(item[1], readByTransferencias)
                            
                            console.debug("readByParcelas",readByParcelas)
                            console.debug("readByTransferencias",readByTransferencias)

                            const date: Date = !readByParcelas[0] ? new Date(readByTransferencias[0].dataTransferencia) : new Date(readByParcelas[0].dateParcela)

                        return(
                            <SectionByDate date={date.toLocaleDateString()} parcelas={readByParcelas} transferencias={readByTransferencias}/>
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