import React, { useEffect } from 'react';

import { BackHandler } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content } from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import AccountItem from '../../../../components/AccountItem';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Account'>;
  route: RouteProp<RootStackParamAuth, 'Account'>;
};

const Account = ({ navigation }: PropsNavigation) => {
  const { user, updateUserProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Photo'));
    const newUser = user;
    newUser.emailUsuario = '';
    updateUserProps(newUser);
    return true;
  };

  async function next() {
    console.debug('Photo | next(): ', JSON.stringify(user).substr(0, 200));
    navigation.dispatch(StackActions.replace('FixedExpenses'));
  }

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Minhas contas"
        subtitle="Agora, além da carteira, vamos configurar sua conta principal. Todo o processo seguinte será atrelado à essa conta."
      />
      <Content>
        <AccountItem />
        <Button
          style={{ backgroundColor: colors.platinum }}
          title="Nova conta principal"
          color={colors.silver}
          onPress={() => {}}
        />
      </Content>
      <BottomNavigation onPress={() => next()} description="Próximo" />
    </Container>
  );
};

export default Account;
