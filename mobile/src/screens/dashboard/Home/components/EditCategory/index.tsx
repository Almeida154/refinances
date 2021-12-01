import React, { useState, useEffect } from 'react';

import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import { useTheme } from 'styled-components/native';
import {
  DadosTempProvider,
  UseDadosTemp,
} from '../../../../../contexts/TemporaryDataContext';

import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';

import { Title, Subtitle, SubtitleT } from './styles';

import global from '../../../../../global';
import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../components/NiceToast';
import CurrencyInput from 'react-native-currency-input';
import { colors, fonts, metrics } from '../../../../../styles';

import HeaderTop from '../../../../../components/Header';
import {
  AlinhaParaDireita,  
  LabelCifrao,  
  Header,
} from '../../../Entries/styles';

import { RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeAccountStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Categoria,
  UseCategories,
} from '../../../../../contexts/CategoriesContext';
import { EXPORTDECLARATION_TYPES } from '@babel/types';
import { CategoryIcon } from '../CategoriesCard/styles';

type PropsEditCategory = {
  navigation: StackNavigationProp<HomeAccountStack, 'EditCategory'>;
  route: RouteProp<HomeAccountStack, 'EditCategory'>;
};

const EditCategory = ({ route, navigation }: PropsEditCategory) => {
  const [category, setCategory] = useState<null | Categoria>(null);

  const { handleAtualizarCategoria, handleGetCategoryById } = UseCategories();

  const [tetoGastos, setTetoGastos] = useState('');
  const [valorError, setValorError] = useState<any | null>(null);
  const [valueLancamentos, setValueLancamentos] = useState(0)

  useEffect(() => {
    (async () => {      
      const category = route.params.category
      
      setCategory(category);      
      setValueLancamentos(Math.abs(category.valueLancamentos))
    })();
  }, []);  
  
  async function handleUpdateCategory() {
    if (!category) return console.log('category nulo');
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
      const response = await handleAtualizarCategoria(newCategory, category.id);
      console.debug('handleUpdateCategory | response', response);

      if (response != '') {
        //Se teve algum erro ao atualizar
        Toast.show({
          type: 'niceToast',
          props: {
            type: 'error',
            title: 'Aconteceu um erro',
            message: response,
          },
        });
      } else {
        Toast.show({
          type: 'niceToast',
          props: {
            type: 'success',
            title: 'Foi!',
            message: 'Teto de gastos adicionado com sucesso',
          },
        });

        navigation.dispatch(
          StackActions.replace('StackAccount', {
            screen: 'ManageCategory',
          }),
        );
      }
    } else {
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
    navigation.dispatch(
      StackActions.replace('StackAccount', { screen: 'ManageCategory' }),
    );
    return true;
  };

  const teto = category?.tetoDeGastos || 0;
  const theme: any = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.colors.cultured }}>
      <Header style={{ backgroundColor: theme.colors.paradisePink }}>
        <HeaderTop
          backButton={backAction}
          title="Teto de gastos"
          color={theme.colors.silver}
          isShort={true}
        />
        <AlinhaParaDireita>
          <LabelCifrao>R$</LabelCifrao>
          <CurrencyInput
            value={parseFloat(tetoGastos)}
            onChangeValue={txt => setTetoGastos(txt?.toString())}
            style={{
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              color: theme.colors.silver,
              fontFamily: fonts.familyType.bold,
              fontSize: fonts.size.super + 20,
              opacity: 0.7,
              width: '100%',
              marginLeft: 10,
            }}
            textAlign="right"
            delimiter="."
            separator=","
            precision={2}
            maxValue={999999}
            placeholderTextColor={theme.colors.lightGray}
            selectionColor={theme.colors.davysGrey}
            onChangeText={formattedValue => {
              formattedValue == ''
                ? setTetoGastos((0).toString())
                : setTetoGastos(tetoGastos);
            }}
          />
        </AlinhaParaDireita>
      </Header>
      <Title>{category?.nomeCategoria}</Title>
      <Subtitle>
        É importante adicionar limites aos seus gastos para se manter sempre na
        linha!{' '}
      </Subtitle>

      <SubtitleT style={{ display: teto > 0 ? 'flex' : 'none' }}>
        Teto de gastos atual:{' '}
        {teto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}{' '}
      </SubtitleT>
      <SubtitleT style={{ display: valueLancamentos > 0 ? 'flex' : 'none' }}>
        gastos atuais:{' '}
        {valueLancamentos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}{' '}
      </SubtitleT>

      <View style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <Button
          onPress={() => {
            handleUpdateCategory();            
          }}
          title="Salvar"
          backgroundColor={theme.colors.blackSilver}
          color={theme.colors.darkGray}
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
