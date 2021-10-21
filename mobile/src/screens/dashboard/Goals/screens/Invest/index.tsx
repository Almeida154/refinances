/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';
 import {
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   TouchableHighlight,
   View,
 } from 'react-native';

 import {GoalsStack} from '../../../../../@types/RootStackParamApp'
 import { StackNavigationProp } from '@react-navigation/stack'
import Button from '../../../../../components/Button';

import { 
  AlinhaParaDireita, 
  InputControlValue,
  LabelCifrao, 
  TextInputValue,
  Header} from '../../../Entries/styles'
import InputText from '../../../../../components/InputText';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import PickerContas from '../../../Entries/components/PickerCategoria'

import PickerMetas from './PickerMetas'

 type PropsGoals = {
    navigation: StackNavigationProp<GoalsStack, "InvestGoals">
 }
 
 const Invest = ({navigation}: PropsGoals) => {
 
    const [valorDeposito, setValor] = useState('');
    const [errorValor, setErrorValor] = useState<any | null>(null);

    const [idMeta, setMeta] = useState('');
    const [errorMeta, setErrorMeta] = useState<any | null>(null);

    const [selectedConta, setSelectedConta] = useState(0)
 
   return (
     <ScrollView style={{backgroundColor: '#f6f6f6'}}>

      <StatusBar backgroundColor={'#ee4266'}/>
      <Header style={{backgroundColor:'#ee4266'}}>
        <AlinhaParaDireita>
            <View></View>
            <InputControlValue>
                <LabelCifrao>R$</LabelCifrao>    
                <TextInputValue
                  keyboardType='numeric'
                  placeholder="00,00"
                  placeholderTextColor="#fff"
                  value={valorDeposito}
                  onChangeText={setValor}                                
                    />
            </InputControlValue>
        </AlinhaParaDireita>
      </Header>

      <View style={styles.container}>

          {/* Adicionar o picker de metas aqui, pré-selecionando a que o user clicou p depositar 
          
          <PickerMetas changeGoal={meta}/>
          */}
          <InputText
            value={idMeta}
            label="Qual a meta?"
            error={errorMeta}
            showClearIcon={idMeta != ''}
            keyboardType={'numeric'}
            placeholder={'Id: 1'}
            onClear={() => {
              setErrorMeta(null);
              setMeta('');
            }}
            onChangeText={txt => {
              setErrorMeta(null);
              setMeta(txt);
            }}/>

          {/* Adicionar o picker de contas aqui 
          <InputText
            value={valorDeposito}
            label="Escolha uma conta"
            error={errorValor}
            showClearIcon={valorDeposito != ''}
            onClear={() => {
              setErrorValor(null);
              setValor('');
            }}/>

          <PickerContas conta={selectedConta} setConta={setSelectedConta}/>*/}

          <Button
            title={'Investir'}
            style={{marginTop: 30}}
            onPress={() => console.log('btn investir')}>
          </Button>
 
       </View>
     </ScrollView>
     
   );
 };
 
 const styles = StyleSheet.create({
 
   container: {
     padding: '10%'
   },

 });
 
 export default Invest;
 