import React, { useEffect, useState } from 'react';

import { BackHandler, StatusBar } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content, ButtonContainer } from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import CategoryItem from '../../components/CategoryItem';

import global from '../../../../global';
import { Categoria } from '@contexts/CategoriesContext';

export type PropsNavigation = {
  navigation: StackNavigationProp<
    RootStackParamAuth,
    'EachFixedExpenseCategory'
  >;
  route: RouteProp<RootStackParamAuth, 'EachFixedExpenseCategory'>;
};

const EachFixedExpenseCategory = ({ route, navigation }: PropsNavigation) => {
  const [selectedCategory, setSelectedCategory] = useState({} as Categoria);
  const [categories, setCategories] = useState([] as Categoria[]);

  const { setupUserData, updateSetupUserDataProps } = UseAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      populateCategories();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const populateCategories = () => {
    setCategories([] as Categoria[]);

    var defaultCategories = global.DEFAULT_EXPENSE_CATEGORIES.map(category => {
      let cat = {} as Categoria;
      cat.nomeCategoria = category.description;
      cat.corCategoria = category.color;
      cat.iconeCategoria = category.icon;
      cat.tetoDeGastos = null;
      cat.tipoCategoria = 'despesa';
      cat.isSelected = false;
      return cat;
    });

    var ctgrs =
      setupUserData.createdCategories != undefined
        ? [
            ...setupUserData.createdCategories.filter(
              cc => cc.tipoCategoria == 'despesa',
            ),
            ...defaultCategories,
          ]
        : [...defaultCategories];

    if (route.params?.createdCategoryName) {
      clearSelectedCategories();
      const lastCreatedI = ctgrs.findIndex(
        category => category.nomeCategoria == route.params?.createdCategoryName,
      );
      ctgrs[lastCreatedI].isSelected = true;
      setSelectedCategory(ctgrs[lastCreatedI]);
    }
    setCategories(ctgrs);
  };

  const backAction = () => {
    navigation.dispatch(StackActions.replace('EachFixedExpense'));
    return true;
  };

  const clearSelectedCategories = () =>
    categories.map(category => {
      category.isSelected = false;
      return category;
    });

  async function next() {
    const dataUser = setupUserData;
    dataUser.entries[dataUser.expenseTagsCount].categoryLancamento =
      selectedCategory;

    dataUser.expenseTagsCount++;

    updateSetupUserDataProps(dataUser);

    console.debug(
      `EachFixedExpenseCategory | next() | ${dataUser.expenseTagsCount}`,
      JSON.stringify(setupUserData),
    );

    if (dataUser.expenseTagsCount != dataUser.expenseTags.length) {
      return navigation.dispatch(StackActions.replace('EachFixedExpense'));
    }
    navigation.dispatch(StackActions.replace('FixedIncomes'));
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.white} />
      <Header
        onBackButton={() => backAction()}
        title="Selecione ou crie uma categoria para"
        lastWordAccent={
          setupUserData.expenseTags[setupUserData.expenseTagsCount]
        }
        step={`${setupUserData.expenseTagsCount + 1} de ${
          setupUserData.expenseTags.length
        }`}
        hasShadow
        subtitle="Clique para selecionar"
      />

      <Content>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            item={category}
            onPress={() => {
              clearSelectedCategories();
              if (category == selectedCategory) {
                setSelectedCategory({} as Categoria);
                console.log('já selecionada irmao');
                return;
              }

              let newCategories = categories;
              newCategories[index].isSelected = true;

              //console.log(category);

              setCategories(newCategories as Categoria[]);
              setSelectedCategory(newCategories[index]);
            }}
            isSelected={category.isSelected}
          />
        ))}

        <ButtonContainer>
          <Button
            onPress={() =>
              navigation.navigate('NewCategory', { screen: 'Despesa' })
            }
            title="Nova"
            backgroundColor={colors.platinum}
            color={colors.davysGrey}
            lastOne
          />
        </ButtonContainer>
      </Content>

      <BottomNavigation onPress={() => next()} description={'Próximo!'} />
    </Container>
  );
};

export default EachFixedExpenseCategory;
