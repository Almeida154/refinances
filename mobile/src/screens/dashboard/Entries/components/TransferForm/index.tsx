import React, { useState } from 'react';
import { Alert, ScrollView, TouchableHighlight } from 'react-native'

import {
    ContainerForm,
    InputControl,
    Label,
    TextInputValor,
    TextInput,
    SectionDetalhes,
    TextDetalhes,
    ButtonDetalhes,
    SectionCardsParcelas
} from './styles'

import { UseTransferencias, Transferencia } from '../../../../../contexts/TransferContext'

import InputText from '../../../../../components/InputText'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { PropsNavigation } from '../..'
import { Text, ToastAndroid } from 'react-native'
import PickerContas from '../PickerContas'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FormTransferencia= ({route, valor, setValor, navigation}: PropsNavigation) => {
    const [selectedContaOrigem, setSelectedContaOrigem] = useState(0)
    const [selectedContaDestino, setSelectedContaDestino] = useState(0)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [descricao, setDescricao] =  useState('')
    const [dataPagamento, setDataPagamento] =  useState(new Date(Date.now()))        

    const {handleAdicionarTransferencia, handleLoadTransferencias} = UseTransferencias()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const handleConfirm = (date: Date) => {       
        hideDatePicker();
        setDataPagamento(date)
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleSubmit = async () => {        
        const newTransferencia: Transferencia = {
            id: -1,
            contaOrigem: selectedContaOrigem,
            contaDestino: selectedContaDestino,
            dataTransferencia: dataPagamento,
            descricaoTransferencia: descricao,
            valorTransferencia: parseFloat(valor)
        }        

        const getUser = await AsyncStorage.getItem('user')
        const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id

        const message = await handleAdicionarTransferencia(newTransferencia)
        
        if(message == '') {
            await handleLoadTransferencias(idUser)
            navigation.navigate('Extrato')            
        }
        else {
            ToastAndroid.show(message, ToastAndroid.SHORT)            
        }
    }

    return (
        <ScrollView style={{width: '100%'}}>
            <ContainerForm>               
                <InputControl>
                    <InputText
                        label="Descrição"
                        colorLabel="#333333"
                        value={descricao}
                        onChangeText={setDescricao}                
                        placeholderTextColor={"#bbb"}
                        placeholder="Descrição de sua transferência"></InputText>
                </InputControl>

                <InputControl>
                    <Label>De: </Label>           
                    <PickerContas conta={selectedContaOrigem} setConta={setSelectedContaOrigem}/>
                </InputControl>

                <InputControl>
                    <Label>Para: </Label>           
                    <PickerContas conta={selectedContaDestino} setConta={setSelectedContaDestino}/>
                </InputControl>

                <InputControl style={{marginBottom: 50}}>
                    <Label>Data de Transferencia</Label>
                    <Text onPress={showDatePicker} >{dataPagamento.toLocaleDateString()}</Text>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        // date={toDate(dataPagamento)}
                    />
                </InputControl>   

                <TouchableHighlight onPress={handleSubmit} style={{marginBottom: 100}}><Text>Botao Provisorio</Text></TouchableHighlight>
            </ContainerForm>
        </ScrollView>
    )
}

export default FormTransferencia