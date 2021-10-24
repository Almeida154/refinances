import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, View } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  ScrollContainer,
  ButtonContainer,
  TagContainer,
  Tag,
  CountContainer,
  Count,
} from './styles';
import { colors } from '../../../../styles';

// Components
import { TextInput } from 'react-native';

import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import InputText from '../../../../components/InputText';
import Modalize from '../../../../components/Modalize';

import { Modalize as Modal } from 'react-native-modalize';

import global from '../../../../global';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'FixedIncomes'>;
  route: RouteProp<RootStackParamAuth, 'FixedIncomes'>;
};

const FixedIncomes = ({ navigation }: PropsNavigation) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Salário',
    'Bico',
  ]);
  const [newIncome, setNewIncome] = useState<string>('');
  const [newIncomeError, setNewIncomeError] = useState<any | null>(null);

  const modalizeRef = useRef<Modal>(null);
  const newIncomeRef = useRef<TextInput>(null);

  const { setupUserData, updateSetupUserDataProps } = UseAuth();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    let tags = global.FIXED_INCOME_TAGS as [];
    setTags(tags);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
    const newUserData = setupUserData;
    newUserData.expenseTagsCount--;
    updateSetupUserDataProps(newUserData);
    return true;
  };

  async function next() {
    const userData = setupUserData;
    userData.incomeTags = selectedTags;
    userData.incomeTagsCount = 0;
    updateSetupUserDataProps(userData);

    navigation.navigate('EachFixedIncome');
  }

  const removeAccents = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleAddIncome = () => {
    if (newIncome != '') {
      let tagsToLowerCase = tags.map(tag => removeAccents(tag.toLowerCase()));

      if (tagsToLowerCase.includes(removeAccents(newIncome.toLowerCase()))) {
        setNewIncomeError('Esse gasto já existe!');
        return;
      }

      let tagsUpdated = [...tags, capitalizeFirstLetter(newIncome)];
      let tagsSelectedUpdated = [
        ...selectedTags,
        capitalizeFirstLetter(newIncome),
      ];
      setTags(tagsUpdated);
      setSelectedTags(tagsSelectedUpdated);
      closeModalize();
      setNewIncome('');
    }
  };

  const openModalize = () => modalizeRef.current?.open();
  const closeModalize = () => modalizeRef.current?.close();

  return (
    <Container>
      <ScrollContainer>
        <Header
          onBackButton={() => backAction()}
          title="Selecione os gastos fixos"
          subtitle="Seus gastos mensais."
        />

        <TagContainer>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              onPress={() => {
                if (!selectedTags.includes(tag)) {
                  let newArr = [...selectedTags, tag];
                  setSelectedTags(newArr);
                  return;
                }
                let newArr = selectedTags.filter(
                  tagTouched => tagTouched !== tag,
                );
                setSelectedTags(newArr);
              }}
              style={[
                {
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.08,
                  shadowRadius: 20,
                  elevation: 20,
                },
                selectedTags.includes(tag)
                  ? {
                      backgroundColor: colors.slimyGreen,
                      color: colors.white,
                    }
                  : {},
              ]}>
              {tag}
            </Tag>
          ))}
        </TagContainer>

        <CountContainer>
          <Count counter>{selectedTags.length} </Count>
          <Count>
            {selectedTags.length > 1 ? 'selecionados' : 'selecionado'}
          </Count>
        </CountContainer>

        <ButtonContainer>
          <Button
            onPress={() => openModalize()}
            title="Outro"
            backgroundColor={colors.platinum}
            color={colors.davysGrey}
          />
        </ButtonContainer>
      </ScrollContainer>

      <BottomNavigation
        onPress={() => next()}
        description={'Já selecionei!'}
        iconColor={colors.slimyGreen}
      />

      <Modalize
        ref={modalizeRef}
        hasBodyBoundaries
        title="Novo gasto fixo 💸"
        backgroundColor={colors.cultured}>
        <InputText
          label="Novo gasto"
          placeholder="Empreendimento..."
          colorLabel={colors.slimyGreen}
          ref={newIncomeRef}
          value={newIncome}
          showClearIcon
          lastOne
          error={newIncomeError}
          onClear={() => {
            setNewIncomeError(null);
            setNewIncome('');
          }}
          onChangeText={text => {
            setNewIncomeError(null);
            setNewIncome(text);
          }}
        />
        <Button
          title="Adicionar"
          onPress={() => handleAddIncome()}
          backgroundColor={colors.platinum}
          color={colors.davysGrey}
        />
      </Modalize>
    </Container>
  );
};

export default FixedIncomes;
