import React, { useRef, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';

import RootStackParamApp from '../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import FormCadastro from './components/FormCadastro'
import FormTransferencia from './components/TransferForm'

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


export type PropsNavigation = {
    navigation: StackNavigationProp<RootStackParamApp, "Lancamentos">,    
    route: RouteProp<RootStackParamApp, "Lancamentos">,
    tipoLancamento: string
    
}

const FormLancamento = ({route, navigation}: PropsNavigation) => {
    const [selected, setSelected] = useState(0)

    return (
        <ScrollView>
            <StatusBar backgroundColor={'#EE4266'}/>
            <Container>
                <Header>
                    <Title>Adicionar Lançamento</Title>
                    <SectionButtons>
                        <ButtonDespesa onPress={() => setSelected(0)}><TextButton>despesa</TextButton></ButtonDespesa>
                        <ButtonReceita onPress={() => setSelected(1)}><TextButton>receita</TextButton></ButtonReceita>
                        <ButtonTransferencia onPress={() => setSelected(2)}><TextButton>transferência</TextButton></ButtonTransferencia>
                    </SectionButtons>
                </Header>

                {
                    selected == 0 && <FormCadastro route={route} navigation={navigation} tipoLancamento={"despesa"}/>   
            
                }
                {
                    selected == 1 && <FormCadastro route={route} navigation={navigation} tipoLancamento={"receita"}/>   
                }
                {
                    selected == 2 && <FormTransferencia route={route} navigation={navigation} tipoLancamento={"receita"}/>   
                }

            </Container>
        </ScrollView>
    );
};

export default FormLancamento;