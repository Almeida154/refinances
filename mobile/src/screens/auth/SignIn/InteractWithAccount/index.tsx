import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { Conta } from '../../../../contexts/AccountContext';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content } from './styles';
import { colors } from '../../../../styles';

// Components
import ShortHeader from '../../../../components/ShortHeader';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import AccountItem from '../../../../components/AccountItem';
import AccountsPlaceholder from '../../components/AccountsPlaceholder';
import InputText from '../../../../components/InputText';
import Modalize from '../../../../components/Modalize';

import { Modalize as Modal } from 'react-native-modalize';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'InteractWithAccount'>;
  route: RouteProp<RootStackParamAuth, 'InteractWithAccount'>;
};

const InteractWithAccount = ({ navigation, route }: PropsNavigation) => {
  const [walletAmount, setWalletAmount] = useState<number | null>(0);

  const { user, updateSetupUserProps, setupUser } = UseAuth();

  const modalizeRef = useRef<Modal>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Account'));
    return true;
  };

  // route.params.accountType

  async function interact() {
    console.log('integariu');
  }

  const openModalize = () => modalizeRef.current?.open();
  const closeModalize = () => modalizeRef.current?.close();

  return (
    <Container>
      <ShortHeader onBackButton={() => backAction()} title="Nova conta" />
      <Content>
        {route.params.accountType != 'outro' && (
          <InputText label="Instituição" placeholder="Entidade da conta" />
        )}
        <InputText label="Descrição" placeholder="Itaú Personnalite" />
        <InputText label="Valor da conta" isCurrencyInput />
      </Content>
      <BottomNavigation
        onPress={() => interact()}
        description="Adicionar"
        isCentered
      />

      <Modalize
        ref={modalizeRef}
        title="Minha carteira 👀"
        subtitle="Seu dinheiro físico. Quanto tem na sua carteira agora?"
        backgroundColor={colors.cultured}
        hasBodyBoundaries>
        <InputText
          label="Quanto tem?"
          isCurrencyInput
          // @ts-ignore
          value={walletAmount}
          onChangeValue={(amt: number) => setWalletAmount(amt)}
          onChangeText={() => {
            if (walletAmount == null) setWalletAmount(0.0);
          }}
        />
      </Modalize>
    </Container>
  );
};

export default InteractWithAccount;
