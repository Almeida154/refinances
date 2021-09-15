import React, { useEffect, useState } from 'react';

// React components
import {
  StyleSheet, Text,
  TouchableHighlight, View,
  TextInput, StatusBar,
  Alert, BackHandler
} from 'react-native';

// Navigation | Auth
import { UseAuth } from '../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../@types/RootStackParamAuth';

// Styles
import {
  Container, Boundaries,
  Header, Title, Content,
  NextButton, TextButton,
  ContainerNextButtonContent,
} from './styles';

// Icons
import ArrowNextGrey from '../../assets/images/svg/arrow-next-grey.svg';
import ArrowBackGrey from '../../assets/images/svg/arrow-back-grey.svg';
  
export type PropsNavigation = {
    navigation: StackNavigationProp<RootStackParamAuth, "InserirNome">,    
    route: RouteProp<RootStackParamAuth, "InserirNome">
}

const InserirNome = ({route, navigation}: PropsNavigation) => {
  const [nome, setNome] = useState('');
  const { user, updateUserProps } = UseAuth();
  
  const backAction = () => {
    navigation.goBack();
    const newUser = user;
    newUser.nomeUsuario = '';
    updateUserProps(newUser);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  async function setUser() {
    if (nome == '') return;
    
    await AsyncStorage.setItem('nomeUser', nome)
    
    navigation.navigate('ConfigConta');
  }

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Boundaries>
        <Header>
          <ArrowBackGrey
            onPress={() => navigation.navigate('Cadastrar')}
            height={26}
            style={{ marginLeft: -16, marginBottom: 20 }} />
          <Title>Como quer ser chamado?</Title>
        </Header>

        <Content>
          <View style={styles.inputControl}>          
            <TextInput style={styles.textInput}
              placeholder="Seu nome ou apelido"
              placeholderTextColor="gray"
              value={nome}
              onChangeText={setNome}
            ></TextInput>
          </View>
        </Content>

        <NextButton onPress={setUser}>
          <ContainerNextButtonContent>
            <TextButton>Continuar</TextButton>
            <ArrowNextGrey
              onPress={setUser}
              height={18}/>
          </ContainerNextButtonContent>
        </NextButton>

      </Boundaries>
    </Container>
  );
}

const styles = StyleSheet.create({
  textInput: {    
    width: '100%',
    color: '#000',
    height: 80,    
    opacity: 0.7,
    fontSize: 20,
    fontFamily: 'Nunito-Bold'
  },
  inputControl: {
    width: '100%',
    marginTop: 80
  },
});

export default InserirNome;