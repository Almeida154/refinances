/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { useTheme } from 'styled-components/native'; 
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../../../../components/Button';
import { Goal } from '../TabNavigator/styles';

import global from '../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';

import {colors, fonts, metrics} from '../../../../../styles'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import {
  AlinhaParaDireita,
  InputControlValue,
  LabelCifrao,
  TextInputValue,
  Header,
} from '../../../Entries/styles';

import { TextGoals, TextProgress } from './styles';

import HeaderTop from '../../../../../components/Header';
import InputText from '../../../../../components/InputText';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import PickerContas from '../../../Entries/components/PickerContas';
import { Conta } from '../../../../../contexts/AccountContext';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';

import {
  Parcela,
  UseParcelas,
} from '../../../../../contexts/InstallmentContext';

import CurrencyInput from 'react-native-currency-input';

export type PropsNavigation = {
  navigation: StackNavigationProp<GoalsStack, 'InvestGoals'>;
  route: RouteProp<GoalsStack, 'InvestGoals'>;
};

const Invest = ({ navigation, route }: PropsNavigation) => {
  const [valorDeposito, setValor] = useState('');
  const [errorValor, setErrorValor] = useState<any | null>(null);

  const [selectedConta, setSelectedConta] = useState<Conta | null>(null);

  const [goal, setGoal] = useState({} as Meta);

  const {showNiceToast} = UseDadosTemp()
  const { handleGetGoalById } = UseMetas();
  const { handleAtualizarMeta } = UseMetas();
  const { handleAdicionarParcela } = UseParcelas();

  useEffect(() => {
    (async () => {
      const goal = await handleGetGoalById(route.params?.goalId);
      setGoal(goal);

      console.debug('O GOAL AQUI Ó:::: ', goal);

      console.log('conta: ' + selectedConta);
    })();
  }, []);

  async function handleUpdateGoal() {

    const newGoal = {
      descMeta: goal.descMeta,
      saldoFinalMeta: goal.saldoFinalMeta,
      saldoAtualMeta: novoSaldo(),
      dataInicioMeta: goal.dataInicioMeta,
      dataFimMeta: goal.dataFimMeta,
      realizacaoMeta: goal.realizacaoMeta,
      userMetaId: await retornarIdDoUsuario(),
      lancamentoMeta: goal.lancamentoMeta,
    } as Meta;

    const newParcela = {
      contaParcela: selectedConta,
      dataParcela: new Date(Date.now()),
      lancamentoParcela: goal.lancamentoMeta.id,
      statusParcela: sttsParcela(),
      valorParcela: parseFloat(valorDeposito),
    } as Parcela;

    if (parseFloat(valorDeposito) <= 0 || valorDeposito == '') {
      showNiceToast("error", "Erro!", 'Insira os dados corretamente!')
      
    } else {
      const responseMeta = await handleAtualizarMeta(newGoal, goal.id);

      const responseParcela = await handleAdicionarParcela([newParcela]);

      if (responseParcela == '') {
        showNiceToast('success', 'Foi!', 'Depósito realizado com sucesso!')        
        navigation.dispatch(StackActions.replace('GoalsStack', { screen: 'GoalsList' }),);
      } else {
        ToastAndroid.show(responseParcela, ToastAndroid.SHORT);
      }
    }
  }
  const sttsParcela = () =>{
    if(novoSaldo() < goal.saldoFinalMeta){
      //se nao concluiu continua false
      return false;
    }
    else if(novoSaldo() >= goal.saldoFinalMeta){
      //se concluiu manda true
      return true;
    }
  }
  const novoSaldo = () => { 
    return goal.saldoAtualMeta + parseFloat(valorDeposito);
  };

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('GoalsStack', { screen: 'GoalsList' }),
    );
    return true;
  };
  function changeAccount(conta: Conta | null) {
    setSelectedConta(conta);
  }
  const saldoA = goal.saldoAtualMeta
  const saldoF = goal.saldoFinalMeta
  const saldoD = (goal.saldoFinalMeta - goal.saldoAtualMeta)

  function testeConcluido(){
    if(goal.saldoFinalMeta > goal.saldoAtualMeta){
      return <TextProgress>
                Faltam
                <TextGoals style={{ left: '40%' }}>
                  {' R$ '}
                  {saldoD.toFixed(2)}{' '}
                </TextGoals>
                para concluir { goal.descMeta }
              </TextProgress>
    }else{
      return <TextProgress>
                Parabens por concluir a meta { goal.descMeta } de
                <TextGoals style={{ left: '40%' }}>
                  {' R$ '}
                  {saldoF}{' '}
                </TextGoals>
                sendo investido um total de 
                <TextGoals style={{ left: '40%' }}>
                  {' R$ '}
                  {saldoA}{' '}
                </TextGoals>
              </TextProgress>
    }
  }
  const theme: any = useTheme()

  return (
    <ScrollView style={{ backgroundColor: theme.colors.cultured }}>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <Header style={{ backgroundColor: theme.colors.paradisePink }}>
        <HeaderTop 
        backButton={backAction} 
        color={theme.colors.silver}
        title="" />
        <AlinhaParaDireita>

          <LabelCifrao>R$</LabelCifrao> 

          <CurrencyInput
              value={parseFloat(valorDeposito)}
              onChangeValue={txt => setValor(txt?.toString())}
              style={{
                  alignContent: 'flex-end',
                  alignItems: 'flex-end',
                  color: theme.colors.silver,
                  fontFamily: fonts.familyType.bold,
                  fontSize: fonts.size.super +20,
                  opacity: 0.7,
                  width: '100%',
                  marginLeft: 10,
              }}
              textAlign="right"
              delimiter="."
              separator=","
              precision={2}
              maxValue={999999}
              placeholderTextColor={theme.colors.lightGray}
              selectionColor={theme.colors.davysGrey}
              onChangeText={formattedValue => {
                  formattedValue == '' ? setValor((0).toString()) : setValor(valorDeposito);
              }}
              />
          </AlinhaParaDireita>

      </Header>

      <View style={styles.container}>
          {testeConcluido()}

        <PickerContas
          conta={selectedConta}
          changeAccount={changeAccount}
          tipoLancamento="despesa"
        />

        <Button
          title={'Investir'}
          style={{ marginTop: 30, backgroundColor: theme.colors.culture }}
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
