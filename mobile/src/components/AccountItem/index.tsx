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
import shadowBox from '../../helpers/shadowBox';

interface IProps extends TouchableOpacityProps {
  account?: Conta;
  borderColor?: string;
}

const AccountItem: React.FC<IProps> = ({ account, ...rest }) => {
  let globalAccountIndex = global.DEFAULT_ICONS_CATEGORYACCOUNT.findIndex(
    acc => acc.description == account?.instituicao,
  );

  return (
    <Container style={shadowBox(10, 0.26)}>
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
      <Data style={shadowBox(10, 0.4)}>
        <Amount>
          {doubleToCurrency(account?.saldoConta || 0, 'pt-br', 'BRL')}
        </Amount>
      </Data>
    </Container>
  );
};

export default AccountItem;
