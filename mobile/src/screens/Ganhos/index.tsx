import React, { useEffect, useState } from 'react';

// React components
import {
  StyleSheet, Text,
  TouchableHighlight, View,
  TextInput, StatusBar, Alert
} from 'react-native';

// Navigation | Auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseDadosTemp } from '../../contexts/DadosTemporariosContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
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
  navigation: StackNavigationProp<RootStackParamAuth, "Ganhos">,    
  route: RouteProp<RootStackParamAuth, "Ganhos">
}

const Ganhos = ({route, navigation}: PropsNavigation) => {
  const [renda, setRenda] = useState('');
  const { rendaTemp, setRendaTemp, configuracoesDeConta, mudarConfiguracaoConta } = UseDadosTemp();
  

  async function setRendaItem() {  
    if (renda == '')
      return Alert.alert("Selecione algum valor brother");
    
    setRendaTemp(renda);

    configuracoesDeConta[0] = true;
    mudarConfiguracaoConta(configuracoesDeConta);
      
    await AsyncStorage.setItem('rendaTemp', renda);
    navigation.goBack()
  } 

  useEffect(() => {
    setRenda(rendaTemp == '00.00' ? '' : rendaTemp);
    console.log(rendaTemp);
  }, []);

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Boundaries>
        <Header>
          <ArrowBackGrey
            onPress={() => navigation.navigate('ConfigConta')}
            height={26}
            style={{ marginLeft: -16, marginBottom: 20 }} />
          <Title>Qual sua renda mensal?</Title>
        </Header>

        <Content>
          <View style={styles.inputControl}>
            <Text style={styles.labelCifrao}>R$</Text>    
            <TextInput style={styles.textInput}
              keyboardType='numeric'
              placeholder="00,00"
              placeholderTextColor="#0000001d"
              value={renda}
              onChangeText={(text) => setRenda(text)}
            ></TextInput>
          </View>
        </Content>

        <NextButton onPress={setRendaItem}>
          <ContainerNextButtonContent>
            <TextButton>Pronto!</TextButton>
          </ContainerNextButtonContent>
        </NextButton>
      </Boundaries>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {        
    backgroundColor: '#fff',
    height: '100%'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 35,
    padding: 20,    
    color: '#EE4266',       
  },

  content: {
    width: '100%',    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 5
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  textInput: {    
    width: '100%',
    color: '#858c87',
    height: 80,    
    opacity: 0.7,
    fontSize: 50,    
  },
  inputControl: {    
    display: 'flex',
    width: '90%',
    marginTop: 50,
    flexDirection: 'row',    
  },

  botao: {
    width: '90%',
    backgroundColor: '#EE4266',
    padding: 15,
    borderRadius: 10,
    margin: 30
  },

  Tbotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  TbotaoG: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  continuar: {
    color: 'gray',
    fontSize: 18
  },
  sectionContinuar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 25,

    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 5
  }, 
  labelCifrao: {
    fontSize: 20,    
  }
});

export default Ganhos