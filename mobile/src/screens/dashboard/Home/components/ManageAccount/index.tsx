import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';

import Button from '../../../../../components/Button';
import { useTheme } from 'styled-components/native'; 
import { HomeAccountStack } from '../../../../../@types/RootStackParamApp';
import {
  Container,
  Title,
  Subtitle,
  Content,
  ScreenDescription,
} from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { Conta, UseContas } from '../../../../../contexts/AccountContext';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import { Text } from '../../../../../components/Button/styles';
import { ActivityIndicator } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

import ShortHeader from '../../../../../components/ShortHeader';
import { colors, metrics } from '../../../../../styles';
import AccountItem from '../../../../../components/AccountItem';

import { Modalize as Modal } from 'react-native-modalize';
import Modalize from '../../../../../components/Modalize';
import InputText from '../../../../../components/InputText';

type PropsManageAccount = {
  navigation: StackNavigationProp<HomeAccountStack, 'ManageAccount'>;
};

const ManageAccount = ({ navigation }: PropsManageAccount) => {
  const { contas, handleReadByUserContas, handleEditarConta } = UseContas();
  const [stateReload, setStateReload] = useState(false);
  const [selectedCarteira, setSelectedCarteira] = useState<Conta | null>(null);
  const [walletAmount, setWalletAmmount] = useState(0)

  const walletModalizeRef = useRef<Modal>(null);
  const newAccountModalizeRef = useRef<Modal>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Main', { screen: 'Home' }));
    return true;
  };

  useEffect(() => {
    // Caso nenhuma conta foi carregada, recarregar
    if (!contas)
      (async function () {
        handleReadByUserContas(await retornarIdDoUsuario());
        setStateReload(true);
      })();
  }, []);

  const openModalize = (ref: any, conta: Conta | null) => {
    if(conta?.tipo == 'carteira') {
      // @ts-ignore
      conta.userConta = conta.userConta.id
      setSelectedCarteira(conta)
      setWalletAmmount(conta.saldoConta)
    }
    ref.current?.open()
  };
  const closeModalize = (ref: any) => ref.current?.close();
  const theme: any = useTheme()

  return (
    <Container>
      <View style={{ elevation: 0 }}>
        <ShortHeader onBackButton={() => backAction()} title="Contas" />
      </View>
      <ScreenDescription>
        <Title>Bem vindo as suas contas!</Title>
        <Subtitle>
          Aqui você consegue editar, excluir ou criar novas contas 🤟
        </Subtitle>
      </ScreenDescription>
      {stateReload ? (
        <View
          style={{
            alignSelf: 'center',
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#E8871E" />
          <Text
            style={{
              color: '#183153',
              fontSize: 22,
              fontFamily: 'Poppins-Bold',
              marginTop: 20,
            }}>
            Carregando...
          </Text>
        </View>
      ) : (
        <Content>
          {contas &&
            contas.map((item, index) => (
              <View
                style={{
                  elevation: 0,
                  paddingHorizontal: metrics.default.boundaries,
                }}
                key={index}>
                <AccountItem
                  account={item}
                  onPress={() => {
                    item.tipo == 'carteira'
                      ? openModalize(walletModalizeRef, item)
                      : navigation.dispatch(
                          StackActions.replace('StackAccount', {
                            screen: 'CreateAccount',
                            params: {receiveAccount: item},
                          }),
                        );
                  }}
                />
              </View>
            ))}

          <View style={{ paddingHorizontal: metrics.default.boundaries }}>
            <Button
              style={{
                backgroundColor: theme.colors.platinum,
              }}
              onPress={() =>
                openModalize(newAccountModalizeRef, null)
              }
              title="Criar"
              color={theme.colors.davysGrey}
            />
          </View>
        </Content>
      )}
      <Modalize
        ref={walletModalizeRef}
        title="Minha carteira 👀"
        subtitle="Seu dinheiro físico. Quanto tem na sua carteira agora?"
        backgroundColor={theme.colors.cultured}
        hasBodyBoundaries>
        <InputText
          label="Quanto tem?"
          isCurrencyInput
          // @ts-ignore
          value={walletAmount}
          onChangeValue={(amt: number) => {
            if(selectedCarteira) {
              selectedCarteira.saldoConta = amt
              setWalletAmmount(amt)
            }
            setSelectedCarteira(selectedCarteira)
          }}
          // onChangeText={() => {
          //   if (walletAmount == null) setWalletAmount(0.0);
          // }}
        />
        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Atualizar"
          onPress={() => {
            if(selectedCarteira)
              handleEditarConta(selectedCarteira)
            closeModalize(walletModalizeRef);
          }}
          color={theme.colors.silver}
          lastOne
        />
      </Modalize>

      <Modalize
        ref={newAccountModalizeRef}
        title="Escolha o tipo da conta"
        backgroundColor={theme.colors.cultured}
        hasBodyBoundaries>
        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Conta Poupança"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('StackAccount', {
                screen: 'CreateAccount',
                params: {accountType: 'conta poupança'},
              }),
            )
          }
          color={theme.colors.silver}
          lastOne
        />

        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Conta Corrente"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('StackAccount', {
                screen: 'CreateAccount',
                params: {accountType: 'conta corrente'},
              }),
            )
          }
          color={theme.colors.silver}
        />

        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Outro"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('StackAccount', {
                screen: 'CreateAccount',
                params: {accountType: 'outro'},
              }),
            )
          }
          color={theme.colors.silver}
          lastOne
        />
      </Modalize>
    </Container>
  );
};

export default ManageAccount;
