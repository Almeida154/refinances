import react, { SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native'

import {Parcela} from '../../../Contexts/ParcelaContext'

import Icon from 'react-native-vector-icons/AntDesign'

import PickerContas from './PickerContas'

type PropsCardParcela = {
    parcela: Parcela,
    selectedParcela: number,
    setParcelasLancamento: react.Dispatch<react.SetStateAction<Parcela[]>>
}

const CardParcela = ({parcela, setParcelasLancamento, selectedParcela}: PropsCardParcela) => {
    const [valor, setValor] = useState('0')
    const [conta, setConta] = useState(0)
    const [data, setData] = useState(Date.now().toString())
   
    return (
        <View style={styles.containerCard}>
            <Text style={styles.title}>Parcela 1</Text>

            <Text style={styles.label}>Valor: </Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="R$0,00" 
                onChangeText={setValor}
                value={valor}
            />

            <Text style={styles.label}>Conta:</Text>
            <PickerContas setConta={setConta} conta={conta}/>

            <Text style={styles.label}>Data da Parcela</Text>
            <TextInput style={styles.textInput} value={data} onChangeText={setData}/>
        </View>
    )
}

const ListParcelas = () => {
    const [selectedParcela, setSelectedParcela] = useState(0)

    const [parcelasLancamento, setParcelasLancamento] = useState<Parcela []>([] as Parcela[])

    useEffect(() => {
        const parcelas = []
        const mensal = new Date(Date.now())

        for(var i = 0;i < 12;i++) {
            parcelas.push({
                dateParcela: mensal.setMonth(mensal.getMonth() + 1),
                valorParcela: 20,
                contaParcela: 1,
                lancamentoParcela: 1
            })
        }
    }, [])

    const changeParcelaLeft = () => {
        setSelectedParcela(selectedParcela > 0 ? selectedParcela - 1 : selectedParcela)
    }

    const changeParcelaRight = () => {
        setSelectedParcela(selectedParcela < parcelasLancamento.length ? selectedParcela + 1 : selectedParcela)
    }

    return (
        <View style={styles.container}>
            <Icon name='arrowleft' size={20} color='#fff' onPress={changeParcelaLeft}/>
            <CardParcela selectedParcela={selectedParcela} parcela={parcelasLancamento[selectedParcela]} setParcelasLancamento={setParcelasLancamento}/>
            <Icon name='arrowright' size={20} color='#fff' onPress={changeParcelaRight}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    containerCard: {

    },
    title: {
        
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomWidth: 2,
        width: '100%',
        color: '#858c87',
        height: 40,
        borderBottomColor: '#858c87',
        opacity: 0.7
    },
})

export default ListParcelas