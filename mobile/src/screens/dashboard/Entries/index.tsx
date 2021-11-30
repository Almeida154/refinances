import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, ScrollView, StatusBar, View } from 'react-native';

import {FormLancamentoStack} from '../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import FormCadastro from './components/FormCadastro'
import FormTransferencia from './components/TransferForm'

import {colors, fonts, metrics} from '../../../styles'

import HeaderTop from '../../../components/Header';

import CurrencyInput from 'react-native-currency-input';

import {
    Container,
    LabelCifrao,
    AlinhaParaDireita,
    Header,
    TextButton,
    Buttons,
    SectionButtons
} from './styles'

import { UseDadosTemp } from '../../../contexts/TemporaryDataContext';

import { Categoria } from '../../../contexts/CategoriesContext';
import { Lancamento, UseLancamentos } from '../../../contexts/EntriesContext';
import { ReadParcela } from '../../../contexts/InstallmentContext';
import { Valor } from '../Goals/screens/Invest/styles';
import { heightPixel } from '../../../helpers/responsiveness';

export interface PropsNavigation {     
    tipoLancamento: string,
    valor: string,
    setValor: React.Dispatch<React.SetStateAction<string>>
    receiveEntry?: Lancamento
}


const FormLancamento = ({route}: any) => {    
    let receiveEntry: Lancamento | undefined = route.params?.receiveEntry                    

    const [selected, setSelected] = useState(receiveEntry ? receiveEntry.tipoLancamento == 'despesa' ? 0 : 1 : 0)    
    
    const {navigation} = UseDadosTemp()
    navigation.setOptions({headerShown: false})
    
    console.debug("FormLancamento | receiveEntry", receiveEntry)
    const [valor, setValor] = useState(receiveEntry?.totalParcelas ? String(receiveEntry.totalParcelas.toFixed(2)) : '0')
    
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
            style={{height: '100%', width: '100%'}}>
            <StatusBar backgroundColor={selected == 0? colors.paradisePink : selected == 1 ? colors.budGreen : colors.jet}/>
            {
                <Container>
                    <Header style={{backgroundColor: selected == 0? colors.paradisePink : selected == 1 ? colors.budGreen : colors.jet}}>

                    <HeaderTop 
                        backButton={backAction} 
                        title=""
                        isShort
                    />

                    <AlinhaParaDireita>

                            <LabelCifrao>R$</LabelCifrao> 

                            <CurrencyInput
                                value={parseFloat(valor)}
                                onChangeValue={txt => setValor(txt?.toString())}
                                style={{
                                    color: colors.white,
                                    fontFamily: fonts.familyType.bold,
                                    fontSize: fonts.size.super +20,
                                    opacity: 0.6,
                                    position: 'absolute',
                                    right: 0,
                                    marginTop: heightPixel(200)
                                }}
                                delimiter="."
                                separator=","
                                precision={2}
                                maxValue={999999}
                                placeholderTextColor={colors.white}
                                selectionColor={colors.white}
                                onChangeText={formattedValue => {
                                    formattedValue == '' ? setValor((0).toString()) : setValor(valor);
                                }}
                                />
                        </AlinhaParaDireita>

                        <SectionButtons>
                            <Buttons onPress={() => setSelected(0)} style={{backgroundColor: selected == 0? colors.paradisePink : selected == 1 ? colors.budGreen : colors.jet}}><TextButton>despesa</TextButton></Buttons>
                            <Buttons onPress={() => setSelected(1)} style={{backgroundColor: selected == 0? colors.paradisePink : selected == 1 ? colors.budGreen : colors.jet}}><TextButton>receita</TextButton></Buttons>
                            <Buttons onPress={() => setSelected(2)} style={{backgroundColor: selected == 0? colors.paradisePink : selected == 1 ? colors.budGreen : colors.jet}}><TextButton>transferência</TextButton></Buttons>
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