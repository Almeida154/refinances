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
    SectionCardsParcelas,
    InputControlCheckBox,    
} from './styles'

import { Parcela } from '../../../../../contexts/InstallmentContext'
import { Categoria, UseCategories } from '../../../../../contexts/CategoriesContext'
import { UseLancamentos, Lancamento } from '../../../../../contexts/EntriesContext'

import PickerLugar from '../PickerLugar'
import PickerCategoria from '../PickerCategoria'
import PickerContas from '../PickerContas'
import SelectionCategorias from '../SelectionCategories'

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

import {PropsNavigation} from '../..'
import { Text, Checkbox, FAB } from 'react-native-paper'
import { Conta, UseContas } from '../../../../../contexts/AccountContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ItemCardParcela, {CardParcela, CardParcelaProps} from '../CardParcela'
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import {addMonths, toDate} from '../../../../../helpers/manipularDatas'

const FormCadastro= ({valor, setValor, tipoLancamento}: PropsNavigation) => {
    const {categorias} = UseCategories()
    const {contas} = UseContas()
    
    const [detalhes, setDetalhes] = useState(false)
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    
    const [descricao, setDescricao] =  useState('')
    const [dataPagamento, setDataPagamento] =  useState((new Date(Date.now())))    
    const [status, setStatus] = useState(true)

    const [selectedCategoria, setSelectedCategoria] = useState('0')
    const [selectedConta, setSelectedConta] = useState<Conta | null>(null)

    const [parcelas, setParcelas] =  useState('1')    
    
    const [dataParcelas, setDataParcelas] = useState<CardParcela[]>([
        {
            id: 0,
            conta: selectedConta,
            valor: valor == '' ? 0 : parseFloat(valor),
            data: dataPagamento.toLocaleDateString(),
            status: status
        },
    ])
    
    const {handleAdicionarLancamento, handleLoadLancamentos} = UseLancamentos()    
    
    const changeParcela = (text: string, date: string, newDataParcelas: CardParcela[]) => {
        setParcelas(text)
        
        if (text == '') return
    
        let aux: CardParcela[] = []
        const num = parseInt(text)            
        
        let valorParcelaDividido =parseFloat((parseFloat(valor) / num).toFixed(2))

        if (num < newDataParcelas.length) {
            for (var i = 0; i < num; i++) {
                newDataParcelas[i].valor = valorParcelaDividido
                newDataParcelas[i].data = i == 0 ? date : addMonths(toDate(date), 1).toLocaleDateString()

                aux.push(newDataParcelas[i])
            }
        } else if (num > newDataParcelas.length) {            
            for (var i = 0; i < num; i++) {
                const adicaoDeUmMes = i == 0 ? date : addMonths(toDate(aux[i-1].data), 1).toLocaleDateString()
                if(i < newDataParcelas.length) {
                    newDataParcelas[i].valor = valorParcelaDividido
                    newDataParcelas[i].data = adicaoDeUmMes
                    
                    console.log("newDataParcelas[0]", newDataParcelas[i])
                    aux.push(newDataParcelas[i])
                
                } else {
                    aux.push({
                        id: i,
                        conta: selectedConta,
                        data: adicaoDeUmMes,
                        valor: isNaN(valorParcelaDividido) ? 0 : valorParcelaDividido ,
                        status: status
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
                dataParcela: toDate(item.data),
                valorParcela: item.valor,
                statusParcela: item.status                    
            })
        })            

        const newLancamento: Lancamento = {
            id: -1,
            descricaoLancamento: descricao,
            lugarLancamento: 'extrato',
            tipoLancamento: tipoLancamento,
            categoryLancamento: selectedCategoria,
            parcelasLancamento: newParcelas,
            essencial: false    
        }
                    
        console.log('newLancamento: ', newLancamento)
        
        const idUser = await retornarIdDoUsuario()
        
        const message = await handleAdicionarLancamento(newLancamento, idUser);            
        
        if(message == '') {
            ToastAndroid.show("Lançamento adicionado", ToastAndroid.SHORT)
            setDescricao('')
            setValor('')
            setSelectedCategoria(categorias[0].nomeCategoria)
            setSelectedConta(contas[0])
            setParcelas('1')
            setDataParcelas([
                {
                    id: 0,
                    conta: selectedConta,
                    valor: valor == '' ? 0 : parseFloat(valor),
                    data: dataPagamento.toLocaleDateString(),
                    status: status
                },
            ])
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
         
        changeDate(date.toLocaleDateString())
        console.log('date', date)
        hideDatePicker();
    };    


    useEffect(() => {
        if(valor == '') return
        
        const parcelas = dataParcelas.slice()

        const valorParcela = (parseFloat(valor) / dataParcelas.length).toFixed(2)

        parcelas.map((item, index) => {
            parcelas[index].valor = parseFloat(valorParcela)
        })

        setDataParcelas(parcelas)
    }, [valor])

    function changeStatus() {
        const newStatus = status ? false : true
        setStatus(newStatus)

        const parcelas: CardParcela[] = []        

        dataParcelas.map((item, index) => {
            item.status = newStatus
            
            parcelas.push(item)            
        })


        setDataParcelas(parcelas)
    }

    function changeDate(date: string){
        const parcelas: CardParcela[] = []        

        let proximoMes = date

        // let auxDatas: string[] = []
        dataParcelas.map((item, index) => {
            item.data = proximoMes
            
            parcelas.push(item)
            
            proximoMes = addMonths(toDate(proximoMes), 1).toLocaleDateString()
            
            // if(index = dataParcelas.length-1) {
                // console.debug("useEffect[dataPagamento] | parcelas", parcelas)
                // }
        })


        setDataParcelas(parcelas)
    }

    function changeAccount(conta: Conta | null){
        const parcelas: CardParcela[] = []        

        dataParcelas.map((item, index) => {
            item.conta = conta
            
            parcelas.push(item)        
        })

        setSelectedConta(conta)
        setDataParcelas(parcelas)
    }
    
    
    return (
        <ContainerForm>  
            <InputControlCheckBox>        
                <Checkbox 
                    status={status ? 'checked' : 'unchecked'}
                    onPress={changeStatus}                    
                    color={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
                />
                <Label style={{color: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}}>{tipoLancamento == 'despesa' ? 'Pago' : 'Recebido'}</Label>
            </InputControlCheckBox>

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
                <SelectionCategorias tipoCategoria={tipoLancamento} categoria={selectedCategoria} setCategoria={setSelectedCategoria} />
            </InputControl>

            <InputControl>
            {
                console.log(selectedConta)
            }
                <PickerContas conta={selectedConta} changeAccount={changeAccount} tipoLancamento={tipoLancamento}/>
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
                            onChangeText={(text) => changeParcela(text, dataPagamento.toLocaleDateString(), dataParcelas)}
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
            icon="check"
            style={{
                backgroundColor: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'
            }}
            onPress={handleSubmit}
        />
        </ContainerForm>
    )
}

export default FormCadastro