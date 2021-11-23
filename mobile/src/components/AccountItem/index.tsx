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
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import hexToRGB from '../../helpers/hexToRgba';
import global from '../../global';
import doubleToCurrency from '../../helpers/doubleToCurrency';

interface IProps extends TouchableOpacityProps {
  account?: Conta;
  borderColor?: string;
}

const AccountItem: React.FC<IProps> = ({ account, ...rest }) => {
  let globalAccountIndex = global.DEFAULT_ICONS_CATEGORYACCOUNT.findIndex(
    acc => acc.description == account?.descricao,
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
      <Content>
<<<<<<< HEAD
        <Image
          style={{
            borderWidth: widthPixel(10),
            borderColor: colors.slimyGreen,
          }}
          source={require('../../assets/images/banks/picpay.png')}
        />
=======
        {account?.categoryConta == 'carteira' && (
          <Image
            style={{
              borderWidth: widthPixel(10),
              borderColor: '#44270f',
            }}
            source={require('../../assets/images/banks/default/carteira.png')}
          />
        )}

        {account?.categoryConta == 'outro' && (
          <Image
            style={{
              borderWidth: widthPixel(10),
              borderColor: '#929292',
            }}
            source={require('../../assets/images/banks/default/outro.png')}
          />
        )}

        {account?.categoryConta != 'carteira' &&
          account?.categoryConta != 'outro' && (
            <Image
              style={{
                borderWidth: widthPixel(10),
                borderColor:
                  global.DEFAULT_ICONS_CATEGORYACCOUNT[globalAccountIndex]
                    .accent,
              }}
              source={
                global.DEFAULT_ICONS_CATEGORYACCOUNT[globalAccountIndex].icon
              }
            />
          )}

>>>>>>> 51f72e93a2c6146abc066d74be512591236c7b94
        <Info>
          <Description>{account?.descricao}</Description>
          <Category>{account?.categoryConta}</Category>
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
