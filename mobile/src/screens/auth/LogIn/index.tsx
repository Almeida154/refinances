import React, { useState, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

// React components
import { StatusBar, TextInput, TextInputComponent } from 'react-native';

// Navigation | Auth
import { UseAuth, User } from '../../../contexts/AuthContext';
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

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  async function LoginUser() {
    user.emailUsuario = email;
    user.senhaUsuario = senha;
    const response = await handleLogin();

    if (response != '') setErro(response);
  }

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <LinearGradient
        style={{ flex: 1, paddingTop: metrics.default.statusBarHeight }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 0.3 }}
        locations={[0, 1.4]}
        colors={[colors.paradisePink, colors.bigDipOruby]}>
        <Header>
          <BackArrowPink
            style={{ position: 'absolute', left: 14, top: 40 }}
            onPress={() => console.log('back')}
            height={26}
          />
          <LoginIcon style={{ left: 1, top: '10%' }} height={'20%'} />
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
                autoCapitalize="none"
                textContentType="emailAddress"
                secureTextEntry={false}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={emailInputRef}
                onChangeText={txt => setEmail(txt)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <InputText
                label="Senha"
                placeholder="Sua senha"
                value={senha}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry
                ref={passwordInputRef}
                onChangeText={txt => setSenha(txt)}
              />

              <LinearGradient
                style={{ borderRadius: metrics.inputText.radius }}
                start={{ x: 0, y: 2 }}
                end={{ x: 1, y: 3 }}
                locations={[0, 1]}
                colors={[colors.paradisePink, colors.bigDipOruby]}>
                <Button
                  color={'transparent'}
                  onPress={LoginUser}
                  title="Entrar"
                />
              </LinearGradient>

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
