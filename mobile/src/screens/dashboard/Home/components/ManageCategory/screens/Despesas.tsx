import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { HomeAccountStack } from '../../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  Categoria,
  UseCategories,
} from '../../../../../../contexts/CategoriesContext';

import { colors, fonts, metrics } from '../../../../../../styles';
import { Title, Subtitle, Loading, TextLoading } from './styles';

import retornarIdDoUsuario from '../../../../../../helpers/retornarIdDoUsuario';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '../../../../../../components/Button';
import CategoryItem from '../../../../../../components/CategoryItem';

import { StackActions } from '@react-navigation/native';

type PropsCategory = {
  navigation: StackNavigationProp<HomeAccountStack, 'ManageCategory'>;
};

const Despesas = ({ navigation }: PropsCategory) => {
  const { categorias, handleReadByUserCategorias } = UseCategories();

  const [despesasCategorias, setDespesasCategorias] = useState<
    Categoria[] | null
  >(null);

  useEffect(() => {
    (async function () {
      handleReadByUserCategorias(await retornarIdDoUsuario(), 'todos');
    })();
  }, []);

  useEffect(() => {
    const aux: Categoria[] = [];

    categorias?.map(item => {
      if (item.tipoCategoria == 'despesa') aux.push(item);
    });

    setDespesasCategorias(aux);
  }, [categorias]);

  if (despesasCategorias != null && despesasCategorias?.length > 0) {
    return (
      <ScrollView style={{ backgroundColor: colors.cultured }}>
        <View style={{ padding: '10%' }}>
          <Subtitle>
            Adicione teto de gastos às categorias para se manter organizado(a)!
          </Subtitle>

          {despesasCategorias &&
            despesasCategorias.map((item, index) => {
              return <CategoryItem key={index} category={item} />;
            })}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: colors.cultured }}>
        <View style={{ margin: '10%', alignItems: 'center' }}>
          <Icon
            name="emoticon-sad-outline"
            size={50}
            color={colors.davysGrey}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
            }}
          />

          <Title>Você não tem categorias cadastradas!</Title>

          <Subtitle>
            Categorias com teto de gastos são muito importantes para impor
            limites em si mesmo, não deixe de criar e gerenciá-las.
          </Subtitle>

          <Button
            title="Criar nova categoria"
            backgroundColor={colors.paradisePink}
            onPress={() => {
              navigation.dispatch(StackActions.replace('CreateCategory'));
            }}></Button>
        </View>
      </ScrollView>
    );
  }
};

export default Despesas;
