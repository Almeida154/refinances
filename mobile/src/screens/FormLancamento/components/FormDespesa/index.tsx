import React, { useState, useEffect, useRef } from 'react';

import {TouchableHighlight, FlatList, View} from 'react-native'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    ContainerForm,
    InputControl,
    Label,
    TextInputValor,
    TextInput,
    SectionDetalhes,
    TextDetalhes,
    ButtonDetalhes,
    SectionCardsParcelas,

    ContainerCardParcela,
    TituloCardParcela,
    LabelCardParcela,
    InputCardParcela
} from './styles'

import {Parcela} from '../../../../contexts/ParcelaContext'
import {UseLancamentos, Lancamento} from '../../../../contexts/LancamentosContext'

import PickerLugar from '../PickerLugar'
import PickerCategoria from '../PickerCategoria'
import PickerContas from '../PickerContas';


import {PropsNavigation} from '../../'
import { Text } from 'react-native-paper';

type CardParcela = {
    id: number;
    conta: string;
    data: string;
    valor: number;
}

type CardParcelaProps = {
    item: CardParcela;    
    dataParcelas: CardParcela[];
    setDataParcelas: React.Dispatch<React.SetStateAction<CardParcela[]>>
}

const ItemCardParcela = ({item, dataParcelas, setDataParcelas}: CardParcelaProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    const [selectedConta, setSelectedConta] = useState(0)

    const [valor, setValor] = useState(String(item.valor))    

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
        setValor(text)

        const aux = item

        aux.valor = parseInt(text)

        dataParcelas[aux.id] = aux

        setDataParcelas(dataParcelas)  
    }

    useEffect(() => {
        const aux = item

        aux.conta = String(selectedConta)

        dataParcelas[aux.id] = aux

        setDataParcelas(dataParcelas)        

    }, [selectedConta])

    return (
        <ContainerCardParcela>
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
               value={valor}
               onChangeText={onChangeValor}
            />
            <PickerContas conta={selectedConta} setConta={setSelectedConta}/>
        </ContainerCardParcela>
    )
}


const FormDespesa= ({route, navigation}: PropsNavigation) => {
    const [detalhes, setDetalhes] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
    
    const [valor, setValor] =  useState('0')
    const [descricao, setDescricao] =  useState('')
    const [dataPagamento, setDataPagamento] =  useState((new Date(Date.now())).toLocaleDateString())    

    const [selectedCategoria, setSelectedCategoria] = useState('0')
    const [selectedConta, setSelectedConta] = useState(0)

    const [parcelas, setParcelas] =  useState('1')    
    
    const [dataParcelas, setDataParcelas] = useState([{
        id: 0,
        conta: "Conta Principal",
        valor: 0,
        data: dataPagamento
    },
    ])
    const [dataParcelaAlterado, setDataParcelaAlterado] = useState(false)
    
    const {handleAdicionarLancamento, handleLoadLancamentos} = UseLancamentos()

    
    const changeParcela = (text: string, date: string) => {
        setParcelas(text)
        
        if(text == '') return
        function toDate(dateStr: string) {
            var parts = dateStr.split("/");
            return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }

        function addMonths(date: Date, months: number) {
            var d = date.getDate();
            date.setMonth(date.getMonth() + +months);
            if (date.getDate() != d) {
              date.setDate(0);
            }
            return date;
        }

        let aux: CardParcela[] = []

        const num = parseInt(text)            

        let valorParcelaDividido =parseFloat((parseFloat(valor) / num).toFixed(2))

        if(num < dataParcelas.length) {
            for(var i = 0;i < num;i++) {
                dataParcelas[i].valor = valorParcelaDividido
                dataParcelas[i].data = i == 0 ? date : addMonths(toDate(date), 1).toLocaleDateString()

                aux.push(dataParcelas[i])
            }

            
        } else if(num > dataParcelas.length) {            
            for(var i = 0;i < num;i++) {         
                const adicaoDeUmMes = aux[i-1] == undefined ? date : addMonths(toDate(aux[i-1].data), 1).toLocaleDateString()
                if(i < dataParcelas.length) {
                    dataParcelas[i].valor = valorParcelaDividido
                    dataParcelas[i].data = adicaoDeUmMes,
                    aux.push(dataParcelas[i])
                    continue
                }                
                
                aux.push({
                    id: i,
                    conta: 'Conta Principal',
                    data: adicaoDeUmMes,
                    valor: valorParcelaDividido
                })
            }

        }

        setDataParcelas(aux)
        setDataParcelaAlterado(true)

    }

    async function handleSubmit() {                    
            const newParcelas: Parcela[] = []
            
            console.log("dataParcelas, ", dataParcelas)
            dataParcelas.map(item => {
                newParcelas.push({
                    id: -1,
                    lancamentoParcela: -1,
                    contaParcela: parseInt(item.conta),
                    dateParcela: item.data,
                    valorParcela: item.valor                    
                })
            })            

            
            const newLancamento: Lancamento = {
                id: -1,
                descricaoLancamento: descricao,
                lugarLancamento: 'extrato',
                tipoLancamento: 'despesa',
                categoryLancamento: selectedCategoria,
                
                parcelasLancamento: newParcelas
            }
                        
            console.log('newLancamento: ', newLancamento)
            
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
            
            await handleAdicionarLancamento(newLancamento, idUser);            
            

            navigation.navigate('Extrato')
    }

    function DefinirDetalhes() {
        console.log(selectedCategoria)
        setDetalhes(detalhes => detalhes ? false : true)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date: Date) => {
          console.log(parcelas, date.toLocaleDateString())
        setDataPagamento(date.toLocaleDateString())

        changeParcela(parcelas, date.toLocaleDateString())
        hideDatePicker();
      };

      useEffect(() => {                      
        setDataParcelaAlterado(false)
    }, [dataParcelaAlterado])

      useEffect(() => {
          if(valor == '') return
          
          const parcelas = dataParcelas

          const valorParcela = (parseFloat(valor) / dataParcelas.length).toFixed(2)

          parcelas.map((item, index) => {
              parcelas[index].valor = parseFloat(valorParcela)
          })

          setDataParcelas(parcelas)
          setDataParcelaAlterado(true)

      }, [valor])
   

    return (


    <ContainerForm>

        <InputControl>
            <Label>Valor(R$) </Label>
            <TextInputValor
                value={valor}
                onChangeText={setValor}
                placeholder="0,00"
                keyboardType="numeric"
                placeholderTextColor={"#bbb"}></TextInputValor>
        </InputControl>

        <InputControl>
            <Label>Descrição</Label>
            <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Mercadinho"
                placeholderTextColor={"#bbb"}></TextInput>
        </InputControl>


        <InputControl>
            <Label>Categoria</Label>

           <PickerCategoria tipoCategoria="despesa" categoria={selectedCategoria} setCategoria={setSelectedCategoria}/>
        </InputControl>

        <InputControl>
            <Label>Conta</Label>

            <PickerContas conta={selectedConta} setConta={setSelectedConta}/>
        </InputControl>

        <InputControl>
            <Label>Data de Pagamento</Label>
            <Text onPress={showDatePicker}>{dataPagamento}</Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
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
                    <Label>Parcelas</Label>
                    <TextInput
                        value={parcelas}
                        onChangeText={(text) => changeParcela(text, dataPagamento)}
                        placeholder="1"
                        keyboardType="numeric"
                        ></TextInput>
                </InputControl>

                <SectionCardsParcelas>
                    {
                        !dataParcelaAlterado && <FlatList 
                            data={dataParcelas}
                            renderItem={({item}) => <ItemCardParcela item={item} dataParcelas={dataParcelas} setDataParcelas={setDataParcelas} />}
                            horizontal
                            keyExtractor={(item, index) => String(index)}
                        />                          
                    }
                </SectionCardsParcelas>

               

            </>
        }

        <TouchableHighlight onPress={handleSubmit} style={{marginBottom: 100}}><Text>Botao Provisorio</Text></TouchableHighlight>


    </ContainerForm>
    )
}

export default FormDespesa