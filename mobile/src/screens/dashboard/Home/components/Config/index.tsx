
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Header from '../../../components/Header';

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
  Icon
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

import { StackActions } from '@react-navigation/native';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import { colors } from '../../../../../styles';

const Config = () => {
  const { user, handleLogout, userAvatar } = UseAuth();
  const { navigation } = UseDadosTemp();

  const [stateReload, setStateReload] = useState(false);

  const [avatar, setAvatar] = useState<string | undefined | null>('');
  const [mime, setMime] = useState<string | undefined | null>('');

  const [isSenha, setIsSenha] = React.useState(false);
  const onSwitchSenha = () => setIsSenha(!isSenha);

  const [isTouch, setIsTouch] = React.useState(false);
  const onSwitchTouch = () => setIsTouch(!isTouch);

  const [isDark, setIsDark] = React.useState(false);
  const onSwitchDark = () => setIsDark(!isDark);

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
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Nome</Title>
                    <Subtitle>{user.nomeUsuario}</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>E-mail</Title>
                    <Subtitle>{user.emailUsuario}</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Senha</Title>
                    <Subtitle>Alterar senha</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                <ContainerItems
                  onTouchEnd={() => {
                    navigation.dispatch(
                    StackActions.replace('StackAccount', { screen: 'ManageAccount'})
                  )}}>
                  <SectionIconLeft>
                    <Entypo
                      name="credit-card"
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Contas</Title>
                    <Subtitle>Veja suas contas</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                <ContainerItems
                  onTouchEnd={() => {
                    navigation.dispatch(
                    StackActions.replace('StackAccount', { screen: 'ManageCategory'})
                  )}}>
                  <SectionIconLeft>
                    <AntDesign
                      name="addfolder"
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Categorias</Title>
                    <Subtitle>Veja suas categorias</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                <ContainerItems
                  onTouchEnd={() => {
                    navigation.dispatch(
                    StackActions.replace('GoalsStack', { screen: 'GoalsList'})
                  )}}>
                  <SectionIconLeft>
                    <Ionicons
                      name="medal-outline"
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item >
                    <Title>Metas</Title>
                    <Subtitle>Veja suas metas</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Ativar senha</Title>
                    <Subtitle>Defina uma senha</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <Switch value={isSenha} 
                      onValueChange={onSwitchSenha}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1}}
                      theme={{}}
                      color={colors.paradisePink}
                    />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* TOUCH ID */}
                <ContainerItems>
                  <SectionIconLeft>
                    <MaterialIcons
                      name="language"
                      color={colors.silver}
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
                      color={colors.paradisePink}
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
                      color={colors.silver}
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
                    <Subtitle>{isDark ? 'escuro' : 'claro'}</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <Switch value={isDark} 
                      onValueChange={onSwitchDark}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1}}
                      theme={{}}
                      color={colors.paradisePink}
                     />
                  </SectionIconRight>
                </ContainerItems>

                <Separator/>

                {/* IDIOMA */}
                <ContainerItems>
                  <SectionIconLeft>
                    <MaterialIcons
                      name="language"
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Idioma</Title>
                    <Subtitle>pt-br</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Compartilhar</Title>
                    <Subtitle>Mostre para seus amigos</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Avaliar</Title>
                    <Subtitle>Avalie o aplicativo</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Limpar dados</Title>
                    <Subtitle>Excluir todas as transações</Subtitle>
                  </Item>

                  <SectionIconRight>
                    <AntDesign
                      name="right"
                      color={colors.silver}
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
                <ContainerItems
                  onTouchEnd={handleLogout}>
                  <SectionIconLeft>
                    <MCicons
                      name="logout"
                      color={colors.silver}
                      size={25}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    />
                  </SectionIconLeft>

                  <Item>
                    <Title>Sair</Title>
                    <Subtitle>Saia da sua conta</Subtitle>
                  </Item>

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
                          color={colors.cultured}
                          size={25}
                        />
                      </Icon>

                      <Icon>
                        <Feather
                          name="github"
                          color={colors.cultured}
                          size={25}
                        />
                      </Icon>

                      <Icon>
                        <AntDesign
                          name="twitter"
                          color={colors.cultured}
                          size={25}
                        />
                      </Icon>

                      <Icon>
                        <AntDesign
                          name="iconfontdesktop"
                          color={colors.cultured}
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