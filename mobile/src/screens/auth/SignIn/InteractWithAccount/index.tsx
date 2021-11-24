import React, { useEffect, useRef, useState } from 'react';

import {
  BackHandler,
  Image,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { Conta } from '../../../../contexts/AccountContext';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content } from './styles';
import { colors, metrics } from '../../../../styles';

// Components
import ShortHeader from '../../../../components/ShortHeader';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import AccountItem from '../../../../components/AccountItem';
import AccountsPlaceholder from '../../components/AccountsPlaceholder';
import InputText from '../../../../components/InputText';
import Modalize from '../../../../components/Modalize';

import { Modalize as Modal } from 'react-native-modalize';
import global from '../../../../global';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';

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
      <View style={{ elevation: 0 }}>
        <ShortHeader onBackButton={() => backAction()} title="Nova conta" />
      </View>
      <Content style={{ elevation: 0 }}>
        {route.params.accountType != 'outro' && (
          <InputText
            label="Instituição"
            placeholder="Entidade da conta"
            editable={false}
            onPress={() => openModalize()}
          />
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
        title="Clique para selecionar"
        subtitle="Escolha uma instituição financeira"
        backgroundColor={colors.cultured}
        height={metrics.screen.height - metrics.default.statusBarHeight * 2}
        snapPoint={500}>
        <View style={{ padding: metrics.default.boundaries }}>
          <TextInput
            style={{
              backgroundColor: 'white',
              alignSelf: 'center',
              width: '100%',
              height: heightPixel(100),
              borderRadius: widthPixel(20),
            }}
          />
        </View>
        {global.DEFAULT_ICONS_CATEGORYACCOUNT.map((instituition, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              height: heightPixel(200),
              marginBottom: 10,
              alignItems: 'center',
              paddingHorizontal: metrics.default.boundaries,
            }}>
            <View
              style={{
                backgroundColor: 'tomato',
                height: widthPixel(150),
                width: widthPixel(150),
                borderRadius: widthPixel(150 / 2),
              }}>
              <Image
                source={instituition.icon}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: widthPixel(150 / 2),
                  borderWidth: 4,
                  borderColor: instituition.accent,
                }}
              />
            </View>
            <Text style={{ marginLeft: 10 }}>{instituition.description}</Text>
          </View>
        ))}
      </Modalize>
    </Container>
  );
};

export default InteractWithAccount;
