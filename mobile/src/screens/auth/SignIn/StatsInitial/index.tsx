import React, { useEffect, useState } from 'react';

import { BackHandler } from 'react-native';

import api from '../../../../services/api';

import global from '../../../../global';

import { UseAuth } from '../../../../contexts/AuthContext';
import retornarIdDoUsuario from '../../../../helpers/retornarIdDoUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

import { LineChart } from 'react-native-charts-wrapper';
import { Categoria } from '@contexts/CategoriesContext';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'StatsInitial'>;
  route: RouteProp<RootStackParamAuth, 'StatsInitial'>;
};

const StatsInitial = ({ route, navigation }: PropsNavigation) => {
  const [totalIncome, setTotalIncome] = useState(80);
  const [totalExpense, setTotalExpense] = useState(20);

  const [expensePercentage, setExpensePercentage] = useState<number>(0);

  const {
    setupUser,
    updateSetupUserProps,
    user,
    handleRegister,
    updateUserProps,
  } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    console.debug('Json final:::: ', JSON.stringify(setupUser));

    const income = calculateTotal('receita');
    const expense = calculateTotal('despesa');

    setTotalIncome(income);
    setTotalExpense(expense);

    let percentage = ((totalExpense * 100) / totalIncome).toFixed(0);
    setExpensePercentage(parseInt(percentage));
  }, [expensePercentage, totalIncome, totalExpense]);

  const calculateTotal = (type: string) => {
    const totIn = setupUser.entries.filter(
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
    const newSetupProps = setupUser;
    newSetupProps.incomeTagsCount--;
    updateSetupUserProps(newSetupProps);
    return true;
  };

  const register = async () => {
    const response = await handleRegister();

    console.log('response', response);

    const idUser = await retornarIdDoUsuario();

    console.log(idUser);

    // @ts-ignore
    const logUser = JSON.parse(await AsyncStorage.getItem('user'));

    var defaultCategoriesIncome = global.DEFAULT_INCOME_CATEGORIES.map(
      category => {
        let cat = {} as Categoria;
        cat.nomeCategoria = category.description;
        cat.corCategoria = category.color;
        cat.iconeCategoria = category.icon;
        cat.tetoDeGastos = null;
        cat.tipoCategoria = 'receita';
        cat.isSelected = false;
        return cat;
      },
    );

    var defaultCategories = global.DEFAULT_EXPENSE_CATEGORIES.map(category => {
      let cat = {} as Categoria;
      cat.nomeCategoria = category.description;
      cat.corCategoria = category.color;
      cat.iconeCategoria = category.icon;
      cat.tetoDeGastos = null;
      cat.tipoCategoria = 'despesa';
      cat.isSelected = false;
      return cat;
    });

    var ctgrs =
      setupUser.createdCategories != undefined
        ? [
            ...setupUser.createdCategories,
            ...defaultCategories,
            ...defaultCategoriesIncome,
          ]
        : [...defaultCategories, ...defaultCategoriesIncome];

    api.post(`/user/setupuser/${idUser}`, {
      entries: setupUser.entries,
      allCategories: ctgrs == undefined ? [] : ctgrs,
    });

    logUser.signed = true;
    updateUserProps(logUser);
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
        <LineChart
          style={{ flex: 1 }}
          data={{
            dataSets: [
              { label: 'demo', values: [{ y: 1 }, { y: 2 }, { y: 1 }] },
            ],
          }}
        />
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
