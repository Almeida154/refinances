import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, ScrollView, StatusBar, View } from 'react-native';

import {FormLancamentoStack} from '../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';


import FormCadastro from './components/FormCadastro'
import FormTransferencia from './components/TransferForm'

import {
    Container,
    InputControlValue,
    LabelCifrao,
    AlinhaParaDireita,
    TextInputValue,
    Header,
    TextButton,
    Buttons,
    SectionButtons
} from './styles'
import { Text } from '../../../components/Button/styles';
import { UseDadosTemp } from '../../../contexts/TemporaryDataContext';
import { Conta } from '../../../contexts/AccountContext';
import { Categoria } from '../../../contexts/CategoriesContext';
import { ReadParcela } from '../../../contexts/InstallmentContext';

export interface PropsNavigation {     
    tipoLancamento: string,
    valor: string,
    setValor: React.Dispatch<React.SetStateAction<string>>
    receiveEntry?: ReadParcela
}

const FormLancamento = ({route}: any) => {
    const receiveEntry: ReadParcela = route.params?.receiveEntry        
    console.debug('receiveEntry', receiveEntry)
    const [selected, setSelected] = useState(receiveEntry ? receiveEntry.lancamentoParcela.tipoLancamento == 'despesa' ? 0 : 1 : 0)    
    
    const {navigation} = UseDadosTemp()
    navigation.setOptions({headerShown: false})
    
    const [valor, setValor] = useState(receiveEntry?.valorParcela ? String(receiveEntry.valorParcela) : '')
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', backAction);
      }, []);
    
      const backAction = () => {
        navigation.dispatch(StackActions.replace('Main', {screen: 'Home'}));
        
        return true;
      };

    return (
        <ScrollView
            style={{height: '100%'}}>
            <StatusBar backgroundColor={selected == 0? '#EE4266' : selected == 1 ? '#6CB760' : '#333333'}/>
            {
                <Container>
                    <Header style={{backgroundColor: selected == 0? '#EE4266' : selected == 1 ? '#6CB760' : '#333333'}}>
                    <AlinhaParaDireita>
                        <View></View>
                        <InputControlValue>
                            <LabelCifrao>R$</LabelCifrao>    
                                <TextInputValue
                                    keyboardType='numeric'
                                    placeholder="00,00"
                                    placeholderTextColor="#fff"
                                    value={valor}
                                    onChangeText={setValor}                                
                                />
                        </InputControlValue>
                    </AlinhaParaDireita>
                        <SectionButtons>
                            <Buttons onPress={() => setSelected(0)} style={{backgroundColor: selected == 0? '#EE4266' : selected == 1 ? '#6CB760' : '#333333'}}><TextButton>despesa</TextButton></Buttons>
                            <Buttons onPress={() => setSelected(1)} style={{backgroundColor: selected == 0? '#EE4266' : selected == 1 ? '#6CB760' : '#333333'}}><TextButton>receita</TextButton></Buttons>
                            <Buttons onPress={() => setSelected(2)} style={{backgroundColor: selected == 0? '#EE4266' : selected == 1 ? '#6CB760' : '#333333'}}><TextButton>transferência</TextButton></Buttons>
                        </SectionButtons>
                    </Header>
                    
                    {
                        selected == 0 && <FormCadastro receiveEntry={receiveEntry} valor={valor} setValor={setValor} tipoLancamento={"despesa"}/>   
                
                    }
                    {
                        selected == 1 && <FormCadastro receiveEntry={receiveEntry} valor={valor} setValor={setValor}  tipoLancamento={"receita"}/>   
                    }
                    {
                        selected == 2 && <FormTransferencia valor={valor} setValor={setValor}  tipoLancamento="transferencia"/>   
                    }

                </Container>
            }
        </ScrollView>
    );
};

export default FormLancamento;