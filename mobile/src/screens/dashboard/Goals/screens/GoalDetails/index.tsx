import React, { useState, useEffect, useRef } from 'react';
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
  BtnGroup
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

import { colors, fonts, metrics } from '../../../../../styles';
import TabNavigator from '../../../../../navigation/TabNavigator/';
import { Modalize as Modal } from 'react-native-modalize';
import Modalize from '../../../../../components/Modalize';

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

  let percentageBalance = 100
  let days = 0
  
  if(goal.dataFimMeta) {
    const objDataFimMeta = toDate(goal.dataFimMeta); 
     
    const objDataIniMeta = toDate(goal.dataInicioMeta);
  
    // Subtrai uma data pela outra
    const diff = Math.abs(objDataFimMeta.getTime() - objDataIniMeta.getTime()); 
  
    // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    days = Math.ceil(diff / (1000 * 60 * 60 * 24));
   
    // Algum cálculo para calcular a porcentagem aqui
    percentageBalance = (goal.saldoAtualMeta * 100) / goal.saldoFinalMeta;
    const percBalance = percentageBalance / 100; 
    const saldo = (goal.saldoAtualMeta);
  }

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('Main'),
    );
    return true;
  };

  const modalizeRef = useRef<Modal>(null);

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  const closeModalize = () => {
    modalizeRef.current?.close();
  };

  const excluir = () => {
    handleRemoveGoalById(goal.id);
    navigation.dispatch(StackActions.replace('Main'));
    Toast.show({
      type: 'niceToast',
      props: {
        type: 'success',
        title: 'Excluido!',
        message: 'Meta excluida com sucesso',
      },
    });
  }
  
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

        <ProgressBar
        progress={percentageBalance / 100}
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
          <DaysLeft>
              <Icon name="exclamation" color="#525252" size={22} /> Faltam {days} dias
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
            backgroundColor: '#EEEEEE',
          }}
        />
    
        <Button
          onPress={() => { 
            openModalize();
        }}
          title="Excluir"
          color="#ee4266"
          style={{
            marginBottom: 10,
            marginTop: 10,
            backgroundColor: '#EEEEEE',
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
            backgroundColor: '#EEEEEE',
          }}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        title="Tem certeza que deseja excluir esta meta?"
        hasBodyBoundaries>
        <BtnGroup>
          <Button
            title="Excluir"
            onPress={excluir}
            color={colors.platinum}
            style={{width: '50%', marginRight: '5%', backgroundColor: colors.paradisePink}}
          />
          <Button
            title="Cancelar"
            onPress={() =>{
              closeModalize();
            }}
            backgroundColor={colors.platinum}
            color={colors.darkGray}
            style={{width: '50%'}}
          />
        </BtnGroup>
      </Modalize>
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
