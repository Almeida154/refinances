import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, TextInput } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

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
  const [expenseAmount, setExpenseAmount] = useState<number | null>(0);
  const [formattedExpenseAmount, setFormattedExpenseAmount] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setupUser, updateSetupUserProps } = UseAuth();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let iterator = setupUser.incomeTagsCount;
    console.debug(`Contador: ${iterator}`);
    console.debug(`Current: ${setupUser.incomeTags[iterator]}`);

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    if (setupUser.incomeTagsCount == 0) {
      navigation.dispatch(StackActions.replace('FixedIncomes'));
      return true;
    }
    navigation.dispatch(StackActions.replace('EachFixedIncomeCategory'));
    const newSetupProps = setupUser;
    newSetupProps.incomeTagsCount--;
    updateSetupUserProps(newSetupProps);
    return true;
  };

  async function next() {
    const expenseAmount = Number(
      formattedExpenseAmount.replace(/[.]+/g, '').replace(',', '.'),
    );

    const entry = {
      descricaoLancamento: setupUser.incomeTags[setupUser.incomeTagsCount],
      lugarLancamento: 'extrato',
      tipoLancamento: 'receita',
      parcelasLancamento: [
        {
          valorParcela: expenseAmount,
        } as Parcela,
      ],
      essencial: true,
    } as Lancamento;

    const newSetupProps = setupUser;

    newSetupProps.entries != undefined
      ? newSetupProps.entries.push(entry)
      : (newSetupProps.entries = [entry]);

    updateSetupUserProps(newSetupProps);
    navigation.dispatch(StackActions.replace('EachFixedIncomeCategory'));
  }

  return (
    <Container>
      <Header
        accent={colors.slimyGreen}
        onBackButton={() => backAction()}
        title="Quanto ganha mensalmente com"
        lastWordAccent={`${setupUser.incomeTags[setupUser.incomeTagsCount]}?`}
        subtitle="Insira o valor mais aproximado da média"
        step={`${setupUser.incomeTagsCount + 1} de ${
          setupUser.incomeTags.length
        }`}
      />

      <Content onPress={() => inputRef.current?.focus()} activeOpacity={1}>
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
            ref={inputRef}
            autoFocus
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
