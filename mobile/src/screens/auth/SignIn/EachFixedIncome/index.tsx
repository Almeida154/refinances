import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Content,
  PrefixReaisSymbol,
  Writting,
  Error,
} from './styles';
import { colors, fonts } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import { Lancamento } from '@contexts/EntriesContext';
import { Parcela } from '@contexts/InstallmentContext';

import CurrencyInput from 'react-native-currency-input';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedIncome'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedIncome'>;
};

const EachFixedIncome = ({ navigation }: PropsNavigation) => {
  const [expenseAmount, setExpenseAmount] = useState<number | null>(200);
  const [formattedExpenseAmount, setFormattedExpenseAmount] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setupUserData, updateSetupUserDataProps } = UseAuth();

  const [load, setLoad] = useState(false);

  const [ud, setUd] = useState(setupUserData);

  useEffect(() => {
    if (!navigation || !navigation.addListener) return;

    const unsubscribe = navigation.addListener('focus', () => {
      setLoad(!load);
      setUd(setupUserData);
    });

    navigation.addListener('blur', () => {
      setLoad(!load);
      setUd(setupUserData);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    if (setupUserData.incomeTagsCount == 0) {
      navigation.dispatch(StackActions.replace('FixedIncomes'));
      return true;
    }
    navigation.dispatch(StackActions.replace('EachFixedIncomeCategory'));
    const newUserData = setupUserData;
    newUserData.incomeTagsCount--;
    updateSetupUserDataProps(newUserData);
    return true;
  };

  async function next() {
    const expenseAmount = Number(
      formattedExpenseAmount.replace(/[.]+/g, '').replace(',', '.'),
    );

    const entry = {
      descricaoLancamento: ud?.expenseTags[ud?.expenseTagsCount],
      lugarLancamento: 'extrato',
      tipoLancamento: 'despesa',
      parcelasLancamento: [
        {
          valorParcela: expenseAmount,
        } as Parcela,
      ],
      essencial: true,
    } as Lancamento;

    const userData = setupUserData;

    userData.entries != undefined
      ? userData.entries.push(entry)
      : (userData.entries = [entry]);

    updateSetupUserDataProps(userData);
    navigation.dispatch(StackActions.replace('EachFixedIncomeCategory'));
  }

  return (
    <Container>
      <Header
        accent={colors.slimyGreen}
        onBackButton={() => backAction()}
        title="Quanto gasta mensalmente com"
        lastWordAccent={`${
          setupUserData.incomeTags[setupUserData.incomeTagsCount]
        }?`}
        subtitle="Insira o valor mais aproximado da média"
        step={`${setupUserData.incomeTagsCount + 1} de ${
          setupUserData.incomeTags.length
        }`}
      />

      <Content>
        <Writting>
          <PrefixReaisSymbol>R$</PrefixReaisSymbol>
          <CurrencyInput
            style={{
              flex: 1,
              padding: 0,
              color: colors.davysGrey,
              fontFamily: fonts.familyType.bold,
              fontSize: fonts.size.super + 14,
            }}
            value={expenseAmount}
            onChangeValue={txt => setExpenseAmount(txt)}
            delimiter="."
            separator=","
            precision={2}
            placeholder="0,00"
            maxValue={999999}
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={colors.davysGrey}
            onChangeText={formattedValue => {
              setFormattedExpenseAmount(formattedValue);
              setError(false);
              if (expenseAmount == null) setExpenseAmount(0.0);
            }}
          />
          {expenseAmount != null && (
            <IonIcons
              style={{
                padding: 6,
                marginLeft: 16,
              }}
              name="close"
              size={32}
              color={`rgba(82, 82, 82, .08)`}
              onPress={() => {
                setError(false);
                setExpenseAmount(0.0);
              }}
            />
          )}
        </Writting>
        {hasError && <Error>{errorMessage}</Error>}
      </Content>

      <BottomNavigation
        onPress={() => next()}
        description={'Escolher categoria'}
        iconColor={colors.slimyGreen}
      />
    </Container>
  );
};

export default EachFixedIncome;
