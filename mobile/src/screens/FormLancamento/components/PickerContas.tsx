import React, { useState, useRef, SetStateAction, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from '@react-native-picker/picker'

import { StyleSheet, View } from 'react-native'

import {UseContas} from '../../../contexts/ContasContext'

type PropsPickerContas = {
    conta: number,
    setConta: React.Dispatch<React.SetStateAction<number>>
}
const PickerContas = () => {
    const [selectedItem, setSelectedItem] = useState(0)
    const {contas, handleReadByUserContas, loading} = UseContas()

    const pickerRef = useRef();
/*
    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
*/
    const onChangePicker = (selItem: SetStateAction<number>) => {
        setSelectedItem(selItem)
    }

    useEffect(() => {
        try {
            async function loadContas() {
                const getItem = await AsyncStorage.getItem('user')
                const id = getItem == null ? 0 : JSON.parse(getItem).id
                console.log(id)
                handleReadByUserContas(id)
            }
            
            loadContas()
            console.log(contas)
            
        } catch (error) {
            console.log('Erro ao carregar as contas: ', error)
        }
    }, [])

    return (
        <View style={styles.containerPicker}>
            <Picker
                itemStyle={styles.pickerItem}
                style={styles.picker}
                // ref={pickerRef}
                selectedValue={selectedItem}
                onValueChange={onChangePicker}
            >
                 {
                    loading ? <Picker.Item style={{ backgroundColor: 'orange' }} label="Carregando" value={0} />
                    :
                    contas.map((item, index) => {
                        return (
                            <Picker.Item style={{ backgroundColor: 'orange' }} label={item.descricao} value={item.id} />
                        )
                    })
                }

            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    containerPicker: {
        width: '100%',
        height: 50,
        borderBottomWidth: 2,
        borderColor: '#858c87',
        opacity: 0.7
    },
    picker: {
        width: '100%',
        height: 50,
        color: '#555',

    },
    pickerItem: {
        backgroundColor: 'white',
        color: 'black',
    }
})

export default PickerContas