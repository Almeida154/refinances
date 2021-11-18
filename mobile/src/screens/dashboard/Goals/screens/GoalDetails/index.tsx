import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Goal } from '../TabNavigator/styles';

import {
  GoalDate,
  TextGoals,
  TextGoalsH,
  TextGoalsLighter,
  TextProgress,
  TextRS,
  TextValor,
  Title,
  Valor,
  DaysLeft,
} from './styles';

import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

import { ProgressBar } from 'react-native-paper';
import Button from '../../../../../components/Button';

import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';

import { toDate } from '../../../../../helpers/manipularDatas';

import Icon from 'react-native-vector-icons/EvilIcons';
import { StackActions } from '@react-navigation/native';
import Header from '../../../../../components/Header';

type Props = NativeStackScreenProps<GoalsStack, 'GoalDetails'>;

const GoalDetails = ({ route, navigation }: Props) => {

  const [goal, setGoal] = useState({} as Meta);

  const { handleGetGoalById } = UseMetas();
  const { handleRemoveGoalById } = UseMetas();

  useEffect(() => {
    (async () => {
      const goal = await handleGetGoalById(route.params?.goalId);
      setGoal(goal);
      console.debug('O GOAL AQUI Ó:::: ', goal);
    })();
  }, []);

 /*  const objDataFimMeta = toDate(goal.dataFimMeta);
  const objDataIniMeta = toDate(goal.dataInicioMeta);

  // Subtrai uma data pela outra
  const diff = Math.abs(objDataFimMeta.getTime() - objDataIniMeta.getTime()); 

  // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
 */
  // Algum cálculo para calcular a porcentagem aqui
  const percentageBalance = (goal.saldoAtualMeta * 100) / goal.saldoFinalMeta;
  const percBalance = percentageBalance / 100; 
  const saldo = (goal.saldoAtualMeta);

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('Main'),
    );
    return true;
  };

  return (
    <ScrollView style={{ paddingTop: '5%', backgroundColor: '#f6f6f6' }}>
      <Header 
        backButton={backAction} title="" />

      {console.debug('ROUTE:::: ', route)}
      <View style={styles.container}>
        <Title>{goal.descMeta}</Title>

        <Valor>
          <TextRS>R$</TextRS>
          <TextValor>{goal.saldoAtualMeta}</TextValor>
        </Valor>

        {/* Ta dando merda aqui */}
        <ProgressBar
        //progress={percBalance}
        progress={0.1}
        color="#F81650"
        style={{
          height: 10,
          marginVertical: 8,
          borderRadius: 10,
        }}
      />

        <TextProgress>
          Você já progrediu sua meta em
          <TextGoals> {percentageBalance.toFixed(1)}% </TextGoals>
          de <TextGoals>R$ {goal.saldoFinalMeta}</TextGoals>
        </TextProgress>

        <Goal>
          {/* Ta dando merda aqui tbm*/}
          <DaysLeft>
            <Icon name="exclamation" color="#525252" size={22} /> Faltam 14 dias
          </DaysLeft>

          <GoalDate>
            <TextGoalsH>Início</TextGoalsH>
            <TextGoalsLighter>{goal.dataInicioMeta}</TextGoalsLighter>
          </GoalDate>

          <GoalDate>
            <TextGoalsH>Previsão</TextGoalsH>
            <TextGoalsLighter>{goal.dataFimMeta}</TextGoalsLighter>
          </GoalDate>
        </Goal>
        
        <Button
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('GoalsStack', {
              screen: 'InvestGoals',
              params: { goalId: goal.id }
            }));
          }}
          title="Depositar"
          color="#6CB760"
          style={{
            marginBottom: 10,
            marginTop: 10,
            backgroundColor: '#f5f2f3',
          }}
        />

        <Button
          onPress={() => { 
            handleRemoveGoalById(goal.id);
            navigation.dispatch(StackActions.replace('Main'));
            Toast.show({
              type: 'niceToast',
              props: {
                type: 'warning',
                title: 'Excluido!',
                message: 'Meta deletada com sucesso!',
              },
            });
        }}
          title="Excluir"
          color="#ee4266"
          style={{
            marginBottom: 10,
            marginTop: 10,
            backgroundColor: '#f5f2f3',
          }}
        />

        <Button
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('GoalsStack', {
              screen: 'EditGoals',
              params: { goalId: goal.id }
            }));
          }}
          title="Editar"
          color="#444"
          style={{
            marginBottom: 10,
            marginTop: 10,
            backgroundColor: '#f5f2f3',
          }}
        />
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

export default GoalDetails;
