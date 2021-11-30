
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Header from '../../../components/Header';
import { useTheme } from 'styled-components/native'; 
import {
  Container,
  ContainerBody,
  ContainerScroll,
  Profile,
  ContainerProfile,
  HeaderContainer,
  ContainerItems,
  Item,
  Title,
  Subtitle,
  SectionIconRight,
  SectionIconLeft,
  Separator,
  MainTitle,
  Footer,
  TitleFooter,
  SubtitleFooter,
  SectionIcons,
  Copyright,
  Icon,
  Touchable
} from './styles'

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MCicons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

import { Switch } from 'react-native-paper';

import { UseAuth } from '../../../../../contexts/AuthContext';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import { UseConfig } from '../../../../../contexts/ConfigContext';

import { StackActions } from '@react-navigation/native';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import { colors } from '../../../../../styles';
import api from '../../../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    (async function(){
      const response = await api.put(`/config/edit/${user.id}`, {
        theme: isDark ? 'light' : 'dark'
      })

    if(response.data.error) {
     return showNiceToast("error", response.data.error)
    }

    user.config.theme = isDark ? 'light' : 'dark'
    await AsyncStorage.setItem('user', JSON.stringify(user));
     updateUserProps(user)
    })()
    
    
    setIsDark(!isDark)
  };

  useEffect(() => {
    console.log(user)
  }, [user])
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

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Main'))
    return true;
  };
  const theme: any = useTheme()

  return (
    <ScrollView>
      {stateReload ? (
        <View
          style={{
            alignSelf: 'center',
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#EE4266" />
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

        <Container>
          
          <HeaderContainer>

            <Header
              onBackButton={backAction}
              title=""
              isShort
            />
            
            <ContainerProfile>
              {user.fotoPerfilUsuario == null ? (
                <Profile
                  source={require('../../../../../assets/images/avatarDefault.png')}
                />
              ) : (
                <Profile
                  source={{ uri: `data:${mime}base64,${avatar}` }}
                />
              )}

            </ContainerProfile>

          </HeaderContainer>
          {/* Scrollable Content */}

          <ContainerScroll>
            <ContainerBody>
              {/* NOME */}
                <ContainerItems>
                  <SectionIconLeft>
                    <Feather
                      name="user"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                      <Title>Nome</Title>
                      <Subtitle>{user.nomeUsuario}</Subtitle>
                    </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator />

                {/* EMAIL */}
                <ContainerItems>
                  <SectionIconLeft>
                    <MCicons
                      name="email-outline"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                    <Title>E-mail</Title>
                    <Subtitle>{user.emailUsuario}</Subtitle>
                  </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator />

                {/* SENHA */}
                <ContainerItems>
                  <SectionIconLeft>
                    <Feather
                      name="lock"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                      <Title>Senha</Title>
                      <Subtitle>Alterar senha</Subtitle>
                    </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                <MainTitle>Conta</MainTitle>

                {/* Contas */}
                <ContainerItems>
                  <SectionIconLeft>
                    <Entypo
                      name="credit-card"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable
                    onPress={()=> {
                      navigation.dispatch(
                      StackActions.replace('StackAccount', { screen: 'ManageAccount'}))
                  }}>
                    <Item>
                    <Title>Contas</Title>
                    <Subtitle>Veja suas contas</Subtitle>
                  </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* CATEGORIAS */}
                <ContainerItems>
                  <SectionIconLeft>
                    <AntDesign
                      name="addfolder"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable
                    onPress={()=> {
                      navigation.dispatch(
                      StackActions.replace('StackAccount', { screen: 'ManageCategory'}))
                  }}>
                    <Item>
                    <Title>Categorias</Title>
                    <Subtitle>Veja suas categorias</Subtitle>
                  </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* METAS */}
                <ContainerItems>
                  <SectionIconLeft>
                    <Ionicons
                      name="medal-outline"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable
                    onPress={()=> {
                      navigation.dispatch(
                      StackActions.replace('GoalsStack', { screen: 'GoalsList'}))
                  }}>
                    <Item >
                      <Title>Metas</Title>
                      <Subtitle>Veja suas metas</Subtitle>
                    </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                <MainTitle>Segurança</MainTitle>

                {/* SENHA NO APP */}
                <ContainerItems>
                  <SectionIconLeft>
                    <Entypo
                      name="lock"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                    <Title>Ativar senha</Title>
                    <Subtitle>Defina uma senha</Subtitle>
                  </Item>
                  </Touchable>

                  <SectionIconRight>
                    <Switch value={isSenha} 
                      onValueChange={onSwitchSenha}
                      theme={{}}
                      color={theme.colors.paradisePink}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* TOUCH ID */}
                <ContainerItems>
                  <SectionIconLeft>
                    <MaterialIcons
                      name="language"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Touch ID</Title>
                    <Subtitle>Desbloqueie com a digital</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <Switch value={isTouch} 
                      onValueChange={onSwitchTouch}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1}}
                      theme={{}}
                      color={theme.colors.paradisePink}
                     />
                  </SectionIconRight>
                </ContainerItems>

                <Separator />

                <MainTitle>Geral</MainTitle>

                {/* TEMA */}
                <ContainerItems>
                  <SectionIconLeft>
                    <Entypo
                      name="brush"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Tema</Title>
                    <Subtitle>{isDark ? 'dark' : 'light'}</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <Switch value={isDark} 
                      onValueChange={onSwitchDark}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1}}
                      theme={{}}
                      color={theme.colors.paradisePink}
                     />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* IDIOMA */}
                <ContainerItems>
                  <SectionIconLeft>
                    <MaterialIcons
                      name="language"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                    <Title>Idioma</Title>
                    <Subtitle>pt-br</Subtitle>
                  </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                <MainTitle>Outras opções</MainTitle>

                {/* CPMPARTILHAR */}
                <ContainerItems>
                  <SectionIconLeft>
                    <FontAwesome
                      name="share"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                    <Title>Compartilhar</Title>
                    <Subtitle>Mostre para seus amigos</Subtitle>
                  </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* AVALIAR */}
                <ContainerItems>
                  <SectionIconLeft>
                    <AntDesign
                      name="star"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                    <Title>Avaliar</Title>
                    <Subtitle>Avalie o aplicativo</Subtitle>
                  </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* LIMPAR DADOS */}
                <ContainerItems>
                  <SectionIconLeft>
                    <FontAwesome
                      name="trash"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable>
                    <Item>
                      <Title>Limpar dados</Title>
                      <Subtitle>Excluir todas as transações</Subtitle>
                    </Item>
                  </Touchable>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator />

                <MainTitle>Sair</MainTitle>

                {/* SAIR */}
                <ContainerItems>
                  <SectionIconLeft>
                    <MCicons
                      name="logout"
                      color={theme.colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Touchable onPress={handleLogout}>
                    <Item>
                      <Title>Sair</Title>
                      <Subtitle>Saia da sua conta</Subtitle>
                    </Item>
                  </Touchable>

                </ContainerItems>

                <Separator />
                <Separator />

                <Footer>

                  <TitleFooter>Refinances</TitleFooter>

                  <SubtitleFooter>
                    O Refinances é um aplicativo que gerencia seu dinheiro, elaborado pela Evoke, empresa desenvolvedora de software. 
                  </SubtitleFooter>

                  <SectionIcons>

                      <Icon>
                        <AntDesign
                          name="instagram"
                          color={theme.colors.cultured}
                          size={25}
                        />
                      </Icon>

                      <Icon>
                        <Feather
                          name="github"
                          color={theme.colors.cultured}
                          size={25}
                        />
                      </Icon>

                      <Icon>
                        <AntDesign
                          name="twitter"
                          color={theme.colors.cultured}
                          size={25}
                        />
                      </Icon>

                      <Icon>
                        <AntDesign
                          name="iconfontdesktop"
                          color={theme.colors.cultured}
                          size={25}
                        />
                      </Icon>
                  </SectionIcons>

                  <Copyright>Evoke © Copyright 2021</Copyright>

                </Footer>

            </ContainerBody>
          </ContainerScroll>

        </Container>
      )}
    </ScrollView>
  );
};

export default Config;