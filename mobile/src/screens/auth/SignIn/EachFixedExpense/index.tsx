import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container } from './styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'EachFixedExpense'>;
  route: RouteProp<RootStackParamAuth, 'EachFixedExpense'>;
};

const EachFixedExpense = ({ navigation }: PropsNavigation) => {
  const [fixedIncomes, setFixedIncomes] = useState('');
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
        title={`Quanto gasta mensalmente com ${
          setupUserData.expenseTags[setupUserData.expenseTagsCount]
        }?`}
        subtitle="Insira o valor mais aproximado da média"
      />

      <BottomNavigation onPress={() => next()} description={'Próximo!'} />
    </Container>
  );
};

export default EachFixedExpense;
