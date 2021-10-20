import { Conta } from '@contexts/AccountContext';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import {toDate} from '../../../../../helpers/manipularDatas'

import PickerContas from '../PickerContas'

import {Checkbox} from 'react-native-paper'

import {
    ContainerCardParcela,
    InputCardParcela,
    LabelCardParcela,
    TituloCardParcela,
    InputControlStatus,
    LabelStatus
} from './styles'


export type CardParcela = {
    id: number;
    conta: Conta | null;
    data: string;
    valor: number;
    status: boolean
}

export type CardParcelaProps = {
    item: CardParcela;
    dataParcelas: CardParcela[];
    setDataParcelas: React.Dispatch<React.SetStateAction<CardParcela[]>>;
    tipoLancamento: string;
}

const ItemCardParcela = ({item, dataParcelas, setDataParcelas, tipoLancamento}: CardParcelaProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        const aux = item
        aux.data = date.toLocaleDateString()
        dataParcelas[aux.id] = aux
        setDataParcelas(dataParcelas)
        hideDatePicker();
    };

    const onChangeValor = (text: string) => {
        const aux = dataParcelas.slice()
        aux[item.id].valor = parseFloat(text)
        
        console.log(aux)
        setDataParcelas(aux)                
    }

    function changeSituation() {
        const aux = dataParcelas.slice()
        aux[item.id].status = aux[item.id].status ? false : true

        setDataParcelas(aux)
    }

    function changeAccount(conta: Conta | null){
        const aux = dataParcelas.slice()
        aux[item.id].conta = conta        
        
        console.log(aux)
        setDataParcelas(aux)
    }
            
    return (
        <ContainerCardParcela style={{borderColor: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}}>
            <TituloCardParcela onPress={showDatePicker}>Parcela de {item.data}</TituloCardParcela>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <InputCardParcela 
                keyboardType="numeric" 
                placeholder="R$ 00,00" 
                placeholderTextColor="gray"
                value={String(dataParcelas[item.id].valor)}
                onChangeText={onChangeValor}
            />
            <InputControlStatus>
                <Checkbox 
                    status={dataParcelas[item.id].status ? 'checked' : 'unchecked'}
                    onPress={changeSituation}
                    color={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
                />
                <LabelStatus style={{color: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}}>{tipoLancamento == 'despesa' ? 'Pago' : 'Recebido'}</LabelStatus>
            </InputControlStatus>
            <PickerContas conta={dataParcelas[item.id].conta} changeAccount={changeAccount} tipoLancamento={tipoLancamento}/>
        </ContainerCardParcela>

    )
}

export default ItemCardParcela