import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, TextInput } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  CommonActions,
  RouteProp,
  StackActions,
} from '@react-navigation/native';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

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
import Toast from 'react-native-toast-message';

import global from '../../../../global';
import { Lancamento } from '@contexts/EntriesContext';
import { Parcela } from '@contexts/InstallmentContext';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedExpense'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedExpense'>;
};

const EachFixedExpense = ({ navigation }: PropsNavigation) => {
  const [expenseAmount, setExpenseAmount] = useState<number | null>(0);
  const [formattedExpenseAmount, setFormattedExpenseAmount] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setupUser, updateSetupUserProps, niceToast } = UseAuth();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let iterator = setupUser.expenseTagsCount;
    console.debug(`Iterator: ${iterator}`);
    console.debug(`Current: ${setupUser.expenseTags[iterator]}`);
    niceToast('fake', 'Oops!', null, 500);

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    if (setupUser.expenseTagsCount == 0) {
      navigation.dispatch(StackActions.replace('FixedExpenses'));
      return true;
    }
    navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
    const newSetupProps = setupUser;
    newSetupProps.expenseTagsCount--;
    updateSetupUserProps(newSetupProps);
    return true;
  };

  async function next() {
    const expenseAmount = Number(
      formattedExpenseAmount.replace(/[.]+/g, '').replace(',', '.'),
    );

    if (expenseAmount < 1) {
      niceToast('error', 'Impossível!', 'Insira um valor maior que R$ 0,99');
      return;
    }

    const entry = {
      descricaoLancamento: setupUser.expenseTags[setupUser.expenseTagsCount],
      lugarLancamento: 'extrato',
      tipoLancamento: 'despesa',
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
    navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
  }

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Quanto gasta mensalmente com"
        lastWordAccent={`${setupUser.expenseTags[setupUser.expenseTagsCount]}?`}
        subtitle="Insira o valor mais aproximado da média"
        step={`${setupUser.expenseTagsCount + 1} de ${
          setupUser.expenseTags.length
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
      />
      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </Container>
  );
};

export default EachFixedExpense;
