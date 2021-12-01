import React, { useEffect, useRef, useState } from 'react';

import {
  BackHandler,
  Keyboard,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { Lancamento } from '../../../../contexts/EntriesContext';
import { Parcela } from '../../../../contexts/InstallmentContext';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Content,
  PrefixReaisSymbol,
  Writting,
  SmoothPickerContainer,
  SmoothPickerTopDetail,
  SmoothPickerBottomDetail,
} from './styles';
import { colors, fonts } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import SmoothPickerItem from '../../components/SmoothPickerItem';
import CurrencyInput from 'react-native-currency-input';
// @ts-ignore
import Picker from 'react-native-picker-horizontal';
import EntryPlaceholder from '../../components/EntryPlaceholder';
import DatePlaceholder from '../../components/DatePlaceholder';
import { useTheme } from 'styled-components/native';

import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedExpense'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedExpense'>;
};

const EachFixedExpense = ({ navigation }: PropsNavigation) => {
  const [expenseAmount, setExpenseAmount] = useState<number | null>(0);
  const [formattedExpenseAmount, setFormattedExpenseAmount] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isFocused, setFocused] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { setupUser, updateSetupUserProps, showNiceToast, hideNiceToast } =
    UseAuth();

  const inputRef = useRef<TextInput>(null);

  const days = Array.from(Array(30).keys());

  useEffect(() => {
    const willShowSubscription = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setFocused(true);
        // console.log('vai mostrou');
      },
    );
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setFocused(true);
      // console.log('mostrou');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setFocused(false);
      // console.log('fechou');
    });

    return () => {
      willShowSubscription.remove();
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    // let iterator = setupUser.expenseTagsCount;
    // console.log('---------EXPENSE---------');
    // console.debug(`Iterator: ${iterator}`);
    // console.debug(`Current: ${setupUser.expenseTags[iterator]}`);
    // if (setupUser.entries) console.debug(`Size: ${setupUser.entries.length}`);

    showNiceToast('fake', 'Oops!', null, 500);

    // Caso já tenha passado pela tela, recupera o expense aqui
    if (setupUser.entries != undefined) {
      if (setupUser.entries[setupUser.expenseTagsCount] != undefined) {
        var entryIndex = setupUser.entries.findIndex(
          entry =>
            entry.descricaoLancamento ==
            setupUser.expenseTags[setupUser.expenseTagsCount],
        );
        if (entryIndex != -1) {
          var entry = setupUser.entries[entryIndex];
          setExpenseAmount(entry.parcelasLancamento[0].valorParcela);
          setSelectedDay(entry.parcelasLancamento[0].dataParcela.getDate() - 1);
        }
      } else {
        // Pegar do último
        let previousEntry = setupUser.entries[setupUser.expenseTagsCount - 1];
        console.log('penultimo else', previousEntry.parcelasLancamento[0]);
        setSelectedDay(
          previousEntry.parcelasLancamento[0].dataParcela.getDate() - 1,
        );
      }
    } else {
      // Deixa o dia atual como default no smoothpicker
      let currentDate = new Date(Date.now());
      console.log('ultimo else', currentDate.getDate());
      setSelectedDay(currentDate.getDate() - 1);
    }

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    selectedDay != null && setTimeout(() => setLoading(false), 700);
  }, [selectedDay]);

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
      showNiceToast(
        'error',
        'Impossível!',
        'Insira um valor maior que R$ 0,99',
      );
      return;
    }

    hideNiceToast();

    let dateNow = new Date(Date.now());
    selectedDay != null && dateNow.setDate(selectedDay + 1);

    const entry = {
      descricaoLancamento: setupUser.expenseTags[setupUser.expenseTagsCount],
      lugarLancamento: 'extrato',
      tipoLancamento: 'despesa',
      parcelasLancamento: [
        {
          valorParcela: expenseAmount,
          dataParcela: dateNow,
        } as Parcela,
      ],
      essencial: true,
      categoryLancamento:
        setupUser.entries != undefined
          ? setupUser.entries[setupUser.expenseTagsCount] != undefined
            ? setupUser.entries[setupUser.expenseTagsCount].categoryLancamento
            : undefined
          : undefined,
    } as Lancamento;

    const newSetupProps = setupUser;

    newSetupProps.entries != undefined
      ? (newSetupProps.entries[setupUser.expenseTagsCount] = entry)
      : (newSetupProps.entries = [entry]);

    updateSetupUserProps(newSetupProps);
    navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
  }
  const theme: any = useTheme();
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
      <ScrollView>
        <Content onPress={() => inputRef.current?.focus()} activeOpacity={1}>
          <Writting>
            {!isLoading ? (
              <>
                <PrefixReaisSymbol>R$</PrefixReaisSymbol>
                <CurrencyInput
                  style={{
                    flex: 1,
                    padding: 0,
                    color: theme.colors.davysGrey,
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
                  selectionColor={theme.colors.davysGrey}
                  onChangeText={formattedValue => {
                    setFormattedExpenseAmount(formattedValue);
                    if (expenseAmount == null) setExpenseAmount(0.0);
                  }}
                  ref={inputRef}
                  onBlur={() => {
                    setFocused(false);
                  }}
                  onFocus={() => {
                    setFocused(true);
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
                      setExpenseAmount(0.0);
                    }}
                  />
                )}
              </>
            ) : (
              <EntryPlaceholder />
            )}
          </Writting>
        </Content>
      </ScrollView>

      <SmoothPickerContainer style={{ opacity: isFocused ? 0 : 1 }}>
        <View
          style={{
            height: heightPixel(440) - heightPixel(340),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.familyType.bold,
              fontSize: fonts.size.small,
              color: theme.colors.davysGrey,
            }}>
            Dia de vencimento
          </Text>
        </View>
        <View
          style={{
            height: heightPixel(380),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
          }}>
          {!isLoading ? (
            <Picker
              data={days}
              itemWidth={widthPixel(180)}
              mark={false}
              renderItem={(item: number, index: number) => (
                <View
                  style={{
                    width: widthPixel(180),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SmoothPickerItem isSelected={item == selectedDay}>
                    {item + 1}
                  </SmoothPickerItem>
                </View>
              )}
              initialIndex={selectedDay}
              onChange={(day: number) => setSelectedDay(day)}
              interpolateScale={(index: number, itemWidth: number) => ({
                inputRange: [
                  itemWidth * (index - 2),
                  itemWidth * (index - 1),
                  itemWidth * index,
                  itemWidth * (index + 1),
                  itemWidth * (index + 2),
                ],
                outputRange: [0.8, 1, 1.2, 1, 0.8],
              })}
            />
          ) : (
            <DatePlaceholder />
          )}

          <SmoothPickerTopDetail>
            <AntDesign
              name="caretdown"
              size={widthPixel(40)}
              color={theme.colors.bigDipOruby}
            />
          </SmoothPickerTopDetail>
          <SmoothPickerBottomDetail />
        </View>
      </SmoothPickerContainer>

      <BottomNavigation
        onPress={() => next()}
        description={'Escolher categoria'}
        pickerOn={!isFocused}
      />
    </Container>
  );
};

export default EachFixedExpense;
