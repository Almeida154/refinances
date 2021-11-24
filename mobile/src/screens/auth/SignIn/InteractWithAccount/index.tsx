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
import { colors, fonts, metrics } from '../../../../styles';

// Components
import ShortHeader from '../../../../components/ShortHeader';
import BottomNavigation from '../../components/BottomNavigation';
import InputText from '../../../../components/InputText';
import Modalize from '../../../../components/Modalize';

import { Modalize as Modal } from 'react-native-modalize';
import global from '../../../../global';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
import ModalizeItem from '../../../../components/ModalizeItem';

// Icon
import NoResults from '../../../../assets/images/svg/noResults.svg';

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

  const [instituition, setInstituition] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState<number | null>(0);

  const {
    user,
    updateSetupUserProps,
    setupUser,
    showNiceToast,
    hideNiceToast,
  } = UseAuth();

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

  useEffect(() => {
    if (route.params.accountIndex) {
      const account = setupUser.account[route.params.accountIndex];
      setDesc(account.descricao);
      setAmount(account.saldoConta);
      setInstituition(account.descricao);
    }
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Account'));
    AndroidKeyboardAdjust.setAdjustResize();
    return true;
  };

  async function interact() {
    if (instituition == '')
      return showNiceToast('error', 'Escolha uma instituição');
    if (desc == '') return showNiceToast('error', 'Preecha a descrição');
    hideNiceToast();

    if (route.params.accountIndex) {
      const account = setupUser.account[route.params.accountIndex];
      account.descricao = desc;
      account.saldoConta = amount || 0;

      const newSetupProps = setupUser;
      newSetupProps.account[route.params.accountIndex] = account;
      updateSetupUserProps(newSetupProps);

      navigation.dispatch(StackActions.replace('Account'));
      return showNiceToast(
        'success',
        'Tudo certo!',
        'Conta editada com sucesso :)',
      );
    }

    const newAccount = {
      categoryConta: route.params.accountType,
      descricao: desc,
      saldoConta: amount,
    } as Conta;

    const newSetupProps = setupUser;
    newSetupProps.account.push(newAccount);
    updateSetupUserProps(newSetupProps);

    navigation.dispatch(StackActions.replace('Account'));
    showNiceToast('success', 'Tudo certo!', 'Conta criada com sucesso :)');
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
            accountInstitution={instituition != '' ? instituition : undefined}
          />
        )}
        <InputText
          label="Descrição"
          placeholder="Itaú Personnalite"
          onChangeText={txt => setDesc(txt)}
          value={desc}
        />
        <InputText
          label="Valor da conta"
          isCurrencyInput
          // @ts-ignore
          value={amount}
          onChangeValue={(amt: number) => setAmount(amt)}
          onChangeText={() => {
            if (amount == null) setAmount(0.0);
          }}
        />
      </Content>
      <BottomNavigation
        onPress={() => interact()}
        description={route.params.accountIndex ? 'Editar' : 'Adicionar'}
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
              key={index}
              accent={instituition.accent}
              description={instituition.description}
              icon={instituition.icon}
              onPress={() => {
                // @ts-ignore
                setDesc(instituition.description);
                // @ts-ignore
                setInstituition(instituition.description);
                closeModalize();
              }}
            />
          ))
        ) : (
          <View
            style={{
              opacity: 0.7,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: heightPixel(100),
            }}>
            <NoResults width={widthPixel(340)} height={widthPixel(340)} />
            <Text
              style={{
                fontSize: fonts.size.small,
                fontFamily: fonts.familyType.bold,
              }}>
              <Text style={{ color: colors.darkGray }}>
                Nenhum resultado para:{' '}
              </Text>

              <Text style={{ color: colors.redCrayola }}>"{search}"</Text>
            </Text>
          </View>
        )}
      </Modalize>
    </Container>
  );
};

export default InteractWithAccount;
