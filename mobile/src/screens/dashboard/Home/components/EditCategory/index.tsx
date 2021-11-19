import React, { useState, useEffect } from 'react';

import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import {
  DadosTempProvider,
  UseDadosTemp,
} from '../../../../../contexts/TemporaryDataContext';

import { ScrollView, StyleSheet, View } from 'react-native';

import { TextRS, TextValor, Title, Valor } from './styles';

import global from '../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';

import fonts from '../../../../../styles/fonts';
import { RouteProp, StackActions } from '@react-navigation/native';
import Header from '../../../../../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeAccountStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import { Categoria, UseCategories } from '@contexts/CategoriesContext';
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
      setCategory(category);
      console.debug('A categoria aqui: ', category);
    })();
  }, []);
  
  const [tetoGastos, setTetoGastos] = useState('');
  const [valorError, setValorError] = useState<any | null>(null);

  async function handleUpdateCategory() {
    const newCategory = {
      nomeCategoria: category.nomeCategoria,
      iconeCategoria: category.iconeCategoria,
      tetoDeGastos: tetoGastos,
      tipoCategoria: category.tipoCategoria,
      corCategoria: category.corCategoria,
      userCategoria: category.userCategoria
      userCategory: await retornarIdDoUsuario(),
      isSelected: false
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

      navigation.dispatch(StackActions.replace('AccountStack', { screen: 'ManageCategory' }));

    } else {

      setValorError('Insira um valor válido!');
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Dado inválido',
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
    <ScrollView style={{ paddingTop: '8%', backgroundColor: '#f6f6f6' }}>
      <Header backButton={backAction} title="" />

      <View style={styles.container}>
        <View style={{ marginTop: '15%' }}>
          <Title>{category.nomeCategoria}</Title>

          <Valor>
            <TextRS>R$</TextRS>
            <TextValor>{category.tetoDeGastos}</TextValor>
          </Valor>

          <View>
            <InputText
              value={tetoGastos}
              label="Teto de gastos"
              placeholder={"Ex.: R$100,00"}
              error={valorError}
              showClearIcon={tetoGastos != ''}
              onClear={() => {
                setValorError(null);
                setTetoGastos('');
              }}
              onChangeText={txt => {
                setValorError(null);
                setTetoGastos(txt);
              }}
              keyboardType="numeric"
            />
          </View>

          <Button
            onPress={handleUpdateCategory}
            title="Salvar"
            backgroundColor="#CCC"
            color="#444"
            lastOne={true}
          />
        </View>
      </View>
      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '0%',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default EditCategory;
