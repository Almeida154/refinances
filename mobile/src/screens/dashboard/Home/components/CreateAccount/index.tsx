import React, { useEffect, useRef, useState } from 'react';

// @ts-ignore
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { useTheme } from 'styled-components/native';
import { BackHandler, Keyboard, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { Conta, UseContas } from '../../../../../contexts/AccountContext';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';

import { HomeAccountStack } from '../../../../../@types/RootStackParamApp';

// Styles
import { Container, Content } from './styles';
import { colors, fonts, metrics } from '../../../../../styles';

// Components
import ShortHeader from '../../../../../components/ShortHeader';

import InputText from '../../../../../components/InputText';
import Modalize from '../../../../../components/Modalize';
import Button from '../../../../../components/Button';

import { Modalize as Modal } from 'react-native-modalize';
import global from '../../../../../global';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';
import ModalizeItem from '../../../../../components/ModalizeItem';

// Icon
import NoResults from 'react-native-vector-icons/MaterialCommunityIcons';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type PropsNavigation = {
  navigation: StackNavigationProp<HomeAccountStack, 'CreateAccount'>;
  route: RouteProp<HomeAccountStack, 'CreateAccount'>;
};

interface InstituitionProps {
  description?: string;
  accent?: string;
  icon?: any;
}

const InteractWithAccount = ({ navigation, route }: PropsNavigation) => {
  const { showNiceToast, hideNiceToast } = UseDadosTemp();
  const { handleAdicionarConta, handleEditarConta } = UseContas();

  const [search, setSearch] = useState('');
  const [instituitions, setInstituitions] = useState<InstituitionProps[]>([{}]);
  const [instituition, setInstituition] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState<number | null>(0);

  const modalizeRef = useRef<Modal>(null);
  const receiveAccount = route.params?.receiveAccount;

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
    if (receiveAccount) {
      setDesc(receiveAccount.descricao || '');
      setAmount(receiveAccount.saldoConta);
      setInstituition(receiveAccount.instituicao || '');
    }
  }, []);

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('StackAccount', { screen: 'ManageAccount' }),
    );
    AndroidKeyboardAdjust.setAdjustResize();
    return true;
  };

  async function interact() {
    if (instituition == '')
      return showNiceToast('error', 'Escolha uma instituição');
    if (desc == '') return showNiceToast('error', 'Preecha a descrição');
    hideNiceToast();

    if (receiveAccount) {
      receiveAccount.descricao = desc;
      receiveAccount.saldoConta = amount || 0;
      receiveAccount.instituicao = instituition;
      receiveAccount.userConta = await retornarIdDoUsuario();

      const response = await handleEditarConta(receiveAccount);
      if (response == '') {
        navigation.dispatch(
          StackActions.replace('StackAccount', { screen: 'ManageAccount' }),
        );
        showNiceToast('success', 'Tudo certo!', 'Conta criada com sucesso :)');
      } else {
        showNiceToast('error', response);
      }

      navigation.dispatch(
        StackActions.replace('Main', { screen: 'Home' }),
      );

      return showNiceToast(
        'success',
        'Tudo certo!',
        'Conta editada com sucesso :)',
      );
    }

    const newAccount = {
      tipo: route.params.accountType,
      descricao: desc,
      saldoConta: amount,
      instituicao: instituition,
      userConta: await retornarIdDoUsuario(),
    } as Conta;

    const response = await handleAdicionarConta(newAccount);
    if (response == '') {
      navigation.dispatch(
        StackActions.replace('StackAccount', { screen: 'ManageAccount' }),
      );
      showNiceToast('success', 'Tudo certo!', 'Conta criada com sucesso :)');
    } else {
      showNiceToast('error', response);
    }
  }

  const openModalize = () => modalizeRef.current?.open();
  const closeModalize = () => modalizeRef.current?.close();
  const theme: any = useTheme();

  return (
    <Container>
      <View style={{ elevation: 0 }}>
        <ShortHeader onBackButton={() => backAction()} title="Nova conta" />
      </View>
      <Content style={{ elevation: 0 }}>
        {receiveAccount?.tipo != 'outro' && (
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
      <Button
        style={{ backgroundColor: theme.colors.culture }}
        color={theme.colors.silver}
        onPress={() => interact()}
        title={receiveAccount ? 'Editar' : 'Adicionar'}
      />

      <Modalize
        ref={modalizeRef}
        title="Clique para selecionar"
        subtitle="Escolha uma instituição financeira"
        backgroundColor={theme.colors.cultured}
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
            <NoResults name="error" size={widthPixel(340)} />
            <Text
              style={{
                fontSize: fonts.size.small,
                fontFamily: fonts.familyType.bold,
              }}>
              <Text style={{ color: theme.colors.darkGray }}>
                Nenhum resultado para:{' '}
              </Text>

              <Text style={{ color: theme.colors.redCrayola }}>"{search}"</Text>
            </Text>
          </View>
        )}
      </Modalize>
    </Container>
  );
};

export default InteractWithAccount;
