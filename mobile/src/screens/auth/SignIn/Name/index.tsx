import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

import { StackActions } from '@react-navigation/native';

// Styles
import { Container, Content, Input, Writting, Error } from './styles';
import { colors } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Name'>;
  route: RouteProp<RootStackParamAuth, 'Name'>;
};

const Name = ({ navigation }: PropsNavigation) => {
  const [name, setName] = useState('Talisca');
  const [hasError, setError] = useState(false);

  const { user, updateUserProps, showNiceToast, hideNiceToast } = UseAuth();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Login'));
    const newUser = user;
    newUser.nomeUsuario = '';
    updateUserProps(newUser);
    return true;
  };

  async function next() {
    if (name == '') {
      showNiceToast('error', 'Não esqueça seu nome!');
      //showNiceToast('error', 'Não esqueça seu nome', null, null, true); // Este tem um detalhe na statusBar
      //setError(true);
      return;
    }
    hideNiceToast();
    const newUser = user;
    newUser.nomeUsuario = name;
    updateUserProps(newUser);
    console.debug('Name | next(): ', user);
    navigation.dispatch(StackActions.replace('Email'));
  }

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Como quer ser chamado?"
      />
      <Content onPress={() => inputRef.current?.focus()} activeOpacity={1}>
        <Writting>
          <Input
            placeholder="Seu nome"
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={colors.davysGrey}
            keyboardType="default"
            autoCapitalize="words"
            value={name}
            onChangeText={text => {
              setName(text);
              setError(false);
            }}
            ref={inputRef}
            autoFocus
          />
          {name.length > 0 && (
            <IonIcons
              style={{
                padding: 6,
                marginLeft: 32,
              }}
              name="close"
              size={32}
              color={`rgba(82, 82, 82, .08)`}
              onPress={() => setName('')}
            />
          )}
        </Writting>
        {hasError && <Error>Preencha este campo!</Error>}
      </Content>
      <BottomNavigation onPress={() => next()} description="Próximo" />
    </Container>
  );
};

export default Name;
