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
import Toast from 'react-native-toast-message';

import global from '../../../../global';
import { Lancamento } from '@contexts/EntriesContext';
import { Parcela } from '@contexts/InstallmentContext';

import CurrencyInput from 'react-native-currency-input';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedIncome'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedIncome'>;
};

const EachFixedIncome = ({ navigation }: PropsNavigation) => {
  const [incomeAmount, setIncomeAmount] = useState<number | null>(0);
  const [formattedIncomeAmount, setFormattedIncomeAmount] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setupUser, updateSetupUserProps, showNiceToast, hideNiceToast } =
    UseAuth();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let iterator = setupUser.incomeTagsCount;
    console.debug(`Contador: ${iterator}`);
    console.debug(`Current: ${setupUser.incomeTags[iterator]}`);
    showNiceToast('fake', 'Oops!', null, 500);

    if (setupUser.entries != undefined) {
      if (setupUser.entries[setupUser.incomeTagsCount] != undefined) {
        setIncomeAmount(
          setupUser.entries[setupUser.incomeTagsCount].parcelasLancamento[0]
            .valorParcela,
        );
      }
    }

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
      formattedIncomeAmount.replace(/[.]+/g, '').replace(',', '.'),
    );

    if (expenseAmount < 1) {
      showNiceToast(
        'error',
        'Impossível!',
        'Insira um valor maior que R$ 0,99',
      );
      return;
    }

    hideNiceToast();

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
            value={incomeAmount}
            onChangeValue={txt => setIncomeAmount(txt)}
            delimiter="."
            separator=","
            precision={2}
            placeholder="0,00"
            maxValue={999999}
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={colors.davysGrey}
            onChangeText={formattedValue => {
              setFormattedIncomeAmount(formattedValue);
              setError(false);
              if (incomeAmount == null) setIncomeAmount(0.0);
            }}
            ref={inputRef}
            autoFocus
          />
          {incomeAmount != null && (
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
                setIncomeAmount(0.0);
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
      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </Container>
  );
};

export default EachFixedIncome;
