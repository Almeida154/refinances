import React, { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';

import { useTheme } from 'styled-components/native';

import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import { Switch } from 'react-native-paper';

import { UseAuth } from '../../../../../contexts/AuthContext';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import { UseConfig } from '../../../../../contexts/ConfigContext';

import { StackActions } from '@react-navigation/native';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import { colors, metrics } from '../../../../../styles';
import api from '../../../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Modalize as Modal } from 'react-native-modalize';
import Modalize from '../../../../../components/Modalize';
import Button from '../../../../../components/Button';

import {
  AvatarContainer,
  Avatar,
  Container,
  Header,
  ImageBg,
  AvatarIcon,
  BlockTitle,
  CreditsTitle,
  CreditsDescription,
  CreditsCopy,
  CreditsSocialContainer,
  CreditsSocialItem,
} from './styles';
import { widthPixel } from '../../../../../helpers/responsiveness';
import BlockItem from './components/BlockItem';

const Config = () => {
  const { user, handleLogout, userAvatar, updateUserProps } = UseAuth();
  const { navigation, showNiceToast } = UseDadosTemp();
  const { isDark, setIsDark } = UseConfig();

  const [stateReload, setStateReload] = useState(false);

  const [avatar, setAvatar] = useState<string | undefined | null>('');
  const [mime, setMime] = useState<string | undefined | null>('');

  const [isSenha, setIsSenha] = React.useState(false);
  const onSwitchSenha = () => setIsSenha(!isSenha);

  const [isTouch, setIsTouch] = React.useState(false);
  const onSwitchTouch = () => setIsTouch(!isTouch);

  const onSwitchDark = () => {
    (async function () {
      const response = await api.put(`/config/edit/${user.id}`, {
        theme: isDark ? 'light' : 'dark',
      });

      if (response.data.error) {
        return showNiceToast('error', response.data.error);
      }

      user.config.theme = isDark ? 'light' : 'dark';
      await AsyncStorage.setItem('user', JSON.stringify(user));
      updateUserProps(user);
    })();

    setIsDark(!isDark);
  };

  useEffect(() => {
    (async () => {
      const base64 = await userAvatar();
      // O avatar é a base64 da imagem
      setAvatar(base64?.slice(base64.indexOf(',') + 1));

      // O mime é o tipo da imagem, ele vai retornar image/jpeg, image/png, etc;
      setMime(
        base64
          ?.substr(0, 40)
          .slice(
            base64?.substr(0, 40).indexOf(':') + 1,
            base64?.substr(0, 40).indexOf('base64,'),
          ),
      );
    })();
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Main'));
    return true;
  };

  const theme: any = useTheme();

  const modalizeRef = useRef<Modal>(null);
  const openModalize = () => modalizeRef.current?.open();
  const closeModalize = () => modalizeRef.current?.close();

  return (
    <Container>
      <Header>
        <ImageBg source={require('../../../../../assets/images/mdchefe.jpg')} />
        <AvatarContainer>
          <Avatar
            source={require('../../../../../assets/images/mdchefe.jpg')}
          />
          <AvatarIcon>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={widthPixel(50)}
              color={colors.white}
            />
          </AvatarIcon>
        </AvatarContainer>
        <IonIcons
          style={{
            marginLeft: metrics.default.boundaries - 6,
            marginTop:
              metrics.default.boundaries / 2 + metrics.default.statusBarHeight,
            opacity: 0.5,
          }}
          name="md-arrow-back-sharp"
          size={widthPixel(70)}
          color={theme.colors.black}
          onPress={backAction}
        />
      </Header>

      <BlockTitle>Perfil</BlockTitle>
      <BlockItem
        title="Nome"
        description="Peter Parker"
        icon="Feather:user"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Email"
        description="peterparker@gmail.com"
        icon="MaterialIcons:alternate-email"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Senha"
        description="Altere sua senha"
        icon="SimpleLineIcons:lock"
        onPress={() => console.log('Nome')}
        isTheLastOne
      />

      <BlockTitle>Conta</BlockTitle>
      <BlockItem
        title="Contas"
        description="Veja suas contas"
        icon="MaterialIcons:account-balance"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Categorias"
        description="Veja suas categorias"
        icon="FontAwesome:star-o"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Metas"
        description="Veja suas metas"
        icon="Ionicons:car-sport-outline"
        onPress={() => console.log('Nome')}
        isTheLastOne
      />

      <BlockTitle>Segurança</BlockTitle>
      <BlockItem
        title="Ativar senha"
        description="Use uma senha para desbloquear"
        icon="MaterialCommunityIcons:safe-square-outline"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Touch ID"
        description="Use o TouchID para desbloquear"
        icon="Ionicons:ios-finger-print-outline"
        onPress={() => console.log('Nome')}
        isTheLastOne
      />

      <BlockTitle>Geral</BlockTitle>
      <BlockItem
        title="Tema"
        description="Light"
        icon="MaterialCommunityIcons:theme-light-dark"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Idioma"
        description="pt-br"
        icon="Entypo:language"
        onPress={() => console.log('Nome')}
        isTheLastOne
      />

      <BlockTitle>Outras opções</BlockTitle>
      <BlockItem
        title="Compartilhar"
        description="Convide os amigos"
        icon="Ionicons:share-social-outline"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Avaliar"
        description="Avalie o projeto"
        icon="Feather:heart"
        onPress={() => console.log('Nome')}
      />
      <BlockItem
        title="Limpar dados"
        description="Limpe todas as transações"
        icon="Feather:trash-2"
        onPress={() => console.log('Nome')}
        isTheLastOne
      />

      <BlockTitle>Sair</BlockTitle>
      <BlockItem
        title="Sair"
        titleColor={colors.paradisePink}
        description="Saia da sua conta"
        icon="MaterialIcons:logout"
        onPress={() => console.log('Nome')}
      />

      <CreditsTitle>Refinances</CreditsTitle>
      <CreditsDescription>
        O Refinances é um aplicativo que gerencia seu dinheiro, elaborado pela
        Evoke, empresa desenvolvedora de software.
      </CreditsDescription>

      <CreditsSocialContainer>
        <CreditsSocialItem onPress={() => console.log('social')}>
          <Feather
            style={{ opacity: 0.6 }}
            name="facebook"
            size={widthPixel(45)}
            color={theme.colors.davysGray}
          />
        </CreditsSocialItem>
        <CreditsSocialItem onPress={() => console.log('social')}>
          <Feather
            style={{ opacity: 0.6 }}
            name="instagram"
            size={widthPixel(45)}
            color={theme.colors.davysGray}
          />
        </CreditsSocialItem>
        <CreditsSocialItem onPress={() => console.log('social')}>
          <Feather
            style={{ opacity: 0.6 }}
            name="github"
            size={widthPixel(45)}
            color={theme.colors.davysGray}
          />
        </CreditsSocialItem>
        <CreditsSocialItem isTheLastItem onPress={() => console.log('social')}>
          <Feather
            style={{ opacity: 0.6 }}
            name="twitter"
            size={widthPixel(45)}
            color={theme.colors.davysGray}
          />
        </CreditsSocialItem>
      </CreditsSocialContainer>

      <CreditsCopy>Evoke © Copyright 2022</CreditsCopy>
    </Container>
  );
};

export default Config;
