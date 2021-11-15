import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import PropsNavigationApp, {
  PropsMainRoutes,
} from '../../../@types/RootStackParamApp';

const { width } = Dimensions.get('screen');

import { UseAuth } from '../../../contexts/AuthContext';
import { UseDadosTemp } from '../../../contexts/TemporaryDataContext';

import SectionAccount from './components/SectionAccount';

import { StackActions } from '@react-navigation/native';

import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario';

import CreateCategoryGoals from './components/CreateCategoryGoals';
import ManageGoals from './components/ManageGoals';
import ManageCategory from './components/ManageCategorySection';

import fonts from '../../../styles/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
  const { user, handleLogout, userAvatar } = UseAuth();
  const { navigation } = UseDadosTemp();

  const [stateReload, setStateReload] = useState(false);

  const [avatar, setAvatar] = useState<string | undefined | null>('');
  const [mime, setMime] = useState<string | undefined | null>('');

  useEffect(() => {
    (async () => {
      const base64 = await userAvatar();
      console.log(await retornarIdDoUsuario());
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

  return (
    <ScrollView>
      {stateReload ? (
        <View
          style={{
            alignSelf: 'center',
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#E8871E" />
          <Text
            style={{
              color: '#183153',
              fontSize: 22,
              fontFamily: 'Poppins-Bold',
              marginTop: 20,
            }}>
            Carregando...
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.containerProfile}>
              {user.fotoPerfilUsuario == null ? (
                <Image
                  source={require('../../../assets/images/avatarDefault.png')}
                  style={styles.iconProfile}
                />
              ) : (
                <Image
                  source={{ uri: `data:${mime}base64,${avatar}` }}
                  style={styles.iconProfile}
                />
              )}

              <View style={styles.textBoasVindas}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: fonts.size.big,
                    fontFamily: fonts.familyType.bold,
                  }}>
                  Olá, {user.nomeUsuario}
                </Text>

                <Text
                  style={{
                    fontSize: fonts.size.medium,
                    fontFamily: fonts.familyType.bold,
                    color: '#fff',
                    opacity: 0.4,
                  }}>
                  Bom dia
                </Text>
              </View>
            </View>

            <View style={styles.containerSetting}>
              <Icon2
                name="settings"
                color="#9D3147"
                size={30}
                style={{ marginRight: 20 }}
              />

              <TouchableOpacity onPress={handleLogout}>
                <Icon name="logout" color="#9D3147" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Scrollable Content */}

          <ScrollView style={styles.scroll}>
            <View style={styles.containerBody}>
              
              <SectionAccount />

              <CreateCategoryGoals />

              <ManageCategory />
              
              <ManageGoals />
              
            </View>
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#EE4266',
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15
  },
  iconProfile: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: '#9D3147',
    borderWidth: 4,
  },
  containerProfile: {
    display: 'flex',
    flexDirection: 'row',
    width: 170,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBoasVindas: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  containerSetting: {
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scroll: {
    top: -15,
  },
  sectionSaldoGeral: {
    width: width - 60,
    backgroundColor: '#202731',
    height: 80,
    padding: 10,
    borderRadius: 20,
  },

  atalhoCriar: {},

  criarLeft: {},

  criarBtn: {},
});
