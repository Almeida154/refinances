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

interface IProps extends TouchableOpacityProps {
  account?: Conta;
  borderColor?: string;
}

const AccountItem: React.FC<IProps> = ({ account, ...rest }) => {
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
        <Image
          style={{
            borderWidth: widthPixel(10),
            borderColor: colors.slimyGreen,
          }}
          source={require('../../assets/images/banks/picpay.png')}
        />
        <Info>
          <Description>PicPay</Description>
          <Category>Conta Corrente</Category>
        </Info>
        <Icon>
          <MaterialCommunityIcons
            name="lead-pencil"
            size={widthPixel(60)}
            color={colors.davysGrey}
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
        <Amount>R$ 129,00</Amount>
      </Data>
    </Container>
  );
};

export default AccountItem;
