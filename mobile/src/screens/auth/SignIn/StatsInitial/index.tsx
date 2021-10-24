import React, { useEffect, useState } from 'react';

import { BackHandler } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Content,
  PieContainer,
  Title,
  SubTitle,
  Pic,
  LabelContainer,
  LabelIcon,
  LabelSubtitle,
} from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

import PieChart from 'react-native-pie-chart';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'StatsInitial'>;
  route: RouteProp<RootStackParamAuth, 'StatsInitial'>;
};

const StatsInitial = ({ route, navigation }: PropsNavigation) => {
  const [totalIncome, setTotalIncome] = useState(80);
  const [totalExpense, setTotalExpense] = useState(20);

  const [expensePercentage, setExpensePercentage] = useState<number>(0);

  const { setupUserData, updateSetupUserDataProps, user, handleRegister } =
    UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    console.debug('Json final:::: ', JSON.stringify(setupUserData));

    const income = calculateTotal('receita');
    const expense = calculateTotal('despesa');

    setTotalIncome(income);
    setTotalExpense(expense);

    let percentage = ((totalExpense * 100) / totalIncome).toFixed(0);
    setExpensePercentage(parseInt(percentage));
  }, [expensePercentage, totalIncome, totalExpense]);

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

  const register = async () => {
    await handleRegister();
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
        <Title>Está indo muito bem, {user.nomeUsuario}!</Title>
        <SubTitle>Você gasta {expensePercentage}% daquilo que recebe.</SubTitle>
        <PieContainer>
          {console.log(totalExpense, totalIncome)}
          <PieChart
            widthAndHeight={250}
            series={[totalIncome, totalExpense]}
            sliceColor={[colors.bigDipOruby, colors.paradisePink]}
            doughnut
            coverRadius={0.65}
            coverFill={'#FFF'}
          />
          {user.fotoPerfilUsuario == null ? (
            <Pic
              source={require('../../../../assets/images/avatarDefault.png')}
            />
          ) : (
            <Pic
              style={{
                borderWidth: 6,
                borderColor: colors.silver,
              }}
              source={{ uri: user.fotoPerfilUsuario }}
            />
          )}
        </PieContainer>

        <LabelContainer>
          <LabelIcon style={{ backgroundColor: colors.bigDipOruby }} />
          <LabelSubtitle>O que você recebe (R$ {totalIncome})</LabelSubtitle>
        </LabelContainer>

        <LabelContainer>
          <LabelIcon style={{ backgroundColor: colors.paradisePink }} />
          <LabelSubtitle>Gastos fixos (R$ {totalExpense})</LabelSubtitle>
        </LabelContainer>
      </Content>

      <BottomNavigation
        onPress={() => register()}
        description="Quero começar"
        color={colors.white}
        backgroundColor={colors.paradisePink}
        isCentered
      />
    </Container>
  );
};

export default StatsInitial;
