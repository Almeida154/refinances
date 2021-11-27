import React, { useEffect, useState } from 'react';
import Button from '../../../../../components/Button';

import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import { UseContas } from '../../../../../contexts/AccountContext';

import {
  Container,
  Description,
  TotalBalance,
  BalanceDetail,
  SectionBalance,
} from './styles';

import { StackActions } from '@react-navigation/native';
import { View } from 'react-native';
import { colors } from '../../../../../styles';
import shadowBox from '../../../../../helpers/shadowBox';

import Feather from 'react-native-vector-icons/Feather';
import { widthPixel } from '../../../../../helpers/responsiveness';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BalanceCard = () => {
  const [balance, setBalance] = useState('0');
  const [isBalanceVisible, setBalanceVisible] = useState(true);

  const { contas, handleReadByUserContas } = UseContas();
  const { navigation } = UseDadosTemp();

  useEffect(() => {
    (async () =>
      setBalanceVisible(
        // @ts-ignore
        JSON.parse(await AsyncStorage.getItem('isBalanceVisible')) | false,
      ))();

    if (isBalanceVisible) {
      let aux = 0;

      contas &&
        contas.map(item => {
          aux += item.saldoConta;
        });

      return setBalance(
        aux.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      );
    }
    setBalance('R$ ------ 🤫');
  }, [contas, isBalanceVisible]);

  useEffect(() => {
    (async function () {
      handleReadByUserContas(await retornarIdDoUsuario());
    })();
  }, []);
  return (
    <Container style={shadowBox(30, 0.3)}>
      <SectionBalance>
        <BalanceDetail />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Description numberOfLines={1}>Saldo geral</Description>
            <TotalBalance numberOfLines={1}>{balance}</TotalBalance>
          </View>
          <Feather
            onPress={() => {
              setBalanceVisible(!isBalanceVisible);
              AsyncStorage.setItem(
                'isBalanceVisible',
                JSON.stringify(!isBalanceVisible),
              );
            }}
            name={isBalanceVisible ? 'eye' : 'eye-off'}
            size={widthPixel(70)}
            color={colors.platinum}
          />
        </View>
      </SectionBalance>

      <Button
        style={{
          backgroundColor: colors.lightGray,
        }}
        onPress={() =>
          navigation.dispatch(
            StackActions.replace('StackAccount', { screen: 'ManageAccount' }),
          )
        }
        title="Conferir Extrato"
        color={colors.silver}
        lastOne
      />
    </Container>
  );
};

export default BalanceCard;
