import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

import {FormLancamentoStack} from '../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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


export type PropsNavigation = {
    navigation: StackNavigationProp<FormLancamentoStack, "Main">,    
    route: RouteProp<FormLancamentoStack, "Main">,
    tipoLancamento: string,
    valor: string,
    setValor: React.Dispatch<React.SetStateAction<string>>
    
}

const FormLancamento = ({route, navigation}: PropsNavigation) => {
    const [selected, setSelected] = useState(0)
    navigation.setOptions({headerShown: false})

    const [stateReload, setStateReload] = useState(false)

    const [valor, setValor] = useState('')

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            console.log("Focus do FormCadastro ativado")
            setStateReload(false)
            return 
        })

        

        const blur = navigation.addListener('blur', () => {
            console.log("blur do FormCadastro ativado")
            setStateReload(true)
        })
        
        console.log("stateReload", stateReload)
    }, [navigation])

    return (
        <ScrollView>
            <StatusBar backgroundColor={selected == 0? '#EE4266' : selected == 1 ? '#6CB760' : '#333333'}/>
            {
                stateReload ? <Text style={{fontSize: 50}}>Carregando</Text> :            
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
                        selected == 0 && <FormCadastro route={route} navigation={navigation} valor={valor} setValor={setValor} tipoLancamento={"despesa"}/>   
                
                    }
                    {
                        selected == 1 && <FormCadastro route={route} navigation={navigation} valor={valor} setValor={setValor}  tipoLancamento={"receita"}/>   
                    }
                    {
                        selected == 2 && <FormTransferencia route={route} navigation={navigation} valor={valor} setValor={setValor}  tipoLancamento="Nenhum"/>   
                    }

                </Container>
            }
        </ScrollView>
    );
};

export default FormLancamento;