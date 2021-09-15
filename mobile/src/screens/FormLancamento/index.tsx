import React, { useRef, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';

import PickerLugar from './components/PickerLugar'
import PickerCategoria from './components/PickerCategoria'



import {
    Container,
    Title,    
    ContainerForm,
    SectionButtons,
    ButtonDespesa,
    ButtonReceita,
    InputControl,
    TextInput,
    Label,
    TextButton,
    Header,
    ButtonTransferencia

} from './styles'

const FormLancamento = () => {

    return (
        <ScrollView>
            <StatusBar backgroundColor={'#EE4266'}/>
            <Container>
                <Header>
                    <Title>Adicionar Lançamento</Title>
                    <SectionButtons>
                        <ButtonDespesa><TextButton>despesa</TextButton></ButtonDespesa>
                        <ButtonReceita><TextButton>receita</TextButton></ButtonReceita>
                        <ButtonTransferencia><TextButton>transferência</TextButton></ButtonTransferencia>
                    </SectionButtons>
                </Header>

                <ContainerForm>

                    <InputControl>
                        <Label>Descrição</Label>
                        <TextInput
                            placeholder="Mercadinho"></TextInput>
                    </InputControl>

                    <InputControl>
                        <Label>Valor(R$) </Label>
                        <TextInput
                            placeholder="R$0,00"></TextInput>
                    </InputControl>

                    <InputControl>
                        <Label>Para onde será lançado?</Label>

                        <PickerLugar />
                    </InputControl>

                    <InputControl>
                        <Label>Categoria</Label>

                        <PickerCategoria />
                    </InputControl>

                    <InputControl>
                        <Label>Parcelas</Label>
                        <TextInput
                            placeholder="1"></TextInput>
                    </InputControl>

                    <InputControl>
                        <Label>Vencimento</Label>
                        <TextInput
                            placeholder="21/12/2021"></TextInput>
                    </InputControl>


                </ContainerForm>
            </Container>
        </ScrollView>
    );
};

export default FormLancamento;