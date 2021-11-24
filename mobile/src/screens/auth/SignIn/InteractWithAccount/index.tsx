import React, { useEffect, useRef, useState } from 'react';

// @ts-ignore
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { BackHandler, Keyboard, Text, View } from 'react-native';

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
import ModalizeItem from '../../../../components/ModalizeItem';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'InteractWithAccount'>;
  route: RouteProp<RootStackParamAuth, 'InteractWithAccount'>;
};

interface InstituitionProps {
  description?: string;
  accent?: string;
  icon?: any;
}

const InteractWithAccount = ({ navigation, route }: PropsNavigation) => {
  const [search, setSearch] = useState('');
  const [instituitions, setInstituitions] = useState<InstituitionProps[]>([{}]);

  const { user, updateSetupUserProps, setupUser } = UseAuth();

  const modalizeRef = useRef<Modal>(null);

  useEffect(() => {
    AndroidKeyboardAdjust.setAdjustPan();
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    // Colocando em ordem alfabética
    if (search == '') {
      const sortedVet = global.DEFAULT_ICONS_CATEGORYACCOUNT.sort((a, b) => {
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
        return 0;
      });
      setInstituitions(sortedVet);
    }
  }, [search]);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Account'));
    AndroidKeyboardAdjust.setAdjustResize();
    return true;
  };

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
            onPress={() => {
              Keyboard.dismiss();
              openModalize();
            }}
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
        searchEvent={(txt: string) => {
          setSearch(txt);

          var filtered = global.DEFAULT_ICONS_CATEGORYACCOUNT.filter(
            intituition =>
              intituition.description?.substring(0, txt.length).toLowerCase() ==
              txt.toLowerCase(),
          );
          setInstituitions(filtered);
        }}
        searchValue={search}
        onClearSearch={() => setSearch('')}>
        {instituitions.length > 0 ? (
          instituitions.map((instituition, index) => (
            <ModalizeItem
              accent={instituition.accent}
              description={instituition.description}
              icon={instituition.icon}
            />
          ))
        ) : (
          <Text>Nao encontrad ookkk</Text>
        )}
      </Modalize>
    </Container>
  );
};

export default InteractWithAccount;
