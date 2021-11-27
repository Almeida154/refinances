import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  GoalDate,
  TextGoals,
  TextGoalsH,
  TextGoalsLighter,
  TextProgress,
  TextRS,
  TextValor,
  Valor,
  BtnGroup,
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
import ShortHeader from '../../../../../components/ShortHeader';
import doubleToCurrency from '../../../../../helpers/doubleToCurrency';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import hexToRGB from '../../../../../helpers/hexToRgba';
import {
  DaysLeft,
  IconContainer,
  Subtitle,
} from '../../../../../components/GoalItem/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<GoalsStack, 'GoalDetails'>;

const GoalDetails = ({ route, navigation }: Props) => {
  const [goal, setGoal] = useState({} as Meta);

  const { handleGetGoalById } = UseMetas();
  const { handleRemoveGoalById } = UseMetas();

  useEffect(() => {
    (async () => {
      const goal = await handleGetGoalById(route.params?.goalId);
      // @ts-ignore
      setGoal(goal);
      //console.debug('O GOAL AQUI Ó:::: ', goal);
    })();
  }, []);

  let percentageBalance = 100;
  let days = 0;

  if (goal.dataFimMeta) {
    const objDataFimMeta = toDate(goal.dataFimMeta);

    const objDataIniMeta = toDate(goal.dataInicioMeta);

    // Subtrai uma data pela outra
    const diff = Math.abs(objDataFimMeta.getTime() - objDataIniMeta.getTime());

    // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    // Algum cálculo para calcular a porcentagem aqui
    percentageBalance = (goal.saldoAtualMeta * 100) / goal.saldoFinalMeta;
    const percBalance = percentageBalance / 100;
    const saldo = goal.saldoAtualMeta;
  }

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Main'));
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
  };

  return (
<<<<<<< HEAD
    <ScrollView style={{ paddingTop: '5%', backgroundColor: colors.cultured }}>
      <Header 
        backButton={backAction} 
        color={colors.silver}
        title="" />
=======
    <ScrollView
      style={{
        paddingTop: metrics.default.statusBarHeight,
        backgroundColor: colors.cultured,
      }}>
      <ShortHeader onBackButton={backAction} title={goal.descMeta} />
>>>>>>> 25aaaa6a65f8e24264778a6b523f90e10ce0ca9a

      {/* {console.debug('ROUTE:::: ', route)} */}

      <View style={styles.container}>
        <Valor>
          <TextRS>R$</TextRS>
          <TextValor>
            {doubleToCurrency(goal.saldoAtualMeta || 0, 'pt-br', 'BRL', true)}
          </TextValor>
        </Valor>

        <ProgressBar
          progress={percentageBalance / 100}
          color={colors.redCrayola}
          style={{
            height: 10,
            marginVertical: 8,
            borderRadius: 10,
          }}
        />

        <TextProgress>
          Você já progrediu sua meta em
          <TextGoals> {percentageBalance.toFixed(1)}% </TextGoals>
          de{' '}
          <TextGoals>
            {doubleToCurrency(goal.saldoFinalMeta || 0, 'pt-br', 'BRL', true)}
          </TextGoals>
        </TextProgress>

        <View
          style={{
            backgroundColor: hexToRGB(colors.platinum, 0.4),
            marginVertical: heightPixel(80),
            padding: metrics.default.boundaries / 1.6,
            borderRadius: widthPixel(20),
          }}>
          <Subtitle>
            <IconContainer>
              <MaterialCommunityIcons
                name="exclamation"
                color={hexToRGB(colors.davysGrey)}
                size={widthPixel(30)}
              />
            </IconContainer>
            <DaysLeft>Faltam {days} dias</DaysLeft>
          </Subtitle>

          <GoalDate>
            <TextGoalsH>Início</TextGoalsH>
            <TextGoalsLighter>{goal.dataInicioMeta}</TextGoalsLighter>
          </GoalDate>

          <GoalDate>
            <TextGoalsH>Previsão</TextGoalsH>
            <TextGoalsLighter>{goal.dataFimMeta}</TextGoalsLighter>
          </GoalDate>
        </View>

        <Button
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('GoalsStack', {
                screen: 'InvestGoals',
                params: { goalId: goal.id },
              }),
            );
          }}
          title="Depositar"
          color={colors.budGreen}
          style={{
            backgroundColor: colors.culture,
          }}
        />

        <Button
          onPress={() => {
            openModalize();
          }}
          title="Excluir"
          color={colors.paradisePink}
          style={{
            backgroundColor: colors.culture,
          }}
          lastOne
        />

        <Button
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('GoalsStack', {
                screen: 'EditGoals',
                params: { goalId: goal.id },
              }),
            );
          }}
          title="Editar"
          color={colors.darkGray}
          style={{
            backgroundColor: colors.culture,
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
            style={{
              width: '50%',
              marginRight: '5%',
              backgroundColor: colors.paradisePink,
            }}
          />
          <Button
            title="Cancelar"
            onPress={() => {
              closeModalize();
            }}
            backgroundColor={colors.platinum}
            color={colors.darkGray}
            style={{ width: '50%' }}
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
