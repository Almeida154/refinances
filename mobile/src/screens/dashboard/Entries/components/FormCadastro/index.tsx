import React, { useState, useEffect, useRef } from 'react';
import { TouchableHighlight, FlatList, View, ToastAndroid } from 'react-native'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/AntDesign';

import InputText from '../../../../../components/InputText'
import {
    ContainerForm,
    InputControl,
    Label,
    TextInput,
    SectionDetalhes,
    TextDetalhes,
    SectionCardsParcelas,
    InputControlCheckBox,    
    ContainerDetalhes,
    DetalhesMensal
} from './styles'

import { Parcela } from '../../../../../contexts/InstallmentContext'
import { Categoria, UseCategories } from '../../../../../contexts/CategoriesContext'
import { UseLancamentos, Lancamento } from '../../../../../contexts/EntriesContext'

import PickerCategoria from '../PickerCategoria'
import PickerContas from '../PickerContas'
import SelectionCategorias from '../SelectionCategories'

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

import {PropsNavigation} from '../..'
import { Text, Checkbox, FAB } from 'react-native-paper'
import { Conta, UseContas } from '../../../../../contexts/AccountContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ItemParcela from '../CardParcela'
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import {addMonths, toDate} from '../../../../../helpers/manipularDatas'

const FormCadastro: React.FC<PropsNavigation> = ({receiveEntry, valor, setValor, tipoLancamento}) => {
    const {categorias} = UseCategories()
    const {contas} = UseContas()
    const {navigation} = UseDadosTemp()            
    const {handleAdicionarLancamento, handleEditLancamento} = UseLancamentos()    
    
    console.debug('receiveEntry', receiveEntry)

    const [detalhes, setDetalhes] = useState(false)
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    
    const [descricao, setDescricao] =  useState(receiveEntry?.descricaoLancamento ? receiveEntry?.descricaoLancamento : '')
    const [dataPagamento, setDataPagamento] =  useState(receiveEntry?.parcelasLancamento[0].dataParcela ? new Date(receiveEntry.parcelasLancamento[0].dataParcela) : (new Date(Date.now())) )    
    const [status, setStatus] = useState(true)
    const [mensal, setMensal] = useState(!receiveEntry ? false : receiveEntry?.parcelaBaseada == -1 ? false : true)
    
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null)    
        
    useEffect(() => {
        if(receiveEntry?.categoryLancamento && typeof receiveEntry?.categoryLancamento != 'string') {
            setSelectedCategoria(receiveEntry?.categoryLancamento)        
            console.log(receiveEntry?.categoryLancamento)                
            }
    }, [])

    const [selectedConta, setSelectedConta] = useState<Conta | null>(receiveEntry?.parcelasLancamento[0].contaParcela ? receiveEntry?.parcelasLancamento[0].contaParcela : null)    

    const [parcelas, setParcelas] =  useState(receiveEntry?.parcelasLancamento ? String(receiveEntry.parcelasLancamento.length) : '1')    
    
    const [dataParcelas, setDataParcelas] = useState<Parcela[]>(receiveEntry?.parcelasLancamento ? receiveEntry.parcelasLancamento : [
        {
            id: 0,
            contaParcela: selectedConta,
            valorParcela: valor == '' ? 0 : parseFloat(valor),
            dataParcela: dataPagamento,
            statusParcela: status,
            lancamentoParcela: -1
        },
    ])
    
    useEffect(() => {
        console.debug("Data parcelas mudou")
    }, [dataParcelas])
    
    const changeParcela = (text: string, date: string, newDataParcelas: Parcela[]) => {
        setParcelas(text)
        
        if (text == '') return
    
        let aux: Parcela[] = []
        const num = parseInt(text)            
        
        let valorParcelaDividido =parseFloat((parseFloat(valor) / num).toFixed(2))

        if (num < newDataParcelas.length) {
            for (var i = 0; i < num; i++) {
                newDataParcelas[i].valorParcela = valorParcelaDividido
                newDataParcelas[i].dataParcela = i == 0 ? toDate(date) : addMonths(toDate(date), 1)

                aux.push(newDataParcelas[i])
            }
        } else if (num > newDataParcelas.length) {            
            for (var i = 0; i < num; i++) {
                const adicaoDeUmMes = i == 0 ? toDate(date) : addMonths(aux[i-1].dataParcela, 1)
                if(i < newDataParcelas.length) {
                    newDataParcelas[i].valorParcela = valorParcelaDividido
                    newDataParcelas[i].dataParcela = adicaoDeUmMes
                    
                    console.log("newDataParcelas[0]", newDataParcelas[i])
                    aux.push(newDataParcelas[i])
                
                } else {
                    aux.push({
                        id: i,
                        contaParcela: selectedConta,
                        dataParcela: adicaoDeUmMes,
                        valorParcela: isNaN(valorParcelaDividido) ? 0 : valorParcelaDividido ,
                        statusParcela: status,
                        lancamentoParcela: -1
                    })                                       
                } 

                
            }
        }        

        setDataParcelas(aux)
    }

    async function handleSubmit() {                    
        const newParcelas: Parcela[] = []
        
        console.log("dataParcelas, ", dataParcelas)                          

        if(!selectedCategoria) 
            return ToastAndroid.show("Categoria não encontrada", ToastAndroid.SHORT)

        
        let newLancamento = {} as Lancamento

        if(mensal) {
            newLancamento = {
                id: receiveEntry ? receiveEntry.id : -1 ,
                descricaoLancamento: descricao,
                lugarLancamento: 'extrato',            
                tipoLancamento: tipoLancamento,
                parcelaBaseada: 0,
                categoryLancamento: selectedCategoria?.nomeCategoria,
                parcelasLancamento: [{
                    id: receiveEntry ? receiveEntry.id : -1 ,
                    lancamentoParcela: -1,
                    contaParcela: selectedConta == null ? 0 : selectedConta,
                    dataParcela: dataPagamento,
                    valorParcela: parseFloat(valor),
                    statusParcela: status                    
                } as Parcela],
                essencial: false    
            }
        } else {
            dataParcelas.map((item, index) => {
                newParcelas.push({
                    id: -1 ,
                    lancamentoParcela: -1,
                    contaParcela: item.contaParcela,
                    dataParcela:item.dataParcela,
                    valorParcela: item.valorParcela,
                    statusParcela: item.statusParcela                    
                })
            })  

            newLancamento = {
                id: receiveEntry ? receiveEntry.id : -1,
                descricaoLancamento: descricao,
                lugarLancamento: 'extrato',            
                tipoLancamento: tipoLancamento,
                parcelaBaseada: -1,
                categoryLancamento: selectedCategoria?.nomeCategoria,
                parcelasLancamento: newParcelas,
                essencial: false    
            }
        }
                            
        const idUser = await retornarIdDoUsuario()

        if(receiveEntry) {
            newLancamento.categoryLancamento = selectedCategoria
            
            const message = await handleEditLancamento(newLancamento, idUser)            


            if(message == '') {
                ToastAndroid.show("Lançamento editado", ToastAndroid.SHORT)
                navigation.dispatch(StackActions.replace("Main", {screen: 'Extrato'}))
            }
            else {
                ToastAndroid.show(message, ToastAndroid.SHORT)
            }
        } else {

            const message = await handleAdicionarLancamento(newLancamento, idUser);            
            
            if(message == '') {
                ToastAndroid.show("Lançamento adicionado", ToastAndroid.SHORT)
                setDescricao('')
                setValor('')
                setSelectedCategoria(categorias ? categorias[0] : null) 
                setSelectedConta(contas ? contas[0] : null)
                setParcelas('1')
                setDataParcelas([
                    {
                        id: 0,
                        contaParcela: selectedConta,
                        valorParcela: valor == '' ? 0 : parseFloat(valor),
                        dataParcela: new Date(dataPagamento),
                        statusParcela: status,
                        lancamentoParcela: -1
                    },
                ])
            }
            else {
                ToastAndroid.show(message, ToastAndroid.SHORT)
            }
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
        
        console.log("Vei no no useEffect[valor]")
        const parcelas = dataParcelas.slice()

        const valorParcela = (parseFloat(valor) / dataParcelas.length).toFixed(2)

        parcelas.map((item, index) => {
            parcelas[index].valorParcela = parseFloat(valorParcela)
        })

        setDataParcelas(parcelas)
    }, [valor])

    function changeStatus() {
        console.log("Vei no no useEffect[status]")

        const newStatus = status ? false : true
        setStatus(newStatus)

        const parcelas: Parcela[] = []        

        dataParcelas.map((item, index) => {
            item.statusParcela = newStatus
            
            parcelas.push(item)            
        })


        setDataParcelas(parcelas)
    }

    function changeMensal() {
        const newMensal = mensal ? false : true
        setMensal(newMensal)                
    }

    function changeDate(date: string){
        console.log("Vei no no useEffect[date]")

        const parcelas: Parcela[] = []        

        let proximoMes = date

        // let auxDatas: string[] = []
        dataParcelas.map((item, index) => {
            item.dataParcela = toDate(proximoMes)
            
            parcelas.push(item)
            
            proximoMes = addMonths(toDate(proximoMes), 1).toLocaleDateString()
            
            // if(index = dataParcelas.length-1) {
                // console.debug("useEffect[dataPagamento] | parcelas", parcelas)
                // }
        })


        setDataParcelas(parcelas)
    }

    function changeAccount(conta: Conta | null){
        
        if(conta?.descricao != selectedConta?.descricao) {
            console.log("Vei no no useEffect[account]")
            const parcelas: Parcela[] = []        
    
            dataParcelas.map((item, index) => {
                item.contaParcela = conta
                
                parcelas.push(item)        
            })
    
            setSelectedConta(conta)
            setDataParcelas(parcelas)
        }
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
                    placeholder={tipoLancamento == 'despesa' ? 'Mercadinho' : 'Recebimento empréstimo'}
                    placeholderTextColor={"#bbb"}
                    colorLabel={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}></InputText>
            </InputControl>

            <InputControl>
                <SelectionCategorias tipoCategoria={tipoLancamento} categoria={selectedCategoria} setCategoria={setSelectedCategoria} />
            </InputControl>

            <InputControl>            
                <PickerContas conta={selectedConta} changeAccount={changeAccount} tipoLancamento={tipoLancamento}/>
            </InputControl>

            <InputControl>
                <InputText 
                    label={tipoLancamento == 'despesa' ? 'Data de Pagamento' : 'Data de Recebimento'}
                    onClear={() => {}}
                    showClearIcon={false}
                    editable={false}
                    onPress={showDatePicker}
                    value={dataPagamento.toLocaleDateString()}
                    placeholder={tipoLancamento == 'despesa' ? 'Data de Pagamento do lançamento' : 'Data de Recebimento do lançamento'}
                    colorLabel={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
                />               
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"                
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={dataPagamento}
                />
            </InputControl>   

            <SectionDetalhes>
                    
                <Icon name={detalhes ? 'caretup' : 'caretdown'} 
                    size={25}
                    color="#525252"
                    onPress={DefinirDetalhes}
                    style={{
                }}/>

                <TextDetalhes>{detalhes ? 'Menos' : 'Mais'} detalhes</TextDetalhes>
            </SectionDetalhes>

            
            <ContainerDetalhes style={{display: detalhes ? 'flex' : 'none'}}>
                <InputControlCheckBox>        
                    <Checkbox 
                        status={mensal ? 'checked' : 'unchecked'}
                        onPress={changeMensal}                    
                        color={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
                    />
                    <Label style={{color: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}}>{tipoLancamento == 'despesa' ? 'Gasto Mensal' : 'Receita Mensal'}</Label>
                </InputControlCheckBox>
                <DetalhesMensal
                    style={{display: mensal ? 'flex' : 'none' }}>
                    Você {tipoLancamento == 'despesa' ? 'pagará' : 'receberá' } {valor == '' ? 'R$ 0,00' : parseFloat(valor).toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'})} mensalmente a partir de {dataPagamento.toLocaleDateString()}, os valores poderão ser trocados no futuro
                </DetalhesMensal>

                <InputControl
                    style={{display: mensal ? 'none' : 'flex' }}>
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
                
                <SectionCardsParcelas
                    style={{display: mensal ? 'none' : 'flex' }}>
                    {<FlatList 
                        data={dataParcelas}
                        renderItem={({item}) => <ItemParcela item={item} dataParcelas={dataParcelas} setDataParcelas={setDataParcelas} tipoLancamento={tipoLancamento}/>}
                        horizontal
                        keyExtractor={(item, index) => String(index)} 
                        extraData={dataParcelas}/>}
                </SectionCardsParcelas>
            </ContainerDetalhes>
        

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