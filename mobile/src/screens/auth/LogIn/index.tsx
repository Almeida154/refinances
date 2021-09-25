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
          <View style={styles.inputControl}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.textInput}
              placeholder="email@exemplo.com"
              placeholderTextColor="#0000001d"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}></TextInput>
          </View>

          <View style={styles.inputControl}>
            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.textInput}
              placeholder="Insira sua senha aqui"
              placeholderTextColor="#0000001d"
              secureTextEntry={true}
              value={senha}
              onChangeText={(text) => setSenha(text)}></TextInput>
          </View>

          <Text style={{ color: 'red' }}>{erro}</Text>
          
          <Button onPress={LoginUser}>
            <ButtonText>Entrar</ButtonText>
          </Button>

          <Txt>Ou</Txt>

          {/* <ButtonGoogle onPress={() => console.log('Google button pressed')}>
            <ContainerContentButtonGoogle>
              <GoogleIcon height={35} width={35} />
              <ButtonTextGoogle>Entrar com o Google</ButtonTextGoogle>
            </ContainerContentButtonGoogle>
          </ButtonGoogle> */}

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