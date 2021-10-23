import React, { useEffect, useState } from 'react';

import { BackHandler, StatusBar } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

import { StackActions } from '@react-navigation/native';

// Styles
import { Container, Content, ButtonContainer } from './styles';
import { colors } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import CategoryItem from '../../components/CategoryItem';

import { Lancamento } from '@contexts/EntriesContext';
import { Parcela } from '@contexts/InstallmentContext';

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
  const [createdCategories, setCreatedCategories] = useState<
    null | Categoria[]
  >(null);

  const { setupUserData, updateSetupUserDataProps } = UseAuth();

  const [stateReload, setStateReload] = useState(false);

  useEffect(() => {
    if (!navigation || !navigation.addListener) return;

    const unsubscribe = navigation.addListener('focus', () => {
      setStateReload(false);
      populateCategories();
    });

    const blur = navigation.addListener('blur', () => {
      setStateReload(true);
      console.log(stateReload);
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
        ? [...setupUserData.createdCategories, ...defaultCategories]
        : [...defaultCategories];

    if (setupUserData.createdCategories != undefined) {
      //console.debug('AS CRIADAS:::: ', setupUserData.createdCategories);
    }

    setCategories(ctgrs);
    //console.debug('AS CATEGORIAS ATÉ AGORA:::: ', ctgrs);
  };

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const clearSelectedCategories = () =>
    categories.map(category => {
      category.isSelected = false;
      return category;
    });

  async function next() {
    const dataUser = setupUserData;
    const entry = {
      tipoLancamento: 'despesa',
      categoryLancamento: selectedCategory,
      descricaoLancamento: dataUser.expenseTags[dataUser.expenseTagsCount],
      essencial: true,
      lugarLancamento: 'extrato',
    } as Lancamento;

    dataUser.entries != undefined
      ? dataUser.entries.push(entry)
      : (dataUser.entries = [entry]);

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
      {!stateReload ? (
        <>
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
                onPress={() => navigation.navigate('NewCategory')}
                title="Nova"
                backgroundColor={colors.platinum}
                color={colors.davysGrey}
                lastOne
              />
            </ButtonContainer>
          </Content>

          <BottomNavigation onPress={() => next()} description={'Próximo!'} />
        </>
      ) : (
        <>
          <Button
            onPress={() => navigation.navigate('NewCategory')}
            title="OTA"
            backgroundColor={colors.platinum}
            color={colors.davysGrey}
            lastOne
          />
        </>
      )}
    </Container>
  );
};

export default EachFixedExpenseCategory;
