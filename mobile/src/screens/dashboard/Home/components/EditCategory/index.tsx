import React, { useState, useEffect } from 'react';

import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import {
  DadosTempProvider,
  UseDadosTemp,
} from '../../../../../contexts/TemporaryDataContext';

import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';

import { TextRS, TextValor, Title, Valor } from './styles';

import global from '../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';

import HeaderTop from '../../../../../components/Header';
import {
  AlinhaParaDireita,
  InputControlValue,
  LabelCifrao,
  TextInputValue,
  Header,
} from '../../../Entries/styles';

import fonts from '../../../../../styles/fonts';
import { RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeAccountStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import { Categoria, UseCategories } from '../../../../../contexts/CategoriesContext';
import { EXPORTDECLARATION_TYPES } from '@babel/types';

type PropsEditCategory = {
  navigation: StackNavigationProp<HomeAccountStack, 'EditCategory'>;
  route: RouteProp<HomeAccountStack, 'EditCategory'>;
};

const EditCategory = ({ route, navigation }: PropsEditCategory) => {
  const [category, setCategory] = useState({} as Categoria);

  const { handleAtualizarCategoria, handleGetCategoryById } = UseCategories();

  useEffect(() => {
    (async () => {
      const category = await handleGetCategoryById(route.params?.categoryId);
      console.debug('Id categoria: ', route.params?.categoryId);
      console.debug('A categoria aqui: ', category);

      setCategory(category);
    })();
  }, []);
  
  const [tetoGastos, setTetoGastos] = useState('');
  const [valorError, setValorError] = useState<any | null>(null);

  async function handleUpdateCategory() {
    const newCategory = {
      nomeCategoria: category.nomeCategoria,
      iconeCategoria: category.iconeCategoria,
      tetoDeGastos: parseFloat(tetoGastos),
      tipoCategoria: category.tipoCategoria,
      corCategoria: category.corCategoria,
      userCategoria: await retornarIdDoUsuario(),
      isSelected: false,
    } as Categoria;

    if (parseFloat(tetoGastos) > 0 && tetoGastos != undefined) {

      handleAtualizarCategoria(newCategory, category.id);
      console.log(newCategory);

      Toast.show({
        type: 'niceToast',
        props: {
          type: 'success',
          title: 'Foi!',
          message: 'Teto de gastos adicionado com sucesso',
        },
      });

      //navigation.dispatch(StackActions.replace('AccountStack', { screen: 'ManageCategory' }));

    } else {

      setValorError('Insira um valor válido!');
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Dado inválido'
        },
      });

    }
  }

  const backAction = () => {
    navigation.dispatch(StackActions.replace('StackAccount', 
    { screen:'ManageCategory'}))
    return true;
  };

  return (
    <ScrollView style={{backgroundColor: '#f6f6f6' }}>
      <StatusBar backgroundColor={'#ee4266'} />
       <Header style={{ backgroundColor: '#ee4266' }}>
            <HeaderTop backButton={backAction} title="" />

            <AlinhaParaDireita>
              <View></View>
              <InputControlValue>
                <LabelCifrao>R$</LabelCifrao>
                <TextInputValue
                  keyboardType="numeric"
                  placeholder="00,00"
                  placeholderTextColor="#fff"
                  value={tetoGastos}
                  onChangeText={txt => {
                    setValorError(null);
                    setTetoGastos(txt);
                  }}
                />
              </InputControlValue>
            </AlinhaParaDireita>
          </Header>
          <Title>{category.id}</Title>

          <View style={{paddingLeft: '10%', paddingRight: '10%'}}>
            <Button
              onPress={() => {
                //handleUpdateCategory();
                //navigation.dispatch(StackActions.replace('StackAccount', 
                  //{screen: 'ManageCategory'}));
                console.debug(category);
              }}
              title="Salvar"
              backgroundColor="#CCC"
              color="#444"
              lastOne={true}
            />
          </View>
      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '0%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});

export default EditCategory;
