import React, { useEffect, useState } from 'react';

import { BackHandler, StatusBar, ToastAndroid, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  CommonActions,
  RouteProp,
  StackActions,
} from '@react-navigation/native';
import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import { Container, Content, ButtonContainer } from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import CategoryItem from '../../components/CategoryItem';
import Toast from 'react-native-toast-message';

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

  const { setupUser, updateSetupUserProps } = UseAuth();

  useEffect(() => {
    let iterator = setupUser.expenseTagsCount;
    console.debug(`Contador: ${iterator}`);
    console.debug(`Current: ${setupUser.expenseTags[iterator]}`);

    populateCategories();
  }, []);

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
      setupUser.createdCategories != undefined
        ? [
            ...setupUser.createdCategories.filter(
              cc => cc.tipoCategoria == 'despesa',
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
    navigation.dispatch(StackActions.replace('EachFixedExpense'));
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
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Calma aí...',
          message: `E a categoria da ${
            setupUser.expenseTags[setupUser.expenseTagsCount]
          }?`,
        },
      });
      return;
    }

    const newSetupProps = setupUser;
    newSetupProps.entries[setupUser.expenseTagsCount].categoryLancamento =
      selectedCategory;
    newSetupProps.expenseTagsCount++;
    updateSetupUserProps(newSetupProps);

    if (setupUser.expenseTagsCount != setupUser.expenseTags.length) {
      return navigation.dispatch(StackActions.replace('EachFixedExpense'));
    }

    clearSelectedCategories();
    navigation.dispatch(StackActions.replace('FixedIncomes'));
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Uma view aqui com elevation 0 pra ficar abaixo do Toast */}
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
            style={{ backgroundColor: colors.platinum }}
            onPress={() =>
              navigation.navigate('NewCategory', { screen: 'Despesa' })
            }
            title="Nova"
            color={colors.davysGrey}
            lastOne
          />
        </ButtonContainer>
      </Content>

      <BottomNavigation onPress={() => next()} description={'Próximo!'} />

      <>
        {/* @ts-ignore */}
        <Toast topOffset={0} config={global.TOAST_CONFIG} />
      </>
    </Container>
  );
};

export default EachFixedExpenseCategory;
