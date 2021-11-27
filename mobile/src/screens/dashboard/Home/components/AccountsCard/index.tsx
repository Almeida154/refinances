import React, { useEffect, useState } from 'react';
import Button from '../../../../../components/Button';

import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import { UseContas, Conta } from '../../../../../contexts/AccountContext';

import {
  Container,
  AccountsTitle,
  AccountsContainer,
  CardContainer,
  Icon,
  AccountData,
  AccountBalance,
  Name,
  Type,
  Balance,
} from './styles';
import { StackActions } from '@react-navigation/native';
import capitalizeFirstLetter from '../../../../../helpers/capitalizeFirstLetter';
import global from '../../../../../global';
import doubleToCurrency from '../../../../../helpers/doubleToCurrency';
import { widthPixel } from '../../../../../helpers/responsiveness';
import { colors } from '../../../../../styles';
import shadowBox from '../../../../../helpers/shadowBox';

type CardAccount = {
  item: Conta;
};

const CardAccount = ({ item }: CardAccount) => {
  let globalAccountIndex = global.DEFAULT_ICONS_CATEGORYACCOUNT.findIndex(
    acc => acc.description == item?.instituicao,
  );
  console.log(globalAccountIndex);

  return (
    <CardContainer>
      {globalAccountIndex == -1 ? (
        item.tipo == 'outro' ? (
          <Icon
            style={{
              borderWidth: widthPixel(10),
              borderColor: '#929292',
            }}
            source={require('../../../../../assets/images/banks/default/outro.png')}
          />
        ) : (
          <Icon
            style={{
              borderWidth: widthPixel(10),
              borderColor: '#44270f',
            }}
            source={require('../../../../../assets/images/banks/default/carteira.png')}
          />
        )
      ) : (
        <Icon
          style={{
            borderWidth: widthPixel(10),
            borderColor:
              global.DEFAULT_ICONS_CATEGORYACCOUNT[globalAccountIndex].accent,
          }}
          source={global.DEFAULT_ICONS_CATEGORYACCOUNT[globalAccountIndex].icon}
        />
      )}
      <AccountData>
        <Name numberOfLines={1}>{item.descricao}</Name>
        <Type numberOfLines={1}>{capitalizeFirstLetter(item.tipo)}</Type>
      </AccountData>
      <AccountBalance>
        <Balance
          style={{
            shadowColor: 'rgba(0, 0, 0, .2)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 10,
          }}
          numberOfLines={1}>
          {doubleToCurrency(item.saldoConta)}
        </Balance>
      </AccountBalance>
    </CardContainer>
  );
};

const AccountsCard = () => {
  const { contas, handleReadByUserContas } = UseContas();
  const [saldo, setSaldo] = useState('0');
  const { navigation } = UseDadosTemp();

  useEffect(() => {
    let aux = 0;

    contas &&
      contas.map(item => {
        aux += item.saldoConta;
      });

    setSaldo(
      aux.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    );
  }, [contas]);

  useEffect(() => {
    (async function () {
      handleReadByUserContas(await retornarIdDoUsuario());
    })();
  }, []);
  return (
    <Container style={shadowBox(30, 0.3)}>
      <AccountsContainer>
        <AccountsTitle numberOfLines={1}>Minhas contas</AccountsTitle>

        {contas &&
          contas.map((item, index) => {
            if (index > 1) return;
            return <CardAccount key={index} item={item} />;
          })}

        <Button
          style={{
            backgroundColor: colors.lightGray,
          }}
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('StackAccount', { screen: 'ManageAccount' }),
            )
          }
          title="Gerenciar"
          color={colors.silver}
          lastOne
        />
      </AccountsContainer>
    </Container>
  );
};

export default AccountsCard;
