import React, { useEffect, useState } from 'react';

import { BackHandler } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Content,
  Input,
  PrefixReaisSymbol,
  Writting,
  Error,
} from './styles';
import { colors } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedExpense'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedExpense'>;
};

const EachFixedExpense = ({ navigation }: PropsNavigation) => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setupUserData, updateSetupUserDataProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  async function next() {
    console.log(setupUserData);
    navigation.navigate('EachFixedExpense');
  }
  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Quanto gasta mensalmente com"
        lastWordAccent={
          setupUserData.expenseTags[setupUserData.expenseTagsCount]
        }
        subtitle="Insira o valor mais aproximado da média"
        step={`${setupUserData.expenseTagsCount + 1} de ${
          setupUserData.expenseTags.length
        }`}
      />

      <Content>
        <Writting>
          <PrefixReaisSymbol>R$</PrefixReaisSymbol>
          <Input
            placeholder="0,00"
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={colors.davysGrey}
            keyboardType="numeric"
            onChangeText={text => {
              setError(false);
            }}
          />
          {expenseAmount.length > 0 && (
            <IonIcons
              style={{
                padding: 6,
                marginLeft: 32,
              }}
              name="close"
              size={32}
              color={`rgba(82, 82, 82, .08)`}
              onPress={() => {
                setError(false);
              }}
            />
          )}
        </Writting>
        {hasError && <Error>{errorMessage}</Error>}
      </Content>

      <BottomNavigation onPress={() => next()} description={'Próximo!'} />
    </Container>
  );
};

export default EachFixedExpense;
