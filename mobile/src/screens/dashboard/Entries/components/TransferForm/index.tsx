import React, { useState } from 'react';
import { Alert, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native'

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
import { FAB } from 'react-native-paper';
import { Conta } from '@contexts/AccountContext';

const FormTransferencia= ({route, valor, setValor, navigation}: PropsNavigation) => {
    const [selectedContaOrigem, setSelectedContaOrigem] = useState<Conta | null>(null)
    const [selectedContaDestino, setSelectedContaDestino] = useState<Conta | null>(null)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [descricao, setDescricao] =  useState('')
    const [dataPagamento, setDataPagamento] =  useState(new Date(Date.now()))        

    const {handleAdicionarTransferencia, handleLoadTransferencias} = UseTransferencias()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const handleConfirm = (date: Date) => {       
        setDataPagamento(date)
        hideDatePicker();
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
                        onClear={() => {}}
                        showClearIcon={false}
                        label="Descrição"
                        colorLabel="#333333"
                        value={descricao}
                        onChangeText={setDescricao}                
                        placeholderTextColor={"#bbb"}
                        placeholder="Descrição de sua transferência"></InputText>
                </InputControl>

                <InputControl>                    
                    <PickerContas conta={selectedContaOrigem} changeAccount={setSelectedContaOrigem} tipoLancamento='despesa' label="Conta Origem"/>
                </InputControl>

                <InputControl>                    
                    <PickerContas conta={selectedContaDestino} changeAccount={setSelectedContaDestino} tipoLancamento='receita' label="Conta Destino"/>
                </InputControl>

                <InputControl style={{marginBottom: 50}}>
                <TouchableOpacity onPress={showDatePicker}>
                <InputText 
                    label="Data da transferência"
                    onClear={() => {}}
                    showClearIcon={false}
                    value={dataPagamento.toLocaleDateString()}
                    placeholder="Data da transferência"
                    colorLabel='#333333'
                    editable={false}
                />  
            </TouchableOpacity>  

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"                
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={dataPagamento}
                />
                </InputControl>   

                <FAB 
                    icon="check"
                    style={{
                        backgroundColor: '#333'
                    }}
                    onPress={handleSubmit}
                />
            </ContainerForm>
        </ScrollView>
    )
}

export default FormTransferencia