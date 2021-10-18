import { Conta } from '@contexts/AccountContext';
import React, { useEffect, useState } from 'react'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

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
    data: Date;
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
    const [selectedConta, setSelectedConta] = useState<Conta | null>(null)

    const [valor, setValor] = useState(String(item.valor))    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        const aux = item
        aux.data = date
        dataParcelas[aux.id] = aux
        setDataParcelas(dataParcelas)
        hideDatePicker();
    };

    const onChangeValor = (text: string) => {
        setValor(text)
        const aux = item
        aux.valor = parseInt(text)
        dataParcelas[aux.id] = aux
        setDataParcelas(dataParcelas)  
    }

    useEffect(() => {
        const aux = item
        aux.conta = selectedConta
        dataParcelas[aux.id] = aux
        // console.log(dataParcelas[aux.id])
        setDataParcelas(dataParcelas)
    }, [selectedConta])

    return (
        <ContainerCardParcela>
            <TituloCardParcela onPress={showDatePicker}>Parcela de {item.data.toLocaleDateString()}</TituloCardParcela>
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
                value={valor}
                onChangeText={onChangeValor}
            />
            <PickerContas conta={selectedConta} setConta={setSelectedConta} tipoLancamento={tipoLancamento}/>
        </ContainerCardParcela>
    )
}

export default ItemCardParcela