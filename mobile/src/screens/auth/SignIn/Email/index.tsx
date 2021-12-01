import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, StatusBar, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import { useTheme } from 'styled-components/native'; 
import { UseAuth } from '../../../../contexts/AuthContext';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content, Input, Writting, Error } from './styles';
import { colors } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

// Util
import { isValid } from '../../../../helpers/verifyEmail';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Email'>;
  route: RouteProp<RootStackParamAuth, 'Email'>;
};

const Email = ({ navigation }: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user, updateUserProps, emailExists, showNiceToast, hideNiceToast } =
    UseAuth();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Name'));
    const newUser = user;
    newUser.emailUsuario = '';
    updateUserProps(newUser);
    return true;
  };

  async function next() {
    if (email == '') {
      // setError(true);
      // setErrorMessage('Preencha este campo!');
      showNiceToast('error', 'Não esqueça seu email!');
      return;
    }
    if (!isValid(email)) {
      // setError(true);
      // setErrorMessage('E-mail inválido, tente novamente!');
      showNiceToast('error', 'Email inválido!');
      return;
    }
    if (await emailExists(email)) {
      // setError(true);
      // setErrorMessage('E-mail já cadastrado!');
      showNiceToast('error', 'Email já cadastrado!');
      return;
    }

    hideNiceToast();
    const newUser = user;
    newUser.emailUsuario = email;
    updateUserProps(newUser);
    console.debug('Email | next(): ', user);
    navigation.dispatch(StackActions.replace('Password'));
  }
  const theme: any = useTheme()

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <Header onBackButton={() => backAction()} title="Qual seu e-mail?" />
      <Content onPress={() => inputRef.current?.focus()} activeOpacity={1}>
        <Writting>
          <Input
            placeholder="Email@exemplo.com"
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={theme.colors.davysGrey}
            keyboardType="default"
            autoCapitalize="words"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setError(false);
            }}
            ref={inputRef}
            autoFocus
          />
          {email.length > 0 && (
            <IonIcons
              style={{
                padding: 6,
                marginLeft: 32,
              }}
              name="close"
              size={32}
              color={`rgba(82, 82, 82, .08)`}
              onPress={() => {
                setEmail('');
                setError(false);
              }}
            />
          )}
        </Writting>
        {hasError && <Error>{errorMessage}</Error>}
      </Content>
      <BottomNavigation color={theme.colors.davysGray} onPress={() => next()} description="Próximo" />
    </Container>
  );
};

export default Email;
