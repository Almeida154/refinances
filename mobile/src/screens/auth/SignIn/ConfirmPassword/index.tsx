import React, { useEffect, useState } from 'react';

import { BackHandler } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content, Input, Writting, Error } from './styles';
import { colors, fonts, metrics } from '../../../../styles';

// Icons
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'ConfirmPassword'>;
  route: RouteProp<RootStackParamAuth, 'ConfirmPassword'>;
};

const ConfirmPassword = ({ navigation }: PropsNavigation) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [securePassword, setSecurePassword] = useState(true);

  const { user, updateUserProps } = UseAuth();

  // useEffect(() => {
  //   console.debug('Name | SetUser(): ', user);
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  async function setUser() {
    if (confirmPassword == '') {
      setError(true);
      setErrorMessage('Preencha este campo!');
      return;
    }
    if (confirmPassword != user.password) {
      setError(true);
      setErrorMessage('As senhas não batem!');
      return;
    }
    console.debug('ConfirmPassword | SetUser(): ', user);
    console.log('Batem!');

    //navigation.navigate('Photo');
  }

  return (
    <Container>
      <Header onBackButton={() => backAction()} title="Confirme sua senha" />
      <Content>
        <Writting>
          <Input
            placeholder="Defina aqui"
            placeholderTextColor={'rgba(52, 52, 52, .3)'}
            selectionColor={colors.davysGrey}
            value={confirmPassword}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={securePassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setError(false);
            }}
          />
          {confirmPassword.length > 0 && (
            <>
              <IonIcons
                style={{
                  padding: 6,
                  marginLeft: 32,
                }}
                name="close"
                size={32}
                color={`rgba(82, 82, 82, .08)`}
                onPress={() => {
                  setConfirmPassword('');
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
                color={`rgba(82, 82, 82, .08)`}
                onPress={() => setSecurePassword(!securePassword)}
              />
            </>
          )}
        </Writting>
        {hasError && <Error>{errorMessage}</Error>}
      </Content>
      <BottomNavigation onPress={() => setUser()} description="Próximo" />
    </Container>
  );
};

export default ConfirmPassword;
