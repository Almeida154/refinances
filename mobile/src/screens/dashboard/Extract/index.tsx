import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';

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

const RenderSection = ({item}: {item: (Parcela[] | Transferencia[])[]}) => {
    let readByParcelas: Parcela[] = ConvertToParcela(item[0])
    let readByTransferencias: Transferencia[] = ConvertToTransferencia(item[1])        
    
    // console.debug("readByParcelas",readByParcelas)
    // console.debug("readByTransferencias",readByTransferencias)

    const date: Date = !readByParcelas[0] ? new Date(readByTransferencias[0].dataTransferencia) : new Date(readByParcelas[0].dataParcela)

    return(
        <SectionByDate date={date.toLocaleDateString()} parcelas={readByParcelas} transferencias={readByTransferencias}/>
    )
}

const Extrato = () => {
    const {readParcelas, handleInstallmentGroupByDate} = UseParcelas()
    const {readTransferencias, handleTransferGroupByDate} = UseTransferencias()        

    const [dateCurrent, setDateCurrent] = useState(new Date(Date.now()).toLocaleDateString())
    
    const [allDatas, setAllDatas] = useState<(Parcela[] | Transferencia[])[][] | null>(null)

    const [gasto, setGasto] = useState('00,00')
    const [ganho, setGanho] = useState('00,00')
    const [saldo, setSaldo] = useState('00,00')

    function calcBalance(alldata: (Parcela[] | Transferencia[])[][]) {
        let gastos = 0, ganhos = 0, balance = 0

        alldata.map((item, index) => {
            const parcelas: Parcela[] = ConvertToParcela(item[0])

            parcelas.map((parcela) => {
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
            const dateOfInstallment = new Date(readParcelas[i][0].dataParcela).toLocaleDateString()
            let dateOfTransfer

            if(readTransferencias[j])
                dateOfTransfer = new Date(readTransferencias[j][0].dataTransferencia).toLocaleDateString()                

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

            setAllDatas(aux)
            calcBalance(aux)
    }

    function updateDate(action: number) {
        const newDate = addMonths(toDate(dateCurrent), action)
        setDateCurrent(newDate.toLocaleDateString())

        loadParcelas(newDate)
        loadTransferencias(newDate)
    }

    async function loadTransferencias(date: Date) {                        
        handleTransferGroupByDate(await retornarIdDoUsuario(), date.toISOString())
    }

    async function loadParcelas(date: Date) {   
        handleInstallmentGroupByDate(await retornarIdDoUsuario(), date.toISOString())
    }

    useEffect(() => {  
        const getDate = toDate(dateCurrent)          
        loadParcelas(getDate)
        loadTransferencias(getDate)
        
    }, [])
    
   
    useEffect(() => {
            loadInAllDatas()        
    }, [readTransferencias, readParcelas])
      

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
                        <FlatList 
                            data={allDatas}
                            renderItem={RenderSection}
                            keyExtractor={(item, index) => String(index)}
                            extraData={allDatas}
                        />                        
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