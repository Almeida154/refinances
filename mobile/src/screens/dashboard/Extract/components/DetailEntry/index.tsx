import React from 'react'

import {
    Container,
    LabelTitle,
    LabelQuantity,

    GroupLabel,
    Label,
    Value,
} from './styles'

const DetailEntry = () => {
    return (
        <Container>
            <LabelTitle>Air Max 97</LabelTitle>
            <LabelQuantity>235,00</LabelQuantity>


            <GroupLabel>
                <Label>Data</Label>
                <Value>01/09/2021</Value>
            </GroupLabel>

            <GroupLabel>
                <Label>Categoria</Label>
                <Value>Outfit</Value>
            </GroupLabel>

            <GroupLabel>
                <Label>Nota</Label>
                <Value>Adicionar</Value>
            </GroupLabel>

            <GroupLabel>
                <Label>Conta</Label>
                <Value>Carteira</Value>
            </GroupLabel>

            <GroupLabel>
                <Label>Total</Label>
                <Value>R$ 940,00</Value>
            </GroupLabel>
        </Container>
    )
}

export default DetailEntry