import React, { useEffect, useRef, useState } from 'react';

// @ts-ignore
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
AndroidKeyboardAdjust.setAdjustPan();

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
  const [search, setSearch] = useState('');

  const { user, updateSetupUserProps, setupUser } = UseAuth();

  const modalizeRef = useRef<Modal>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Account'));
    AndroidKeyboardAdjust.setAdjustResize();
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
        snapPoint={
          metrics.screen.height / 1.4 - metrics.default.statusBarHeight * 2
        }
        headerHasFullBoundaries
        searchEvent={(txt: string) => setSearch(txt)}
        searchValue={search}
        onClearSearch={() => setSearch('')}>
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
