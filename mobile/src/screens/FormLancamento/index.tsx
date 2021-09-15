import React, { useRef, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';

import FormDespesa from './components/FormDespesa'



import {
    Container,
    Title,   
    Header,
    TextButton,
    ButtonDespesa,
    ButtonReceita,
    ButtonTransferencia,
    SectionButtons
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

                <FormDespesa />
                
            </Container>
        </ScrollView>
    );
};

export default FormLancamento;