import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../styles';
import {
  Container,
  Content,
  Data,
  Amount,
  Image,
  Info,
  Icon,
  Description,
  Category,
} from './styles';

import { Conta } from '../../contexts/AccountContext';
import { widthPixel } from '../../helpers/responsiveness';
import hexToRGB from '../../helpers/hexToRgba';
import global from '../../global';
import doubleToCurrency from '../../helpers/doubleToCurrency';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

interface IProps extends TouchableOpacityProps {
  account?: Conta;
  borderColor?: string;
}

const AccountItem: React.FC<IProps> = ({ account, ...rest }) => {
  let globalAccountIndex = global.DEFAULT_ICONS_CATEGORYACCOUNT.findIndex(
    acc => acc.description == account?.instituicao,
  );

  return (
    <Container
      style={{
        shadowColor: 'rgba(0, 0, 0, .26)',
        shadowOffset: { width: 0, height: 200 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 10,
      }}>
      <Content {...rest} activeOpacity={1}>
        {account?.tipo == 'carteira' && (
          <Image
            style={{
              borderWidth: widthPixel(10),
              borderColor: '#44270f',
            }}
            source={require('../../assets/images/banks/default/carteira.png')}
          />
        )}

        {account?.tipo == 'outro' && (
          <Image
            style={{
              borderWidth: widthPixel(10),
              borderColor: '#929292',
            }}
            source={require('../../assets/images/banks/default/outro.png')}
          />
        )}

        {account?.tipo != 'carteira' && account?.tipo != 'outro' && (
          <Image
            style={{
              borderWidth: widthPixel(10),
              borderColor:
                global.DEFAULT_ICONS_CATEGORYACCOUNT[globalAccountIndex].accent,
            }}
            source={
              global.DEFAULT_ICONS_CATEGORYACCOUNT[globalAccountIndex].icon
            }
          />
        )}
        <Info>
          <Description>{account?.descricao}</Description>
          <Category>{capitalizeFirstLetter(account?.tipo.toString())}</Category>
        </Info>
        <Icon>
          <MaterialCommunityIcons
            name="lead-pencil"
            size={widthPixel(60)}
            color={hexToRGB(colors.davysGrey, 0.2)}
          />
        </Icon>
      </Content>
      <Data
        style={{
          shadowColor: 'rgba(0, 0, 0, .4)',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 10,
        }}>
        <Amount>
          {doubleToCurrency(account?.saldoConta || 0, 'pt-br', 'BRL')}
        </Amount>
      </Data>
    </Container>
  );
};

export default AccountItem;
