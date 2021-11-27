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

import { StackActions } from '@react-navigation/native';

import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario';

import SectionAccount from './components/SectionAccount';
import CreateCategoryGoals from './components/CreateCategoryGoals';
import ManageGoals from './components/ManageGoals';
import ManageCategory from './components/ManageCategorySection';

import { colors, fonts, metrics } from '../../../styles';

import {
  ActionsAndAssets,
  Container,
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

const Home = () => {
  const { user, handleLogout, userAvatar } = UseAuth();
  const { handleReadByUserCategorias, categorias, loading } = UseCategories();
  const { navigation } = UseDadosTemp();

  const [stateReload, setStateReload] = useState(false);

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

  return (
    <Container>
      <Header>
        <Greeting>
          <Name>Olá, Peter</Name>
          <Salutation>Bom dia</Salutation>
        </Greeting>
        <ActionsAndAssets>
          <NotificationContainer style={shadowBox(14, 0.4)}>
            <Fontisto
              name="bell"
              size={widthPixel(50)}
              color={hexToRGB(colors.eerieBlack, 0.3)}
            />
          </NotificationContainer>
          <View style={shadowBox(10, 1)}>
            {user.fotoPerfilUsuario == null ? (
              <Photo
                source={require('../../../assets/images/avatarDefault.png')}
              />
            ) : (
              <Photo source={{ uri: `data:${mime}base64,${avatar}` }} />
            )}
          </View>
        </ActionsAndAssets>
      </Header>
    </Container>
  );
};

export default Home;
