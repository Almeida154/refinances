import React, { useEffect, useState } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content, ButtonContainer } from './styles';
import { colors, metrics } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import CategoryItem from '../../components/CategoryItem';
import Placeholder from '../../components/CategoryPlaceholder';
import { useTheme } from 'styled-components/native'; 
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

  const { setupUser, updateSetupUserProps, showNiceToast, hideNiceToast } =
    UseAuth();

  useEffect(() => {
    // let iterator = setupUser.expenseTagsCount;
    // console.log('---------CATEGORY---------');
    // console.debug(`Iterator: ${iterator}`);
    // console.debug(`Current: ${setupUser.expenseTags[iterator]}`);
    // console.debug(`Size: ${setupUser.entries.length}`);

    showNiceToast('fake', 'Oops!', null, 500);
    populateCategories();

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
      setupUser.createdCategories != undefined
        ? [
            ...setupUser.createdCategories.filter(
              cc => cc.tipoCategoria == 'despesa',
            ),
            ...defaultCategories,
          ]
        : [...defaultCategories];

    clearSelectedCategories();

    // Caso já tenha passado pela tela, recupera a categoria aqui
    var entryIndex = setupUser.entries.findIndex(
      entry =>
        entry.descricaoLancamento ==
        setupUser.expenseTags[setupUser.expenseTagsCount],
    );

    if (entryIndex != -1) {
      var entry = setupUser.entries[entryIndex];
      if (entry.categoryLancamento != undefined) {
        const selectedI = ctgrs.findIndex(
          category =>
            // @ts-ignore
            category.nomeCategoria == entry?.categoryLancamento?.nomeCategoria,
        );
        ctgrs[selectedI].isSelected = true;
        setSelectedCategory(ctgrs[selectedI]);
      }
    }

    if (route.params?.createdCategoryName) {
      ctgrs.map(category => {
        category.isSelected = false;
        return category;
      });

      const lastCreatedIndex = ctgrs.findIndex(
        category => category.nomeCategoria == route.params?.createdCategoryName,
      );
      ctgrs[lastCreatedIndex].isSelected = true;
      setSelectedCategory(ctgrs[lastCreatedIndex]);
    }

    setTimeout(() => setCategories(ctgrs), 400); // Efeito melhor
  };

  const backAction = () => {
    navigation.dispatch(StackActions.replace('EachFixedExpense'));
    clearSelectedCategories();
    return true;
  };

  async function next() {
    if (selectedCategory.nomeCategoria == null) {
      showNiceToast(
        'error',
        'Calma aí...',
        `E a categoria da ${
          setupUser.expenseTags[setupUser.expenseTagsCount]
        }?`,
      );
      return;
    }

    hideNiceToast();

    const newSetupProps = setupUser;
    newSetupProps.entries[setupUser.expenseTagsCount].categoryLancamento =
      selectedCategory;
    newSetupProps.expenseTagsCount++;
    updateSetupUserProps(newSetupProps);

    if (setupUser.expenseTagsCount != setupUser.expenseTags.length)
      return navigation.dispatch(StackActions.replace('EachFixedExpense'));

    clearSelectedCategories();
    navigation.dispatch(StackActions.replace('FixedIncomes'));
  }

  const clearSelectedCategories = () => {
    var newCategories = categories.map(category => {
      category.isSelected = false;
      return category;
    });

    setCategories(newCategories as Categoria[]);

    if (setupUser.createdCategories != undefined) {
      const newSetupProps = setupUser;
      newSetupProps.createdCategories.map(category => {
        category.isSelected = false;
        return category;
      });

      updateSetupUserProps(newSetupProps);
    }
  };
  const theme: any = useTheme()

  return (
    <Container>
      {/* Uma view com elevation 0 pra ficar abaixo do Toast */}
      <View style={{ elevation: 0 }}>
        <Header
          onBackButton={() => backAction()}
          title="Selecione ou crie uma categoria para"
          lastWordAccent={setupUser.expenseTags[setupUser.expenseTagsCount]}
          step={`${setupUser.expenseTagsCount + 1} de ${
            setupUser.expenseTags.length
          }`}
          hasShadow
          subtitle="Clique para selecionar"
        />
      </View>
      <Content>
        {categories.length > 0 ? (
          <>
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                item={category}
                onPress={() => {
                  clearSelectedCategories();
                  if (category == selectedCategory) {
                    setSelectedCategory({} as Categoria);
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
                style={{ backgroundColor: theme.colors.platinum }}
                onPress={() =>
                  navigation.navigate('NewCategory', { screen: 'Despesa' })
                }
                title="Nova"
                color={theme.colors.davysGrey}
                lastOne
              />
            </ButtonContainer>
          </>
        ) : (
          <View style={{ padding: metrics.default.boundaries }}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </View>
        )}
      </Content>

      <BottomNavigation onPress={() => next()} description={'Próximo!'} />
    </Container>
  );
};

export default EachFixedExpenseCategory;
