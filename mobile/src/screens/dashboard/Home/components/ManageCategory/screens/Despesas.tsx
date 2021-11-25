import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { HomeAccountStack } from '../../../../../../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

import { Categoria, UseCategories } from '../../../../../../contexts/CategoriesContext';

import { ActivityIndicator } from 'react-native-paper';

import retornarIdDoUsuario from '../../../../../../helpers/retornarIdDoUsuario';

import { Title, Subtitle, Loading, TextLoading } from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '../../../../../../components/Button';

import CardCategory from '../../ManageCategorySection/CardCategory';
import { StackActions } from '@react-navigation/native';

type PropsCategory = {
  navigation: StackNavigationProp<HomeAccountStack, 'ManageCategory'>;
};

const Despesas = ({ navigation }: PropsCategory) => {
  const { categorias, handleReadByUserCategorias } = UseCategories();

  const [despesasCategorias, setDespesasCategorias] = useState<Categoria[] | null>(null)

  const [stateReload, setStateReload] = useState(false);

  useEffect(() => {
    if (!navigation.addListener) return;

    const focus = navigation.addListener('focus', () => {
      setStateReload(false);
    });

    const blur = navigation.addListener('blur', () => {
      setStateReload(true);
    });
  }, [navigation]);

  useEffect(() => {
      if(!categorias)
        (async function () {
          handleReadByUserCategorias(await retornarIdDoUsuario(), 'todos');
        })();
  
  }, []);

  useEffect(() => {
    const aux: Categoria[] = []
    
    categorias?.map(item => {
      if(item.tipoCategoria == 'despesa')
        aux.push(item)
      })
            
    setDespesasCategorias(aux)
  }, [categorias])
  
  if (despesasCategorias?.length > 0) {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        {stateReload ? (
          <Loading>
            <ActivityIndicator size="large" color="#EE4266" />
            <TextLoading>Carregando...</TextLoading>
          </Loading>
        ) : (
          <View style={{ padding: '10%' }}>
            <Subtitle>
              Adicione teto de gastos às categorias para se manter organizado(a)!
            </Subtitle>

            {despesasCategorias &&
              despesasCategorias.map((item, index) => {
                  return <CardCategory item={item} key={index} />
              })}

          </View>
        )}

      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
        <View style={{ margin: '10%', alignItems: 'center' }}>
          <Icon
            name="emoticon-sad-outline"
            size={50}
            color="#525252"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
            }}
          />

          <Title>Você não tem categorias cadastradas!</Title>

          <Subtitle>
            Categorias com teto de gastos são muito importantes para
            impor limites em si mesmo, não deixe de criar e gerenciá-las.
          </Subtitle>

          <Button
            title="Criar nova categoria"
            backgroundColor="#ee4266"
            onPress={() => {
              navigation.dispatch(StackActions.replace('CreateCategory'))
            }}></Button>
        </View>
      </ScrollView>
    );
  }
};

export default Despesas;
