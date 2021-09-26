import React, { useEffect, useState } from 'react';

// React components
import {
  StyleSheet, Text,
  TouchableHighlight,
  View, TextInput, StatusBar,
  Alert, SafeAreaView
} from 'react-native';

// Navigation | Auth
import { UseAuth } from '../../../../contexts/AuthContext';
import { UseLancamentos, Lancamento } from '../../../../contexts/EntriesContext';
import { UseDadosTemp } from '../../../../contexts/TemporaryDataContext';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';
import { Categoria } from '../../../../contexts/CategoriesContext';
import { FlatList } from 'react-native-gesture-handler';

// Styles
import {
  Container, Boundaries,
  Header, Title, Content,
  NextButton, TextButton,
  ContainerNextButtonContent,
} from './styles';

// Icons
import ArrowNextGrey from '../../../assets/images/svg/arrow-next-grey.svg';
import ArrowBackGrey from '../../../assets/images/svg/arrow-back-grey.svg';
  
export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, "ConfigCategorias">,    
  route: RouteProp<RootStackParamAuth, "ConfigCategorias">
}

const Item = ({item, DeixarSelecionado}: {item: Categoria, DeixarSelecionado: (index: number) => void}) => {
  return (
    <SafeAreaView style={styles.containerItens}>
      <TouchableHighlight
        underlayColor={'#DDDDDD'}
        style={[{
            borderRadius: 10,
            borderColor: 'gray',
            borderWidth: 1
          }, item.essencial
          ? { backgroundColor: 'green' }
          : {}
        ]}
        onPress={() => DeixarSelecionado(item.id)}>
        <View style={styles.sectionItem}>
          <Text style={styles.textTitle}>{item.nomeCategoria}</Text>
          <Text style={styles.textMoney}>R$ 00,00</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const ConfigCategoria = ({route, navigation}: PropsNavigation) => {    
  const [renda, setRenda] = useState('5');
  const { categoriasTemp, setRendaTemp, setupCategoriasPadroes, setCategoriasTemp, configuracoesDeConta, mudarConfiguracaoConta } = UseDadosTemp();

  async function setRendaItem() {  
    if (renda == '')
      return Alert.alert("Selecione algum valor brother");

    setRendaTemp(renda);
    
    configuracoesDeConta[1] = true;
    mudarConfiguracaoConta(configuracoesDeConta);
    
    navigation.goBack();
  } 

  const useForceUpdate = () => {
    const set = useState(0)[1];
    return () => set((s) => s + 1);
  }

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (categoriasTemp.length == 1) {
      console.log('foi');
      setupCategoriasPadroes();
    }
    
    forceUpdate();
    console.log(categoriasTemp.length);
  }, []);

  function DeixarSelecionado(index: number) {    
    if(index == -1) {
      console.log('categoriasTemp.length');
      const aux = categoriasTemp;

      aux.map((item, index) => {
        aux[index].id = index
      });

      setCategoriasTemp(aux);
      return;
    }

    forceUpdate();
    
    console.log(index);
    categoriasTemp[index].essencial = categoriasTemp[index].essencial ? false : true;

    setCategoriasTemp(categoriasTemp);
    forceUpdate();
  }

  const RenderItem = ({item}: {item: Categoria}) => {
    return (
      <Item item={item} DeixarSelecionado={DeixarSelecionado} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quais são suas categorias essenciais?</Text>

      <View style={styles.content}>
        <FlatList                
          data={categoriasTemp}
          renderItem={RenderItem}
          keyExtractor={(item, index) => String(index)}
          numColumns={2}
          style={{width: '100%'}}/>
      </View>

      <TouchableHighlight
        underlayColor={'#DDDDDD'}
        style={styles.sectionContinuar}
        onPress={setRendaItem}>
        <Text style={styles.continuar}>
          Pronto
        </Text>
      </TouchableHighlight>
    </View>
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
    height: '65%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20
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
  botao: {
    width: '90%',
    backgroundColor: '#EE4266',
    padding: 15,
    borderRadius: 10,
    margin: 30
  },
  
  continuar: {
    color: 'gray',
    fontSize: 18
  },
  sectionContinuar: {  
    height: '35%',
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
  },
  containerItens: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',        
    paddingTop: "1%",
    paddingBottom: "1%"

  },
  sectionItem: {
    alignItems: 'flex-start',
    
    borderRadius: 10,
    padding: 15,
    height: 70,
    width: 150,
    marginBottom: 10
  },
  textTitle: {    
    fontWeight: 'bold'
  },
  textMoney: {    
    color: 'gray'
  }
});

export default ConfigCategoria