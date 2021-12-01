import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';

// React components
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';

// Navigation | Auth
import { UseAuth } from '../../../contexts/AuthContext';
import RootStackParamAuth from '../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Title,
  Content,
  ButtonText,
  Txt,
  Boundaries,
  TxtBottom,
  Header,
  ButtonTextGoogle,
  ContainerContentButtonGoogle,
} from './styles';
import { colors, fonts, metrics } from '../../../styles';

// Components
import Button from '../../../components/Button';
import { useTheme } from 'styled-components/native';

// Icons
import BackArrowPink from '../../../assets/images/svg/arrow-back-pink.svg';
import { color } from 'react-native-reanimated';
import { StackActions } from '@react-navigation/routers';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'PasswordRecovery'>;
};

const RecuperarConta = ({ navigation }: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const { user, updateUserProps, handleLogin } = UseAuth();

  async function recuperar() {}

  /*async function LoginUser() {
    const loginUser = user;
    loginUser.emailUsuario = email;
    loginUser.senhaUsuario = senha;
    console.log(loginUser)
    updateUserProps(loginUser);
    const response = await handleLogin();

    if (response != '') setErro(response);
  }*/
  const theme: any = useTheme();
  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <Header>
        <BackArrowPink
          onPress={() => console.log('back')}
          height={26}
          style={{ marginLeft: -16, marginBottom: 20 }}
        />
        <Title>Vamos recuperar sua conta!</Title>
      </Header>
      <Boundaries>
        <Content>
          <View style={styles.inputControl}>
            <Text style={styles.label}>Digite seu e-mail cadastrado</Text>
            <TextInput
              style={styles.textInput}
              placeholder="email@exemplo.com"
              placeholderTextColor={theme.colors.xiketic}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}></TextInput>
          </View>

          <Text style={{ color: 'red' }}>{erro}</Text>

          <Button onPress={recuperar}>
            <ButtonText>Enviar</ButtonText>
          </Button>

          <Txt>Ou</Txt>

          <TxtBottom
            onPress={() => navigation.dispatch(StackActions.replace('Name'))}>
            Ainda não tenho uma conta
          </TxtBottom>
        </Content>
      </Boundaries>
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Nunito-Black',
    fontSize: 18,
    opacity: 0.65,
  },
  textInput: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    borderBottomWidth: 2,
    width: '100%',
    color: colors.battleGray,
    height: 40,
    borderBottomColor: colors.oxfordBlue,
  },
  inputControl: {
    display: 'flex',
    width: '100%',
    marginTop: 30,
  },
});

export default RecuperarConta;
