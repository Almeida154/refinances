import React, { useState, useRef, SetStateAction, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from '@react-native-picker/picker'
import {UseCategories} from '../../../../contexts/CategoriesContext'

import { StyleSheet, View } from 'react-native'
import { color } from 'react-native-reanimated';
import { colors } from '../../../../styles';

type PropsPickerCategorias = {
    tipoCategoria: string,
    categoria: string,
    setCategoria: React.Dispatch<React.SetStateAction<string>>
}

const PickerCategoria = ({categoria, setCategoria, tipoCategoria}: PropsPickerCategorias) => {    
    const {categorias, handleReadByUserCategorias, loading} = UseCategories()

    const pickerRef = useRef();
/*
    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
*/
    const onChangePicker = (selItem: SetStateAction<string>) => {
        setCategoria(selItem)        
    }

    useEffect(() => {
        try {
            async function loadCategorias() {
                const getItem = await AsyncStorage.getItem('user')
                const id = getItem == null ? 0 : JSON.parse(getItem).id
                console.log(id)
                handleReadByUserCategorias(id, tipoCategoria)
            }
            
            loadCategorias()
            // console.log('categorias que foram: ', categorias)
            
        } catch (error) {
            console.log('Erro ao carregar as categorias: ', error)
        }
    }, [])

    return (
        <View style={styles.containerPicker}>
            <Picker
                itemStyle={styles.pickerItem}
                style={styles.picker}
                // ref={pickerRef}
                selectedValue={categoria}
                onValueChange={onChangePicker}
            >
                {
                    loading ? <Picker.Item style={{ backgroundColor: 'orange' }} label="Carregando" value={'0'} />
                    :
                    categorias.map((item, index) => {                        
                        if(index == 0 && (!categoria || categoria == '0')) {                            
                            setCategoria(item.nomeCategoria)                            
                        }
                        return (
                            <Picker.Item key={index} style={{ backgroundColor: 'orange' }} label={item.nomeCategoria} value={item.nomeCategoria} />
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
        borderColor: colors.battleGray,
        opacity: 0.7
    },
    picker: {
        width: '100%',
        height: 50,
        color: colors.davysGrey,

    },
    pickerItem: {
        backgroundColor: 'white',
        color: 'black',
    }
})

export default PickerCategoria