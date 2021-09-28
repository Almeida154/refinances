import React, { useEffect, useState } from 'react';

// React components
import {
  StyleSheet, Text,
  TouchableHighlight,
  View, TextInput,
  StatusBar, ScrollView, Alert
} from 'react-native';

import { Buffer } from 'buffer';

// Navigation | Auth
import { UseAuth } from '../../../../contexts/AuthContext';
import { UseDadosTemp } from '../../../../contexts/TemporaryDataContext';
import { UseContas, Conta } from '../../../../contexts/AccountContext'
import { UseLancamentos, Lancamento } from '../../../../contexts/EntriesContext';
import { UseCategories, Categoria } from '../../../../contexts/CategoriesContext';
import { UseCategoriasConta } from '../../../../contexts/CategoriesAccountContext';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';
import { CategoriaConta } from '../../../../contexts/CategoriesAccountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Styles
import {
  Container, Boundaries,
  Header, Title, SubTitle, Content,
  NextButton, TextButton,
  ContainerNextButtonContent,
  Card, CardTitle, CardDescription,
  CardButtonContainer, CardButton, TextCardButton,
  CardLine
} from './styles';

// Icons
import ArrowNextGrey from '../../../../assets/images/svg/arrow-next-grey.svg';
import ArrowBackGrey from '../../../../assets/images/svg/arrow-back-grey.svg';
  
export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, "ConfigConta">,    
  route: RouteProp<RootStackParamAuth, "ConfigConta">
}

const ConfigConta = ({route, navigation}: PropsNavigation) => {  
  const { user, handleRegister, updateUserProps } = UseAuth();
  const { configuracoesDeConta, setupConfiguracaoConta, rendaTemp, categoriasTemp } = UseDadosTemp();
  const { lancamentos, handleAdicionarLancamento } = UseLancamentos();
  const { categorias, handleAdicionar } = UseCategories();
  const { categoriasConta, setupCategoriasConta } = UseCategoriasConta();
  const { contas, handleAdicionarConta } = UseContas();

  const [nomeUser, setNomeUser] = useState('')

  const useForceUpdate = () => {
    const set = useState(0)[1];
    return () => set((s) => s + 1);
  }

  async function buttonRegistrar() {
    const getNome = await AsyncStorage.getItem('nomeUser')
    user.nomeUsuario = getNome == null ? "usuario" : getNome
    const response = await handleRegister();
    console.log(user);

    const getUser = await AsyncStorage.getItem('user')
    const idUser = JSON.parse(getUser == null ? "{id: 0}" : getUser).id
    const renda = await AsyncStorage.getItem('rendaTemp');

    console.log('rendaTemp', rendaTemp);

    if (response == '') {

      // Adicionar Categoria Conta Carteira     
      console.log('Sessão da categoria Conta');

      await setupCategoriasConta(idUser);
      console.log('categoriasConta + ', categoriasConta);

      // Adicionar as categorias padrões
      const nomesCategoriasPadroes = [
          ["Educação", "FontAwesome:book"], ["Casa", "MaterialCommunityIcons:home-variant"],
          ["Restaurantes", "Ionicons:restaurant-sharp"], ["Família", "MaterialIcons:family-restroom"],
          ["Impostos", "FontAwesome5:file-invoice-dollar"], ["Lazer", "MaterialIcons:park"],
          ["Mercado", "MaterialCommunityIcons:point-of-sale"], ["Pets", "MaterialIcons:pets"],
          ["Transporte", "FontAwesome5:car-side"], ["Viagem", "Fontisto:plane"]
      ];      

      categoriasTemp.map(async (item, index) => {
        const newCategoria: Categoria = {
          id: item.id,
          nomeCategoria: item.nomeCategoria,
          tetoDeGastos: item.tetoDeGastos,
          tipoCategoria: item.tipoCategoria,
          essencial: item.essencial,
          iconeCategoria: nomesCategoriasPadroes[index][1],
          userCategoria: idUser
        }

        await handleAdicionar(newCategoria);
      });

      // Adicionar Categoria trabalho
      console.log('Sessão da categoria Trabalho');

      const categoriaTrabalho: Categoria = {
        id: -1,
        nomeCategoria: 'Trabalho',
        tetoDeGastos: 0,
        tipoCategoria: 'receita',
        essencial: true,
        iconeCategoria: 'FontAwesome5:toolbox',
        userCategoria: idUser
      }

      await handleAdicionar(categoriaTrabalho);
      console.log(categorias);
            
      // Adicionar a primeira conta
      console.log('Sessão da primeira conta')
      const newConta: Conta = {
        id: -1,
        categoryConta: 'Carteira',
        descricao: 'Conta Principal',
        saldoConta: 0,
        userConta: idUser
      }

      await handleAdicionarConta(newConta);
      console.log(contas);

      // Adicionar o salário dele
      const idConta = await AsyncStorage.getItem('idConta');

      const newLancamento: Lancamento = {
        id: -1,
        categoryLancamento: 'Trabalho',
        descricaoLancamento: 'Salário',
        lugarLancamento: 'extrato',
        tipoLancamento: 'receita',
        parcelasLancamento: [{
          id: -1,
          contaParcela: parseInt(idConta == null ? '-1' : idConta),
          lancamentoParcela: -1,
          valorParcela: parseInt(renda == null ? '0' : renda),
          dateParcela: (new Date(Date.now())).toLocaleDateString()
        }]
      }
      
      await handleAdicionarLancamento(newLancamento, idUser);
      console.log(lancamentos);
      
      console.log(categoriasConta[0]);
      console.log(categorias[0]);
      console.log(contas[0]);
      console.log(lancamentos[0]);

      const logarUser = user;
      logarUser.signed = true;
      updateUserProps(logarUser);
    } else {
      Alert.alert(response);
    }
  }  

  const forceUpdate = useForceUpdate();
  
  useEffect(() => {
    (async function () {
      try {
        const aux = await AsyncStorage.getItem('nomeUser')
        setNomeUser(aux == null ? "Nome não encontrado" : aux)
        
        if (configuracoesDeConta.length == 0) {
          setupConfiguracaoConta(2);
        }
        forceUpdate();
        console.log('configuracoesDeConta = ' + configuracoesDeConta);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <Container>
        <Boundaries>
          <Header>
            <ArrowBackGrey
              onPress={() => navigation.navigate('InserirNome')}
              height={26}
              style={{ marginLeft: -16, marginBottom: 20 }} />
            <Title>Bom, {nomeUser}</Title>
            <SubTitle>Precisamos configurar sua conta</SubTitle>
          </Header>

          <Content>
            <Card>
              <CardTitle>Adicionar ganhos</CardTitle>
              <CardLine/>
              <CardDescription>Registraremos o quanto você ganha</CardDescription>
              <CardButtonContainer>
                <CardButton
                  style={[configuracoesDeConta[0]
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: '#EE4266' }]}
                  onPress={() => navigation.navigate('Ganhos')}>
                  <TextCardButton>{configuracoesDeConta[0] ? "Pronto" : "Começar"}</TextCardButton>
                </CardButton>
              </CardButtonContainer>
            </Card>
                
            <Card>
              <CardTitle>Adicionar gastos essenciais</CardTitle>
              <CardLine/>
              <CardDescription>Registraremos alguns dos seus gastos essenciais (aqueles indispensáveis)</CardDescription>
              <CardButtonContainer>
                <CardButton
                  style={[configuracoesDeConta[1]
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: '#EE4266' }]}
                  onPress={() => navigation.navigate('ConfigCategorias')}>
                  <TextCardButton>{configuracoesDeConta[1] ? "Pronto" : "Começar"}</TextCardButton>
                </CardButton>
              </CardButtonContainer>
            </Card>
          </Content>
          
          <NextButton onPress={buttonRegistrar}>
            <ContainerNextButtonContent>
              <TextButton>Registrar</TextButton>
            </ContainerNextButtonContent>
          </NextButton>
        </Boundaries>
      </Container>
    </ScrollView>

  );
}

export default ConfigConta;