import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import Button from '../../../../../components/Button';

import { StackActions } from '@react-navigation/native';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';

import {
  Container,
  TopSection,
  Description,
  Separator,
  Detail,
  Title,
  CategoriesContainer,
  CategoryContainer,
  CategoryIcon,
  NameContainer,
  Name,
  CategoryAction,
  Limit,
} from './styles';

import { colors, fonts, metrics } from '../../../../../styles';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import {
  Categoria,
  UseCategories,
} from '../../../../../contexts/CategoriesContext';
import shadowBox from '../../../../../helpers/shadowBox';
import Icon from '../../../../../helpers/gerarIconePelaString';
import { widthPixel } from '../../../../../helpers/responsiveness';

type CategoryItem = {
  item: Categoria;
};

const Category = ({ item }: CategoryItem) => {
  return (
    <CategoryContainer>
      <CategoryIcon style={{ borderColor: item.corCategoria }}>
        <Icon
          color={item.corCategoria}
          size={widthPixel(60)}
          stringIcon={item.iconeCategoria}
        />
      </CategoryIcon>
      <NameContainer>
        <Name numberOfLines={1}>{item.nomeCategoria}</Name>
      </NameContainer>
      <CategoryAction>
        <Limit style={shadowBox(10, 0.2)} numberOfLines={1}>
          Limitar
        </Limit>
      </CategoryAction>
    </CategoryContainer>
  );
};

const CategoriesCard = () => {
  const { navigation } = UseDadosTemp();
  const { categorias, handleReadByUserCategorias, handleCountByEntry } =
    UseCategories();

  const countbyentry = async function () {
    handleCountByEntry(await retornarIdDoUsuario(), 'despesa');
  };

  return (
    <Container style={shadowBox(30, 0.3)}>
      <TopSection>
        <Detail />
        <Description>
          Para controlar melhor seus gastos, defina limites às categorias.
        </Description>
      </TopSection>

      <Separator />
      <Title>Minhas categorias</Title>

      <CategoriesContainer>
        {categorias &&
          categorias.map((item, index) => {
            if (index < 3) {
              return <Category item={item} key={index} />;
            }
          })}

        <Button
          style={{
            backgroundColor: colors.lightGray,
          }}
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('StackAccount', {
                screen: 'ManageCategory',
              }),
            )
          }
          title="Gerenciar"
          color={colors.silver}
          lastOne
        />
      </CategoriesContainer>
    </Container>
  );
};

export default CategoriesCard;
