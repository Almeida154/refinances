import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Transferencia, UseTransferencias} from '../../../contexts/TransferContext'
import {Lancamento, UseLancamentos} from '../../../contexts/EntriesContext'

import { ScrollView } from 'react-native-gesture-handler';

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
    const {lancamentos, loading, handleLoadLancamentos} = UseLancamentos()
    const {transferencias, loadingTransferencia, handleLoadTransferencias} = UseTransferencias()

    //Lancamento e transferencia
    const [todosDados, setTodosDados] = useState([] as (Lancamento | Transferencia)[])

    useEffect(() => {
        async function loadTransferencias() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
                        
            handleLoadTransferencias(idUser)
        }

        async function loadLancamentos() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
                        
            handleLoadLancamentos(idUser)
        }
        
        loadLancamentos()
        loadTransferencias()
        
    }, [])

    //Esses useEffect para caso ocorra alguma alteração nos dados, recarregar todos no TodosDados
    useEffect(() => {
        console.log('Transferencias: ', transferencias)
        if(!loading && !loadingTransferencia)
            setTodosDados([...lancamentos, ...transferencias])
    }, [loadingTransferencia])
    
    useEffect(() => {
        if(!loading && !loadingTransferencia)
            setTodosDados([...lancamentos, ...transferencias])

            
    }, [loading])        
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
                        loading || loadingTransferencia || todosDados.length == 0  ? <Text>Carregando</Text> : 
                        todosDados.map((item, index) => {                              
                            console.log(`item ${index}: `, item)                                          
                            try {                                
                                if(item.descricaoLancamento)    {
                                    const readLancamento = item as Lancamento                                
    
                                    if(readLancamento.id == undefined) return
                                    
                                    let total = 0
                                    readLancamento.parcelasLancamento.map(item => {
                                        total += item.valorParcela
                                    })
                                    
                                    console.log(readLancamento)
                                    return (
                                        <CardItem key={index}>
                                            <Section>
                                                <LabelDescricao>{readLancamento.descricaoLancamento}</LabelDescricao>
                                                <LabelCategoria>{(typeof readLancamento.categoryLancamento).toString() == 'string' ? readLancamento.categoryLancamento : readLancamento.categoryLancamento.nomeCategoria}</LabelCategoria></Section>
                                            <Section>
                                                <LabelLancamento>{readLancamento.tipoLancamento}</LabelLancamento>
                                                <LabelTotal>{total}</LabelTotal>
                                            </Section>
                                        </CardItem>
                                    )
                                } else if(item.contaOrigem) {
                                    const readTransferencia = item as Transferencia
                                    
                                    return (
                                        <CardItem key={index}>
                                            <Section>
                                                <LabelDescricao>{readTransferencia.descricaoTransferencia}</LabelDescricao>
                                                <LabelCategoria>{readTransferencia.valorTransferencia}</LabelCategoria></Section>
                                            <Section>
                                                <LabelLancamento>{readTransferencia.contaOrigem.descricao}</LabelLancamento>
                                                <LabelTotal>{readTransferencia.contaDestino.descricao}</LabelTotal>
                                            </Section>
                                        </CardItem>
                                    )
                                }                                                    
                            } catch (error) {
                                
                            }
                            

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