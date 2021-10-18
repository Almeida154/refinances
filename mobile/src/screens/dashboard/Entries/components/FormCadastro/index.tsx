import React, { useState, useEffect, useRef } from 'react';
import { TouchableHighlight, FlatList, View, ToastAndroid } from 'react-native'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

import InputText from '../../../../../components/InputText'
import {
    ContainerForm,
    InputControl,
    Label,
    TextInput,
    SectionDetalhes,
    TextDetalhes,
    ButtonDetalhes,  
    SectionCardsParcelas
} from './styles'

import { Parcela } from '../../../../../contexts/InstallmentContext'
import { UseLancamentos, Lancamento } from '../../../../../contexts/EntriesContext'

import PickerLugar from '../PickerLugar'
import PickerCategoria from '../PickerCategoria'
import PickerContas from '../PickerContas'
import SelectionCategorias from '../SelectionCategories'

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

import {PropsNavigation} from '../..'
import { Text } from 'react-native-paper'
import { Conta } from '../../../../../contexts/AccountContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {FAB} from 'react-native-paper'

import ItemCardParcela, {CardParcela, CardParcelaProps} from '../CardParcela'
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import {addMonths, toDate} from '../../../../../helpers/manipularDatas'

const FormCadastro= ({route, navigation, valor, setValor, tipoLancamento}: PropsNavigation) => {

    const [detalhes, setDetalhes] = useState(false)
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    
    const [descricao, setDescricao] =  useState('')
    const [dataPagamento, setDataPagamento] =  useState((new Date(Date.now())))    

    const [selectedCategoria, setSelectedCategoria] = useState('0')
    const [selectedConta, setSelectedConta] = useState<Conta | null>(null)

    const [parcelas, setParcelas] =  useState('1')    
    
    const [dataParcelas, setDataParcelas] = useState<CardParcela[]>([
        {
            id: 0,
            conta: selectedConta,
            valor: 0,
            data: dataPagamento
        },
    ])
    
    const {handleAdicionarLancamento, handleLoadLancamentos} = UseLancamentos()    
    
    const changeParcela = (text: string, date: Date, newDataParcelas: CardParcela[]) => {
        setParcelas(text)
        
        if (text == '') return
    
        let aux: CardParcela[] = []
        const num = parseInt(text)            
        
        let valorParcelaDividido =parseFloat((parseFloat(valor) / num).toFixed(2))

        if (num < newDataParcelas.length) {
            for (var i = 0; i < num; i++) {
                newDataParcelas[i].valor = valorParcelaDividido
                newDataParcelas[i].data = i == 0 ? date : addMonths(date, 1)

                aux.push(newDataParcelas[i])
            }
        } else if (num > newDataParcelas.length) {            
            for (var i = 0; i < num; i++) {
                const adicaoDeUmMes = aux[i-1] == undefined ? date : addMonths(aux[i-1].data, 1)
                if(i < newDataParcelas.length) {
                    newDataParcelas[i].valor = valorParcelaDividido
                    newDataParcelas[i].data = adicaoDeUmMes,                    
                    aux.push(newDataParcelas[i])
                
                } else {
                    aux.push({
                        id: i,
                        conta: selectedConta,
                        data: adicaoDeUmMes,
                        valor: valorParcelaDividido
                    })                                       
                } 

                
            }
        }        

        setDataParcelas(aux)
    }

    async function handleSubmit() {                    
        const newParcelas: Parcela[] = []
        
        console.log("dataParcelas, ", dataParcelas)
        dataParcelas.map(item => {
            newParcelas.push({
                id: -1,
                lancamentoParcela: -1,
                contaParcela: item.conta == null ? 0 : item.conta.id,
                dateParcela: item.data,
                valorParcela: item.valor                    
            })
        })            

        const newLancamento: Lancamento = {
            id: -1,
            descricaoLancamento: descricao,
            lugarLancamento: 'extrato',
            tipoLancamento: tipoLancamento,
            categoryLancamento: selectedCategoria,
            parcelasLancamento: newParcelas
        }
                    
        console.log('newLancamento: ', newLancamento)
        
        const idUser = await retornarIdDoUsuario()
        
        const message = await handleAdicionarLancamento(newLancamento, idUser);            
        
        if(message == '') {
            ToastAndroid.show("Lançamento adicionado", ToastAndroid.SHORT)
            setDescricao('')
            setValor('')
            setSelectedCategoria('0')
            setSelectedConta(null)
            setParcelas('1')
        }
        else {
            ToastAndroid.show(message, ToastAndroid.SHORT)
        }
    }

    function DefinirDetalhes() {        
        setDetalhes(detalhes => detalhes ? false : true)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
    const handleConfirm = (date: Date) => {                
        setDataPagamento(date)
        console.log('date', date)
        hideDatePicker();
    };    


    useEffect(() => {
        if(valor == '') return
        
        const parcelas = dataParcelas

        const valorParcela = (parseFloat(valor) / dataParcelas.length).toFixed(2)

        parcelas.map((item, index) => {
            parcelas[index].valor = parseFloat(valorParcela)
        })

        setDataParcelas(parcelas)
    }, [valor])

    useEffect(() => {        
        const parcelas: CardParcela[] = []        

        let proximoMes = dataPagamento

        // let auxDatas: string[] = []
        dataParcelas.map((item, index) => {
            item.data = proximoMes     
            
            parcelas.push(item)
            
            parcelas[index].data = proximoMes
            proximoMes = addMonths(proximoMes, 1)
            // if(index = dataParcelas.length-1) {
                // console.debug("useEffect[dataPagamento] | parcelas", parcelas)
                setDataParcelas(parcelas)
            // }
        })


        
    }, [dataPagamento])
    
    return (
        <ContainerForm>
            
           

            <InputControl>
                <InputText
                    onClear={() => {}}
                    showClearIcon={false}
                    label="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Mercadinho"
                    placeholderTextColor={"#bbb"}
                    colorLabel={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}></InputText>
            </InputControl>

            <InputControl>
                <SelectionCategorias tipoCategoria={tipoLancamento} categoria={selectedCategoria} setCategoria={setSelectedCategoria} navigation={navigation}/>
            </InputControl>

            <InputControl>
                <PickerContas conta={selectedConta} setConta={setSelectedConta} tipoLancamento={tipoLancamento}/>
            </InputControl>

            <InputControl>
            <TouchableOpacity onPress={showDatePicker}>
                <InputText 
                    label={tipoLancamento == 'despesa' ? 'Data de Pagamento' : 'Data de Recebimento'}
                    onClear={() => {}}
                    showClearIcon={false}
                    value={dataPagamento.toLocaleDateString()}
                    placeholder={tipoLancamento == 'despesa' ? 'Data de Pagamento do lançamento' : 'Data de Recebimento do lançamento'}
                    colorLabel={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
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

            <SectionDetalhes>
                <ButtonDetalhes onPress={DefinirDetalhes}>
                    <TextDetalhes>{detalhes ? 'Menos' : 'Mais'} detalhes</TextDetalhes>
                </ButtonDetalhes>
            </SectionDetalhes>

            {detalhes &&
                <>
                    <InputControl>
                        <InputText
                            onClear={() => {}}
                            showClearIcon={false}
                            label="Quantidade de Parcelas"
                            colorLabel={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
                            value={parcelas}
                            onChangeText={(text) => changeParcela(text, dataPagamento, dataParcelas)}
                            placeholder="1"
                            keyboardType="numeric"
                            />
                                
                        
                    </InputControl>
                    
                    <SectionCardsParcelas>
                        {<FlatList 
                            data={dataParcelas}
                            renderItem={({item}) => <ItemCardParcela item={item} dataParcelas={dataParcelas} setDataParcelas={setDataParcelas} tipoLancamento={tipoLancamento}/>}
                            horizontal
                            keyExtractor={(item, index) => String(index)} 
                            extraData={dataParcelas}/>}
                    </SectionCardsParcelas>
                </>
            }

        <FAB 
            icon="plus"
            style={{
                backgroundColor: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'
            }}
            onPress={handleSubmit}
        />
        </ContainerForm>
    )
}

export default FormCadastro