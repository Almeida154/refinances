import React, { useEffect, useState, useRef } from 'react';

import { BackHandler } from 'react-native';

import { UseAuth } from '../../../../contexts/AuthContext';
import { Lancamento } from '../../../../contexts/EntriesContext';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

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
import removeAccents from '../../../../helpers/removeAccents';
import capitalizeFirstLetter from '../../../../helpers/capitalizeFirstLetter';
import { useTheme } from 'styled-components/native'; 

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'FixedExpenses'>;
  route: RouteProp<RootStackParamAuth, 'FixedExpenses'>;
};

const FixedExpenses = ({ navigation }: PropsNavigation) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Luz',
    'Água',
    'Internet',
    'Despesa do mês',
  ]);
  const [newExpense, setNewExpense] = useState<string>('');
  const [newExpenseError, setNewExpenseError] = useState<any | null>(null);

  const modalizeRef = useRef<Modal>(null);
  const newExpenseRef = useRef<TextInput>(null);

  const { setupUser, updateSetupUserProps, showNiceToast, hideNiceToast } =
    UseAuth();

  useEffect(() => {
    if (setupUser.expenseTags) {
      let iterator = setupUser.expenseTagsCount;
      console.debug(`Iterator: ${iterator}`);
      console.debug(`Current: ${setupUser.expenseTags[iterator]}`);
    } else console.debug('tá nulo');

    showNiceToast('fake', null, null, 500);

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    let tags = global.FIXED_EXPENSE_TAGS as [];
    setTags(tags);

    setupUser.expenseTags && setSelectedTags(setupUser.expenseTags);
  }, []);

  const backAction = () => {
    navigation.dispatch(StackActions.replace('Account'));
    return true;
  };

  async function next() {
    if (selectedTags.length < 1) {
      showNiceToast('error', 'Oops!', 'Selecione ao menos 1 gasto fixo!');
      return;
    }

    hideNiceToast();

    const newSetupProps = setupUser;

    // Reorganizando a entries com a nova ordem
    if (setupUser.entries) {
      if (
        JSON.stringify(selectedTags) != JSON.stringify(setupUser.expenseTags)
      ) {
        var oldExpenseEntries = setupUser.entries.filter(
          (entry, index) => index < setupUser.expenseTags.length,
        );

        var oldIncomeEntries = setupUser.entries.filter(
          (entry, index) => index >= setupUser.expenseTags.length,
        );

        console.log('-----ATUAL-----');
        setupUser.entries.map(entry => console.log(entry.descricaoLancamento));

        console.log('-----ANTIGO EXPENSE-----');
        oldExpenseEntries.map(entry => console.log(entry.descricaoLancamento));

        var newEntries = [] as Lancamento[];

        for (let i = 0; i < selectedTags.length; i++) {
          for (let j = 0; j < oldExpenseEntries.length; j++) {
            if (selectedTags[i] == oldExpenseEntries[j].descricaoLancamento)
              newEntries[i] = oldExpenseEntries[j];
          }
        }

        setupUser.entries = [...newEntries, ...oldIncomeEntries];
        updateSetupUserProps(newSetupProps);

        console.log('-----NOVO VETOR DOS CRIA-----');
        for (let i = 0; i < setupUser.entries.length; i++)
          if (setupUser.entries[i] != undefined)
            console.log(i + ' - ' + setupUser.entries[i].descricaoLancamento);
          else console.log(i + ' - undefined');
      }
    }

    newSetupProps.expenseTags = selectedTags;
    newSetupProps.expenseTagsCount = 0;
    updateSetupUserProps(newSetupProps);

    navigation.dispatch(StackActions.replace('EachFixedExpense'));
  }

  const handleAddExpense = () => {
    if (newExpense != '') {
      let tagsToLowerCase = tags.map(tag => removeAccents(tag.toLowerCase()));

      if (tagsToLowerCase.includes(removeAccents(newExpense.toLowerCase()))) {
        setNewExpenseError('Esse gasto já existe!');
        return;
      }

      let tagsUpdated = [...tags, capitalizeFirstLetter(newExpense)];
      let tagsSelectedUpdated = [
        ...selectedTags,
        capitalizeFirstLetter(newExpense),
      ];
      setTags(tagsUpdated);
      setSelectedTags(tagsSelectedUpdated);
      closeModalize();
      setNewExpense('');
    }
  };

  const openModalize = () => modalizeRef.current?.open();
  const closeModalize = () => modalizeRef.current?.close();
  const theme: any = useTheme()
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
                      backgroundColor: theme.colors.paradisePink,
                      color: theme.colors.white,
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
            style={{ backgroundColor: theme.colors.platinum, marginBottom: 60 }}
            color={theme.colors.davysGrey}
            onPress={() => openModalize()}
            title="Outro"
            lastOne
          />
        </ButtonContainer>
      </ScrollContainer>

      <BottomNavigation onPress={() => next()} description={'Já selecionei!'} />

      <Modalize
        ref={modalizeRef}
        hasBodyBoundaries
        title="Novo gasto fixo 💸"
        backgroundColor={theme.colors.cultured}>
        <InputText
          label="Novo gasto"
          placeholder="Faculdade, Academia..."
          ref={newExpenseRef}
          value={newExpense}
          showClearIcon
          lastOne
          showErrorMessage
          error={newExpenseError}
          onClear={() => {
            setNewExpenseError(null);
            setNewExpense('');
          }}
          onChangeText={text => {
            setNewExpenseError(null);
            setNewExpense(text);
          }}
        />
        <Button
          style={{
            backgroundColor: theme.colors.platinum,
          }}
          title="Adicionar"
          onPress={() => handleAddExpense()}
          color={theme.colors.davysGrey}
        />
      </Modalize>
    </Container>
  );
};

export default FixedExpenses;
