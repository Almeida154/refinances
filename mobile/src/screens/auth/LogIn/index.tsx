import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';

// React components
import {
  StyleSheet, Text, View,
  TextInput, StatusBar
} from 'react-native';

// Navigation | Auth
import { UseAuth } from '../../../contexts/AuthContext';
import RootStackParamAuth from '../../../@types/RootStackParamAuth';

// Styles
import {
  Container, Title,
  Content, ButtonText,
  Txt, Boundaries,
  TxtBottom, Header,
  ButtonTextGoogle, ContainerContentButtonGoogle
} from './styles';

// Components
import Button from '../../../components/Button';
import ButtonGoogle from '../../../components/ButtonGoogle';
import InputText from '../../../components/InputText';

// Icons
import BackArrowPink from '../../../assets/images/svg/arrow-back-pink.svg';
import GoogleIcon from '../../../assets/images/svg/google-icon.svg';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, "Entrar">
};

const Entrar = ({navigation}: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const { user, updateUserProps, handleLogin } = UseAuth();

  async function LoginUser() {
    const loginUser = user;
    loginUser.emailUsuario = email;
    loginUser.senhaUsuario = senha;
    console.log(loginUser)
    updateUserProps(loginUser);
    const response = await handleLogin();

    if (response != '') setErro(response);
  }
  
  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Header>
        <BackArrowPink
          onPress={() => console.log('back')}
          height={26}
          style={{ marginLeft: -16, marginBottom: 20 }} />
        <Title>Seja bem-vindo(a)</Title>
      </Header>
      <Boundaries>
        <Content>

          <InputText
            label="Email"
            placeholder="Exemplo@gmail.com"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={txt => setEmail(txt)} />
            
          <InputText
            label="Senha"
            placeholder="Sua senha"
            value={senha}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={txt => setSenha(txt)} />

          <Text style={{ color: 'red' }}>{erro}</Text>
          
          <Button onPress={LoginUser}>
            <ButtonText>Entrar</ButtonText>
          </Button>

          <Txt>Ou</Txt>

          <TxtBottom
            onPress={() => navigation.navigate('RecuperarConta')}>
            Esqueci minha senha
          </TxtBottom>
          
          <TxtBottom
            onPress={() => navigation.navigate('Cadastrar')}>
            Ainda não tenho uma conta
          </TxtBottom>

        </Content>
      </Boundaries>
    </Container>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Nunito-Black',
    fontSize: 18,
    opacity: .65
  },
  textInput: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    borderBottomWidth: 2,
    width: '100%',
    color: '#858c87',
    height: 40,
    borderBottomColor: '#00000028'
  },
  inputControl: {
    display: 'flex',
    width: '100%',
    marginTop: 30
  },
});

export default Entrar