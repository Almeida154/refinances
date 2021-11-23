import React, { Ref, useEffect, useRef, useState } from 'react';

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
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import AccountItem from '../../../../components/AccountItem';
import AccountsPlaceholder from '../../components/AccountsPlaceholder';
import InputText from '../../../../components/InputText';
import Modalize from '../../../../components/Modalize';

import { Modalize as Modal } from 'react-native-modalize';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Account'>;
  route: RouteProp<RootStackParamAuth, 'Account'>;
};

const Account = ({ navigation }: PropsNavigation) => {
  const [walletAmount, setWalletAmount] = useState<number | null>(0);
  const [isLoading, setLoading] = useState(true);

  const {
    user,
    updateSetupUserProps,
    setupUser,
    showNiceToast,
    hideNiceToast,
  } = UseAuth();

  const walletModalizeRef = useRef<Modal>(null);
  const newAccountModalizeRef = useRef<Modal>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    // Carteira
    if (setupUser.account == undefined) {
      const walletAccount = {
        categoryConta: 'carteira',
        descricao: 'Carteira',
        saldoConta: 0,
      } as Conta;

      const newSetupProps = setupUser;
      newSetupProps.account = [walletAccount];
      updateSetupUserProps(newSetupProps);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
    setWalletAmount(setupUser.account[0].saldoConta);
  }, [setupUser.account, isLoading]);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Photo'));
    return true;
  };

  async function next() {
    if (setupUser.account.length < 2)
      return showNiceToast(
        'error',
        'Calma ✋',
        'Adicione uma conta além da carteira!',
      );

    hideNiceToast();
    console.debug('Photo | next(): ', JSON.stringify(user).substr(0, 200));
    navigation.dispatch(StackActions.replace('FixedExpenses'));
  }

  const openModalize = (ref: any) => ref.current?.open();
  const closeModalize = (ref: any) => ref.current?.close();

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
            {setupUser.account.map((acc, index) => (
              <View style={{ elevation: 0 }}>
                <AccountItem
                  key={index}
                  account={acc}
                  onPress={() => {
                    index == 0
                      ? openModalize(walletModalizeRef)
                      : console.log('Aqui vai pra tela de edição');
                  }}
                />
              </View>
            ))}
            <Button
              style={{ backgroundColor: colors.platinum }}
              title="Nova conta principal"
              color={colors.silver}
              onPress={() => openModalize(newAccountModalizeRef)}
            />
          </>
        ) : (
          <AccountsPlaceholder
            moreThanOne={
              setupUser.account != undefined && setupUser.account.length > 1
            }
          />
        )}
      </Content>
      <BottomNavigation onPress={() => next()} description="Próximo" />

      {/* 💰💵👀🎣🐟 */}
      <Modalize
        ref={walletModalizeRef}
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
        <Button
          style={{ backgroundColor: colors.platinum }}
          title="Atualizar"
          onPress={() => {
            setLoading(true);
            console.log(walletAmount);

            const newSetupProps = setupUser;
            newSetupProps.account[0].saldoConta = walletAmount || 0;
            updateSetupUserProps(newSetupProps);

            closeModalize(walletModalizeRef);
          }}
          color={colors.silver}
          lastOne
        />
      </Modalize>

      <Modalize
        ref={newAccountModalizeRef}
        title="Escolha o tipo da conta"
        backgroundColor={colors.cultured}
        hasBodyBoundaries>
        <Button
          style={{ backgroundColor: colors.platinum }}
          title="Conta Poupança"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('InteractWithAccount', {
                accountType: 'conta poupança',
              }),
            )
          }
          color={colors.silver}
          lastOne
        />

        <Button
          style={{ backgroundColor: colors.platinum }}
          title="Conta Corrente"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('InteractWithAccount', {
                accountType: 'conta corrente',
              }),
            )
          }
          color={colors.silver}
        />

        <Button
          style={{ backgroundColor: colors.platinum }}
          title="Outro"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('InteractWithAccount', {
                accountType: 'outro',
              }),
            )
          }
          color={colors.silver}
          lastOne
        />
      </Modalize>
    </Container>
  );
};

export default Account;
