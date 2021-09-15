import React, { useState } from 'react';

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

import {Parcela} from '../../../../contexts/ParcelaContext'

import PickerLugar from '../PickerLugar'
import PickerCategoria from '../PickerCategoria'

type CardParcelaProps = {
    data: number,
    valor: number,
    conta: string
}

const CardParcela = ({data, valor, conta}: CardParcelaProps) => {
    return (
        <></>
    )
}

const FormDespesa: React.FC = () => {
    const [detalhes, setDetalhes] = useState(false)

    const [dataParcelas, setDataParcelas] = useState([{}] as Parcela[])

    const [valor, setValor] =  useState('')
    const [descricao, setDescricao] =  useState('')
    const [dataPagamento, setDataPagamento] =  useState('')    
    const [parcelas, setParcelas] =  useState('1')

    function DefinirDetalhes() {
        setDetalhes(detalhes => detalhes ? false : true)
    }

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

            <PickerCategoria />
        </InputControl>

        <InputControl>
            <Label>Conta</Label>

            <PickerLugar />
        </InputControl>

        <InputControl>
            <Label>Data de Pagamento</Label>
            <TextInput
                value={dataPagamento}
                onChangeText={setDataPagamento}
                placeholder="21/12/2021"></TextInput>
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
                        onChangeText={setParcelas}
                        placeholder="1"></TextInput>
                </InputControl>

                <SectionCardsParcelas>
                    {
                        
                    }
                </SectionCardsParcelas>

            </>
        }


    </ContainerForm>
    )
}

export default FormDespesa