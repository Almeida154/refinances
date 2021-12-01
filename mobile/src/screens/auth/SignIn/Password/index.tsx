import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, StatusBar, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { useTheme } from 'styled-components/native';
import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Content,
  Input,
  Writting,
  Error,
  RequisitContainer,
  Requisit,
} from './styles';
import { colors } from '../../../../styles';

// Icons
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

// Util
import {
  hasMinimum,
  hasAtLeastOneNumber,
  hasAtLeastOneLetter,
  isValid,
} from '../../../../helpers/verifyPassword';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Password'>;
  route: RouteProp<RootStackParamAuth, 'Password'>;
};

const Password = ({ navigation }: PropsNavigation) => {
  const [password, setPassword] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [minimumRequisit, setMinimumRequisit] = useState(false);
  const [lettersAndNumbersRequisit, setLettersAndNumbersRequisit] =
    useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const { user, updateUserProps, showNiceToast, hideNiceToast } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const inputRef = useRef<TextInput>(null);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Email'));
    const newUser = user;
    newUser.senhaUsuario = '';
    updateUserProps(newUser);
    return true;
  };

  const verifyPassword = (pswd: string) => {
    if (hasMinimum(pswd)) setMinimumRequisit(true);
    else setMinimumRequisit(false);

    if (hasAtLeastOneNumber(pswd) && hasAtLeastOneLetter(pswd))
      setLettersAndNumbersRequisit(true);
    else setLettersAndNumbersRequisit(false);

    if (!isValid(pswd)) {
      setError(true);
      setErrorMessage('Caracter inválido!');
    }
  };

  async function next() {
    if (password == '') {
      // setError(true);
      // setErrorMessage('Preencha este campo!');
      showNiceToast('error', 'Não esqueça a senha! 😠');
      return;
    }
    if (!hasMinimum(password)) {
      // setError(true);
      // setErrorMessage('Insira pelo menos 6 caracteres!');
      showNiceToast('error', 'Deve ter pelo menos 6 caracteres!');
      return;
    }
    if (!hasAtLeastOneNumber(password)) {
      // setError(true);
      // setErrorMessage('Deve conter pelo menos um número!');
      showNiceToast('error', 'Deve conter pelo menos um número!');
      return;
    }
    if (!hasAtLeastOneLetter(password)) {
      // setError(true);
      // setErrorMessage('Deve conter pelo menos uma letra!');
      showNiceToast('error', 'Deve conter pelo menos uma letra!');
      return;
    }
    if (!isValid(password)) {
      // setError(true);
      // setErrorMessage('Caracter inválido!');
      showNiceToast('error', 'Caracter inválido!');
      return;
    }
    hideNiceToast();
    const newUser = user;
    newUser.senhaUsuario = password;
    updateUserProps(newUser);
    console.debug('Password | next(): ', user);
    navigation.dispatch(StackActions.replace('ConfirmPassword'));
  }
  const theme: any = useTheme();

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Header onBackButton={() => backAction()} title="Insira uma senha" />
      <Content onPress={() => inputRef.current?.focus()} activeOpacity={1}>
        <Writting>
          <Input
            placeholder="Defina aqui"
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={theme.colors.davysGrey}
            value={password}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={securePassword}
            onChangeText={text => {
              setPassword(text);
              setError(false);
              verifyPassword(text);
            }}
            ref={inputRef}
            autoFocus
          />
          {password.length > 0 && (
            <>
              <IonIcons
                style={{
                  padding: 6,
                  marginLeft: 32,
                }}
                name="close"
                size={32}
                color={theme.colors.davysGray}
                onPress={() => {
                  setPassword('');
                  setSecurePassword(true);
                  setError(false);
                }}
              />
              <Feather
                style={{
                  padding: 6,
                  marginLeft: 8,
                }}
                name={securePassword ? 'eye' : 'eye-off'}
                size={28}
                color={theme.colors.davysGray}
                onPress={() => setSecurePassword(!securePassword)}
              />
            </>
          )}
        </Writting>
        {hasError && <Error>{errorMessage}</Error>}
        <RequisitContainer>
          <Requisit style={minimumRequisit ? { opacity: 1 } : {}}>
            ● Pelo menos 6 caracteres
          </Requisit>
          <Requisit style={lettersAndNumbersRequisit ? { opacity: 1 } : {}}>
            ● Deve conter letras e números
          </Requisit>
        </RequisitContainer>
      </Content>
      <BottomNavigation onPress={() => next()} description="Próximo" />
    </Container>
  );
};

export default Password;
