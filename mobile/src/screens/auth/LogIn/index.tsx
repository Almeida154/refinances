import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';

// React components
import { StatusBar } from 'react-native';

// Navigation | Auth
import { UseAuth } from '../../../contexts/AuthContext';
import RootStackParamAuth from '../../../@types/RootStackParamAuth';

// Styles
import { colors, fonts, metrics } from '../../../styles';
import {
  Container,
  Header,
  Boundaries,
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

// Icons
import BackArrowPink from '../../../assets/images/svg/arrow-back-pink.svg';
import LoginIcon from '../../../assets/images/svg/login-icon.svg';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Entrar'>;
};

const Entrar = ({ navigation }: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const { user, updateUserProps, handleLogin } = UseAuth();

  async function LoginUser() {
    const loginUser = user;
    loginUser.emailUsuario = email;
    loginUser.senhaUsuario = senha;
    console.log(loginUser);
    updateUserProps(loginUser);
    const response = await handleLogin();

    if (response != '') setErro(response);
  }

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <LinearGradient
        style={{ flex: 1, paddingTop: metrics.default.statusBarHeight }}
        start={{ x: 0.8, y: 0 }}
        end={{ x: 1, y: 2 }}
        locations={[0, 0.2]}
        colors={[colors.paradisePink, colors.bigDipOruby]}>
        <Header>
          <BackArrowPink
            style={{ position: 'absolute', left: 14, top: 40 }}
            onPress={() => console.log('back')}
            height={26}
          />
          <LoginIcon
            style={{ position: 'absolute', left: 14, top: 40 }}
            height={'50%'}
          />
        </Header>
        <Content
          style={{
            shadowColor: 'rgba(0, 0, 0, .4)',
            shadowOffset: { width: 5, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 30,
          }}>
          <Title>Entre em sua conta</Title>
          <Form
            style={{
              shadowColor: 'rgba(0, 0, 0, .4)',
              shadowOffset: { width: 5, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 30,
            }}>
            <Boundaries>
              <InputText
                label="Email"
                placeholder="Exemplo@gmail.com"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={txt => setEmail(txt)}
              />

              <InputText
                label="Senha"
                placeholder="Sua senha"
                value={senha}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={txt => setSenha(txt)}
              />

              <Button onPress={LoginUser} title="Entrar" />

              <TextForgotPassword
                onPress={() => navigation.navigate('RecuperarConta')}>
                Esqueci minha senha
              </TextForgotPassword>

              <TextNoAccount onPress={() => navigation.navigate('Cadastrar')}>
                Ainda não tenho conta
              </TextNoAccount>
            </Boundaries>
          </Form>
        </Content>
      </LinearGradient>
    </Container>
  );
};

export default Entrar;
