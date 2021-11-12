import React, { useState, useRef, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/routers';

import { UseAuth, User } from '../../../contexts/AuthContext';
import RootStackParamAuth from '../../../@types/RootStackParamAuth';

// Styles
import { colors, metrics } from '../../../styles';
import {
  Container,
  Header,
  Content,
  Form,
  Title,
  TextForgotPassword,
  TextNoAccount,
} from './styles';
import LinearGradient from 'react-native-linear-gradient';

// Components
import Button from '../../../components/Button';
import InputText from '../../../components/InputText';
import { TextInput } from 'react-native';

// Icons
import IonIcons from 'react-native-vector-icons/Ionicons';
import LoginIcon from '../../../assets/images/svg/login-icon.svg';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Login'>;
};

const Entrar = ({ navigation }: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin, showNiceToast, hideNiceToast } = UseAuth();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [emailError, setEmailError] = useState<any | null>(null);
  const [passwordError, setPasswordError] = useState<any | null>(null);

  async function LoginUser() {
    const logUser = {} as User;
    logUser.emailUsuario = email;
    logUser.senhaUsuario = password;
    console.debug('loginuser | handleLogin', handleLogin);
    const response = await handleLogin(logUser);

    if (!response.ok) {
      switch (response.error) {
        case 'both':
          showNiceToast('error', response.message || '');
          setPasswordError(response.message);
          setEmailError(response.message);
          break;
        case 'senha':
          showNiceToast('error', response.message || '');
          setPasswordError(response.message);
          break;
        case 'email':
          showNiceToast('error', response.message || '');
          setEmailError(response.message);
          break;
        default:
          return;
      }
    }
  }

  return (
    <Container>
      <LinearGradient
        style={{ flex: 1, paddingTop: metrics.default.statusBarHeight }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 0.3 }}
        locations={[0, 1.4]}
        colors={[colors.paradisePink, colors.bigDipOruby]}>
        <Header>
          <IonIcons
            style={{ position: 'absolute', left: 32, marginTop: 16 + 32 }}
            name="md-arrow-back-sharp"
            size={40}
            color={colors.bigDipOruby}
            onPress={() => console.log('back')}
          />
          <LoginIcon style={{ top: '10%' }} height={'20%'} />
        </Header>

        <Content
          style={{
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowOffset: { width: 5, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 30,
          }}>
          <Title>Entre em sua conta</Title>
          <Form
            style={{
              shadowColor: 'rgba(0, 0, 0, .6)',
              shadowOffset: { width: 5, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 30,
            }}>
            <InputText
              label="Email"
              placeholder="Exemplo@gmail.com"
              value={email}
              error={emailError}
              autoCapitalize="none"
              textContentType="emailAddress"
              secureTextEntry={false}
              returnKeyType="next"
              blurOnSubmit={false}
              ref={emailInputRef}
              showClearIcon={email != ''}
              onClear={() => {
                setEmailError(null);
                setEmail('');
              }}
              onChangeText={txt => {
                setEmailError(null);
                setEmail(txt);
              }}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <InputText
              label="Senha"
              placeholder="Sua senha"
              value={password}
              error={passwordError}
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry
              ref={passwordInputRef}
              showClearIcon={password != ''}
              onClear={() => {
                setPasswordError(null);
                setPassword('');
              }}
              onChangeText={txt => {
                setPasswordError(null);
                setPassword(txt);
              }}
            />

            <LinearGradient
              style={{ borderRadius: metrics.inputText.radius }}
              start={{ x: 0, y: 2 }}
              end={{ x: 1, y: 3 }}
              locations={[0, 1]}
              colors={[colors.paradisePink, colors.bigDipOruby]}>
              <Button
                style={{
                  backgroundColor: 'transparent',
                }}
                onPress={LoginUser}
                title="Entrar"
                lastOne
              />
            </LinearGradient>
            <TextForgotPassword
              onPress={() => {
                navigation.navigate('PasswordRecovery');
                hideNiceToast();
              }}>
              Esqueci minha senha
            </TextForgotPassword>
            <TextNoAccount
              onPress={() => {
                navigation.dispatch(StackActions.replace('Name'));
                hideNiceToast();
              }}>
              Ainda não tenho conta
            </TextNoAccount>
          </Form>
        </Content>
      </LinearGradient>
    </Container>
  );
};

export default Entrar;
