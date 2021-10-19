import { Conta } from '@contexts/AccountContext';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import {toDate} from '../../../../../helpers/manipularDatas'

import PickerContas from '../PickerContas'

import {
    ContainerCardParcela,
    InputCardParcela,
    LabelCardParcela,
    TituloCardParcela
} from './styles'


export type CardParcela = {
    id: number;
    conta: Conta | null;
    data: string;
    valor: number;
   
}

export type CardParcelaProps = {
    item: CardParcela;
    dataParcelas: CardParcela[];
    setDataParcelas: React.Dispatch<React.SetStateAction<CardParcela[]>>;
    tipoLancamento: string;
}

const ItemCardParcela = ({item, dataParcelas, setDataParcelas, tipoLancamento}: CardParcelaProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    const [selectedConta, setSelectedConta] = useState<Conta | null>(dataParcelas[item.id].conta)


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
        const aux = item
        aux.valor = parseInt(text)
        dataParcelas[aux.id] = aux
        setDataParcelas(dataParcelas)  
    }

    function changeAccount(conta: Conta | null){
        const aux = item
        aux.conta = conta
        dataParcelas[aux.id] = aux
        
        setSelectedConta(conta)
        setDataParcelas(dataParcelas)
    }

    console.log("Reiniciou", dataParcelas)
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
            <PickerContas conta={selectedConta} changeAccount={changeAccount} tipoLancamento={tipoLancamento}/>
        </ContainerCardParcela>

    )
}

export default ItemCardParcela