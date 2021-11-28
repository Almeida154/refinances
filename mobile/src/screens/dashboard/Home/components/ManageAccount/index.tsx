import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';

import Button from '../../../../../components/Button';

import { HomeAccountStack } from '../../../../../@types/RootStackParamApp';
import {
  Container,
  Title,
  Subtitle,
  Content,
  ScreenDescription,
} from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { UseContas } from '../../../../../contexts/AccountContext';

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
  const { contas, handleReadByUserContas } = UseContas();
  const [stateReload, setStateReload] = useState(false);
  const [walletAmount, setWalletAmount] = useState<number | null>(0);

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
    console.log(contas);
    // Caso nenhuma conta foi carregada, recarregar
    if (!contas)
      (async function () {
        handleReadByUserContas(await retornarIdDoUsuario());
        setStateReload(true);
      })();
  }, []);

  const openModalize = (ref: any) => ref.current?.open();
  const closeModalize = (ref: any) => ref.current?.close();

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
                      ? openModalize(walletModalizeRef)
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
                backgroundColor: colors.platinum,
              }}
              onPress={() =>
                navigation.dispatch(
                  StackActions.replace('StackAccount', {
                    screen: 'CreateAccount',
                  }),
                )
              }
              title="Criar"
              color={colors.davysGrey}
            />
          </View>
        </Content>
      )}
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
          // onChangeValue={(amt: number) => setWalletAmount(amt)}
          // onChangeText={() => {
          //   if (walletAmount == null) setWalletAmount(0.0);
          // }}
        />
        <Button
          style={{ backgroundColor: colors.platinum }}
          title="Atualizar"
          onPress={() => {
            // setLoading(true);
            // console.log(walletAmount);

            // const newSetupProps = setupUser;
            // newSetupProps.accounts[0].saldoConta = walletAmount || 0;
            // updateSetupUserProps(newSetupProps);

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
                receiveAccount: 'outro',
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

export default ManageAccount;
