import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../components/Button';

import Fontisto from 'react-native-vector-icons/Fontisto';

import PropsNavigationApp, {
  PropsMainRoutes,
} from '../../../@types/RootStackParamApp';

const { width } = Dimensions.get('screen');

import { UseAuth } from '../../../contexts/AuthContext';
import { UseCategories } from '../../../contexts/CategoriesContext';
import { UseDadosTemp } from '../../../contexts/TemporaryDataContext';
import { UseMetas } from '../../../contexts/GoalsContext';

import { StackActions } from '@react-navigation/native';

import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario';

import { colors, fonts, metrics } from '../../../styles';

import {
  ActionsAndAssets,
  Container,
  Content,
  Greeting,
  Header,
  Name,
  NotificationContainer,
  Photo,
  Salutation,
} from './styles';

import { widthPixel } from '../../../helpers/responsiveness';
import shadowBox from '../../../helpers/shadowBox';
import hexToRGB from '../../../helpers/hexToRgba';

import BalanceCard from './components/BalanceCard';
import AccountsCard from './components/AccountsCard';
import CreateCard from './components/CreateCard';
import GoalsCard from './components/GoalsCard';
import CategoriesCard from './components/CategoriesCard';

const Home = () => {
  const { user, handleLogout, userAvatar } = UseAuth();
  const { handleReadByUserCategorias, categorias, loading } = UseCategories();
  const { navigation } = UseDadosTemp();

  const [avatar, setAvatar] = useState<string | undefined | null>('');
  const [mime, setMime] = useState<string | undefined | null>('');

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
    (async () => {
      const req = await handleReadByUserCategorias(
        await retornarIdDoUsuario(),
        'despesa',
      );
    })();
  }, []);

  const { metas, handleReadByUserMetas } = UseMetas();

  useEffect(() => {
    // Caso nenhuma meta seja carregada, recarregar
    if (!metas)
      (async function () {
        await handleReadByUserMetas(await retornarIdDoUsuario());
      })();
  }, []);

  const handleSalutation = () => {
    const currentDate = new Date(Date.now());
    const currentHour = currentDate.getHours();

    // console.debug('Home | handleSalutation() - Horário: ' + currentHour);

    if (currentHour < 12) return `Bom dia`;
    if (currentHour < 19) return `Boa tarde`;
    return `Boa noite`;
  };

  return (
    <Container>
      <Header>
        <Greeting>
          <Name numberOfLines={1}>Olá, {user.nomeUsuario}</Name>
          <Salutation>{handleSalutation()}</Salutation>
        </Greeting>
        <ActionsAndAssets>
          <NotificationContainer activeOpacity={0.8} style={shadowBox(14, 0.4)}>
            <Fontisto
              name="bell"
              size={widthPixel(50)}
              color={hexToRGB(colors.silver, 0.3)}
            />
          </NotificationContainer>
          <TouchableOpacity activeOpacity={0.8} style={shadowBox(10, 1)}>
            {user.fotoPerfilUsuario == null ? (
              <Photo
                source={require('../../../assets/images/avatarDefault.png')}
              />
            ) : (
              <Photo source={{ uri: `data:${mime}base64,${avatar}` }} />
            )}
          </TouchableOpacity>
        </ActionsAndAssets>
      </Header>
      <Content>
        <BalanceCard />
        <AccountsCard />
        <CreateCard
          name="categoria"
          description="Você pode criar categorias e definir limites para se organizar."
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('StackAccount', { screen: 'NewCategory' }),
            )
          }
        />
        <CategoriesCard />
        <CreateCard
          name="meta"
          description="As metas são úteis para o seu avanço pessoal e financeiro."
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('GoalsStack', { screen: 'CreateGoals' }),
            );
          }}
        />
        {metas != undefined && metas?.length > 0 && <GoalsCard />}
      </Content>
    </Container>
  );
};

export default Home;
