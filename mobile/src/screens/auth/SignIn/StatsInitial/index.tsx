import React, { useEffect, useState } from 'react';

import { BackHandler, Text, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content } from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'StatsInitial'>;
  route: RouteProp<RootStackParamAuth, 'StatsInitial'>;
};

const StatsInitial = ({ route, navigation }: PropsNavigation) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const { setupUserData, updateSetupUserDataProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    setTotalIncome(calculateTotal('receita'));
    setTotalExpense(calculateTotal('despesa'));
    setBalance(calculateTotal('receita') - calculateTotal('despesa'));
  }, []);

  const calculateTotal = (type: string) => {
    const totIn = setupUserData.entries.filter(
      entry => entry.tipoLancamento == type,
    );
    const inAmount = totIn.map(
      totIn => totIn.parcelasLancamento[0].valorParcela,
    );

    let totalInAmount = 0;

    for (let i = 0; i < inAmount.length; i++) totalInAmount += inAmount[i];

    return totalInAmount;
  };

  const backAction = () => {
    navigation.dispatch(StackActions.replace('EachFixedIncomeCategory'));
    const userData = setupUserData;
    userData.incomeTagsCount--;
    updateSetupUserDataProps(userData);
    return true;
  };

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Tudo pronto!"
        subtitle="Veja seu rendimento abaixo"
        hasShadow
      />
      <Content>
        <Text>Receita por mês: R$ {totalIncome}</Text>
        <Text>Despesa por mês: R$ {totalExpense}</Text>
        <Text>Saldo: R$ {balance}</Text>
      </Content>
      <BottomNavigation
        description="Quero começar"
        color={colors.white}
        backgroundColor={colors.paradisePink}
        isCentered
      />
    </Container>
  );
};

export default StatsInitial;
