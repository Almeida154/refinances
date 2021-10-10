import React, { useEffect, useState } from 'react';

// React components
import {
  StyleSheet, Text,
  TouchableHighlight,
  View, TextInput,
  StatusBar, ScrollView
} from 'react-native';

// Navigation | Auth
import { StackNavigationProp } from '@react-navigation/stack';
import { UseAuth, User } from '../../../../contexts/AuthContext';
import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container, Title,
  Content, ButtonText,
  Txt, Boundaries,
  TxtBottom, Header,
  ButtonTextGoogle, ContainerContentButtonGoogle
} from './styles';

// Components
import Button from '../../../../components/Button';

// Icons
import GoogleIcon from '../../../../assets/images/svg/google-icon.svg';
import BackArrowPink from '../../../../assets/images/svg/arrow-back-pink.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, "Cadastrar">
}

const Cadastrar = ({navigation}: PropsNavigation) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirm, setSenhaConfirm] = useState('');
  const [erro, setErro] = useState('pode ir');
  const { user, handleRegister, updateUserProps } = UseAuth();

  async function SetUser() {    

    if(senha != senhaConfirm) 
      return setErro('Senhas não coincidem')
      const regUser = {
        emailUsuario: email,
        senhaUsuario: senha
      } as User    

    const response = await handleRegister(regUser);

    console.log("response: ", response)
        
    if(response == 'Nome não especificado') {
      navigation.navigate("InserirNome");
      setErro('');
      return;
    }

  
    setErro(response);      
  }

  useEffect(() => {
    async function resetUser() {
      await AsyncStorage.clear()
      updateUserProps({} as User)
    }

    resetUser()
  }, [])
 
  return (
<Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Header>
        <BackArrowPink
          onPress={() => console.log('back')}
          height={26}
          style={{ marginLeft: -16, marginBottom: 20 }} />
        <Title>Vamos criar uma conta?</Title>
      </Header>
      <Boundaries>
        <Content>
          <View style={styles.inputControl}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.textInput}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#0000001d"
              value={email}
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

          <View style={styles.inputControl}>
            <Text style={styles.label}>Confirme sua senha</Text>
            <TextInput style={styles.textInput}
              placeholder="Insira sua senha aqui"
              placeholderTextColor="#0000001d"
              secureTextEntry={true}
              value={senhaConfirm}
              onChangeText={(text) => setSenhaConfirm(text)}></TextInput>
          </View>

          <Text style={{ color: 'red' }}>{erro}</Text>
          
          <Button onPress={SetUser}>
            <ButtonText>Cadastrar</ButtonText>
          </Button>

          <Txt>Ou</Txt>

          {/*<ButtonGoogle onPress={() => console.log('Google button pressed')}>
            <ContainerContentButtonGoogle>
              <GoogleIcon height={35} width={35} />
              <ButtonTextGoogle>Cadastrar com o Google</ButtonTextGoogle>
            </ContainerContentButtonGoogle>
          </ButtonGoogle> */}

          <TxtBottom
            onPress={() => navigation.navigate('Entrar')}>
            Já tenho uma conta
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

export default Cadastrar