import React, { useEffect, useState } from 'react';

import { BackHandler, StatusBar, View } from 'react-native';

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
    'EachFixedIncomeCategory'
  >;
  route: RouteProp<RootStackParamAuth, 'EachFixedIncomeCategory'>;
};

const EachFixedIncomeCategory = ({ route, navigation }: PropsNavigation) => {
  const [selectedCategory, setSelectedCategory] = useState({} as Categoria);
  const [categories, setCategories] = useState([] as Categoria[]);

  const { setupUser, updateSetupUserProps } = UseAuth();

  useEffect(() => {
    let iterator = setupUser.incomeTagsCount;
    console.debug(`Contador: ${iterator}`);
    console.debug(`Current: ${setupUser.incomeTags[iterator]}`);

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

    var defaultCategories = global.DEFAULT_INCOME_CATEGORIES.map(category => {
      let cat = {} as Categoria;
      cat.nomeCategoria = category.description;
      cat.corCategoria = category.color;
      cat.iconeCategoria = category.icon;
      cat.tetoDeGastos = null;
      cat.tipoCategoria = 'receita';
      cat.isSelected = false;
      return cat;
    });

    var ctgrs =
      setupUser.createdCategories != undefined
        ? [
            ...setupUser.createdCategories.filter(
              cc => cc.tipoCategoria == 'receita',
            ),
            ...defaultCategories,
          ]
        : [...defaultCategories];

    clearSelectedCategories();
    if (route.params?.createdCategoryName) {
      const lastCreatedI = ctgrs.findIndex(
        category => category.nomeCategoria == route.params?.createdCategoryName,
      );
      ctgrs[lastCreatedI].isSelected = true;
      setSelectedCategory(ctgrs[lastCreatedI]);
    }
    setCategories(ctgrs);
  };

  const backAction = () => {
    navigation.dispatch(StackActions.replace('EachFixedIncome'));
    clearSelectedCategories();
    return true;
  };

  const clearSelectedCategories = () =>
    categories.map(category => {
      category.isSelected = false;
      return category;
    });

  async function next() {
    if (selectedCategory.nomeCategoria == null) {
      return;
    }

    const newSetupProps = setupUser;
    newSetupProps.entries[
      newSetupProps.incomeTagsCount + newSetupProps.expenseTags.length
    ].categoryLancamento = selectedCategory;

    newSetupProps.incomeTagsCount++;
    updateSetupUserProps(newSetupProps);

    if (newSetupProps.incomeTagsCount != newSetupProps.incomeTags.length) {
      return navigation.dispatch(StackActions.replace('EachFixedIncome'));
    }

    clearSelectedCategories();
    navigation.dispatch(StackActions.replace('StatsInitial'));
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.white} />
      <Header
        onBackButton={() => backAction()}
        title="Selecione ou crie uma categoria para"
        lastWordAccent={setupUser.incomeTags[setupUser.incomeTagsCount]}
        step={`${setupUser.incomeTagsCount + 1} de ${
          setupUser.incomeTags.length
        }`}
        accent={colors.slimyGreen}
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

              setCategories(newCategories as Categoria[]);
              setSelectedCategory(newCategories[index]);
            }}
            isSelected={category.isSelected}
          />
        ))}

        <ButtonContainer>
          <Button
            onPress={() =>
              navigation.navigate('NewCategory', { screen: 'Receita' })
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

export default EachFixedIncomeCategory;
