import React, { useState, useEffect, useRef } from 'react';
import { FlatList, ToastAndroid } from 'react-native'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { StackActions } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/AntDesign';

import InputText from '../../../../../components/InputText'
import {
    ContainerForm,
    InputControl,
    Label,
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
import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

import PickerContas from '../PickerContas'
import SelectionCategorias from '../SelectionCategories'


import {PropsNavigation} from '../..'
import { Checkbox, FAB } from 'react-native-paper'
import { Conta, UseContas } from '../../../../../contexts/AccountContext';

import ItemParcela from '../CardParcela'
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import {addMonths, toDate} from '../../../../../helpers/manipularDatas'
import Button from '../../../../../components/Button';

const FormCadastro: React.FC<PropsNavigation> = ({receiveEntry, valor, setValor, tipoLancamento}) => {
    const {categorias} = UseCategories()
    const {contas} = UseContas()
    const {navigation} = UseDadosTemp()            
    const {showNiceToast,  hideNiceToast} = UseDadosTemp()
    const {handleAdicionarLancamento, handleEditLancamento} = UseLancamentos()            

    console.debug("FormCadastro | receiveEntry", receiveEntry)
    
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
            }
    }, [])

    const [selectedConta, setSelectedConta] = useState<Conta | null>(receiveEntry?.parcelasLancamento[0].contaParcela ? receiveEntry?.parcelasLancamento[0].contaParcela : null)    

    const [parcelas, setParcelas] =  useState(receiveEntry?.parcelasLancamento ? String(receiveEntry.parcelasLancamento.length) : '1')    
    
    const [dataParcelas, setDataParcelas] = useState<Parcela[]>(receiveEntry?.parcelasLancamento ? receiveEntry.parcelasLancamento : [
        {
            id: -1,
            contaParcela: selectedConta,
            valorParcela: valor == '' ? 0 : parseFloat(valor),
            dataParcela: dataPagamento,
            statusParcela: status,
            lancamentoParcela: -1,
            indexOfLancamento: 0
        },
    ])                

    const changeParcela = (text: string, date: Date, newDataParcelas: Parcela[]) => {
        setParcelas(text)
        
        if (text == '') return
    
        let aux: Parcela[] = []
        const num = parseInt(text)            
        
        let valorParcelaDividido = parseFloat((parseFloat(valor) / num).toFixed(2))

        if (num < newDataParcelas.length) {
            for (var i = 0; i < num; i++) {
                newDataParcelas[i].valorParcela = valorParcelaDividido
                newDataParcelas[i].dataParcela = i == 0 ? new Date(date) : addMonths(new Date(date), 1)

                aux.push(newDataParcelas[i])
            }
            setDataParcelas(aux)
        } else if (num > newDataParcelas.length) {            
            for (var i = 0; i < num; i++) {
                const adicaoDeUmMes = i == 0 ? new Date(date) : addMonths(new Date(aux[i-1].dataParcela), 1)                
                
                if(i < newDataParcelas.length) {
                    newDataParcelas[i].valorParcela = valorParcelaDividido
                    newDataParcelas[i].dataParcela = new Date(adicaoDeUmMes)
                    
                    aux.push(newDataParcelas[i])
                
                } else {
                    aux.push({
                        id: -1,
                        contaParcela: selectedConta,
                        dataParcela: new Date(adicaoDeUmMes),
                        valorParcela: isNaN(valorParcelaDividido) ? 0 : valorParcelaDividido ,
                        statusParcela: status,
                        lancamentoParcela: -1,
                        indexOfLancamento: i
                    })                                       
                } 
                
                
                if(i == num-1) {
                    setDataParcelas(aux)
                }                    
                
            }
        }        

    }

    async function handleSubmit() {                    
        const newParcelas: Parcela[] = []                

        if(!selectedCategoria) 
            return showNiceToast("error", "Categoria não encontrada")

        
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
                    statusParcela: item.statusParcela,
                    indexOfLancamento: item.indexOfLancamento,
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
                showNiceToast("success", "Lançamento editado")
                navigation.dispatch(StackActions.replace("Main", {screen: 'Extrato'}))
            }
            else {
                showNiceToast("error", message)
            }
        } else {

            const message = await handleAdicionarLancamento(newLancamento, idUser);            
            
            if(message == '') {
                showNiceToast("success", "Lançamento adicionado")
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
                        lancamentoParcela: -1,
                        indexOfLancamento: 0
                    },
                ])
            }
            else {
                showNiceToast("error", message)
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
        hideDatePicker();
    };    


    useEffect(() => {
        if(valor == '') return
        
        console.debug("useEffect[valor] | entrou")
        const parcelas = dataParcelas.slice()

        const valorParcela = (parseFloat(valor) / dataParcelas.length).toFixed(2)

        parcelas.map((item, index) => {
            parcelas[index].valorParcela = parseFloat(valorParcela)
        })

        setDataParcelas(parcelas)
    }, [valor])

    function changeStatus() {
        console.debug("useEffect[status] | Entrou")

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
        console.debug("useEffect[date] | Entrou")

        const parcelas: Parcela[] = []        

        let proximoMes = date

        // let auxDatas: string[] = []
        dataParcelas.map((item, index) => {
            item.dataParcela = toDate(proximoMes)
            
            parcelas.push(item)
            
            proximoMes = addMonths(toDate(proximoMes), 1).toLocaleDateString()                        
        })


        setDataParcelas(parcelas)
    }

    function changeAccount(conta: Conta | null){
        
        if(conta?.descricao != selectedConta?.descricao) {
            console.debug("useEffect[account] | Entrou")
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

            <SectionDetalhes onPress={DefinirDetalhes}>
                    
                <Icon name={detalhes ? 'caretup' : 'caretdown'} 
                    size={25}
                    color="#525252"
                    
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
                        onChangeText={(text) => changeParcela(text, dataPagamento, dataParcelas)}
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

        <Button 
            title="Adicionar" 
            onPress={handleSubmit}
            style={{
                backgroundColor: tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'
            }}
            color="#fff"
        />
      
        </ContainerForm>

    )
}

export default FormCadastro