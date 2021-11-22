import React, { useEffect, useState } from 'react';

import { BackHandler, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { Conta } from '../../../../contexts/AccountContext';

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
  const [isLoading, setLoading] = useState(true);

  const { user, updateSetupUserProps, setupUser } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    // Carteira
    if (setupUser.account == undefined) {
      const walletAccount = {
        categoryConta: 'Carteira',
        descricao: 'Carteira',
        saldoConta: 0,
      } as Conta;

      const newSetupProps = setupUser;
      newSetupProps.account = [walletAccount];
      updateSetupUserProps(newSetupProps);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  }, [setupUser.account]);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Photo'));
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
        {!isLoading ? (
          <>
            <AccountItem account={setupUser.account[0]} />
            <Button
              style={{ backgroundColor: colors.platinum }}
              title="Nova conta principal"
              color={colors.silver}
              onPress={() => {}}
            />
          </>
        ) : (
          <Text>Carregando</Text>
        )}
      </Content>
      <BottomNavigation onPress={() => next()} description="Próximo" />
    </Container>
  );
};

export default Account;
