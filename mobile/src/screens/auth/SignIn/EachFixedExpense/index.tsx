import React, { useEffect, useState } from 'react';

import { BackHandler } from 'react-native';

import { SetupUserData, UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';
import { CommonActions } from '@react-navigation/native';

//import { StackActions, NavigationActions } from 'react-navigation';

import { StackActions } from '@react-navigation/native';

import { TextInputMask } from 'react-native-masked-text'; // Outra opção de mask
import CurrencyInput from 'react-native-currency-input';

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

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedExpense'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedExpense'>;
};

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'EachFixedExpenseCategory' }),
//   ],
// });

const EachFixedExpense = ({ navigation }: PropsNavigation) => {
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
    if (setupUserData.expenseTagsCount == 0) {
      navigation.dispatch(StackActions.replace('FixedExpenses'));
      return true;
    }
    navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
    const newUserData = setupUserData;
    newUserData.expenseTagsCount--;
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

    // console.debug(
    //   `EachFixedExpense | next() | ${userData.expenseTagsCount}`,
    //   JSON.stringify(setupUserData),
    // );

    // navigation.dispatch(
    //   CommonActions.reset({
    //     routes: [{ name: 'EachFixedExpense' }],
    //   }),
    // );
    // navigation.navigate('EachFixedExpenseCategory');
    navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
  }

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Quanto gasta mensalmente com"
        lastWordAccent={`${ud?.expenseTags[ud.expenseTagsCount]}?`}
        subtitle="Insira o valor mais aproximado da média"
        step={`${setupUserData.expenseTagsCount + 1} de ${
          setupUserData.expenseTags.length
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
      />
    </Container>
  );
};

export default EachFixedExpense;
