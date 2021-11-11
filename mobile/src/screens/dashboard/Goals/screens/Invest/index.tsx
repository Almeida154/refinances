/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, View } from 'react-native';

import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../../../../components/Button';
import { Goal } from '../TabNavigator/styles';


import global from '../../../../../global';
import Toast from 'react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp, StackActions } from '@react-navigation/native';


import {
  AlinhaParaDireita,
  InputControlValue,
  LabelCifrao,
  TextInputValue,
  Header,
} from '../../../Entries/styles';

import {
  TextGoals,
  TextProgress
} from './styles';

import HeaderTop from '../components/Header';
import InputText from '../../../../../components/InputText';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import PickerContas from '../../../Entries/components/PickerContas';
import { Conta } from '../../../../../contexts/AccountContext';
import { Parcela, UseParcelas } from '../../../../../contexts/InstallmentContext';

export type PropsNavigation = {
  navigation: StackNavigationProp<GoalsStack, 'InvestGoals'>;
  route: RouteProp<GoalsStack, 'InvestGoals'>;
};

const Invest = ({ navigation, route }: PropsNavigation) => {
  const [valorDeposito, setValor] = useState('');
  const [errorValor, setErrorValor] = useState<any | null>(null);

  const [selectedConta, setSelectedConta] = useState<Conta | null>(null);

  const [goal, setGoal] = useState({} as Meta);

  const { handleGetGoalById } = UseMetas();
  const { handleAtualizarMeta } = UseMetas();
  const { handleAdicionarParcela } = UseParcelas();

  useEffect(() => {
    (async () => {
      const goal = await handleGetGoalById(route.params?.goalId);
      setGoal(goal);

      console.debug('O GOAL AQUI Ó:::: ', goal);

      console.log("conta: "+selectedConta);
    })();
  }, []);

  async function handleUpdateGoal() {
    console.log(goal.lancamentoMeta)
    
    const newGoal = {
      descMeta: goal.descMeta,
      saldoFinalMeta: goal.saldoFinalMeta,
      saldoAtualMeta: novoSaldo(),
      dataInicioMeta: goal.dataInicioMeta,
      dataFimMeta: goal.dataFimMeta,
      realizacaoMeta: goal.realizacaoMeta,
      userMetaId: await retornarIdDoUsuario(),
      lancamentoMeta: goal.lancamentoMeta
    } as Meta;
    

    const newParcela = {
      contaParcela: selectedConta,
      dataParcela: new Date(Date.now()),
      lancamentoParcela: goal.lancamentoMeta.id,
      statusParcela: true,
      valorParcela: parseFloat(valorDeposito),      
    } as Parcela

    if(parseFloat(valorDeposito) <= 0 || valorDeposito == ''){
      ToastAndroid.show("Insira um valor válido!", ToastAndroid.SHORT)
    } 
    else{
      const responseMeta = await handleAtualizarMeta(newGoal, goal.id);
      
      const responseParcela = await handleAdicionarParcela([newParcela])

      if(responseParcela == '') {
        
        Toast.show({
          type: 'niceToast',
          props: {
            type: 'success',
            title: 'Foi!',
            message: 'Depósito realizado com sucesso!',
          },
        });
        navigation.dispatch(StackActions.replace('Main'))

      } else {
        ToastAndroid.show(responseParcela, ToastAndroid.SHORT)
      }
    }
  }

  const novoSaldo = () => {        
    return goal.saldoAtualMeta + parseFloat(valorDeposito);
  };

  const backAction = () => {
    navigation.dispatch(StackActions.replace('GoalsStack', {screen: 'GoalsList'}))
    return true;
  };

  function changeAccount(conta: Conta | null) {
    setSelectedConta(conta)
  }

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
      <StatusBar backgroundColor={'transparent'} />
      <Header style={{ backgroundColor: '#ee4266' }}>
      <HeaderTop onBackButton={backAction} title=""/>
        
        <AlinhaParaDireita>
          <View></View>
          <InputControlValue>
            <LabelCifrao>R$</LabelCifrao>
            <TextInputValue
              keyboardType="numeric"
              placeholder="00,00"
              placeholderTextColor="#fff"
              value={valorDeposito}
              onChangeText={setValor}
            />
          </InputControlValue>
        </AlinhaParaDireita>
      </Header>

      <View style={styles.container}>
      <TextProgress>
          Você já depositou 
          <TextGoals style={{left: '40%'}}> R$ {(goal.saldoFinalMeta)} </TextGoals>
          em sua meta
      </TextProgress>
        
        <PickerContas conta={selectedConta} changeAccount={changeAccount} tipoLancamento="despesa"/>

        <Button
          title={'Investir'}
          style={{ marginTop: 30 }}
          onPress={handleUpdateGoal}></Button>
      </View>
      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '10%',
  },
});

export default Invest;
