import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {UseLancamentos} from '../../contexts/LancamentosContext'

const Extrato = () => {
    const {lancamentos, handleLoadLancamentos} = UseLancamentos()

    console.log('lancamentos, +', lancamentos)

    useEffect(() => {
        async function loadLancamentos() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id

            handleLoadLancamentos(idUser)
        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text>Testando</Text>
                {
                    lancamentos.map(item => {      
                        let total = 0
                        if(!item.parcelas) return
                        console.log('passow aqui')                  
                        item.parcelas.map(item => {
                            total += item.valorParcela
                        })

                        return (
                            <View style={{backgroundColor: 'red'}}>
                                <Text>{item.descricaoLancamento}</Text>
                                <Text>fdsfsdf</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
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