import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Lancamento, UseLancamentos} from '../../contexts/LancamentosContext'

import { ScrollView } from 'react-native-gesture-handler';

import {
    CardItem,
    LabelDescricao,
    LabelCategoria,
    LabelLancamento,
    LabelTotal,
    Section
} from './styles'

const Extrato = () => {
    const {lancamentos, loading, handleLoadLancamentos} = UseLancamentos()

    
    useEffect(() => {
        async function loadLancamentos() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
                        
            handleLoadLancamentos(idUser)
        }
        
        loadLancamentos()
        
    }, [])

    
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.contentContainer}>                    
                    {
                        loading ? <Text>Carregando</Text> : 
                        lancamentos.map((item, index) => {      
                            let total = 0
                            
                            if(item.id == undefined) return
                            console.log(`item ${index}: `, item)                                          
                            
                            item.parcelasLancamento.map(item => {
                                total += item.valorParcela
                            })
                            

                            return (
                                <CardItem key={index}>
                                    <Section>
                                        <LabelDescricao>{item.descricaoLancamento}</LabelDescricao>
                                        <LabelCategoria>{(typeof item.categoryLancamento).toString() == 'string' ? item.categoryLancamento : item.categoryLancamento.nomeCategoria}</LabelCategoria></Section>
                                    <Section>
                                        <LabelLancamento>{item.tipoLancamento}</LabelLancamento>
                                        <LabelTotal>{total}</LabelTotal>
                                    </Section>
                                </CardItem>
                            )
                        })
                    }
                </View>
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